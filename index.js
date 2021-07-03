const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();
const dotenv = require('dotenv');
const RouteProduct = require('./routes/RouteProduct');
const RouteUser = require('./routes/RouteUser');
dotenv.config();
app.use(cors()); 
app.use(express.json());

app.use('/api/v1/products',RouteProduct);
app.use('/api/v1/users',RouteUser);


app.listen(PORT,() => {
    console.log(`server listening on ${PORT}`);
});

