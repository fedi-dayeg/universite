import React, { Component } from 'react';
import Header from '../components/Header';
import Content from './home/accueil/index';
import Detail from './home/accueil/detail';
import Chat from './home/chat/index'
import { Route, Switch } from "react-router-dom";


export default class index extends Component {
    render() {
    
        return (
            <div>
            <Header/>
            
             
               <main>

                    <div>
                        <Switch>                  
                        
                                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Content}/>
                                <Route  path={`${process.env.PUBLIC_URL}/chat`} component={Chat}/>
                            <Route  path={`${process.env.PUBLIC_URL}/detail`} component={Detail}/>
                        </Switch>

  
                    </div>
                </main>
            
           


                </div>
                
              
          
        )
    }
}
