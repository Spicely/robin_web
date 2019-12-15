import { isNil } from 'lodash'
import { getUnit } from './index'

interface ISymmetric {
    horizontal?: number | string
    vertical?: number | string
}

export default class Padding {

    public static all(num: number | string): Padding {
        return `padding: ${getUnit(num)};`
    }

    public static symmetric(options: ISymmetric): Padding {
        if (!isNil(options.horizontal) && !isNil(options.vertical)) {
            return `padding: ${getUnit(options.vertical)} ${getUnit(options.horizontal)};`
        }
        if (!isNil(options.horizontal)) {
            return `padding-left: ${getUnit(options.horizontal)}; padding-right: ${getUnit(options.horizontal)};`
        }
        if (!isNil(options.vertical)) {
            return `padding-top: ${getUnit(options.vertical)}; padding-bottom: ${getUnit(options.vertical)};`
        }
        return ``
    }

}