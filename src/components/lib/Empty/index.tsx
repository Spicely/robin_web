import React, { Component } from 'react'
import { isUndefined, isNull, isString } from 'lodash'
import { Consumer as ThemeConsumer } from '../ThemeProvider'
import { Consumer, RIGHTULR } from '../ConfigProvider'
import { getClassName, getUnit } from '../utils'
import Image from '../Image'
import styled from 'styled-components'

export interface IEmptyProps {
    className?: string
    description?: string | JSX.Element
    descClassName?: string
    image?: string | JSX.Element | null
    imageClassName?: string
    center?: boolean
}


const EmptyView = styled.div`
    text-align: center;
`

const DesView = styled.div`
    color: ${({ theme }) => theme.disabledColor};
`

const EmptyImage = styled(Image)`
    width: ${getUnit(120)};
    margin-bottom: ${getUnit(8)};
    margin-top: ${getUnit(5)};
`
export default class Empty extends Component<IEmptyProps, any> {

    public static IMAGE_RIGHT = RIGHTULR

    public render(): JSX.Element {
        const { center, className, description, descClassName, image, imageClassName } = this.props
        return (
            <ThemeConsumer>
                {
                    (init) => (
                        <Consumer>
                            {
                                (value) => {
                                    const emptyProps: any = value.emptyProps
                                    return (

                                        <EmptyView className={getClassName(`${(center || emptyProps.center) ? 'flex_center' : ''}`, className || emptyProps.className)}>
                                            <div >
                                                {isNull(image) ? null : isString(image || emptyProps.image) ? <EmptyImage className={getClassName( imageClassName || emptyProps.imageClassName)} src={image || emptyProps.image} /> : image}
                                                <DesView className={descClassName || emptyProps.descClassName}>
                                                    {isUndefined(description) ? emptyProps.description : description}
                                                </DesView>
                                            </div>
                                        </EmptyView>
                                    )
                                }
                            }
                        </Consumer>
                    )
                }
            </ThemeConsumer>
        )
    }
}
