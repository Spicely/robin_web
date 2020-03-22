import React, { Component, ChangeEvent } from 'react'
import { http } from 'src/utils'
import { Toast, MobileLayout, NavBar, Button, Item, Input, Form, district, Icon } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { Steps, Picker } from 'antd-mobile'
import { ButtonThemeData, BorderRadius, getUnit, IconThemeData, Color } from 'src/components/lib/utils'
import { connect, DispatchProp } from 'react-redux'
import { IInitState, IGlobal } from 'src/store/state'
import { SET_USERADDRESSLIST_DATA, SET_USERINFO_DATA } from 'src/store/actions'
import styled from 'styled-components'
import { IFormFun, IFormItem } from 'src/components/lib/Form'

const Step = Steps.Step;

interface IState {
}

interface IProps extends RouteComponentProps<any> {
    userAddressList: IGlobal.UserAddressList[],
    userInfo: IGlobal.UserInfo
}

const LSteps = styled(Steps)`
    .am-steps-item-tail {
        top: 0%;
    }
    .am-steps-item-finish .am-steps-item-tail:after {
        background-color: #fff;
    }
`

const RIcon = styled.div`
    display: inline-block;
    color: #2F99FD; 
    width: ${getUnit(22)};
    height: ${getUnit(22)};
    border-radius: 50%;
    background: #fff;
    line-height: ${getUnit(22)};
`

const Etv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,1) 0%,rgba(170,203,245,0) 100%);
    position: relative;
    margin-right: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        right: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const Rtv = styled.div`
    width: ${getUnit(32)};
    height: ${getUnit(2)};
    background:linear-gradient(270deg,rgba(170,203,245,0) 0%, rgba(170,203,245,1) 100%);
    position: relative;
    margin-left: ${getUnit(20)};
    ::before {
        content: '';
        position: absolute;
        width: ${getUnit(4)};
        height: ${getUnit(4)};
        background: #2F99FD;
        border-radius: 50%;
        left: ${getUnit(-2)};
        top: ${getUnit(-1)};
    }
`

const TitleBox = styled.div`
    width: ${getUnit(70)};
`

const PLabel = styled.div`
    font-size: ${getUnit(14)};
    font-family: PingFang SC;
    font-weight: 400;
    line-height: ${getUnit(20)};
    color: rgba(34,34,34,1);
`

const LInput = styled(Input)`
    width: 100%;
    height: ${getUnit(44)};
    background: rgba(238,245,254,0.5);
    border-radius: ${getUnit(5)};
    >div {
        border: 0;
    }
    input {
        text-align: right;
    }
`

const LVbox = styled.div`
    width: 100%;
    height: ${getUnit(44)};
    background: rgba(238,245,254,0.5);
    border-radius: ${getUnit(5)};
`

const buttonThme = new ButtonThemeData({
    height: 45,
    width: 260,
    borderRadius: BorderRadius.all(5),
    fontSize: 16,
})

const iconTheme = new IconThemeData({
    size: 16,
    color: Color.fromRGB(69, 134, 254)
})

class AuthenOne extends Component<IProps & DispatchProp, IState> {


    private fn?: IFormFun

    private marriage = [{
        label: '已婚',
        value: '已婚',
    }, {
        label: '未婚',
        value: '未婚',
    }]

    private education = [{
        label: '本科',
        value: '本科',
    }, {
        label: '专科',
        value: '专科',
    }, {
        label: '硕士研究生',
        value: '硕士研究生',
    }, {
        label: '博士研究生',
        value: '博士研究生',
    }, {
        label: '高中',
        value: '高中',
    }]

    private relation = [{
        label: '父母',
        value: '父母',
    }, {
        label: '配偶',
        value: '配偶',
    }, {
        label: '兄弟姐妹',
        value: '兄弟姐妹',
    }, {
        label: '子女',
        value: '子女',
    }, {
        label: '领导/同事',
        value: '领导/同事',
    }, {
        label: '朋友',
        value: '朋友',
    }]

