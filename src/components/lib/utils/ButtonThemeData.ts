import { isNumber } from 'lodash'
import Color from './Color'
import IconThemeData from './IconThemeData'

interface IButtonThemeDataProps {
    buttonColor?: Color
    disabledColor?: Color
    errorColor?: Color
    disabledFontColor?: Color
    disabledBorderColor?: Color
    borderRadius?: number | string
    height?: number
    iconTheme?: IconThemeData
}

export default class ButtonThemeData {

    constructor(data?: IButtonThemeDataProps) {
        if (data) {
            if (data.buttonColor) this.buttonColor = data.buttonColor
            if (data.errorColor) this.errorColor = data.errorColor
            if (data.disabledColor) this.disabledColor = data.disabledColor
            if (data.disabledFontColor) this.disabledFontColor = data.disabledFontColor
            if (data.disabledBorderColor) this.disabledBorderColor = data.disabledBorderColor
            if (data.iconTheme) this.iconTheme = data.iconTheme
            if (isNumber(data.height)) this.height = data.height
            if (isNumber(data.borderRadius)) this.borderRadius = data.borderRadius
        }
    }

    public buttonColor?: Color

    public errorColor?: Color

    public height: number = 32

    public disabledColor: Color = Color.fromRGB(223, 216, 216)

    public disabledFontColor: Color = Color.fromRGBO(0, 0, 0, 0.25)

    public disabledBorderColor: Color = Color.fromRGB(223, 216, 216)

    public borderRadius?: number | string

    public iconTheme: IconThemeData = new IconThemeData({
        size: 18,
        color: Color.fromRGB(255, 255, 255)
    })
}