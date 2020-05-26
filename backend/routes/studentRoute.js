const { Student, validateStudent } = require('../models/student');
const { Class } = require("../models/class")
const express = require( 'express');
const bcrypt = require( 'bcrypt')
const saltRounds = 10;
const {sendPasswords} = require( '../mails/sendEmail')
const randomstring = require( 'randomstring');

 const studentRouter = express.Router();

studentRouter.route('/')
    /** get All Students */
    .get((req, res) => {
        Student.find({}).populate('selectedClass', 'name').populate('selectedUniversite', 'nom').exec((err, docs) => {
            if (!err) res.send({ students: docs, success: true })
            else throw err
        })
    })
    //update 
    .put((req, res) => {
     
       
        let fakeStudent = {
            fullName: req.body.fullName,
        
            email: req.body.email,
            telephone: req.body.telephone,
            selectedClass : req.body.selectedClass,
            selectedUniversite : req.body.selectedUniversite,
         
        }

        const { error } = validateStudent(fakeStudent)
        if (error)
            res.send({ success: false, error: error })
        else
        Student.findByIdAndUpdate(req.body._id, fakeStudent, ((err, student) => {
           
                if (err) {
                    res.send({ success: false })
                } else {
               
                    res.send({ success: true, student: student })
                }
            }))
    })
    // add new student
    .post((req, res) => {

        let password = randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
   
        let fakeStudent = {
            fullName : req.body.fullName,
            email : req.body.email,
            telephone : req.body.telephone,
            password : password,
          
            selectedClass : req.body.selectedClass,
            selectedUniversite : req.body.selectedUniversite
              }



        const { error } = validateStudent(fakeStudent)
        if (error)
            res.send({ success: false, error: error })
        else {
            let student = new Student(fakeStudent)
    
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(fakeStudent.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    student.password = hash
                    student.save().then(student => {
                     
                        Class.findByIdAndUpdate({ "_id": fakeStudent.selectedClass }, { "$push": { "students": student._id } },
                            (err, student) => {
                                if (err) {
                                    res.send({ success: false })
                                } else {
                                    
                                            res.send({
                                                success: true,
                                                student: student
                                            })
                                    
                                }
                            })

                    }).catch(e => res.send({ success: false , err : e }))
                });
            });
        }
    });

studentRouter.route('/:id')
    // delete student method
    .delete((req, res) => {
        let _id = req.params.id
        Student.findById(_id, (err, student) => {
            let _idClass = student.selectedClass
            Student.remove({ _id: _id }, function (err) {
                if (!err) {
                    Class.findByIdAndUpdate({ "_id": _idClass }, { "$pull": { "students": _id } },
                        (err, docs) => {
                            if (err) {
                                res.send({ success: false })
                            } else {
                                res.send({
                                    success: true
                                })
                            }
                        })
                }
                else {
                    res.send({ success: false , err : err })
                }
            });
        })

    })
    module.exports.studentRouter = studentRouter;
   