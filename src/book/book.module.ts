import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './entities/book.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  /**
   * Importation de l'auth module pour le protection
   * importation du module mongoose pour l' entity Book
   * Nom de l'Entity
   * Nom du schema
   */
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
