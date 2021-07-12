import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/home'
import Product from './pages/product'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/:productId'>
          <Product />
        </Route>
      </Switch>
    </Router>
  )
}