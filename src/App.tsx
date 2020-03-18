import * as React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'components'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import { ThemeData, NavBarThemeData, Color, ButtonThemeData, IconThemeData, InputThemeData, Border } from './components/lib/utils'
import Router from './router'
import './App.css'
import 'antd-mobile/dist/antd-mobile.css'

class App extends React.Component {

	private registrationId = ""

	public render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemeProvider
						theme={new ThemeData({
							navBarTheme: new NavBarThemeData({
								navBarColor: Color.fromRGB(255, 255, 255),
								iconTheme: new IconThemeData({
									color: Color.fromRGB(255, 255, 255)
								})
							}),
							buttonTheme: new ButtonThemeData({
								height: 45,
								border: Border.none
							}),
							primarySwatch: Color.fromRGB(69, 134, 254),
							fontSize: 14,
						})}
					>
						<Router />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		)
	}

	public componentDidMount() {
		document.addEventListener("jpush.openNotification", this.onOpenNotification, false);
		document.addEventListener('jpush.receiveRegistrationId', (event: any) => {
			this.registrationId = event.registrationId
		}, false)
		document.addEventListener('deviceready', this.onDeviceReady, false)
	}

	private onDeviceReady = () => {
		try {
			const global: any = window
			global.JPush.init();
			global.JPush.setDebugMode(true);
			if (global.device.platform !== 'Android') {
				global.JPush.setApplicationIconBadgeNumber(0);
			}
		} catch (exception) {
			console.log(exception);
		}
	}

	private getregid() {
		const global: any = window
		global.JPush.getRegistrationID(this.onGetRegisterationID)
	}

	private onGetRegisterationID = (data: any) => {
		try {
			if (data.length === 0) {
				const t1 = window.setTimeout(this.getregid, 100)
			} else {
				this.registrationId = data
			}
		} catch (e) {
			console.log(e)
		}
	}

	private onOpenNotification = (event: any) => {
		try {
			const global: any = window
			var alertContent;
			this.getregid()
			if (global.device.platform === "Android") {
				alertContent = event.alert;
			} else {
				alertContent = event.aps.alert;
			}
			console.log("open Notification:" + alertContent)
			// alert("open Notification:" + alertContent);
		} catch (exception) {
			console.log("JPushPlugin:onOpenNotification" + exception);
		}
	}
}

export default App