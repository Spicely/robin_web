
export interface IGoodsData {
    goods_id: number
    goods_name: string
    goods_price: number
    platform_price: number
    goods_number: number
    image_url: string
}

export namespace IGlobal {
    export interface HomeData {
        goods_data: IGoodsData[]
    }
    export interface UserInfo {
        user_id: number
        user_name: string
        user_nickname: string
        user_sex: number
        user_image: number
        user_phone: string
        wx_headimg: string
        wx_openid: string
        bd_headimg: string
        bd_openid: string
        code: string
        created_time: number
        login_key: string
        last_login_time: number
        remcd: string
        cny: string
        price: string
    }

    export interface UserAddressList {

    }
}

export interface IInitState {
    homeData: IGlobal.HomeData
    userInfo: IGlobal.UserInfo
    userAddressList: IGlobal.UserAddressList
}