
import React, { Component } from 'react'
import { DatePicker } from 'antd'
import { Consumer } from '../ThemeProvider'
import { getUnit, transition } from '../utils'
import { Moment } from 'moment'
import styled from 'styled-components'

export interface ILDatePicker {
    className?: string
    defaultValue?: Moment
    defaultPickerValue?: Moment
    disabledTime?: (time: any) => void
    format?: string | string[]
    renderExtraFooter?: (mode: any) => React.ReactNode
    [value: string]: any
}

const EDatePicker = styled(DatePicker)`
    height: ${getUnit(32)};
    position: relative;
    width: 100%;

    &.active {
        // height: @height;

        input {
            /* @diff: 18 * @unit;
            top: @diff;
            height: calc(100% - @diff); */
        }
    }

    >div {
        height: 100%;
        width: 100%;
    }



    input {
        outline: none;
        height: 100% !important;
        width: 100%;
        position: relative;
        border: ${getUnit(1)} solid #e8e8e8;
        ${transition(0.5)}

        &:focus {
            /* border-color: @theme_color; */
            box-shadow: initial;
        }

        &:hover {
            /* border-color: @theme_color  !important; */
        }
    }
`

export default class LDatePicker extends Component<ILDatePicker, any> {
    public render(): JSX.Element {
        const props: any = this.props
        return (
            <Consumer>
                {
                    (init) => (
                        <EDatePicker
                            {...props}
                        />
                    )
                }
            </Consumer>
        )
    }
}
