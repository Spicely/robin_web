
export interface ISoodsData {
    goods_id: number
    goods_name: string
    goods_price: number
    platform_price: number
    goods_number: number
    image_url: string
    goods_contents: string
}

export interface IGoodsData {
    goods_id: number
    goods_name: string
    goods_class_ids: string
    goods_price: number
    platform_price: number
    goods_number: number
    goods_service_tags: string
    goods_discount: number
    start_time: number
    image_url: string
}

export namespace IGlobal {
    export interface HomeData {
        goods_data: IGoodsData[]
    }
    export interface ShopData {
        goods_data: ISoodsData[]
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
        realname: string
        realcard: string
        bd_headimg: string
        bd_openid: string
        buyprice: string
        code: string
        created_time: number
        login_key: string
        last_login_time: number
        remcd: string
        cny: string
        price: string
        kind: string
    }

    export interface IBanner {
        banner_id: number
        banner_title: string
        banner_image_id: number
        banner_type_id: number
        banner_href: string
        banner_state: number
        banner_index: number
        article_id: number
        created_time: number
        image_id: number
        image_title: string
        image_size: string
        image_type: string
        image_class: number
        image_url: string
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

    export interface DefaultAddr {
        address_id?: number
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

    export interface Config {
        website_id: number
        website_title: string
        price: string
        change_time: number
    }
}

export interface IInitState {
    homeData: IGlobal.HomeData
    userInfo: IGlobal.UserInfo
    userAddressList: IGlobal.UserAddressList
    defaultAddr: IGlobal.DefaultAddr
    banner: IGlobal.IBanner[]
    selected: number
    shopData: IGlobal.ShopData
    config: IGlobal.Config
}