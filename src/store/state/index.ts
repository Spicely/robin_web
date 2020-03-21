
export interface IGoodsData {
    goods_id: number
    goods_name: string
    goods_price: number
    platform_price: number
    goods_number: number
    image_url: string
}

interface IUserInfo {
    marriage: string
    education: string
    industry: string
    nagai: string
    relationName: string
    relationPhone: string
    relationQ: string
    relationNameQ: string
    relationPhoneQ: string
    bankName: string
    bankCard: string
    bankPhone: string
    price: number
    cardFront: string
    cardVerso: string
    name: string
    cardNumber: string
    status: 1 | 2 | 3
    createdAt: number
    updatedAt: number
    id: string
}

interface IOrder {
    status: number
    describeStatus: string
    cashPrice: number
    cashStatus: number
    autograph: string
    user: string
    adminUser: string
    price: number
    term: number
    purpose: string
    orderId: string
    repayPrice: number
    createdAt: number
    updatedAt: number
    id: string
}

export namespace IGlobal {
    export interface HomeData {
        goods_data: IGoodsData[]
    }
    export interface UserInfo {
        status: boolean
        userInfo?: IUserInfo
        pirce: number
        adminUser: string
        phone: string
        createdAt: number
        updatedAt: number
        id: string
        order?: IOrder
    }

    export interface AppData {
        siteName: string
        siteTitle: string
        minPirce: number
        maxPrice: number
        initPrice: number
        months: number[]
        initMonth: number
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
        about: string
        serviceLink: string
        serviceCode: string
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
    selected: number
}