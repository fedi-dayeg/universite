const { Universite, validateUniversite } = require('../models/universites');
const express = require( 'express');
const multer = require("multer");
const universiteRouter = express.Router();
const randomstring =require('randomstring');


universiteRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Universite.find({}, (err, docs) => {
            if (!err)
                res.send({ universites: docs, success: true })
            else
                throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {

      
        let image = req.files.image
        let randomString = randomstring.generate(10)

        let fakeUniversite = {
            nom: req.body.nom,
            telephone: req.body.telephone,
            type: req.body.type,
            description: req.body.description,
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
            image: randomString+image.name}

     
        const { error } = validateUniversite(fakeUniversite)
        if (error)
            res.send({ success: false, error: error })
        else {

        
            let universite =new Universite(fakeUniversite );
   
           // let universite = new Universite(req.body)
            universite.save().then(universite => {
                image.mv('./uploads/' + universite.image)
                res.status(200).send({success: true,universite : universite})
            }).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
        let image = req.files.image
        let randomString = randomstring.generate(10)

        let fakeUniversite = {
            nom: req.body.nom,
            telephone: req.body.telephone,
            type: req.body.type,
            description: req.body.description,
            lat : req.body.lat,
            lng : req.body.lng,
            adresse : req.body.adresse,
            image: randomString+image.name}

        const { error } = validateUniversite(fakeUniversite)
        if (error)
            res.send({ success: false, error: error })
        else
        Universite.findByIdAndUpdate(req.body._id, req.body, ((err, universite) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
                    image.mv('./uploads/' + fakeUniversite.image)
                    res.send({ success: true, universite: universite })
                }
            }))
    });

    universiteRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Universite.findOne({ _id: _id }).exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    universite: doc
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

        Universite.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.universiteRouter = universiteRouter;