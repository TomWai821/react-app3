import './App.css';
import NavBar from './Components/Navbar';
import News from './Components/News';

import React, { Component } from 'react'

export default class FileName extends Component {
  render() {
    return (
    <div>
      <NavBar />
      <News pageSize={5} country="ch" category="science"/>
    </div>
    )
  }
}