import React, { Component } from 'react'

import user from "../assets/images/avatars/user1-128x128.jpg"
import {Link} from "react-router-dom";
export default class Header extends Component {
    render() {
        return (
          <div>
         <header id="home">
        <div className="container ">
          <div className="header d-lg-flex justify-content-between align-items-center py-sm-3 py-2 px-sm-2 px-1">
            {/* logo */}
            <div id="logo">
              <h1 className="text-white">LA NUIT D'INFO</h1>
            </div>
            {/* //logo */}
            {/* nav */}
            <div className="nav_w3ls ml-lg-5">
              <nav>
                <label htmlFor="drop" className="toggle">Menu</label>
                <input type="checkbox" id="drop" />
                <ul className="menu">
                  <li> <Link to='/'>ACCUIEL</Link></li>
                  <li><Link to='/chat'>CHATBOT</Link></li>
                    <li><Link to='/'>CHAT</Link></li>
                
               

                 
                </ul>
              </nav>
            </div>
            {/* //nav */}
          </div>
        </div>
      </header>
      </div>
        )
    }
}
