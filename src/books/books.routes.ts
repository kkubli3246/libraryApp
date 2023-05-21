import { Router } from "express";
import * as BooksController from "./books.contoller"

const router = Router();

//GET
router
    .route('/books')
    .get(BooksController.readBooks);

//CREATE
router  
    .route('/books')
    .post(BooksController.createBook);

//DELETE
router
    .route(`/books/:bookId`)
    .delete(BooksController.deleteBook);

//Update
router
    .route(`/books`)
    .put(BooksController.updateBook);
export default router