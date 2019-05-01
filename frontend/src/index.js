import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import Navigation from './components/layout/navigation'
import './index.css'
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import App from './App'
import User from './components/users/User'

const routing = (
  <Router>
    <div>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/usuarios" component={User} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
