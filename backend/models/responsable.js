const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const Joi = require('joi');


 const Teacher = mongoose.model('Responsable', new Schema({

    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    role: {
        type: String,
        default: 'utilisateur'
    },
    email : {
        type: String,
        required: true,
        unique : true,
    },
    telephone : {
        type: String,
        required: false,
       
    },
    password : {
        type: String,
        required: false,
    },
  
    selectedUniversite : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'Universite'
    }

    }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
}));

 function validateStudent(teacher) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        fullName: Joi.string().min(2).max(50).required(),
        email : Joi.string().email().required(),
        password : [Joi.string()],
      
        telephone : Joi.string(),
        selectedUniversite : Joi.objectId(),
    })
    return Joi.validate(teacher, schema)
}
module.exports.validateStudent = validateStudent;
module.exports.Teacher = Teacher;