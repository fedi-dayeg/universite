const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const MongooseTrigger = require('mongoose-trigger');

const StudentSchema =  new Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email : {
        type: String,
        required: true,
    },
    
    telephone : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'student'
    },
  
    selectedClass : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Class'
    },
    selectedUniversite : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Universite'
    }
}, 
    {timestamps: {
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
}) 

 const Student = mongoose.model('Etudiant',StudentSchema);

 function validateStudent(student) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        fullName: Joi.string().min(2).max(50).required(),
        email : Joi.string().email().required(),
        password : [Joi.string()],
     
        selectedClass : Joi.objectId(),
        selectedUniversite : Joi.objectId(),
        telephone : Joi.string(),
    })
    return Joi.validate(student, schema)
}
module.exports.validateStudent = validateStudent;
module.exports.Student = Student;