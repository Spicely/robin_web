import * as React from 'react'
import { omit } from 'lodash'
import Item, { IItemProps } from '../Item'
import Input, { IInputProps } from '../Input'

export interface IGirdInput extends IInputProps {
    title?: string
}


export default class GirdInput extends React.Component<IGirdInput & IItemProps, any> {

    public render(): JSX.Element {
        const { title } = this.props
        const otherProps = omit(this.props, ['className', 'title'])
        return (
            <Item
                {...this.props}
                title={title || ''}
                value={<Input {...otherProps} />}
            />
        )
    }
}
