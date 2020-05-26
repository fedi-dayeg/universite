const mongoose =require ("mongoose");
const express =require ( 'express');
const cors =require ( 'cors');
const bodyParser =require ( 'body-parser');
const fileUpload =require ( 'express-fileupload');
const Joi =require ( 'joi');
const ip =require ( 'ip');

const http =require ( 'http')
//import { getListEvents } from './googleFunctions'
// objectId for testing String with lenght > 25
Joi.objectId = require('joi-objectid')(Joi);
//database url
const URL = 'mongodb+srv://mohamed:CTjmEMzD9EbCJvu8@cluster0-jnv0n.mongodb.net/AppChallenge?retryWrites=true&w=majority';

// import routes

const { studentRouter } =require ( './routes/studentRoute');

const { classRouter } =require ( './routes/classRoute');
const { sousAdminRouter } = require ('./routes/responsableRoute');
const { adminRouter } = require ( './routes/adminRoute');
const { universiteRouter } = require ( './routes/universiteRoute');
const { logementRouter } = require ( './routes/logementRoute');
const { budgetRouter } = require ( './routes/budgetRoute');
const { bourseRouter } = require ( './routes/bourseRoute');
const { transportRouter } = require ( './routes/transportRouute');
// connect to database
mongoose.connect(URL, { userNewUrlParser: true })
    .then(() => {
        console.log('connecting to database...');
        const app = express();
        app.use(cors());
        app.use(bodyParser.json())
        // enable files upload
        app.use(fileUpload({
            createParentPath: true
        }));

        /** static folder */
        app.use('/uploads',express.static('uploads'));
        app.use(bodyParser.urlencoded({ extended: false }))
        // use routes
       
        app.use('/students', studentRouter)
        app.use('/classes', classRouter)
        app.use('/responsables', sousAdminRouter)
        app.use('/admins', adminRouter)
        app.use('/universites', universiteRouter)
        app.use('/logements', logementRouter)
        app.use('/budgets', budgetRouter)
        app.use('/bourses', bourseRouter)
        app.use('/transports', transportRouter)
     
       
        // listen on port 4000 
        app.listen({ port: 4000 }, () => {
            console.log(`server running...  at http://localhost:4000  or http://${ip.address()}:4000`);

        });

    }).catch(e => console.log("could not connect to database : ",e));