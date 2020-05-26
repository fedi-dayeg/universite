import React, { Component } from 'react';
import axios from 'axios'
import { URL } from '../../../utils/const';
import {Link} from "react-router-dom";



export default class index extends Component {


    state = {
        universites: []
    }



    componentDidMount() {




    }

    render() {

        return (

            <div >
                {/* banner */}

                {/* //banner */}
                {/* portfolio */}
                <section className="portfolio-wthree align-w3 py-5" id="portfolio">
                    <div className="container py-xl-5 py-lg-3">

                        <div className="text-center">
                            <ul className="demo row ">
                                <li className="col-lg-4" >
                                    <div className="img-grid">

                                        <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/83cadfdf-d8b6-4da0-8ba6-6252be56328b"></iframe>

                            </div>
                                </li>
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
