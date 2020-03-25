import Color from './Color'
import Padding from './Padding'
import BorderRadius from './BorderRadius'

interface IGirdThemeDataProps {
    girdColor?: Color
    padding?: Padding
    borderRadius?: BorderRadius
}

export default class GirdThemeData {

    constructor(data?: IGirdThemeDataProps) {
        if (data) {
            if (data.girdColor) this.girdColor = data.girdColor
            if (data.padding) this.padding = data.padding
            if (data.borderRadius) this.borderRadius = data.borderRadius
        }
    }

    public girdColor: Color = Color.fromRGB(255, 255, 255)

    public padding: Padding = Padding.all(0)

    public borderRadius?: BorderRadius

}