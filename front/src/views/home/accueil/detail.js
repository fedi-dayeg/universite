import React, { Component } from 'react';
import axios from 'axios'
import { URL } from '../../../utils/const';
import {Link} from "react-router-dom";



export default class Detail extends Component {


    state = {
        logements: [],
        logements_Universite: [],
        universite : null,
        nom: '',
        _id:'',

        description: '',
        adresse:'',
        telephone:'',
        type :'',
        image:''




    };
    fetchData = async () => {
        axios.get(`${URL}/logements`)
            .then(res => {
                if (res.data.success) {
                    let logements = res.data.logements
                    console.log(logements)
                    this.setState({ logements })
                } else {
                    //.........
                }
            }).catch(err => console.log(err))
    };
    componentDidMount() {
        this.fetchData();
        console.log(this.props)
        let {location: {state: {universite}}} = this.props
        if (universite) {
            this.setState({
                nom: universite.nom,
                _id :universite._id ,
                image: universite.image,
                telephone: universite.telephone,
                adresse: universite.adresse,
                description: universite.description,


                universite: universite
            })
        }


        this.state.logements.map((elm)=>{
            if(elm.selectedUniversite=== this.state._id)
                this.state.logements_Universite.push(elm)
        })
        console.log("logements",this.state.logements_Universite)
    }


    render() {
        let {nom,description,image,adresse,telephone,universite,logements_Universite} = this.state;
        return (

            <div >
                {/* banner */}

                {/* //banner */}
                {/* portfolio */}
                <section className="portfolio-wthree align-w3 py-5" id="portfolio">
                    <div className="container py-xl-5 py-lg-3">
                        <div className="wthree_pvt_title text-center">
                            <img src={`${URL}/uploads/${image}`} alt=" " className="img-fluid" />
                            <h4 className="w3pvt-title">{nom}
                            </h4>
                            <p>Télephone : {telephone} </p>
                            <p>Adresse : {adresse} </p>
                            <p className="sub-title">{description}
                            </p>
                            <p>Responsable :  </p>
                            {
                                logements_Universite && logements_Universite.map((logements_Universite, index) => {
                                    return (  <div>
                                            <h4 className="w3pvt-title">{logements_Universite.nom}</h4>
                                            <p className="w3pvt-title">{logements_Universite.description}</p>
                                            <p className="w3pvt-title">{logements_Universite.adresse}</p>
                                        </div>


                                    )
                                })
                            }
                            <p>Liste des logements :  </p>
                            {
                                logements_Universite && logements_Universite.map((logements_Universite, index) => {
                                    return (  <div>
                                        <h4 className="w3pvt-title">{logements_Universite.nom}</h4>
                                        <p className="w3pvt-title">{logements_Universite.description}</p>
                                            <p className="w3pvt-title">{logements_Universite.adresse}</p>
                                        </div>


                                )
                                })
                            }

                            <p>Liste des budgets :  </p>
                            {
                                logements_Universite && logements_Universite.map((logements_Universite, index) => {
                                    return (  <div>
                                            <h4 className="w3pvt-title">{logements_Universite.nom}</h4>
                                            <p className="w3pvt-title">{logements_Universite.description}</p>
                                            <p className="w3pvt-title">{logements_Universite.adresse}</p>
                                        </div>


                                    )
                                })
                            }
                            <p>Liste des bourses :  </p>
                            {
                                logements_Universite && logements_Universite.map((logements_Universite, index) => {
                                    return (  <div>
                                            <h4 className="w3pvt-title">{logements_Universite.nom}</h4>
                                            <p className="w3pvt-title">{logements_Universite.description}</p>
                                            <p className="w3pvt-title">{logements_Universite.adresse}</p>
                                        </div>


                                    )
                                })
                            }

                            <p>Liste des étudiants :  </p>
                            {
                                logements_Universite && logements_Universite.map((logements_Universite, index) => {
                                    return (  <div>
                                            <h4 className="w3pvt-title">{logements_Universite.nom}</h4>
                                            <p className="w3pvt-title">{logements_Universite.description}</p>
                                            <p className="w3pvt-title">{logements_Universite.adresse}</p>
                                        </div>


                                    )
                                })
                            }


                        </div>
                        <div>


                        </div>

                        {/* //popup */}
                    </div>
                </section>
                {/* //portfolio */}
            </div>
        )
    }
}
