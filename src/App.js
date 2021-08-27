import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Calendar from './Calendar'
import Table from './tableData'

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="d-flex justify-content-center">
          <Route exact path='/' component={Calendar}/>
          <Route exact path='/table' component={Table}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
export default App