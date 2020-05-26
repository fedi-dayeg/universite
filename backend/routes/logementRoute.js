const { Logement, validateLogement } = require('../models/logement');
const express = require( 'express');
const { Universite } = require('../models/universites');
const logementRouter = express.Router();
const randomstring =require('randomstring');


logementRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Logement.find({}).populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ logements: docs, success: true })
            else throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {

      
        let image = req.files.image
        let randomString = randomstring.generate(10)

        let fakeLogement = {
            nom: req.body.nom,
            telephone: req.body.telephone,
            type: req.body.type,
            description: req.body.description,
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
            prix :  req.body.prix,
            selectedUniversite : req.body.selectedUniversite,
            image: randomString+image.name}

     
        const { error } = validateLogement(fakeLogement)
        if (error)
            res.send({ success: false, error: error })
        else {

        
            let logement =new Logement(fakeLogement );
   
        
           logement.save().then(logement => {
               image.mv('./uploads/' + logement.image)
                res.status(200).send({success: true,logement : logement})
            }).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
        let image = req.files.image
        let randomString = randomstring.generate(10)

        let fakeLogement = {
            nom: req.body.nom,
            telephone: req.body.telephone,
            type: req.body.type,
            description: req.body.description,
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
            prix :  req.body.prix,
            selectedUniversite : req.body.selectedUniversite,
            image: randomString+image.name}

        const { error } = validateLogement(fakeLogement)
        if (error)
            res.send({ success: false, error: error })
        else
        Logement.findByIdAndUpdate(req.body._id, fakeLogement, ((err, logement) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
                    image.mv('./uploads/' + fakeLogement.image)
                    res.send({ success: true, logement: logement })
                }
            }))
    });

    logementRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Logement.findOne({ _id: _id }).exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    logement: doc
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

        Logement.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.logementRouter = logementRouter;