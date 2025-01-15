const express = require('express');//import module
const app = express();//initialize express
const fs = require('fs');//


//Respond with "Hello, World!" for all incoming requests.
app.get('/',(req,res)=>{
    res.send('Hello, World!')
})
//Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//khaled

//create array items
let items=[
    {id:1,name:"khaled" ,age:22},
    {id:2,name:"Ali"    ,age:25},
    {id:3,name:"mohamed",age:28}
];
//GET /items: Return a list of items as a JSON array.
//get /items-->fetch all items
//http://localhost:3000/items
app.get('/items',(req,res)=>{
    res.json(items);});

//POST /items: Add a new item to the array and log it to the console.
//POST /items -->Create a new item
app.post('/items',(req,res)=>{
    const new_item=req.body;
    items.push(new_item);
    res.status(201).json(new_item);});
//PUT /items/ Update an existing item by its index.
//PUT /items/id--> update
app.put('/items/:id',(req,res)=>{
    const user_id=parseInt(req.params.id);
    const {name,age}=req.body;
    const item=items.find(i =>i.id===user_id)

    if(item){
        //update
        item.name=name;
        item.age=age;
        res.send(items)
    }
    else{
        res.status(404).send('Item not found');//error-handling 
    }
});
//DELETE /items/ Remove an item by its index.
//DELETE /items/id-->delete 
//we use splice() to remove it from the array.
app.delete('/items/:id', (req, res) => {
    const user_id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === user_id);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
    }
    else
    {
        res.status(404).send('Item not found');//error-handling 
    }
});

// const text =fs.readFileSync("example.txt","utf-8");
// console.log(text);
try {
    const text = fs.readFileSync("example.txt", "utf-8");
    console.log(text);
} catch (err) {
    console.error("Error reading the file:", err.message);
}

// const append_text=fs.writeFileSync("example.txt","Welcome to file operations!","utf-8");
// console.log(append_text);
try {
    const append_text=fs.writeFileSync("example.txt", "Welcome to file operations!", "utf-8");
    console.log(append_text);
} catch (err) {
    console.error("Error writing to the file:", err.message);
}