import { Request, RequestHandler, Response } from "express";
import * as BookDao from './books.dao';
import { OkPacket } from "mysql";

export const readBooks : RequestHandler = async (req: Request, res: Response) => {
    try {
        let books;
        let bookId = parseInt(req.query.bookId as string);
        
        console.log("BookId: ", bookId);

        if(Number.isNaN(bookId)){
            books = await BookDao.readBooks();
        } else{
            books = await BookDao.readBooksByBookId(bookId);
        }
        res.status(200).json(
            books
        );
    } catch (error) {
        console.error("[booksController]", error);
        res.status(500).json({
            message: "Ther was and error read books"
        });
    }
};

export const createBook : RequestHandler = async (req: Request, res: Response)=>{
    try {
        let book = await BookDao.createBook(req.body)
          
        console.log('req.body', req.body);

        res.status(200).json(
            book
        );
    
    } catch (error) {
        console.error('[books.controller].[createbook]', error);
        res.status(500).json({
            message: "There was an error writing books"
        });
    }
}

export const deleteBook : RequestHandler = async (req: Request, res: Response) =>{
    try {
        let bookId = parseInt(req.params.bookId as string);
        
        console.log('albumId', bookId);
        
        if(!Number.isNaN(bookId)){
            const response = await BookDao.deleteBook(bookId);

            res.status(200).json(
                response
            );
        } else{
            throw new Error("Integer expected");
            
        }
    } catch (error) {
        console.error(`[albums.controller][deleteAlbums][Error]`, error);
        res.status(500).json({
            message: "There was an error deleteing albums"
        });
    }
};

export const updateBook : RequestHandler = async(req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await BookDao.updateBook(req.body);

        console.log(`req.body: `, req.body);
        console.log(`book`, okPacket);

        res.status(200).json(
            okPacket
        );
   
    } catch (error) {
        console.error(`[books.controllers][updatebooks]`, error);
        res.status(500).json(
            {message: "There was an error updating books"}
        );
    }
}