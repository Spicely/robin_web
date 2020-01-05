import React, { Component, CSSProperties } from 'react'
import styled from 'styled-components'
import ScrollView from '../ScrollView'
import { getClassName, getUnit } from '../utils'

interface IMobileLayoutViewProps {
    viewHeight?: number | string
}

const MobileLayoutView = styled.div<IMobileLayoutViewProps>`
    height: ${({ viewHeight }) => getUnit(viewHeight, '100%')};
    overflow: hidden;
`

interface IMobileLayoutProps {
    className?: string
    appBar?: JSX.Element
    height?: number | string
    style?: CSSProperties
    footer?: JSX.Element
    onGetData?: (success: () => void) => void
    scrollY?: boolean
    scrollX?: boolean
    onEndReachedThreshold?: number
}

interface IState {

}

export default class MobileLayout extends Component<IMobileLayoutProps, IState> {

    public render(): JSX.Element {
        const { className, appBar, children, height, style, footer, onGetData, scrollY, scrollX, onEndReachedThreshold } = this.props
        return (
            <MobileLayoutView
                viewHeight={height}
                className={getClassName('flex_column', className)}
                style={style}
            >
                {appBar}
                <ScrollView
                    className="flex_1"
                    onGetData={onGetData}
                    scrollY={scrollY}
                    scrollX={scrollX}
                    onEndReachedThreshold={onEndReachedThreshold}
                >
                    {children}
                </ScrollView>
                {footer}
            </MobileLayoutView>
        )
    }

}