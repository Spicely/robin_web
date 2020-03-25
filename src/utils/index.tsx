import React, { Component } from 'react'
import { Image } from 'components'
import { getUnit } from 'src/components/lib/utils'

export { default as http, baseUrl, imgUrl } from './axios'
export class Empty extends Component {
    render() {
        return (
            <div style={{ marginTop: getUnit(100) }}>
                <div className="flex_center">
                    <Image src={require('../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                </div>
                <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>您的购物车有点寂寞</div>
            </div>
        )
    }
}
