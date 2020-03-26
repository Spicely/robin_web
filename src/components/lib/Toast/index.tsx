import React, { Component, Fragment } from 'react'
import { isUndefined } from 'lodash'
import ReactDOM, { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { Consumer } from '../ThemeProvider'
import { getUnit, ToastThemeData } from '../utils'
import Icon from '../Icon'

let globalNode: Element | null
let glabalView: Element | null

type IType = 'loading' | 'success' | 'info' | 'warning' | 'error'

interface INotices {
    key?: string
    onClose?: () => void
    duration?: number
    type: IType
    content: string
}

interface IToastProps {
    key?: string
    onClose?: () => void
    duration?: number
    content: string
}

interface IToastMaskPorps {
    type?: IType
}

const ToastMask = styled.div<IToastMaskPorps>`
    ${({ type }) => {
        if (type === 'loading') {
            return css`position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 9;`
        } else {
            return css`position: relative;z-index: 9;`
        }
    }}
    
`

interface IToastViewProps {
    toastTheme: ToastThemeData
    type?: IType
}

const ToastView = styled.div<IToastViewProps>`
    position: absolute;
    ${({ type }) => {
        if (type === 'loading') {
            return css`bottom: 50%; transform: translate(0, 50%);`
        } else {
            return `bottom: ${getUnit(90)};`
        }
    }}
    
    width: 100%;
`

const ToastContent = styled.span<IToastViewProps>`
    background: ${({ toastTheme }) => toastTheme.toastColor.toString()};
    color: ${({ toastTheme }) => toastTheme.color.toString()};
    ${({ toastTheme, type }) => {
        if (type === 'loading') {
            return css`padding: 20px;`
        } else {
            return css`${toastTheme.padding.toString()}`
        }
    }}
    ${({ toastTheme }) => css`${toastTheme.borderRadius.toString()}`}
`

function createGlobalNode() {
    if (!glabalView) {
        glabalView = document.createElement('div')
        document.body.appendChild(glabalView)
    }
}

let toastData: INotices[] = []

const toastReader = (data: INotices) => {
    createGlobalNode()
    const key = `notice_${Date.now()}_${data.type}_${toastData.length}`
    const duration = isUndefined(data.duration) ? 2000 : data.duration
    toastData.push({
        ...data,
        key,
        duration
    })
    ReactDOM.render(<Notification data={toastData} />, glabalView)
    if (duration) {
        const timer = setTimeout(() => {
            const index = toastData.findIndex((i) => i.key === key)
            toastData.splice(index, 1)
            ReactDOM.render(<Notification data={toastData} />, glabalView)
            clearTimeout(timer)
        }, duration)
    }
    return () => {
        ReactDOM.render(<Notification data={toastData} />, glabalView)
    }
}

export default class Toast {

    public static loading = (content: string = '') => {
        createGlobalNode()
        const key = `notice-${Date.now()}`
        toastData.push({
            key,
            type: 'loading',
            content
        })
        ReactDOM.render(<Notification data={toastData} />, glabalView)
        return () => {
            const index = toastData.findIndex((i) => i.key === key)
            toastData.splice(index, 1)
            ReactDOM.render(<Notification data={toastData} />, glabalView)
        }
    }

    public static info = (data: IToastProps) => {
        return toastReader({
            ...data,
            type: 'info'
        })
    }
}

interface IProps {
    data: INotices[]
}

class Notification extends Component<IProps, any> {

    private node: Element | null = null

    public constructor(props: any) {
        super(props)
        if (typeof document !== 'undefined') {
            globalNode = document.querySelector(`.mk_mask_toast`)
            if (globalNode) {
                this.node = globalNode
            } else {
                const dom = document.createElement('div')
                dom.className = 'mk_mask_toast'
                const body = document.querySelector('body')
                if (body) {
                    body.appendChild(dom)
                }
                this.node = dom
                globalNode = dom
            }
        }
    }

    public render(): JSX.Element {
        const { data } = this.props
        if (!this.node) {
            return <Fragment />
        } else {
            return createPortal(
                (
                    <Consumer>
                        {(init) => (
                            <Fragment>
                                {
                                    data.map(notice => (
                                        <ToastMask
                                            key={notice.key}
                                            type={notice.type}
                                        >
                                            <ToastView
                                                className="flex_center"
                                                toastTheme={init.theme.toastTheme}
                                                type={notice.type}
                                            >
                                                <ToastContent
                                                    toastTheme={init.theme.toastTheme}
                                                    type={notice.type}
                                                >
                                                    {notice.type === 'loading' ? <Icon
                                                        icon="loading"
                                                        theme={init.theme.toastTheme.iconTheme}
                                                        rotate
                                                    /> : null}
                                                    {notice.content}
                                                </ToastContent>
                                            </ToastView>
                                        </ToastMask>
                                    ))
                                }
                            </Fragment>
                        )}
                    </Consumer>
                ), this.node
            )
        }
    }
}