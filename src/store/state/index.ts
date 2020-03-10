
export interface IGoodsData {
    goods_id: number
    goods_name: string
    goods_price: number
    platform_price: number
    goods_number: number
    image_url: string
}

export namespace IGlobal {
    export interface IHomeData {
        goods_data: IGoodsData[]
    }
}

export interface IInitState {
    homeData: IGlobal.IHomeData
}