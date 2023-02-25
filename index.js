const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = 8000;

//import router
const drinkRouter = require('./app/routers/drinkRouter');
const voucherRouter = require('./app/routers/voucherRouter');

app.use(express.json());
// // Khai báo middleware đọc dữ liệu UTF-8
app.use(express.urlencoded({
    extended: true
}))



mongoose.connect("mongodb://localhost:27017/CRUD_Pizza365", (err) => {
    if (err) {
        throw err;
    }
    console.log("Connect Mongoose DP success")
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
});

app.use(express.static(__dirname + "/views"))

//chay router
app.use("/", drinkRouter);
app.use("/", voucherRouter);



app.listen(port, () => {
    console.log("app listening on port" + port);
});