const { Budget, validateBudget } = require('../models/budget');
const express = require( 'express');

const budgetRouter = express.Router();



budgetRouter.route('/')
    /**
     * get all classes
     */
    .get((req, res) => {

        Budget.find({}).populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ budgets: docs, success: true })
            else throw err
        })

    })
    /**
     * add new class
     */
    .post((req, res) => {

      
     

        let fakeBudget = {
            nom: req.body.nom,
          
            type: req.body.type,
            description: req.body.description,
            prix :  req.body.prix,
            selectedUniversite : req.body.selectedUniversite,
         
        }

     
        const { error } = validateBudget(fakeBudget)
        if (error)
            res.send({ success: false, error: error })
        else {

        
            let budget =new Budget(fakeBudget );
   
           // let universite = new Universite(req.body)
           budget.save().then(budget => {
              
                res.status(200).send({success: true,budget : budget})
            }).catch(e => res.send({ success: false, error: e }))

        }
    })
    //update 
    .put((req, res) => {
      

        let fakeBudget = {
            nom: req.body.nom,
           type: req.body.type,
           prix :  req.body.prix,
            description: req.body.description,
        selectedUniversite : req.body.selectedUniversite,
         
        }
        const { error } = validateBudget(fakeBudget)
        if (error)
            res.send({ success: false, error: error })
        else
        Budget.findByIdAndUpdate(req.body._id, fakeBudget, ((err, budget) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
                   
                    res.send({ success: true, budget: budget })
                }
            }))
    });

    budgetRouter.route('/:id')
    .get((req, res) => {
        let _id = req.params.id
        Budget.findOne({ _id: _id }).exec((err, doc) => {
            if (!err) {
                res.send({
                    success: true,
                    budget: doc
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

        Budget.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });
    })
 
    module.exports.budgetRouter = budgetRouter;