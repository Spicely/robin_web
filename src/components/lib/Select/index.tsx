import React, { Component } from 'react'
import { Select as ReactSelect } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { isFunction, omit } from 'lodash'
import { SelectThemeData, getUnit, Color, transition } from '../utils'
import { Consumer } from '../ThemeProvider'
import Empty from '../Empty'
import Icon from '../Icon'
import styled, { createGlobalStyle, css } from 'styled-components'

const { OptGroup, Option } = ReactSelect

interface ISelectOptionsProps {
    value: string | number
    label: string
    disabled?: boolean
    color?: string
    children?: ISelectOptionsProps[]
}

export interface ISelectProps extends SelectProps<any> {
    className?: string
    options: ISelectOptionsProps[]
    noOptionsMessage?: string | JSX.Element
    theme?: SelectThemeData
}

const GlobalSelectDropdown = createGlobalStyle<IStyleProps>`
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background: ${({ selectTheme, theme }: any) => Color.setOpacity(selectTheme.selectColor || theme.primarySwatch, 0.6).toString()}
    }
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
        background: ${({ selectTheme, theme }: any) => Color.setOpacity(selectTheme.selectColor || theme.primarySwatch, 0.3).toString()}
    }
`

interface IStyleProps {
    selectTheme: SelectThemeData
}

const SelectIcon = styled(Icon) <{ iconRotate: boolean }>`
   ${({ iconRotate }) => {
        if (iconRotate) return css`transform: rotate(180deg);`
        else return css`transform: rotate(0deg);`
    }};
`

const SelectView = styled.div<IStyleProps>`
    height: ${({ selectTheme }) => getUnit(selectTheme.height)};
    .ant-select-focused.ant-select-multiple .ant-select-selector {
        box-shadow: none;
        border-color: ${({ selectTheme, theme }) => selectTheme.selectColor || theme.primarySwatch};
    }
    .ant-select {
        width: 100%;
        background: #fff;
        height: 100%;
        color: ${({ selectTheme }) => selectTheme.color.toString()};

        .ant-select-selector {
            ${({ selectTheme, theme }) => selectTheme.borderRadius || theme.borderRadius}
            ${({ selectTheme }) => selectTheme.border.toString()}
            outline: none;
            ${transition(0.5)}
        }
       
        &:not(.ant-select-disabled):hover .ant-select-selector {
            border-color: ${({ selectTheme, theme }) => selectTheme.selectColor || theme.primarySwatch};
        }

        &.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
            box-shadow: none;
            border-color: ${({ selectTheme, theme }) => selectTheme.selectColor || theme.primarySwatch};
            ${transition(0.5)}
        }
        .ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
            height: ${({ selectTheme }) => getUnit(selectTheme.height)};
            ${transition(0.5)}
        }
        .ant-select-single .ant-select-selector .ant-select-selection-item, .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
            line-height: ${({ selectTheme }) => getUnit(selectTheme.height)};
            font-size: ${({ selectTheme, theme }) => getUnit(selectTheme.fontSize || theme.fontSize)};
            ${transition(0.5)}
        }
        .ant-select-selection-placeholder {
            opacity: 1;
            color: ${({ selectTheme }) => Color.setOpacity(selectTheme.color, 0.65).toString()};
        }
    }
`

interface IState {
    value: any
    rotate: boolean
}

export default class Select extends Component<ISelectProps, IState> {

    constructor(props: ISelectProps) {
        super(props)
        this.state.value = this.props.value
    }

    public static getDerivedStateFromProps = (props: ISelectProps, state: IState) => {
        if(props.value !== state.value) {
            return {
                value: props.value
            }
        }
        return null
    }

    public static defaultProps: ISelectProps = {
        options: [],
        placeholder: '请选择数据',
        disabled: false
    }

    public state: IState = {
        value: undefined,
        rotate: false
    }

    public render(): JSX.Element {
        const { className, options, noOptionsMessage, theme, suffixIcon } = this.props
        const props = omit(this.props, ['className', 'value', 'onChange', 'options', 'notFoundContent', 'suffixIcon', 'onDropdownVisibleChange'])
        const { value, rotate } = this.state
        return (
            <Consumer>
                {
                    (val) => (
                        <SelectView
                            selectTheme={theme || val.theme.selectTheme}
                            className={className}
                        >
                            <GlobalSelectDropdown selectTheme={theme || val.theme.selectTheme} />
                            <ReactSelect
                                {...props}
                                value={value || undefined}
                                onChange={this.handleChange}
                                onDropdownVisibleChange={this.handleDropdownVisible}
                                notFoundContent={<Empty description={noOptionsMessage} image={null} />}
                                suffixIcon={
                                    suffixIcon || (
                                        <SelectIcon
                                            icon="ios-arrow-down"
                                            theme={theme ? theme.iconTheme : val.theme.selectTheme.iconTheme}
                                            iconRotate={rotate}
                                        />
                                    )
                                }

                            >
                                {
                                    options.map((i) => {
                                        if (i.children) {
                                            return (
                                                <OptGroup label={i.label} key={i.value}>
                                                    {
                                                        i.children.map((v) => {
                                                            return (
                                                                <Option value={v.value} key={v.value} disabled={v.disabled}>{v.label}</Option>
                                                            )
                                                        })
                                                    }
                                                </OptGroup>
                                            )
                                        } else {
                                            return <Option value={i.value} key={i.value} disabled={i.disabled}>{i.label}</Option>
                                        }
                                    })
                                }
                            </ReactSelect>
                        </SelectView>
                    )
                }
            </Consumer>

        )
    }

    private handleDropdownVisible = (open: boolean) => {
        const { onDropdownVisibleChange } = this.props
        this.setState({
            rotate: open
        })
        if (isFunction(onDropdownVisibleChange)) {
            onDropdownVisibleChange(open)
        }
    }

    private handleChange = (data: any, option: any) => {
        const { onChange } = this.props
        this.setState({
            value: data,
            rotate: false
        })
        if (isFunction(onChange)) {
            onChange(data, option)
        }
    }
}
