import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExeptionsFilter } from './infra/AllExeptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  app.useGlobalFilters(new AllExeptionsFilter())

  const config = new DocumentBuilder()
    .setTitle("TimeClock")
    .setDescription("Eletronic TimeClock API description")
    .setVersion("1.0")
    .addTag("timeClock")
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("swagger", app, documentFactory)
  // deploy on azure 
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
