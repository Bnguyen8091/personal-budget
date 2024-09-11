const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 375
        },
        {
            title: 'Grocery',
            budget: 110
        },
        {
            title: 'Utilities',
            budget: 100
        },
        {
            title: 'Entertainment',
            budget: 50
        },
        {
            title: 'Transportation',
            budget: 60
        },
        {
            title: 'Savings',
            budget: 200
        }
    ]
};

app.get('/hello', (rqe, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
