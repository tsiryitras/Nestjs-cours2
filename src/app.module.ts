import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    /**
     * Importation du module de configuration pour l'env
     */
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    /**
     * Importation du module Book
     */
    BookModule,
    /**
     * Importation du module Mongoose pour le root du projet
     */
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
  ],
  /**
   * Importation du controller
   */
  controllers: [AppController],
  /**
   * Importation du service de l'app
   */
  providers: [AppService],
})
export class AppModule {}
