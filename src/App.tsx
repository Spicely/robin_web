import * as React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'components'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import { ThemeData, NavBarThemeData, Color, ButtonThemeData } from './components/lib/utils'
import Router from './router'
import './App.css'

class App extends React.Component {
	public render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemeProvider
						theme={new ThemeData({
							navBarTheme: new NavBarThemeData({
								navBarColor: Color.fromRGB(255, 255, 255)
							}),
							buttonTheme: new ButtonThemeData({
								height: 45,
							}),
							fontSize: 14
						})}
					>
						<Router />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		)
	}
}

export default App