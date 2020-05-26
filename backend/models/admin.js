const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;
const Joi = require('joi');


 const Admin = mongoose.model('Admin', new Schema({

    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'admin'
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'created_at'
    }
}));

 function validateAdmin(admin) {
    const schema = Joi.object({
        _id: [Joi.objectId()],
        fullName: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: [Joi.string()],
        avatar: [Joi.string()],
    })
    return Joi.validate(admin, schema)
}
module.exports.validateAdmin = validateAdmin;
module.exports.Admin = Admin;
