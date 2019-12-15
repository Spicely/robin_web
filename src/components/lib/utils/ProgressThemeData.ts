import { isNil } from 'lodash'
import Color from './Color'

interface IProgressThemeDataProps {
    progressColor?: Color
    height?: number | string
    width?: number | string
    borderRadius?: number
    successColor?: Color
}

export default class ProgressThemeData {

    constructor(data?: IProgressThemeDataProps) {
        if (data) {
            if (data.progressColor) this.progressColor = data.progressColor
            if (data.successColor) this.successColor = data.successColor
            if (!isNil(data.height)) this.height = data.height
            if (!isNil(data.width)) this.width = data.width
            if (!isNil(data.borderRadius)) this.borderRadius = data.borderRadius
        }
    }

    public progressColor?: Color

    public successColor?: Color

    public borderRadius?: number

    public height: number | string = 5

    public width?: number | string
}