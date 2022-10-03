"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api = exports.createNestServer = void 0;
const common_1 = __webpack_require__(4);
const core_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(6);
const app_module_1 = __webpack_require__(7);
const functions = __webpack_require__(69);
const express = __webpack_require__(70);
const platform_express_1 = __webpack_require__(71);
const server = express();
const createNestServer = async (expressInstance) => {
    const adapter = new platform_express_1.ExpressAdapter(expressInstance);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter, {});
    app.setGlobalPrefix('/api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Fashion App')
        .setDescription('The improved fashion app API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const customOptions = {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            docExpansion: 'none',
        },
        customSiteTitle: 'Fashion App API Docs',
    };
    swagger_1.SwaggerModule.setup('swagger', app, document, customOptions);
    app.enableCors({
        origin: ['http://localhost:3001', /\.example2\.com$/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    return app.init();
};
exports.createNestServer = createNestServer;
(0, exports.createNestServer)(server)
    .then(() => console.log('Nest Ready'))
    .catch((err) => console.error('Nest broken', err));
exports.api = functions.https.onRequest(server);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fc97e8b001bef12ad5c3")
/******/ })();
/******/ 
/******/ }
;