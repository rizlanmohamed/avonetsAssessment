import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { 'X-Custom-Header': 'foobar' }
});

const getAllExpenses = () => {
    return api.get('/api/Customer/GetAll')
}

const deleteExpense = (id) => {
    return api.delete('/api/Customer/Delete/'+ id )
}

const createExpense = (data) => {
    return api.post('/api/Expense/Create', data)
}

const updateExpense = (data) => {
    return api.put('/api/Customer/Update', data)
}

export {
    getAllExpenses,
    deleteExpense,
    createExpense,
    updateExpense
}