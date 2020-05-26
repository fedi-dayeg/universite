const { Bourse, validateBourse } = require('../models/bourse');
const express = require( 'express');

const bourseRouter = express.Router();



bourseRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Bourse.find({}).populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ bourses: docs, success: true })
            else throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {

      
     

        let fakeBourse = {
            nom: req.body.nom,
          
            type: req.body.type,
            description: req.body.description,
            prix :  req.body.prix,
            selectedUniversite : req.body.selectedUniversite,
         
        }

     
        const { error } = validateBourse(fakeBourse)
        if (error)
            res.send({ success: false, error: error })
        else {

        
            let bourse =new Bourse(fakeBourse );
   
           // let universite = new Universite(req.body)
           bourse.save().then(bourse => {
              
                res.status(200).send({success: true,bourse : bourse})
            }).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
      

        let fakeBourse = {
            nom: req.body.nom,
           type: req.body.type,
           prix :  req.body.prix,
            description: req.body.description,
        selectedUniversite : req.body.selectedUniversite,
         
        }
        const { error } = validateBourse(fakeBourse)
        if (error)
            res.send({ success: false, error: error })
        else
        Bourse.findByIdAndUpdate(req.body._id, fakeBourse, ((err, bourse) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
                   
                    res.send({ success: true, bourse: bourse })
                }
            }))
    });

    bourseRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Bourse.findOne({ _id: _id }).exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    bourse: doc
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

        Bourse.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.bourseRouter = bourseRouter;