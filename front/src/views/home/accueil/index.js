import React, { Component } from 'react';
import axios from 'axios'
import { URL } from '../../../utils/const';
import {Link} from "react-router-dom";



export default class index extends Component {


  state = {
    universites: []
}


fetchData = async () => {
    axios.get(`${URL}/universites`)
        .then(res => {
            if (res.data.success) {
                let universites = res.data.universites
                console.log(universites)
                this.setState({ universites })
            } else {
                //.........
            }
        }).catch(err => console.log(err))
};
componentDidMount() {
   


    this.fetchData()
}
  
    render() {
      let { universites } = this.state
 return (

  <div >
   {/* banner */}
  
        {/* //banner */}
        {/* portfolio */}
        <section className="portfolio-wthree align-w3 py-5" id="portfolio">
          <div className="container py-xl-5 py-lg-3">
            <div className="wthree_pvt_title text-center">
              <h4 className="w3pvt-title ">LA NUIT D'INFO
              </h4>
              <p className="sub-title">liste des  universités
               </p>
            </div>
            <div>

            <ul className="demo row">

            {
             universites && universites.map((universite, index) => {
             return (


              <li className="col-lg-4" >
                  <div className="img-grid">
                    <div className="Portfolio-grid1">
                    </div>
                    <div className="port-desc text-center">
                    <img src={`${URL}/uploads/${universite.image}`} alt=" " className="img-fluid" />
                    
                  
                    <Link to={{
                        pathname: `/detail`,
                         state: {
                            universite: universite
                             
                                }
                     }}>    <h6 className="main-title-w3pvt text-center">{universite.nom}</h6>
                       </Link>
                    
                    </div>
                  </div>
                </li>
                
              
                )
              })
           }
             
               
               
              </ul>
            </div>
            
            {/* //popup */}
          </div>
        </section>
        {/* //portfolio */}
</div>
  )
    }
}
