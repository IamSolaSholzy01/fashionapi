"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const express = require("express");
const platform_express_1 = require("@nestjs/platform-express");
const functions = require("firebase-functions");
const path_1 = require("path");
const expressServer = express();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    swagger_1.SwaggerModule.setup('docs', app, document, customOptions);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'static'), {
        prefix: 'docs',
    });
    app.enableCors({
        origin: ['http://localhost:3001', /\.example2\.com$/],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    await app.listen(process.env.PORT || 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
const createFunction = async (expressInstance) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    await app.init();
};
exports.api = functions.https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
//# sourceMappingURL=main.js.map