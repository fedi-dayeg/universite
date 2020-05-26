const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const Budget = mongoose.model('Budget',new Schema({
    nom: {
        type: String,
        required: true,
      
    },
   
 
  
    type: {
        type: String,
        required: false,
      
    },
    description: {
        type: String,
        required: false,
    
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

function validateBudget(budget) {
    const schema = Joi.object({
        _id : [Joi.objectId()],
        nom: Joi.string().required(),
        type: Joi.string(),
        prix: Joi.string(),
        description: Joi.string(),
       
         selectedUniversite : Joi.objectId(),
      

     
    })
    return Joi.validate(budget, schema)
}

module.exports.validateBudget = validateBudget;
module.exports.Budget = Budget;
