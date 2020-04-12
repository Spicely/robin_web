import * as React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, Dialog, Button, Toast } from 'components'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import { ThemeData, NavBarThemeData, Color, ButtonThemeData, IconThemeData, InputThemeData, DialogThemeData, getUnit } from './components/lib/utils'
import Router from './router'
import './App.css'
import 'antd-mobile/dist/antd-mobile.css'
import http, { version } from './utils/axios'
declare const device: any
declare const FileTransfer: any
declare const cordova: any
declare const GaoDe: any

class App extends React.Component {

	public state = {
		visible: false,
		content: '',
		url: ''
	}

	public render() {
		const { visible, content } = this.state
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemeProvider
						theme={new ThemeData({
							navBarTheme: new NavBarThemeData({
								navBarColor: Color.fromRGB(255, 255, 255),
								iconTheme: new IconThemeData({
									color: Color.fromRGB(0, 0, 0)
								})
							}),
							buttonTheme: new ButtonThemeData({
								height: 45,
							}),
							primarySwatch: Color.fromRGB(0, 0, 0),
							fontSize: 14,
						})}
					>
						<Router />
						<Dialog
							title="版本更新"
							visible={visible}
							theme={
								new DialogThemeData({
									width: '80%'
								})
							}
							footer={
								<div className='flex' style={{ justifyContent: 'space-between' }}>
									<Button style={{ margin: getUnit(5), background: '#3482FE', color: 'white' }} onClick={this.cancel}>取消</Button>
									<Button style={{ margin: getUnit(5), background: '#3482FE', color: 'white' }} onClick={this.confirm}>确定</Button>
								</div>
							}
						>
							<div dangerouslySetInnerHTML={{ __html: content }} />
						</Dialog>
					</ThemeProvider>
				</PersistGate>
			</Provider>
		)
	}

	public componentDidMount() {
		document.addEventListener("deviceready", this.onDeviceReady, false)
		this.onDeviceReady()
	}

	private confirm = () => {
		const platform = device.platform.toLowerCase()
		const uri = encodeURI(this.state.url)
		Toast.info({
			content: '正在下载中'
		})
		this.setState({
			visible: false
		})
		if (platform === 'android') {
			const fileTransfer = new FileTransfer()
			// const fileURL = `cdvfile://localhost/persistent/${Date.now()}.apk`
			const fileURL = cordova.file.externalDataDirectory + `${Date.now()}.apk`
			fileTransfer.download(
				uri,
				fileURL,
				function (entry: any) {
					const openUrl = entry.toURL()
					cordova.plugins.fileOpener2.open(
						openUrl,
						'application/vnd.android.package-archive'
					)
				},
				function (error: any) {
					Toast.info({
						content: '下载失败,请稍后重试'
					})
				},
				false, {
				headers: {
					'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
				}
			})
		} else {
			cordova.plugins.fileOpener2.openURL(uri)
		}
	}
	private cancel = () => {
		this.setState({
			visible: false
		})
	}
	
	private onDeviceReady = async () => {
		// const platform = device.platform.toLowerCase()
		const platform = 'android'
		try {
			const { data } = await http('/wxapp/login/checkupdate', {
				version,
				model: platform
			})
			if (data.isUpdate === 1) {
				this.setState({
					url: data.Android,
					content: data.note,
					visible: true
				})
			}
		} catch (data) {
			// alert(e.toString())
			Toast.info({
				content: data.msg || '服务器繁忙,请稍后再试',
			})
		}
	}
}

export default App