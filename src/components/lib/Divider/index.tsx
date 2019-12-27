import React, { Component } from 'react'
import styled, { css, CSSProperties } from 'styled-components'
import { getUnit } from '../utils'

type IType = 'horizontal' | 'vertical'

export interface IDividerProps {
    className?: string
    width?: string
    height?: string
    color?: string
    type?: IType
    style?: CSSProperties
}

interface IDiviProps {
    vColor?: string
    vType?: IType
    vWidth?: string | number
    vHeight?: string | number
}

const Divi = styled.div<IDiviProps>`
    ${({ vType, vWidth, vHeight }) => {
        if (vType === 'horizontal') {
            return css`width: ${getUnit(vWidth, '100%')};height: ${getUnit(vHeight, 1)};`
        } else {
            return css`width:${getUnit(vWidth, 1)};height: ${getUnit(vHeight, '100%')};`
        }
    }}
    background: ${({ vColor, theme }) => vColor || theme.dividerColor};
`

export default class Divider extends Component<IDividerProps, any> {

    public static defaultProps: IDividerProps = {
        type: 'vertical'
    }

    public render(): JSX.Element {
        const { className, width, height, color, type } = this.props
        return (
            <Divi
                className={className}
                vType={type}
                vWidth={width}
                vHeight={height}
                vColor={color}
            />
        )
    }
}
