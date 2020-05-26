const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const Universite = mongoose.model('Universite',new Schema({
    nom: {
        type: String,
        required: true,
      
    },
   
    telephone: {
        type: Number,
        required: false,
    
    },
  
    type: {
        type: String,
        required: false,
      
    },
    description: {
        type: String,
        required: false,
    
    },
    image: {
        type: String,
        required: false,
      
    }, 
   
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
       
   
   
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'created_at'
        }
    }));

function validateUniversite(universite) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        nom: Joi.string().required(),
       
        telephone: Joi.string(),
       
        type: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        adresse: Joi.string(),
       
         lat : Joi.number(),
         lng : Joi.number(),
        
      

     
    })
    return Joi.validate(universite, schema)
}

module.exports.validateUniversite = validateUniversite;
module.exports.Universite = Universite;
