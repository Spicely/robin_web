import React, { Component } from 'react'
import styled from 'styled-components'
import { omit } from 'lodash'
import { getClassName } from '../utils'
import Menu, { IMenuProps } from '../Menu'
import { iconType } from '../Icon'
import Image from '../Image'

interface IIconImage {
    type: 'image' | 'icon'
    name: string | iconType
    initColor?: string
    highlight?: string
}

export interface ILMenuItem {
    className?: string
    field?: string | number
    label: string | JSX.Element
    icon?: IIconImage
    selected?: number | string
}

export interface ILayoutMenuOptionsItem {
    groupTitle?: string | JSX.Element
    item?: ILMenuItem
    field?: string
    chirdren?: ILMenuItem[]
    icon?: IIconImage
    [name: string]: any
}

export interface ILayoutMenuOptions extends IMenuProps {
    items: ILayoutMenuOptionsItem[]
    className?: string
    fieldToUrl?: boolean
}

export interface ILayoutProps {
    logoView?: JSX.Element
    pageNav?: JSX.Element
    menuOptions: ILayoutMenuOptions
    baseUrl?: string
    menuChange?: (val: string | number) => void
}

const LayoutDiv = styled.div`
    height: 100vh;
`

const LayoutNav = styled.div`
    position: relative;
    z-index: 9;
`

const LayoutView = styled.div`
    padding: 0;
    overflow: auto;
    background: #f5f7f9;
`

export default class Layout extends Component<ILayoutProps, any> {
    public static defaultProps = {
        menuOptions: {
            items: []
        },
    }

    public render(): JSX.Element {
        const { children, menuOptions, logoView, pageNav, menuChange } = this.props
        const options = omit(menuOptions, ['items', 'className'])
        return (
            <LayoutDiv className="flex">
                <div className="flex_column">
                    <div>
                        {logoView}
                    </div>
                    <Menu
                        {...options}
                        className={`flex_1 ${menuOptions.className || ''}`}
                        onChange={menuChange}
                    >
                        {this.getMenuView()}
                    </Menu>
                </div>
                <div className="flex_column flex_1">
                    <LayoutNav>
                        {pageNav}
                    </LayoutNav>
                    <LayoutView className="flex_1">
                        {children}
                    </LayoutView>
                </div>
            </LayoutDiv>
        )
    }

    private getMenuView(): JSX.Element[] {
        const { menuOptions, baseUrl } = this.props
        return menuOptions.items.map((item: ILayoutMenuOptionsItem, index: number): JSX.Element => {
            let icon: any = ''
            if (item.icon && item.icon.type === 'icon') {
                icon = item.icon.name
            } else if (item.icon && item.icon.type === 'image') {
                icon = <Image className={getClassName('layout_img__icon')} src={(baseUrl || '') + item.icon.name} />
            }
            if (item.groupTitle) {
                return (
                    <Menu.Group
                        title={item.groupTitle}
                        field={item.field || index}
                        icon={icon}
                        key={`${item.field || 'group'}_${index}`}
                    >
                        {
                            item.chirdren && item.chirdren.map((i) => {
                                const options = omit(i, ['label', 'icon'])
                                // tslint:disable-next-line: no-shadowed-variable
                                let icon: any = ''
                                if (i.icon && i.icon.type === 'icon') {
                                    icon = i.icon.name
                                } else if (i.icon && i.icon.type === 'image') {
                                    icon = <Image className={getClassName('layout_img__icon')} src={(baseUrl || '') + i.icon.name} />
                                }
                                return (
                                    <Menu.Item
                                        key={`${item.groupTitle}_${index}_${i.field || 'item'}`}
                                        {...options}
                                        icon={icon}
                                        iconInitColor={item.icon && item.icon.initColor}
                                        iconHighlight={item.icon && item.icon.highlight}
                                    >
                                        {i.label}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu.Group>
                )
            }
            if (item.item) {
                const options = omit(item.item, ['label', 'icon'])
                // tslint:disable-next-line: no-shadowed-variable
                let icon: any = ''
                if (item.item.icon && item.item.icon.type === 'icon') {
                    icon = item.item.icon.name
                } else if (item.item.icon && item.item.icon.type === 'image') {
                    icon = <Image className={getClassName('layout_img__icon')} src={(baseUrl || '') + item.item.icon.name} />
                }
                return (
                    <Menu.Item
                        {...options}
                        key={`${item.item.label}_${index}`}
                        icon={icon}
                        iconInitColor={item.item.icon && item.item.icon.initColor}
                        iconHighlight={item.item.icon && item.item.icon.highlight}
                    >
                        {item.item.label}
                    </Menu.Item>
                )
            }
            throw new Error('At least need item')
        })
    }
}
