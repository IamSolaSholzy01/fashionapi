import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

declare const module: any;

// const expressServer = express();

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Fashion App')
    .setDescription('The improved fashion app API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
    customSiteTitle: 'Fashion App API Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
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
// bootstrap();

// const createFunction = async (expressInstance): Promise<void> => {
//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(expressInstance),
//   );
//   await app.init();
// };
// export const api = functions.https.onRequest(async (request, response) => {
//   await createFunction(expressServer);
//   expressServer(request, response);
// });

export default bootstrap;
