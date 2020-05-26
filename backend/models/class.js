const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 const Class = mongoose.model('Class', new Schema({
    name: {
        type: String,
        required: true,
        unique : true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        unique : true,
        ref: 'Etudiant'
    }],
    college_year: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
}));
 function validateClass(classe) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        name: Joi.string().min(2).max(50).required(),
        college_year : Joi.string().required(),
    })
    return Joi.validate(classe, schema)
}
module.exports.validateClass = validateClass;
module.exports.Class = Class;