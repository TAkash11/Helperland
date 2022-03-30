import express from "express";
import {sequelize} from "./models";
import bodyParser from "body-parser";
import multer from "multer";
import  swaggerJSDoc from "swagger-jsdoc";
import  swaggerUI from "swagger-ui-express";
import bookservice from "./routes/bookServiceRoutes";
import contactUs from "./routes/contactUsRoutes";
import login from "./routes/SignUpInRoutes";
import customer from "./routes/customerPagesRoutes";
import serviceProvider from "./routes/serviceProviderRoutes";
import admin from './routes/adminPagesRoutes'

import dotenv from "dotenv";

dotenv.config();
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Api',
            version: '1.0.0',
            description: 'User API for Helperland Project',
            contact: {
                name: 'Akash Thakkar',
                url: 'http://web1.anasource.com/helperland/',
                email: 'helperland@tatvasoft.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis:["./routes/contactUsRoutes.ts","./routes/SignUpInRoutes.ts","./routes/bookServiceRoutes.ts", "./routes/customerPagesRoutes.ts","./routes/serviceProviderRoutes.ts","./routes/adminPagesRoutes.ts"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(multer({dest:'uploadFiles'}).single('file'))

app.use('/helperland/contact-us',contactUs);
app.use('/helperland/Login-User',login);
app.use('/helperland/bookservice',bookservice);
app.use('/helperland/customer',customer);
app.use('/helperland/serviceprovider',serviceProvider);
app.use('/helperland/admin',admin);

app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    sequelize.authenticate().then(async() => {
        console.log("database connected");
        // try {
        //     await sequelize.sync()
        // } catch (error) {
        //     console.log(error)
        // }

    }).catch( (e: any) => {
        console.log(e.message)
    });
});