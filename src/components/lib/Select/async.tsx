import React, { Component } from 'react'
import Axios from 'axios'
import { isFunction } from 'lodash'
import { SelectThemeData } from '../utils'
import { Consumer } from '../ThemeProvider'
import Empty from '../Empty'
import Select from './index'

interface ISelectOptionsProps {
    value: string | number
    label: string
    disabled?: boolean
    color?: string
}

export interface ISelectProps {
    className?: string
    onChange?: (value: string | number) => void
    placeholder?: string
    isSearchable?: boolean
    multiple?: boolean
    disabled?: boolean
    url: string
    noOptionsMessage?: string | JSX.Element
    theme?: SelectThemeData
    withCredentials?: boolean
}

interface IState {
    value: any
    options: ISelectOptionsProps[]
    loading: boolean
}

export default class AsyncSelect extends Component<ISelectProps, IState> {

    public static defaultProps: ISelectProps = {
        url: '',
        placeholder: '请选择数据',
        isSearchable: false,
        multiple: false,
        disabled: false,
        withCredentials: true,
    }

    public state: IState = {
        value: undefined,
        options: [],
        loading: false,
    }

    public render(): JSX.Element {
        const { className, placeholder, noOptionsMessage, multiple, disabled, theme } = this.props
        const { options, loading, value } = this.state
        return (
            <Consumer>
                {
                    (val) => (
                        <Select
                            options={options}
                            value={value}
                            className={className}
                            theme={theme}
                            mode={multiple ? 'multiple' : undefined}
                            disabled={disabled}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            loading={loading}
                            placeholder={placeholder}
                            notFoundContent={<Empty description={noOptionsMessage} image={null} />}
                        />
                    )}
            </Consumer>

        )
    }

    private handleFocus = () => {
        const { url, withCredentials } = this.props
        const { options } = this.state
        if (url && !options.length) {
            this.setState({
                loading: true
            })
            Axios.post(url, {}, {
                timeout: 25000,
                withCredentials,
            }).then(({ data }) => {
                this.setState({
                    loading: false,
                    options: data.data
                })
            })
        }
    }

    private handleChange = (data: any) => {
        const { onChange } = this.props
        this.setState({
            value: data
        })
        if (isFunction(onChange)) {
            onChange(data)
        }
    }
}
