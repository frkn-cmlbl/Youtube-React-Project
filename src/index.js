import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import App from './App';
import VideoPage from './VideoPage';
import Menu from './NavMenu';



const router=
<Router>
  <Menu></Menu>
  <Route path="/" exact component={App}></Route>
  <Route path="/videoPage/:id" component={VideoPage}></Route>
</Router>

ReactDOM.render(router,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
