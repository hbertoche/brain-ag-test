import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutorModule } from './produtor/produtor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'isis',
      database: 'brain-ag-test',
      entities: [__dirname + '/produtor/*.entity.{js,ts}'],
      synchronize: true, // Set to false in production
    }),
    ProdutorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
