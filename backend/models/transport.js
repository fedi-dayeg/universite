const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const Transport = mongoose.model('Transport',new Schema({
    nom: {
        type: String,
        required: true,
      
    },
   
   
  
    type: {
        type: String,
        required: false,
      
    } ,
   
        lat : {
            type : Number,
            require : false,
        },
        lng : {
            type : Number,
            require : false,
        },

        adresse : {
            type : String,
            require : false,
        }
        ,
        selectedUniversite : {
            type: mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'Universite'
        }
   
   
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'created_at'
        }
    }));

function validateTransport(transport) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        nom: Joi.string().required(),
        type: Joi.string(),      
        adresse: Joi.string(),  
         lat : Joi.number(),
         lng : Joi.number(),
         selectedUniversite : Joi.objectId(),
    })
    return Joi.validate(transport, schema)
}

module.exports.validateTransport = validateTransport;
module.exports.Transport = Transport;
