import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Login from './pages/login';
import Write from './pages/write';
import HisDemo from './pages/hisDemo/hisDemo';
import HisDemo2 from './pages/hisDemo2'
import HisDemo3 from './pages/hisDemo3'
import HisDemo4 from './pages/hisDemo4'
import store from './store';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
      			<Route path='/detail/:id' exact component={Detail}></Route>
            <Route path="/his-demo" exact component={HisDemo}></Route>
            <Route path="/his-demo2" exact component={HisDemo2}></Route>
            <Route path="/his-demo3" exact component={HisDemo3}></Route>
            <Route path="/his-demo4" exact component={HisDemo4}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;
