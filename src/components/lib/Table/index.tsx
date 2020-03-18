import React, { Component } from 'react'
import { TableProps, ColumnProps } from 'antd/lib/table'
import styled, { css } from 'styled-components'
import { Table as RCTable } from 'antd'
import { Consumer } from '../ThemeProvider'
import { TableThemeData, Color, transition } from '../utils'
import { omit } from 'lodash'

export interface ITableColumns<T> extends ColumnProps<T> { }

export interface ITableProps extends TableProps<any> {
    className?: string
    dataSource: IValue[]
    theme?: TableThemeData
}

interface IRTableProps {
    tableTheme: TableThemeData
}

const RTable = styled(RCTable)<IRTableProps>`
    .ant-table table {
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
    }
    .ant-table-thead > tr:first-child > th:first-child{
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
    }
    .ant-table-thead > tr:first-child > th:last-child{
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
    }
    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
            background: ${({ tableTheme, theme }) => Color.setOpacity(tableTheme.activeColor || theme.primarySwatch, 0.3).toString()};
    }
    .ant-pagination-item, .ant-pagination-next,  .ant-pagination-prev {
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
        ${transition(0.3)}
        a {
            ${transition(0.3)}
        }
        :hover, :focus {
            border-color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
            a {
                color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
                border-color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
            }
        }
    }
    .ant-pagination-item-active {
        ${({ tableTheme, theme }) => {
            return css`border-color: ${tableTheme.activeColor || theme.primarySwatch};`
        }};
        a {
            color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
        }
    }
    .ant-pagination-item-link {
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
        ${({ tableTheme }) => {
            return tableTheme.border.toString();
        }};
    }

    .ant-pagination-options-quick-jumper input {
        ${({ tableTheme, theme }) => tableTheme.borderRadius || theme.borderRadius};
        :hover, :focus {
            box-shadow: none;
            border-color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
            a {
                color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
                border-color: ${({ tableTheme, theme }) => (tableTheme.activeColor || theme.primarySwatch)};
            }
        }
    }
`

export interface IValue {
    [name: string]: any
}
export default class Table extends Component<ITableProps, any> {

    public static defaultProps = {
        columns: [],
        dataSource: []
    }

    public render(): JSX.Element {
        const { className, theme } = this.props
        const props = omit(this.props, ['theme'])
        return (
            <Consumer>
                {
                    (init) => (
                        <RTable
                            {...props}
                            tableTheme={theme || init.theme.tableTheme}
                        />
                    )
                }
            </Consumer>

        )
    }
}
