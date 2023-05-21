import {OkPacket} from "mysql";
import { execute } from "../services/mysql.connector";
import { Book } from "./books.model";
import { bookQueries } from "./books.queries";

export const readBooks = async () => {
    return execute<Book[]>(bookQueries.readBooks,[]);
}
export const readBooksByBookId = async (bookId: number) =>{
    return execute<Book[]>(bookQueries.readBooksByBookId, [bookId]);
}
export const createBook = async (book:Book) =>{
    return execute<Book>(bookQueries.createBook,
        [book.title, book.author, book.isbn, book.genre]);
}

export const deleteBook = async (bookId: number) =>{
    return execute<OkPacket[]>(bookQueries.deleteBook, [bookId])
}

export const updateBook = async (book:Book) =>{
    return execute<OkPacket>(bookQueries.updateBook, 
        [book.title, book.author, book.isbn, book.genre, book.bookId]);
}