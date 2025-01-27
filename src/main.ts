import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInfo = {
  api_path: "/docs",
  title: "Photos Service API",
  description: "Backend for photos service",
  version: '0.9',
  contact: {
    name: "name",
    url: "url",
    email: "email"
  },
  tags: ''
};

async function bootstrap() {
  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const doc_config = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .setVersion(swaggerInfo.version)
    .setContact(swaggerInfo.contact.name, swaggerInfo.contact.url, swaggerInfo.contact.email)
    .addTag(swaggerInfo.tags)
    .build();

  const document = SwaggerModule.createDocument(app, doc_config);
  SwaggerModule.setup(swaggerInfo.api_path, app, document);

  // Start the application on port 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
