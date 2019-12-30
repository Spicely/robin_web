import React, { Component } from 'react'
import { Consumer } from '../ThemeProvider'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { isUndefined } from 'lodash'
import { getUnit, ToastThemeData } from '../utils'
import Icon from '../Icon'

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
    addNotice: (notice: INotices) => void
    destroy: () => void
}



interface IToastMaskPorps {
    type?: 'loading'
}

const ToastMask = styled.div<IToastMaskPorps>`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
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

function createNotification(): ICreateNotification {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const notification: any = ReactDOM.render(<Notification />, div)
    return {
        addNotice(notice: INotices) {
            return notification.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}


let notification: ICreateNotification
const notice = (data: INotices) => {
    if (!notification) notification = createNotification()
    return notification.addNotice(data)
}

export default class Notification extends Component<any, IState> {

    public static info(data: INotices) {
        return notice({
            ...data,
            duration: isUndefined(data.duration) ? 2000 : data.duration,
            type: 'info'
        })
    }
    public static success(data: INotices) {
        return notice({
            ...data,
            type: 'success'
        })
    }
    public static warning(data: INotices) {
        return notice({
            ...data,
            duration: isUndefined(data.duration) ? 2000 : data.duration,
            type: 'warning'
        })
    }
    public static error(data: INotices) {
        return notice({
            ...data,
            duration: isUndefined(data.duration) ? 2000 : data.duration,
            type: 'error'
        })
    }
    public static loading(data: INotices) {
        return notice({
            ...data,
            type: 'loading'
        })
    }

    public state: IState = {
        notices: []
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
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        return () => { this.removeNotice(notice.key) }
    }

    private removeNotice(key: string) {
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
        return (
            <Consumer>
                {(init) => (
                    <ToastMask>
                        {
                            notices.map(notice => (
                                <ToastView
                                    key={notice.key}
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
                            ))
                        }
                    </ToastMask>
                )}
            </Consumer>
        )
    }
}
