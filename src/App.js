import './App.css';
import NavBar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route 
} from "react-router-dom";

export default class FileName extends Component {
  pageSize = 5;
  render() {
    return (
    <div>
      <Router>
          <NavBar/>
        <Routes>
            <Route exact path='/' element={<News key="general" pageSize={this.pageSize} country="hk" category="general"/>}> </Route>
            <Route exact path='/business' element={<News key="business"  pageSize={this.pageSize} country="hk" category="business"/>}> </Route>
            <Route exact path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} country="hk" category="entertainment"/>}> </Route>
            <Route exact path='/general' element={<News key="general" pageSize={this.pageSize} country="hk" category="general"/>}> </Route>
            <Route exact path='/health' element={<News key="health" pageSize={this.pageSize} country="hk" category="health"/>}> </Route>
            <Route exact path='/science' element={<News key="science" pageSize={this.pageSize} country="hk" category="science"/>}> </Route>
            <Route exact path='/sports' element={<News key="sports" pageSize={this.pageSize} country="hk" category="sports"/>}> </Route>
            <Route exact path='/teennology' element={<News key="technology" pageSize={this.pageSize} country="hk" category="technology"/>}> </Route>
        </Routes>
      </Router>
    </div>
    )
  }
}