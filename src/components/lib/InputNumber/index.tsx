import React, { Component, MouseEvent } from 'react'
import { isFunction, isNumber } from 'lodash'
import styled from 'styled-components'
import { Consumer } from '../ThemeProvider'
import { getClassName, prefix, IconThemeData, getUnit, ButtonThemeData } from '../utils'
import Button from '../Button'
import Icon, { iconType } from '../Icon'

export interface IInputNumberProps {
    className?: string
    border?: boolean
    value?: number
    min?: number
    max?: number
    addIcon?: iconType
    removeIcon?: iconType
    onChange?: (val: number, e: MouseEvent<HTMLButtonElement>) => void
}

const btnTheme = new ButtonThemeData({
    height: 25,
    minWidth: 25,
})

const InputNumberView = styled.div`
    input {
        background: #f6f6f6;
        height: ${getUnit(25)};
        margin: 0;
        padding: 0;
        width: ${getUnit(40)};
        text-align: center;
        border: 0;
        border-radius: ${getUnit(3)};
        outline: none;

        &::-webkit-outer-spin-button {
            -webkit-appearance: none !important;
        }

        &::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
        }
    }
`

const prefixClass = 'input_number'

export default class InputNumber extends Component<IInputNumberProps, any> {
    public constructor(props: IInputNumberProps) {
        super(props)
        this.state.val = props.value || 0
    }

    public static getDerivedStateFromProps(nextProps: IInputNumberProps, prevState: any) {
        if (nextProps.value !== prevState.value) {
            return {
                value: nextProps.value
            }
        }
        return null
    }

    public static defaultProps: IInputNumberProps = {
        border: true,
        addIcon: 'md-add',
        removeIcon: 'md-remove'
    }

    public state = {
        val: 0
    }

    public render(): JSX.Element {
        const { className, value, border, addIcon, removeIcon } = this.props
        const { val } = this.state
        return (
            <Consumer>
                {
                    (init) => (
                        <InputNumberView className={getClassName(`${prefixClass}${border ? ' ' + prefix + 'border' : ''} flex`, className)} >
                            <Button onClick={this.handleReduce} theme={btnTheme}><Icon icon={removeIcon} theme={new IconThemeData({ size: 12 })} /></Button>
                            <input type="number" onChange={this.handleChange} value={isNumber(value) ? value : val} />
                            <Button onClick={this.handlePlus} theme={btnTheme}><Icon icon={addIcon} theme={new IconThemeData({ size: 12 })} /></Button>
                        </InputNumberView>
                    )
                }
            </Consumer>
        )
    }

    private handleChange = (e: any) => {
        const { onChange, min, max } = this.props
        let val = Number(e.target.value)
        if (isNumber(min) && isNumber(max)) {
            val = val > max ? max : val < min ? min : val
        }
        if (isNumber(min) && !isNumber(max)) {
            val = val < min ? min : val
        }
        if (!isNumber(min) && isNumber(max)) {
            val = val > max ? max : val
        }
        this.setState({
            val
        })
        if (isFunction(onChange)) {
            onChange(val, e)
        }
        return

    }

    private handleReduce = (e: MouseEvent<HTMLButtonElement>) => {
        const { value, onChange, min } = this.props
        if (isNumber(value)) {
            if (isFunction(onChange)) {
                const val = value - 1
                if (isNumber(min)) {
                    onChange(val < min ? min : val, e)
                } else {
                    onChange(val, e)
                }
            }
        } else {
            const { val } = this.state
            const stateVal = val - 1
            if (isNumber(min)) {
                this.setState({
                    val: stateVal < min ? min : stateVal
                })
            } else {
                this.setState({
                    val: stateVal
                })
            }
        }
    }

    private handlePlus = (e: MouseEvent<HTMLButtonElement>) => {
        const { value, onChange, max } = this.props
        if (isNumber(value)) {
            if (isFunction(onChange)) {
                const val = value + 1
                if (max) {
                    onChange(val > max ? max : val, e)
                } else {
                    onChange(val, e)
                }
            }
        } else {
            const { val } = this.state
            const stateVal = val + 1
            if (isNumber(max)) {
                this.setState({
                    val: stateVal > max ? max : stateVal
                })
            } else {
                this.setState({
                    val: stateVal
                })
            }
        }
    }
}
