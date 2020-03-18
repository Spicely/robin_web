
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

    export interface AppData {
        siteName: string
        siteTitle: string
        minPirce: number
        maxPrice: number
        initPrice: number
        months: string
        initMonth: string
        serviceRate: string
        auditFee: number
        repaymentDay: number
        autoRefuse: boolean
        refuseDay: number
        refuseWaitDay: number
        smsSign: string
        user: string
        createdAt: number
        updatedAt: number
        id: string
    }

    export interface UserAddressList {
        address_id: number
        address_name: string
        address_phone: string
        address_province: string
        address_city: string
        address_area: string
        address_info: string
        address_default: number
        user_id: number
        created_time: number
    }
}

export interface IInitState {
    homeData: IGlobal.HomeData
    userInfo: IGlobal.UserInfo
    userAddressList: IGlobal.UserAddressList
    appData: IGlobal.AppData
}