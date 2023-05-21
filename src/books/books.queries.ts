export const bookQueries = {
    readBooks:
        `Select
           *
            FROM library.books`,
    readBooksByBookId:
    `Select
    *
     FROM library.books
     Where library.books.id = ?`,

    createBook:
        `INSERT INTO books(title, author, isbn, genre)
        VALUES(?,?,?,?)`, 

    deleteBook:
       ` Delete from library.books where id = ?`, 
    
    updateBook:
        `Update library.books
            Set title = ?, author = ?, isbn = ?, genre = ?
            where id = ?`
}