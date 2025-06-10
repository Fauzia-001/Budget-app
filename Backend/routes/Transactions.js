const router = require('express').Router()



router.post('/add-income', addIncome)
.get('/get-incomes',getIncomes)
.delete('/delete-income/:id', deleteIncome)
.post('/add-expense', addexpense)
.get('/get-expenses', getexpenses)
.delete('/delete-expense/:id', deleteExpense)
module.exports=router