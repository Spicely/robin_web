import { isNumber } from 'lodash'
import Color from './Color'
import NavBarThemeData from './NavBarThemeData'

interface IDialogThemeDataProps {
    dialogColor?: Color
    navBarTheme?: NavBarThemeData
    borderRadius?: number
    width?: number | string
    height?: number | string
}

export default class DialogThemeData {

    constructor(data?: IDialogThemeDataProps) {
        if (data) {
            if (data.dialogColor) this.dialogColor = data.dialogColor
            if (data.navBarTheme) this.navBarTheme = data.navBarTheme
            if (isNumber(data.borderRadius)) this.borderRadius = data.borderRadius
            if (data.height) this.height = data.height
            if (data.width) this.width = data.width
        }
    }

    public dialogColor: Color = Color.fromRGBO(255, 255, 255, 1)

    public width: number | string = 600

    public height: number | string = 100

    public borderRadius?: number

    public navBarTheme: NavBarThemeData = new NavBarThemeData({
        navBarColor: Color.fromRGB(255, 255, 255)
    })
}