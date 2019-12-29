import Color from './Color'
import Padding from './Padding'
import IconThemeData from './IconThemeData'

interface IItemThemeDataProps {
    itemColor?: Color
    height?: number | string
    minHeight?: number | string
    padding?: Padding
    titleColor?: Color
    rightColor?: Color
    iconTheme?: IconThemeData
    dividerColor?: Color
}

export default class ItemThemeData {

    constructor(data?: IItemThemeDataProps) {
        if (data) {
            if (data.itemColor) this.itemColor = data.itemColor
            if (data.height) this.height = data.height
            if (data.minHeight) this.minHeight = data.minHeight
            if (data.padding) this.padding = data.padding
            if (data.titleColor) this.titleColor = data.titleColor
            if (data.rightColor) this.rightColor = data.rightColor
            if (data.iconTheme) this.iconTheme = data.iconTheme
            if (data.dividerColor) this.dividerColor = data.dividerColor
        }
    }

    public itemColor: Color = Color.fromRGBO(255, 255, 255, 1)

    public height?: number | string

    public titleColor: Color = Color.fromRGB(51, 51, 51)

    public rightColor: Color = Color.fromRGB(136, 136, 136)

    public minHeight: number | string = 50

    public padding: Padding = Padding.symmetric({ vertical: 0, horizontal: 10 })

    public dividerColor?: Color

    public iconTheme: IconThemeData = new IconThemeData({
        color: Color.fromRGB(51, 51, 51)
    })
}