import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'components'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import { routes, IRoutes, loadable } from './routes'
import { ThemeData, NavBarThemeData, Color } from './components/lib/utils'
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
              })
            })}
          >
            <BrowserRouter>
              <Switch>
                {
                  routes.map((item: IRoutes, index: number) => {
                    return <Route path={item.path} exact component={loadable(item.component)} key={index} />
                  })
                }
              </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App