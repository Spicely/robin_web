import { isFunction } from 'lodash'
import { Toast } from 'components'
import CryptoJS from 'crypto-js'
import axois, { AxiosRequestConfig } from 'axios'
import { isFormData } from 'muka'

interface IValue {
    [name: string]: any
}

export const baseUrl = 'http://n.public.5151fw.com/'
export const imgUrl = 'http://n.public.5151fw.com/'
export const version = '1.0.8'

export interface IRresItem<T = any> {
    msg: string
    status: number
    data: T
}
export interface IRresItems<T = any> {
    msg: string
    status: number
    data: Array<T>
}

const instance = axois.create({
    baseURL: baseUrl,
    timeout: 25000,
    method: 'POST',
    // withCredentials: true,
})

export const encrypt = (data: IValue) => {
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'encrypt_A5ECC', {
    //     iv: '1C599FEWDD22EEC2',
    //     mode: CryptoJS.mode.CFB,
    //     padding: CryptoJS.pad.AnsiX923
    // })
    // return encrypted.toString()
    return data
}

export const decrypt = (data: string, key: any, iv: any) => {
    const decrypt = CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.AnsiX923
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

export const deviaDecrypt = (data: string) => {
    const decrypt = CryptoJS.AES.decrypt(data, 'devia', {
        iv: '1C599FE5BA22EEC2',
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

instance.interceptors.response.use(async function (res: any) {
    // const devia = deviaDecrypt(res.data.devia)
    // res.data = JSON.parse(decrypt(res.data.value, res.data.secret, devia))
    if (res.status === 200 && (res.data.code === 1 || res.data.code == 2)) {
        return res.data
    } else {
        return Promise.reject(res.data)
    }
})

const http = function (url: string, params?: any, config?: AxiosRequestConfig): any {
    const token = localStorage.getItem('token')
    if (config?.method === 'GET') {
        return instance(`${url}`, {
            ...config,
            params: {
                ...params,
                userId: token
            }
        })
    }
    if (isFormData(params)) {
        params.append('userId', token)
        return instance(`${url}`, {
            ...config,
            data: params
        })
    }
    return instance(`${url}`, {
        ...config,
        data: {
            ...params,
            userId: token
        }
    })
}

export default http


export class httpUtils {
    public static verify(data: IRresItem | IRresItems, callback?: (data: any) => void) {
        if (data.status !== 200) {
            Toast.info({
                content: data.msg
            })
            return
        }
        if (isFunction(callback)) callback(data.data)
    }
}