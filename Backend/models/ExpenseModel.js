const mongoose=require('mongoose');


const ExpenseSchema= new mongoose.Schema({
    title: {
        type:string,
        required:true,
        trim:true,maxlength:50
    },
    amount: {
        type:Number,
        required:true,
        maxlength:20,
        trim:true
   
    },
    type:{
        type:string,
        default:"Income"
    },
     
    date: {
        type:Date,
        required:true,
        trim:true
    },
    
     category: {
        type:string,
        required:true,
        trim:true
     },
      description: {
        type:string,
        required:true,
        maxlength:20,
        trim:true
   
}, {timestamps:true})

module.exports= mongoose.model('Expense', ExpenseSchema)