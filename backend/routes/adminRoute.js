const { Admin, validateAdmin } = require('../models/admin');
const { Student } = require('../models/student');
const { Teacher } = require('../models/responsable');
const express= require( 'express');
const bcrypt = require( 'bcrypt')
const saltRounds = 10;
 const adminRouter = express.Router();
adminRouter.route('/')
    /** get All admins */
    .get((req, res) => {
        Admin.find({}).exec((err, docs) => {
            if (!err) res.send({ admins: docs, success: true })
            else throw err
        })
    })
    // add new admin
    .post((req, res) => {
        let fakeAdmin = req.body
        const { error } = validateAdmin(fakeAdmin)
        if (error)
            res.send({ success: false, error: error })
        else {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(fakeAdmin.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    fakeAdmin.password = hash
                    let admin = new Admin(fakeAdmin)
                    admin.save().then(admin => {
                        res.send({
                            success: true,
                            admin: admin
                        })
                    }).catch(e => res.send({ success: false }))
                });
            });
        }
    });
adminRouter.route('/:id')
    // delete admin method
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


/**
 * @Login function
 */
adminRouter.route('/login')
    .post((req, res) => {
        let { email, password } = req.body
        Admin.findOne({ email: email }).then(admin => {
            if (!admin) {
                Teacher.findOne({ email: email }).then(teacher => {
                    if (!teacher) {
                        Student.findOne({ email: email }).then(student => {
                            if (!student) {
                                res.send({ success: false })
                            } else {
                                bcrypt.compare(password, student.password).then((data) => {
                                    if (!data)
                                        res.send({ success: 'false', err: 'password not valid' })
                                    else
                                        res.send({
                                            success: true,
                                            logged: true,
                                            user: student,
                                        })
                                });
                            }
                        })
                    } else {
                        bcrypt.compare(password, teacher.password).then((data) => {
                            if (!data)
                                res.send({ success: 'false', err: 'password not valid' })
                            else
                                res.send({
                                    success: true,
                                    logged: true,
                                    user: teacher,
                                })
                        });
                    }
                });
            }
            else {
                bcrypt.compare(password, admin.password).then((data) => {
                    if (!data)
                        res.send({ success: 'false', err: 'password not valid' })
                    else
                        res.send({
                            success: true,
                            logged: true,
                            user: admin,
                        })
                });
            }
        })
    })

    module.exports.adminRouter = adminRouter;