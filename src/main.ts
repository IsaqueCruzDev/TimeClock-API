import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle("TimeClock")
    .setDescription("Eletronic TimeClock API description")
    .setVersion("1.0")
    .addTag("timeClock")
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("swagger", app, documentFactory)

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();