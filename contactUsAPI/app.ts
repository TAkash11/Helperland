import express from "express";
import {sequelize} from "./models";
import router from "./routes";
import multer from "multer";
import bodyParser from "body-parser";



require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


app.use(multer({dest:'uploadFiles'}).single('file'));

app.use('/',router);

app.listen(process.env.PORT, () => {
    console.log(`Server starting at ${process.env.PORT}`)
    sequelize.authenticate().then(async() => {
        console.log("database connected");

        try {
            await sequelize.sync();
        } catch (error) {
            console.log(error)
        }

    }).catch( (e: any) => {
        console.log(e.message)
    })
})