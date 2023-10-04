import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './entities/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  /**
   *
   * Get all book
   * @returns Book
   */
  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  /**
   *
   * Create a new Book
   * Creation d'une Book avec l'authorization d'une User
   * @param book
   * @returns book
   */
  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    // console.log(req.user);

    return this.bookService.create(book, req.user);
  }

  /**
   * Get one Book by id
   * @param id
   * @returns book
   */
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  /**
   *
   * Update the book by id
   * @param id
   * @param book
   * @returns book
   */
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  /**
   * Delete book by id
   * @param id
   * @returns book deleted
   */
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
