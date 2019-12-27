import React, { Component } from 'react'
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
}

interface IState {

}

export default class MobileLayout extends Component<IMobileLayoutProps, IState> {

    public render(): JSX.Element {
        const { className, appBar, children, height } = this.props
        return (
            <MobileLayoutView
                viewHeight={height}
                className={getClassName('flex_column', className)}
            >
                {appBar}
                <ScrollView
                    className="flex_1"
                >
                    {children}
                </ScrollView>
            </MobileLayoutView>
        )
    }

}