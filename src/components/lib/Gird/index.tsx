import React, { Component, CSSProperties, Children, cloneElement } from 'react'
import { isFunction } from 'lodash'
import Item from './Item'
import Input from './Input'
import { Consumer } from '../ThemeProvider'
import styled from 'styled-components'
import { GirdThemeData } from '../utils'
import GirdItem from './Item'

export interface IGirdProps {
    className?: string
    style?: CSSProperties
    theme?: GirdThemeData
    onPress?: (link?: string) => void
}

interface IGirdViewProps {
    girdTheme: GirdThemeData
}

const GirdView = styled.div<IGirdViewProps>`
    background: ${({ girdTheme }) => girdTheme.girdColor.toString()};
    ${({ girdTheme }) => girdTheme.padding.toString()};
    ${({ girdTheme, theme }) => girdTheme.borderRadius || theme.borderRadius};
`

export default class Gird extends Component<IGirdProps, any> {

    public static Item = Item

    public static Input = Input

    public render(): JSX.Element {
        const { className, style, theme } = this.props
        const { children } = this.props
        return (
            <Consumer>
                {
                    (init) => (
                        <GirdView
                            girdTheme={theme || init.theme.girdTheme}
                            className={className}
                            style={style}
                        >
                            {
                                Children.map(children, (i: any) => {
                                    if (i.type === GirdItem) {
                                        return cloneElement(i, {
                                            onPress: (link?: any) => {
                                                this.handelPress(i.props.onPress, link)
                                            }
                                        })
                                    } else {
                                        return i
                                    }
                                })
                            }
                        </GirdView>
                    )
                }
            </Consumer>

        )
    }

    private handelPress = (cb?: any, link?: any) => {
        const { onPress } = this.props
        if (isFunction(onPress)) {
            onPress(link)
        }
        if (isFunction(cb)) {
            cb(link)
        }
    }
}
