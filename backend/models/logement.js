const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const Logement = mongoose.model('Logement',new Schema({
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
        },
        prix : {
            type : String,
            require : false,
        },
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

function validateLogement(logement) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        nom: Joi.string().required(),
       
        telephone: Joi.string(),
       
        type: Joi.string(),
        prix: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        adresse: Joi.string(),
       
         lat : Joi.number(),
         lng : Joi.number(),
         selectedUniversite : Joi.objectId(),
      

     
    })
    return Joi.validate(logement, schema)
}

module.exports.validateLogement = validateLogement;
module.exports.Logement = Logement;
