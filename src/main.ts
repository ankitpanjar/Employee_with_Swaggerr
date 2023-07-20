import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule} from "@nestjs/swagger"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options=new DocumentBuilder()
  .setTitle("...TASK..")
  .setDescription("Nest js with Postgresql")
  .setVersion("3.1.0")
  .addBearerAuth({
    type:"http",
    scheme:"bearer",
    bearerFormat:"JWT",
    name:"JWT",
    description:"Enter JWT Token...",
    in:"header"
  },"JWT-Auth").build() ;

  const document=SwaggerModule.createDocument(app,options);

  SwaggerModule.setup("api",app,document)
  await app.listen(3000);
}
bootstrap();
