
import React, { Component, Fragment } from 'react'
import { DatePicker } from 'antd'
import { omit } from 'lodash'
import styled, { createGlobalStyle } from 'styled-components'
import { Moment } from 'moment'
import { Consumer } from '../ThemeProvider'
import { getUnit, RangePickerThemeData, Color } from '../utils'

const { RangePicker } = DatePicker

export interface IRangePicker {
    className?: string
    defaultValue?: Moment
    defaultPickerValue?: Moment
    disabledTime?: (time: any) => void
    format?: string | string[]
    renderExtraFooter?: (mode: any) => React.ReactNode
    theme?: RangePickerThemeData
    [value: string]: any
}

interface IStyleProps {
    rangePickerTheme: RangePickerThemeData
}

const GlobalStyle = createGlobalStyle<IStyleProps>`
    .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
        ${({ rangePickerTheme, theme }: any) => {
            return rangePickerTheme.borderRadius || theme.borderRadius
        }}
        border-color: ${({ rangePickerTheme, theme }: any) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
    }

    .ant-picker-cell-inner {
        ${({ rangePickerTheme, theme }: any) => {
            return rangePickerTheme.borderRadius || theme.borderRadius
        }}
    }

    .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
        background: ${({ rangePickerTheme, theme }: any) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
    }

    .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
        background: ${({ rangePickerTheme, theme }: any) => Color.setOpacity((rangePickerTheme.hoverColor || theme.primarySwatch), 0.3).toString()};
    }

    .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
        background: ${({ rangePickerTheme, theme }: any) => Color.setOpacity((rangePickerTheme.hoverColor || theme.primarySwatch), 0.3).toString()};
    }

    .ant-btn-primary {
        font-size: ${({theme}: any) => getUnit(theme.fontSize)};
        background: ${({ rangePickerTheme, theme }: any) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
        ${({ rangePickerTheme, theme }: any) => {
            return rangePickerTheme.borderRadius || theme.borderRadius
        }}
        border-color: ${({ rangePickerTheme, theme }: any) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
        :hover {
            background:  ${({ rangePickerTheme, theme }: any) => Color.setOpacity((rangePickerTheme.hoverColor || theme.primarySwatch), 0.6).toString()};
            ${({ rangePickerTheme, theme }: any) => {
                return rangePickerTheme.borderRadius || theme.borderRadius
            }}
            border-color: ${({ rangePickerTheme, theme }: any) => Color.setOpacity((rangePickerTheme.hoverColor || theme.primarySwatch), 0.6).toString()};
        }
    }
`

const Picker = styled(RangePicker) <IStyleProps>`
    height: ${({ rangePickerTheme }) => getUnit(rangePickerTheme.height)};
    position: relative;
    width: 100%; 
    ${({ rangePickerTheme, theme }) => {
        return rangePickerTheme.borderRadius || theme.borderRadius
    }}
    &:hover {
        border-color: ${({ rangePickerTheme, theme }) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
    }
    .ant-picker-active-bar{
        background: ${({ rangePickerTheme, theme }) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
    }
    &.ant-picker-focused {
        border-color: ${({ rangePickerTheme, theme }) => (rangePickerTheme.hoverColor || theme.primarySwatch).toString()};
        box-shadow: initial;
    }
`

export default class LRangePicker extends Component<IRangePicker, any> {
    public render(): JSX.Element {
        const { theme } = this.props
        const props = omit(this.props, ['theme', 'placeholder'])
        return (
            <Consumer>
                {
                    (init) => (
                        <Fragment>
                            <GlobalStyle rangePickerTheme={theme || init.theme.rangePickerTheme} />
                            <Picker
                                {...props}
                                rangePickerTheme={theme || init.theme.rangePickerTheme}
                            />
                        </Fragment>
                    )
                }
            </Consumer>
        )
    }
}
