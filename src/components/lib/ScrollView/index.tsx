import React, { Component, CSSProperties, createContext } from 'react'
import styled, { css } from 'styled-components'
import { isUndefined, isNil } from 'lodash'
import { getUnit } from '../utils'

export interface IScrollViewProps {
    height?: string | number
    className?: string
    style?: CSSProperties
    scrollY?: boolean
    scrollX?: boolean
}

interface IScrollViewBoxProps {
    scrollHeight?: number | string
    scrollY: boolean
    scrollX: boolean
}

const ScrollViewBox = styled.div<IScrollViewBoxProps>`
    overflow: hidden;
    ${({ scrollHeight }) => {
        if (!isNil(scrollHeight)) {
            return css`height: ${getUnit(scrollHeight)};`
        }
    }};
    -webkit-overflow-scrolling: touch;
    overflow-y: ${({ scrollY }) => scrollY ? 'auto' : 'hidden'};
    overflow-x: ${({ scrollX }) => scrollX ? 'auto' : 'hidden'};
`

export const { Consumer, Provider } = createContext({
    controller: null
})

export default class ScrollView extends Component<IScrollViewProps, any> {

    private controller: HTMLDivElement | null = null

    public state = {
        controller: null
    }

    public render(): JSX.Element {
        const { children, className, style, scrollY, scrollX, height } = this.props
        return (
            <Provider value={{
                ...this.state
            }}>
                <ScrollViewBox
                    scrollHeight={height}
                    ref={(e) => this.controller = e}
                    className={className}
                    scrollY={isUndefined(scrollY) ? true : scrollY}
                    scrollX={scrollX || false}
                    style={style}
                >
                    {children}
                </ScrollViewBox>
            </Provider>
        )
    }
    public componentDidMount() {
        this.setState({
            controller: this.controller
        })
    }
}
