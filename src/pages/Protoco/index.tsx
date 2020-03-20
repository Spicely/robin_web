import React, { Component } from 'react'
import { http, baseUrl } from 'src/utils'
import { Toast, MobileLayout, Button,NavBar, Image, Item, Icon, CheckBox } from 'components'
import { Slider } from 'antd-mobile'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IInitState, IGlobal } from 'src/store/state'
import { getUnit,NavBarThemeData,Color,IconThemeData} from 'src/components/lib/utils'
import { SET_HOME_DATA } from 'src/store/actions'
import { connect, DispatchProp } from 'react-redux'
import userInfo from 'src/store/reducers/userInfo'
import CanvasDraw from "react-canvas-draw"
import Axios from 'axios'


interface IState {
	data: any[]
	coo: any[]
	visible: boolean
	err: null | any
	mode: any
	orderId: string
}

interface IProps extends RouteComponentProps {
	appData: IGlobal.AppData
	userInfo: IGlobal.UserInfo
}

const PriceBox = styled.div`
    position: relative;
	padding: ${getUnit(12)} ${getUnit(15)};
	padding-Bottom: ${getUnit(22)};
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: ${getUnit(5)};
	width: 100%;
	margin: 0 auto;
`
const LButton = styled(Button)`
    margin-top: ${getUnit(30)};
    width: 40%;
    height: ${getUnit(45)};
    background: linear-gradient(45deg,#2F99FD,#284AFE);
    border-radius: ${getUnit(5)};
    color: #FFFFFF;
    font-family: PingFang SC;
    font-weight: 700;
    border: 0;
	font-size: ${getUnit(16)};
`


// class Shop extends Component<RouteComponentProps<any>, IState> {
class Shop extends Component<IProps & DispatchProp, IState> {

	private canvas: any

    public state: IState = {
		data: [],
		coo: [],
		visible: false,
		err: null,
		mode: null,
		orderId: ''
    }

    public render(): JSX.Element {
		const { appData } = this.props
		const { mode } = this.state
        return (
            <MobileLayout 
			appBar={
				<NavBar
					theme={new NavBarThemeData({
						navBarColor: Color.fromRGB(255, 255, 255),
						iconTheme: new IconThemeData({
							color: Color.fromRGB(0, 0, 0)
						})

					})}
					title = '借款协议'
					titleCenter
					onBack={this.handleBack}
					divider={false}
				/>
			}
			style={{background: 'white'}}>
				<PriceBox className="flex_center">
					<div style={{display:'flex',justifyContent:'center',fontWeight: 700,fontSize: getUnit(14),width:'100%',padding:getUnit(15),marginTop:getUnit(-30)}}>
						<div dangerouslySetInnerHTML={{__html: mode}} />
					</div>
					<div style={{color: '#4586FE'}}>签名区域</div>
					<div className='flex_center' style={{width:'100%',
						height: getUnit(200),color: '#4586FE',
						marginTop:getUnit(15),border: '1px dashed #4586FE',borderRadius: getUnit(5)}}>
							<CanvasDraw lazyRadius={1} brushRadius={1} brushColor='skyBlue' ref={(e) => this.canvas = e} canvasHeight={400} style={{width: '100%'}}/>
						</div>
				</PriceBox>
				<div style={{display: 'flex',justifyContent:'space-around'}}>
					<LButton style={{background: '#D6E8FA',color:'skyBlue'}}>重写</LButton>
					<LButton onClick={this.submit}>提交</LButton>
				</div>
            </MobileLayout>
        )
    }

    public componentDidMount() {
        this.getData()
	}
	private cc = (val:any) => {
		console.log(val)
	}

	private dataURLtoFile(dataurl: string, filename: string) {
        const arr = dataurl.split(',')
        const mime = ((arr[0] || '').match(/:(.*?);/) || [])[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        const blob: any = new Blob([u8arr], { type: mime })
        if (/Edge/.test(navigator.userAgent)) {
            blob.lastModifiedDate = new Date()
            blob.name = filename
            blob.filename = filename
            return blob
        } else {
            const file = new File([blob], filename)
            return file
        }
    }
	private submit = async () => {
		const _file = this.dataURLtoFile(this.canvas.canvasContainer.children[1].toDataURL(),'sign.png')
		const formData = new FormData()
		const { history } = this.props
		if (_file) {
			const reader = new FileReader()
			reader.readAsDataURL(_file)
			reader.onload = async () => {
				formData.append('file', _file)
				const close = Toast.loading()
				try {
					const data = await Axios.post(baseUrl + '/upload/index', formData)
					console.log(data.data.data.url)
					const data2 = await http('user/autograph',{
						userId: this.props.userInfo.id,
						orderId: this.state.orderId,
						autograph: data.data.data.url
					})
					console.log(data2)
					history.replace('protoSuccess')
					close()
				} catch (e) {
					close()
					Toast.info({
						content: e.msg || '上传签名失败'
					})
				}
			}
		}

		// const { history } = this.props
		// history.replace('/protoSuccess')
	}
	private handleView = (id: string) => {
	    const { err } = this.state
	    const { history } = this.props
	    if (err !== null) {
	        this.setState({
	            visible: true
	        })
	    } else {
	        history.push(`/news/${id}`)
	    }
	}
    private getData = async () => {
		const state: any = this.props.location.state || {}
		console.log(state)
		if(state.orderId){
			this.setState({
				orderId: state.orderId
			})
		}
        try {
            const { match } = this.props
			const data = await http('user/getContractTemplate',{userId: this.props.userInfo.id})
			this.setState({
				mode: data.data.contractTemplate
			})
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



// export default connect(
//     ({ homeData }: IInitState) => ({
//         homeData
//     })
// )(withRouter(Shop))


export default connect(
    ({ appData,userInfo }: IInitState) => ({
        appData,userInfo
    })
)(withRouter(Shop))