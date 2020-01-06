import React, { Component } from 'react'
import { ScrollView, NavBar, Image, MobileLayout, Toast } from 'components'
import { http, imgUrl } from '../../utils'
import { getUnit } from 'src/components/lib/utils'
import { Link } from 'react-router-dom'

interface IState {
    data: any[]
}

export default class Home extends Component<any, IState> {

    public state: IState = {
        data: []
    }

    public render(): JSX.Element {
        const { data } = this.state
        return (
            <MobileLayout
                style={{
                    padding: `0 ${getUnit(10)}`
                }}
                appBar={
                    <NavBar
                        left={null}
                        title="涨乐乐"
                        titleCenter
                        fixed
                    />
                }
            >
                {
                    data.map((i, k) => (
                        <Link to={`/news/${i.id}`} key={k}>
                            <Image
                                src={imgUrl + i.img}
                                style={{
                                    height: getUnit(160),
                                    width: '100%',
                                    marginTop: getUnit(10),
                                    borderRadius: getUnit(5)
                                }}
                            />
                        </Link>
                    ))
                }

            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private getData = async () => {
        try {
            const des = await http('news/is_user')
            console.log(des)
            const data = await http('news/index')
            this.setState({
                data: data.msg
            })
        } catch (e) {
            Toast.info({
                content: '服务器繁忙,请稍后再试',
            })
        }
    }
}