const express = require('express')
const app = express();
const router = express.Router()

app.use(express.json());
let books =
[
    {id:1, title:'book1'},
    {id:2, title:'book2'},
    {id:3, title:'book3'},
]
router.get('/books', (request, response)=>
{
    response.json(books);
});

router.get('/books/:id', (request, response)=>
{
    const bookId = parseInt(request.params.id)
    const book = books.find((b) => b.id === bookId)
    if(!book)
    {
        return response.status(404).json({message:"Book not found"})
    }
    return response.json(book)
});
router.post('/books', (request, response)=>
{
    const {title} = request.body;
    const newBook = {id: books.length+1, title}
    books.push(newBook)
    response.status(201).json(newBook)

});

router.put('/books/:id', (request, response)=>
{
    const bookId = parseInt(request.params.id)
    const bookIndex = books.findIndex((b) => b.id ===bookId)
    if(bookIndex!==1)
    {
        const {title} = request.body;
        books[bookIndex]={...books[bookIndex], title}
        response.json({message:'Book updated successfully'})
    }
    else{
        response.status(400).json({message:'Book not found'})
    }
});

router.delete('/books/:id', (request,response)=>
{
    const bookId = parseInt(request.params.id)
    const bookIndex= books.findIndex((b)=> b.id === bookId)
    if(bookIndex!== 1)
    {
        books[bookIndex]=books.splice(bookIndex, 1)
        response.status(200).json({message:'book deleted successfully'})
    }
    else{
        response.status(400).json({message:'Book not found'})
    }
})

app.use('/ani', router);

app.listen(3600, ()=>
{
    console.log("server is running");
});