import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  /**
   * Constructor qui injecte le bookModel dans le service
   * @param bookModel
   */
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  /**
   * Fonction qui récupère tous les livres
   * Si in ajoute un query, il fait une recherche
   * @returns books
   */
  async findAll(query: Query): Promise<Book[]> {
    // Résultats par page
    const resPerPage = 2;
    // Page actuel = nombre de page (exemple "page:6") sinon page:1
    const currentPage = Number(query.page) || 1;
    // Passer la page
    const skip = resPerPage * (currentPage - 1);
    // Mots clé
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel
      .find({ ...keyword }) // mots clé du recherche
      .limit(resPerPage) //Limite de resultats par page
      .skip(skip); // passer le résultat
    return books;
  }

  /**
   *
   * Fonction qui ajoute une livre
   * @param book
   * @returns book
   */
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  /**
   * FOnction qui récupère une seule book
   * @param id
   * @returns book
   */
  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  /**
   * Fonction qui ré
   * @param id
   * @param book
   * @returns
   */
  async updateById(id: string, book: Book): Promise<Book> {
    const res = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }

  async deleteById(id: string): Promise<Book> {
    const res = await this.bookModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }
}
