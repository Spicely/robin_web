import React, { Component, Fragment } from 'react'
import { Consumer } from '../ThemeProvider'
import ReactDOM, { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { isUndefined } from 'lodash'
import { getUnit, ToastThemeData } from '../utils'
import Icon from '../Icon'

let globalNode: Element | null
let glabalView: Element | null

type IType = 'loading' | 'success' | 'info' | 'warning' | 'error'

interface INotices {
    key?: string
    onClose?: () => void
    duration?: number
    type?: IType
    content: string
}

interface IState {
    notices: INotices[]
}

interface ICreateNotification {
    addNotice: (notice: INotices) => () => void
    destroy: () => void
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

interface IToastProps {
    toastTheme: ToastThemeData
    type?: IType
}

const ToastView = styled.div<IToastProps>`
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

const ToastContent = styled.span<IToastProps>`
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

export default class Toast {

    public constructor() {
       
    }

    public static loading = () => {
        createGlobalNode()
        ReactDOM.render(<Notification />, glabalView)
        return () => { }
    }
    
    public static info = (data: INotices) => { }
}

// (data: INotices) => {
//     if (!glabalView) {
//         glabalView = document.createElement('div')
//         document.body.appendChild(glabalView)
//     }
//     ReactDOM.render(<Notification />, glabalView)
//     return {
//         loading: () => { },
//         info: () => { }
//     }
// }

class Notification extends Component<any, IState> {
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

    private node: Element | null = null

    // public static info(data: INotices) {
    //     return notice({
    //         ...data,
    //         duration: isUndefined(data.duration) ? 2000 : data.duration,
    //         type: 'info'
    //     })
    // }
    // public static success(data: INotices) {
    //     return notice({
    //         ...data,
    //         type: 'success'
    //     })
    // }
    // public static warning(data: INotices) {
    //     return notice({
    //         ...data,
    //         duration: isUndefined(data.duration) ? 2000 : data.duration,
    //         type: 'warning'
    //     })
    // }
    // public static error(data: INotices) {
    //     return notice({
    //         ...data,
    //         duration: isUndefined(data.duration) ? 2000 : data.duration,
    //         type: 'error'
    //     })
    // }

    // public static loading(content?: string) {

    //     return notice({
    //         content: content || '',
    //         type: 'loading'
    //     })
    // }

    public state: IState = {
        notices: [{
            type: 'loading',
            content: '',
        }]
    }

    private getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    private addNotice(notice: any) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            notices[0] = notice
            this.setState({ notices })
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.remove(notice.key)
                }, notice.duration)
            }
        }
        return () => { this.remove(notice.key) }
    }

    private remove(key: string) {
        this.setState(previousState => ({
            notices: previousState.notices.filter((notice) => {
                if (notice.key === key) {
                    if (notice.onClose) notice.onClose()
                    return false
                }
                return true
            })
        }))
    }

    public render(): JSX.Element {
        const { notices } = this.state
        if (!this.node) {
            return <Fragment />
        } else {
            return createPortal(
                (
                    <Consumer>
                        {(init) => (
                            <Fragment>
                                {
                                    notices.map(notice => (
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