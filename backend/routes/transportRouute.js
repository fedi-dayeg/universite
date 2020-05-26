const { Transport, validateTransport } = require('../models/transport');
const express = require( 'express');
const { Universite } = require('../models/universites');
const transportRouter = express.Router();


transportRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Transport.find({}).populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ transports: docs, success: true })
            else throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {

      
     

        let fakeTransport = {
            nom: req.body.nom,
          
            type: req.body.type,
        
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
           
            selectedUniversite : req.body.selectedUniversite,
            }

     
        const { error } = validateTransport(fakeTransport)
        if (error)
            res.send({ success: false, error: error })
        else {

        
            let transport =new Transport(fakeTransport );
   
           // let universite = new Universite(req.body)
           transport.save().then(transport => {
             
                res.status(200).send({success: true,transport : transport})
            }).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
     

        let fakeTransport = {
            nom: req.body.nom,
          
            type: req.body.type,
         
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
         
            selectedUniversite : req.body.selectedUniversite,
            }

        const { error } = validateTransport(fakeTransport)
        if (error)
            res.send({ success: false, error: error })
        else
        Transport.findByIdAndUpdate(req.body._id, fakeTransport, ((err, transport) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
                   
                    res.send({ success: true, transport: transport })
                }
            }))
    });

    transportRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Transport.findOne({ _id: _id }).exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    transport: doc
                })
            }
            else {
                res.send({
                    success: false
                })
            }
        })

    })
    // delete classe method
    .delete((req, res) => {
        let _id = req.params.id

        Transport.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.transportRouter = transportRouter;