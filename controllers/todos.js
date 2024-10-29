const Todo = require('../models/Todo') //Todo model to handle database


module.exports = {
    getTodos: async (req,res)=>{
        try{
            //find all todo items
            const todoItems = await Todo.find() 
            //count all docs that are not completed
            const itemsLeft = await Todo.countDocuments({completed: false}) 
            //render todo page and pass in all todos and items left incomplete
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft}) 

        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },

    //function runs for client side
    markComplete: async (req, res)=>{
        try{
            //get item that matches the id in database
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                //change completed property to the value of true
                completed: true
            })
            console.log('Marked Complete')
            //respond to client side js with marked complete
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    