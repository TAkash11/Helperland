"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bookServiceRoutes_1 = __importDefault(require("./routes/bookServiceRoutes"));
const contactUsRoutes_1 = __importDefault(require("./routes/contactUsRoutes"));
const SignUpInRoutes_1 = __importDefault(require("./routes/SignUpInRoutes"));
const customerPagesRoutes_1 = __importDefault(require("./routes/customerPagesRoutes"));
const serviceProviderRoutes_1 = __importDefault(require("./routes/serviceProviderRoutes"));
const adminPagesRoutes_1 = __importDefault(require("./routes/adminPagesRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
    apis: ["./routes/contactUsRoutes.ts", "./routes/SignUpInRoutes.ts", "./routes/bookServiceRoutes.ts", "./routes/customerPagesRoutes.ts", "./routes/serviceProviderRoutes.ts", "./routes/adminPagesRoutes.ts"]
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ dest: 'uploadFiles' }).single('file'));
app.use('/helperland/contact-us', contactUsRoutes_1.default);
app.use('/helperland/Login-User', SignUpInRoutes_1.default);
app.use('/helperland/bookservice', bookServiceRoutes_1.default);
app.use('/helperland/customer', customerPagesRoutes_1.default);
app.use('/helperland/serviceprovider', serviceProviderRoutes_1.default);
app.use('/helperland/admin', adminPagesRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    models_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        // try {
        //     await sequelize.sync()
        // } catch (error) {
        //     console.log(error)
        // }
    })).catch((e) => {
        console.log(e.message);
    });
});
