const { Class, validateClass } = require('../models/class');
const express = require( 'express');

const classRouter = express.Router();

classRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Class.find({}, (err, docs) => {
            if (!err)
                res.send({ classes: docs, success: true })
            else
                throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {
        let fakeClass = {
            name: req.body.name,
            college_year: req.body.college_year,
        }
        const { error } = validateClass(fakeClass)
        if (error)
            res.send({ success: false, error: error })
        else {
            let classe = new Class(req.body)
            classe.save().then(classe => res.send({
                success: true,
                class: classe
            })).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
        let classe = req.body
        const { error } = validateClass(classe)
        if (error)
            res.send({ success: false, error: error })
        else
            Class.findByIdAndUpdate(req.body._id, req.body, ((err, classe) => {
                if (err) {
                    res.send({ success: false })
                } else {
                    res.send({ success: true, class: classe })
                }
            }))
    });

classRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Class.findOne({ _id: _id }).populate("students").exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    classe: doc
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

        Class.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.classRouter = classRouter;