    private getItems = (fn: IFormFun) => {
        this.fn = fn
        const items: IFormItem[] = [{
            component: 'Label',
            props: {
                value: '',
            },
            render: (val) => (
                <Picker
                    data={this.marriage}
                    cols={1}
                    value={val}
                    onOk={this.handlePickerValue.bind(this, 'marriage')}
                >
                    <div style={{ marginTop: getUnit(10) }}>
                        <Item
                            title={<TitleBox>婚姻状态：</TitleBox>}
                            flexType="value"
                            lineType="none"
                            icon={null}
                            value={
                                <LVbox>
                                    <div className="flex" style={{ height: '100%' }}>
                                        <div className="flex_1" />
                                        <div className="flex_justify" style={{ marginRight: getUnit(10) }}>
                                            <div className="flex">
                                                <div className="flex_justify" style={{ color: '#4586FE', fontSize: getUnit(14) }}>{val ? val : '请选择'}</div>
                                                <div className="flex_justify">
                                                    {!val && <Icon icon="ios-arrow-forward" theme={iconTheme} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LVbox>
                            }
                        />
                    </div>
                </Picker >
            ),
            field: 'marriage'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <Picker
                    data={this.education}
                    cols={1}
                    value={val}
                    onOk={this.handlePickerValue.bind(this, 'education')}
                >
                    <div style={{ marginTop: getUnit(10) }}>
                        <Item
                            title={<TitleBox>学历：</TitleBox>}
                            flexType="value"
                            lineType="none"
                            icon={null}
                            value={
                                <LVbox>
                                    <div className="flex" style={{ height: '100%' }}>
                                        <div className="flex_1" />
                                        <div className="flex_justify" style={{ marginRight: getUnit(10) }}>
                                            <div className="flex">
                                                <div className="flex_justify" style={{ color: '#4586FE', fontSize: getUnit(14) }}>{val ? val : '请选择'}</div>
                                                <div className="flex_justify">
                                                    {!val && <Icon icon="ios-arrow-forward" theme={iconTheme} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LVbox>
                            }
                        />
                    </div>
                </Picker >
            ),
            field: 'education'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>从事行业：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入您的工作行业"
                                onClose={this.handleClose.bind(this, 'industry')}
                                onChange={this.handleInput.bind(this, 'industry')}
                            />
                        }
                    />
                </div>
            ),
            field: 'industry'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <Picker
                    data={district}
                    value={val}
                    onOk={this.handleNagaiPickerValue.bind(this, 'nagai')}
                >
                    <div style={{ marginTop: getUnit(10) }}>
                        <Item
                            title={<TitleBox>常居城市：</TitleBox>}
                            flexType="value"
                            lineType="none"
                            icon={null}
                            value={
                                <LVbox>
                                    <div className="flex" style={{ height: '100%' }}>
                                        <div className="flex_1" />
                                        <div className="flex_justify" style={{ marginRight: getUnit(10) }}>
                                            <div className="flex">
                                                <div className="flex_justify" style={{ color: '#4586FE', fontSize: getUnit(14) }}>{val.length ? val.map((i: any) => i.label).join('-') : '请选择'}</div>
                                                <div className="flex_justify">
                                                    {!val && <Icon icon="ios-arrow-forward" theme={iconTheme} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LVbox>
                            }
                        />
                    </div>
                </Picker >
            ),
            field: 'nagai'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>详细地址：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入详细地址具体到门牌号"
                                onClose={this.handleClose.bind(this, 'address')}
                                onChange={this.handleInput.bind(this, 'address')}
                            />
                        }
                    />
                </div>
            ),
            field: 'address'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <Picker
                    data={this.relation}
                    cols={1}
                    value={val}
                    onOk={this.handlePickerValue.bind(this, 'relation')}
                >
                    <div style={{ marginTop: getUnit(10) }}>
                        <Item
                            title={<TitleBox>直系亲属 关系：</TitleBox>}
                            flexType="value"
                            lineType="none"
                            icon={null}
                            value={
                                <LVbox>
                                    <div className="flex" style={{ height: '100%' }}>
                                        <div className="flex_1" />
                                        <div className="flex_justify" style={{ marginRight: getUnit(10) }}>
                                            <div className="flex">
                                                <div className="flex_justify" style={{ color: '#4586FE', fontSize: getUnit(14) }}>{val ? val : '请选择'}</div>
                                                <div className="flex_justify">
                                                    {!val && <Icon icon="ios-arrow-forward" theme={iconTheme} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LVbox>
                            }
                        />
                    </div>
                </Picker>
            ),
            field: 'relation'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>直系亲属 姓名：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入直系亲属姓名"
                                onClose={this.handleClose.bind(this, 'relationName')}
                                onChange={this.handleInput.bind(this, 'relationName')}
                            />
                        }
                    />
                </div>
            ),
            field: 'relationName'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>直系亲属 电话：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入直系亲属电话"
                                onClose={this.handleClose.bind(this, 'relationPhone')}
                                onChange={this.handleInput.bind(this, 'relationPhone')}
                            />
                        }
                    />
                </div>
            ),
            field: 'relationPhone'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <Picker
                    data={this.relation}
                    cols={1}
                    value={val}
                    onOk={this.handlePickerValue.bind(this, 'relationQ')}
                >
                    <div style={{ marginTop: getUnit(10) }}>
                        <Item
                            title={<TitleBox>紧急联系 人关系：：</TitleBox>}
                            flexType="value"
                            lineType="none"
                            icon={null}
                            value={
                                <LVbox>
                                    <div className="flex" style={{ height: '100%' }}>
                                        <div className="flex_1" />
                                        <div className="flex_justify" style={{ marginRight: getUnit(10) }}>
                                            <div className="flex">
                                                <div className="flex_justify" style={{ color: '#4586FE', fontSize: getUnit(14) }}>{val ? val : '请选择'}</div>
                                                <div className="flex_justify">
                                                    {!val && <Icon icon="ios-arrow-forward" theme={iconTheme} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </LVbox>
                            }
                        />
                    </div>
                </Picker>
            ),
            field: 'relationQ'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>紧急联系 人姓名：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入紧急联系人姓名"
                                onClose={this.handleClose.bind(this, 'relationNameQ')}
                                onChange={this.handleInput.bind(this, 'relationNameQ')}
                            />
                        }
                    />
                </div>
            ),
            field: 'relationNameQ'
        }, {
            component: 'Label',
            props: {
                value: ''
            },
            render: (val) => (
                <div style={{ marginTop: getUnit(10) }}>
                    <Item
                        title={<TitleBox>紧急联系 人电话：</TitleBox>}
                        flexType="value"
                        lineType="none"
                        icon={null}
                        value={
                            <LInput
                                value={val}
                                placeholder="请输入紧急联系人电话"
                                onClose={this.handleClose.bind(this, 'relationPhoneQ')}
                                onChange={this.handleInput.bind(this, 'relationPhoneQ')}
                            />
                        }
                    />
                </div>
            ),
            field: 'relationPhoneQ'
        },]
        return items
    }

    public state: IState = {

    }

    public render(): JSX.Element {
        return (
            <MobileLayout
                backgroundColor="rgb(248, 248, 248)"
                appBar={
                    <NavBar
                        fixed
                        divider={false}
                        onBack={this.handleBack}
                        style={{ background: 'rgba(0, 0, 0, 0)' }}
                    />
                }
            >
                <div
                    style={{ padding: `${getUnit(50)} ${getUnit(20)} 0 ${getUnit(20)}`, background: `url(${require('../../assets/bg_q.png')}) no-repeat`, backgroundSize: '100% auto' }}
                >
                    <LSteps direction="horizontal" current={1}>
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>上传身份证</div>} icon={<RIcon>1</RIcon>}
                        />
                        <Step
                            title={<div style={{ fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>基本信息</div>}
                            icon={<RIcon>2</RIcon>}
                        />
                        <Step
                            title={<div style={{ opacity: 0.5, fontSize: getUnit(12), color: '#fff', fontWeight: 'initial' }}>银行卡认证</div>}
                            icon={<RIcon style={{ opacity: 0.5 }}>3</RIcon>}
                        />
                    </LSteps>
                    <div style={{ marginTop: getUnit(30), background: '#fff', borderRadius: getUnit(5), padding: `${getUnit(20)} ${getUnit(10)}`, boxShadow: `0 ${getUnit(5)} ${getUnit(5)} #ccc` }}>
                        <div className="flex_center">
                            <span className="flex">
                                <div className="flex_justify">
                                    <Etv />
                                </div>
                                <PLabel>请仔细填写您的真实信息</PLabel>
                                <div className="flex_justify">
                                    <Rtv />
                                </div>
                            </span>
                        </div>
                        <Form getItems={this.getItems} style={{ paddingBottom: getUnit(10) }} />
                    </div>
                    <div className="flex_center" style={{ marginTop: getUnit(40), marginBottom: getUnit(80) }}>
                        <Button
                            mold="primary"
                            theme={buttonThme}
                            onClick={this.next}
                        >
                            下一步，银行卡认证
                        </Button>
                    </div>
                </div>
            </MobileLayout >
        )
    }

    private next = async () => {   // 下一步
        if (this.fn) {
            const form = this.fn.getFieldValue()
            const status = Object.keys(form).every((i: string) => form[i])
            if (status) {
                const close = Toast.loading()
                const nana = form.nagai.map((item: any) => {
                    return item.label
                }).join('')
                try {
                    await http('user/authenInfo', { ...form, userId: this.props.userInfo.id, nagai: nana })
                    const { history, userInfo, dispatch } = this.props
                    if (userInfo.userInfo) {
                        userInfo.userInfo.status = 2
                    }
                    dispatch({ type: SET_USERINFO_DATA, data: { ...userInfo } })
                    close()
                    history.replace('/authenBank')
                } catch (e) {
                    close()
                    Toast.info({
                        content: e.msg || '认证失败'
                    })
                }
            } else {
                Toast.info({
                    content: '请确保信息完整'
                })
            }
        }
    }
    private handlePickerValue = (field: string, data: any) => {
        this.fn && this.fn.setFieldValue({
            [field]: data[0]
        })
    }

    private handleNagaiPickerValue = (field: string, v: any) => {
        const newVal: any[] = []
        district.forEach((i) => {
            if (i.value === v[0]) {
                newVal.push({
                    label: i.label,
                    value: v[0]
                })
                if (i.children) {
                    i.children.forEach((t: any) => {
                        if (t.value === v[1]) {
                            newVal.push({
                                label: t.label,
                                value: v[1]
                            })
                            if (t.children) {
                                t.children.forEach((f: any) => {
                                    if (f.value === v[2]) {
                                        newVal.push({
                                            label: f.label,
                                            value: v[2]
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
        this.fn && this.fn.setFieldValue({
            [field]: newVal
        })
    }

    private handleInput = (field: string, e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        this.fn && this.fn.setFieldValue({
            [field]: val
        })
    }

    private handleClose = (field: string) => {
        this.fn && this.fn.setFieldValue({
            [field]: ''
        })
    }

    private getData = async () => {
        try {
            const { dispatch } = this.props
            const close = Toast.loading()
            const data = await http('wxapp/goods/getAddressData')
            dispatch({ type: SET_USERADDRESSLIST_DATA, data: data.address_data })
            close()
        } catch (data) {
            Toast.info({
                content: data.msg || '服务器繁忙,请稍后再试',
            })
        }
    }

    private handleBack = () => {
        const { history } = this.props
        history.goBack()
    }
}

export default connect(
    ({ userAddressList, userInfo }: IInitState) => ({
        userAddressList,
        userInfo
    })
)(AuthenOne as any)