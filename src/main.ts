import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fashion App')
    .setDescription('The improved fashion app API')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Fashion App API Docs',
  };
  SwaggerModule.setup('docs', app, document, customOptions);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
