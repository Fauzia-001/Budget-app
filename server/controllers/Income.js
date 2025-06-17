const IncomeSchema=require("../models/IncomeSchema")

exports.addIncome = async (req, res) =>{
const{title, amount. category, description , date}= req.body

const Income= IncomeSchema({
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
    res.status.(200).json({message: 'Income Added'})
} catch (error){
    res.status.(500).json({message: 'server error'})
}


console.log(income)
}

exports.getIncome = async (req, res)=>{
try{
    const incomes= await IncomeSchema.find().sort({createAt: -1})
    res.status(200).json(incomes) 
} catch(error){
    res.status(500).json({message: 'server error'})
}
}

exports.deleteIncome = async (req, res)=>{
const{id} =req.params;
IncomeSchema.findByIdAndDelete(id)
.then((income) =>{
    res.status(200).json({message: 'Income Deleted'})
})
.catch((err) =>{
    res.status(500).json({message: 'Server Error'})
})
}