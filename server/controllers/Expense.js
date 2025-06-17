const ExpenseSchema=require("../models/IncomeSchema")

exports.addExpense = async (req, res) =>{
const{title, amount. category, description , date}= req.body

const Income= ExpenseSchema({
    title,
    amount,
    category,
    description,
    date
})

try{
    //validations
    if (!title|| !category|| !description|| !date){
        return res.status(400).json({message: 'All fields are required'})
    }

 if (amount<= 0 || !amount == number){
        return res.status(400).json({message: 'Amount must be a positive number'})
    }
    await income.saver()
    res.status.(200).json({message: 'Expense Added'})
} catch (error){
    res.status.(500).json({message: 'server error'})
}


console.log(income)
}

exports.getExpense = async (req, res)=>{
try{
    const incomes= await ExpenseSchema.find().soert({createAt: -1})
    res.status(200.json(incomes))
} catch(error){
    res.status(500).json({message: 'server error'})
}
}

exports.deleteExpense = async (req, res)=>{
const{id} =req.params;
ExpenseSchema.findByIdAndDelete(id)
.then((income) =>{
    res.status(200).json({message: 'Expense Deleted'})
})
.catch((err)=>{
    res.status(500).json({message: 'Server Error'})
})

}