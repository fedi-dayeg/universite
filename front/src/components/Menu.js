import React, { Component } from 'react'
import { Link } from "react-router-dom";
import img from "../assets/images/avatars/logo.png"
import user from "../assets/images/avatars/user1-128x128.jpg"
export default class Menu extends Component {
    render() {
        return (
          <div>
          <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        
          <div  className="brand-link bg-primary">
            <img src={img} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light ">Smart Commercial Soft</span>
          </div>
        
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex ">
            <div className="image">
              <img src={user} className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a  href="facke_url" className="d-block">Belgacem Nadi</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview menu-open p-2 mt-1">
                <a  href="facke_url" className="nav-link">
           
                   <i className="nav-icon fas fa-calculator" />
                  <p>
                    Caisse
                  
                  </p>
               
                </a>
              
              </li>
              <li className="nav-item p-2 mt-1">
                <a href="pages/widgets.html" className="nav-link">
              
                  <i className="nav-icon fas fa-th" />
                
                  <p>
                    Stock
                   
                  </p>
                
                </a>
              </li>
              <li className="nav-item p-2 mt-1">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-users" />
                  <p>
                    Tiers
                   
                  </p>
                </a>
              </li>
          
              <li className="nav-item p-2 mt-1">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-money-bill-alt" />
                  <p>
                  Réglements
                   
                  </p>
                </a>
              </li>
              <li className="nav-item p-2 mt-1">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-chart-line" />
                  <p>
                  Statistique
                   
                  </p>
                </a>
              </li>

              <li className="nav-item p-2 mt-1">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-cog" />
                  <p>
                  Configuration
                   
                  </p>
                </a>
              </li>


             </ul>
              
              
             
                
              
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

      </div>
        )
    }
}
