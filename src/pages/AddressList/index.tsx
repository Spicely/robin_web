import React, { Component } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Radio, Image } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { ButtonThemeData, BorderRadius, Color, getUnit, ItemThemeData } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERADDRESSLIST_DATA, SET_USERADDRESS_DATA } from 'src/store/actions'

interface IState {
}

interface IProps extends RouteComponentProps<any> {
    userAddressList: IGlobal.UserAddressList[]
}

const buttonTheme = new ButtonThemeData({
    width: '80%',
    borderRadius: BorderRadius.all(20),
    buttonColor: Color.fromRGB(0, 0, 0)
})

const itemTheme = new ItemThemeData({
    minHeight: 60
})

class AddressList extends Component<IProps & DispatchProp, IState> {

    public state: IState = {

    }

    public render(): JSX.Element {
        const { userAddressList, match } = this.props
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        onBack={this.handleBack}
                        title="编辑地址"
                        titleCenter
                    />
                }
                emptyElement={
                    <div style={{ marginTop: getUnit(100) }}>
                        <div className="flex_center">
                            <Image src={require('../../assets/v2_q5w0tr.png')} style={{ height: getUnit(77), width: getUnit(77) }} />
                        </div>
                        <div className="flex_center" style={{ color: 'rgba(163, 163, 163, 1)', fontSize: getUnit(15), lineHeight: getUnit(40) }}>没有数据</div>
                    </div>
                }
                footer={
                    <div className="flex_center" style={{ marginBottom: getUnit(10) }}>
                        <Button
                            theme={buttonTheme}
                            mold="primary"
                            onClick={this.handleAddAddress}
                        >
                            新增地址
                        </Button>
                    </div>
                }
            >
                {userAddressList.length ? (
                    <div style={{ padding: getUnit(10) }}>
                        {
                            userAddressList.map((i, index: number) => {
                                return (
                                    <Item
                                        key={index}
                                        theme={itemTheme}
                                        title={
                                            match.params.select ? (
                                                <div>
                                                    <div style={{ fontSize: getUnit(13) }}>{i.address_name}，{i.address_phone}</div>
                                                    <div style={{ fontSize: getUnit(12), color: 'rgb(158, 158, 158)' }}>{i.address_province}{i.address_city}{i.address_area}{i.address_info}</div>
                                                </div>
                                            ) : (
                                                    <Radio
                                                        type="square"
                                                        iconStyle={{ borderRadius: '50%' }}
                                                    >
                                                        <div>
                                                            <div style={{ fontSize: getUnit(13) }}>{i.address_name}，{i.address_phone}</div>
                                                            <div style={{ fontSize: getUnit(12), color: 'rgb(158, 158, 158)' }}>{i.address_province}{i.address_city}{i.address_area}{i.address_info}</div>
                                                        </div>
                                                    </Radio>
                                                )

                                        }
                                        icon={
                                            <Image
                                                src={require('../../assets/v2_q5sqq0.png')}
                                                style={{ width: getUnit(15), height: getUnit(15), marginRight: getUnit(10) }}
                                                onClick={this.handleEdit.bind(this, i.address_id)}
                                            />
                                        }
                                        link
                                        onPress={this.handleSelect.bind(this, i)}
                                    />
                                )
                            })
                        }
                    </div>
                ) : null}
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
    }

    private handleEdit = (id: number) => {
        const { history } = this.props
        history.push(`/addressAdd/${id}`)
    }

    private handleAddAddress = () => {
        const { history } = this.props
        history.push('/addressAdd')
    }


    private getData = async () => {
        const close = Toast.loading()
        try {
            const { dispatch } = this.props
            const data = await http('wxapp/goods/getAddressData')
            dispatch({ type: SET_USERADDRESSLIST_DATA, data: data.address_data })
            close()
        } catch (data) {
            close()
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleSelect = (data: any) => {
        const { match, dispatch, history } = this.props
        if (match.params.select) {
            dispatch({ type: SET_USERADDRESS_DATA, data: data })
            history.goBack()
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ userAddressList }: IInitState) => ({
        userAddressList
    })
)(AddressList as any)