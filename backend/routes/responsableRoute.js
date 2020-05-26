const { Teacher, validateStudent } = require('../models/responsable');

const express =require( 'express');
const randomstring =require('randomstring');

const bcrypt =require( 'bcrypt')
const saltRounds = 10;
 const sousAdminRouter = express.Router();

sousAdminRouter.route('/')
    /** get All Teachers */
    .get((req, res) => {
        Teacher.find({}).populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ teachers: docs, success: true })
            else throw err
        })
    })

        //update 
        .put((req, res) => {
         
            let fakeTeacher = {
                fullName: req.body.fullName,
             
                email: req.body.email,
                telephone: req.body.telephone,
               
                selectedUniversite : req.body.selectedUniversite,
             
            }
    
            const { error } = validateStudent(fakeTeacher)
            if (error)
                res.send({ success: false, error: error })
            else
            Teacher.findByIdAndUpdate(req.body._id, fakeTeacher, ((err, teacher) => {
               
                    if (err) {
                        res.send({ success: false })
                    } else {
                       
                        res.send({ success: true, teacher: teacher })
                    }
                }))
        })
    // add new teacher
    .post((req, res) => {

        let password = randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
        let fakeTeacher = {
            fullName: req.body.fullName,
          
            email: req.body.email,
            telephone: req.body.telephone,
            password : password,
            selectedUniversite : req.body.selectedUniversite,
         
        }

       // let fakeTeacher = req.body
        const { error } = validateStudent(fakeTeacher)
        if (error)
            res.send({ success: false, error: error })
        else {
            let teacher = new Teacher(fakeTeacher)
          
            
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(fakeTeacher.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    teacher.password = hash
                    teacher.save().then(teacher => {
                      
                                res.send({
                                    success: true,
                                    teacher: teacher
                                })
                         

                    }).catch(e => res.send({ success: false , error : e }))
                });
            });
        }
    });
    

    sousAdminRouter.route('/:id')
    // delete teacher method
    .delete((req, res) => {
        let _id = req.params.id
        Teacher.remove({ _id: _id }, function (err) {
            if (!err) {
                res.send({ success: true })
            }
            else {
                res.send({ success: false })
            }
        });

    })
    module.exports.sousAdminRouter = sousAdminRouter;