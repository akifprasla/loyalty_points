const express = require('express')
const cors = require('cors')
const app = express()
require("dotenv").config();

const mysql = require('mysql')

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})


//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//post request to insert data into database coming from frontend 
app.post("/api/insert", (req, res) => {

    const cust_id = req.body.custNumber
    const cust_name = req.body.custName
    const cust_points = req.body.custPurchase
    const last_purchase = cust_points

    const sqlInsert = "INSERT INTO loyalty (cust_id, cust_name, cust_points, last_purchase) VALUES (?,?,?,?)"
    db.query(sqlInsert, [cust_id, cust_name, cust_points, last_purchase], (err, result) => {
        if (err) {
            console.log(err);
            res.send("unsuccessful")
        }
        else{
            res.send("successful")
        }
    })
})


//get request to search current data in our database
app.get("/api/get/:custNumber", (req, res) => {

    const cust_id = req.params.custNumber
    const sqlSelect = "SELECT * FROM loyalty WHERE cust_id = ?"
    db.query(sqlSelect, [cust_id], (err, result) => {
        res.send(result)
    })
})

//put request to update the customer points when they buy something
app.put("/api/update/:custPurchase/:custPoints/:searchNumber", (req, res) => {

    const cust_purchase = parseInt(req.params.custPurchase)
    var currentValue = parseInt(req.params.custPoints)
    var cust_Number = req.params.searchNumber
    
    const sqlUpdate = "UPDATE loyalty SET cust_points = ?, last_purchase = ? WHERE cust_id = ?;"
    db.query(sqlUpdate, [(cust_purchase+currentValue),cust_purchase,cust_Number], (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })

})

//Axios request to redeem points
//put request to update the customer points when they buy something
app.put("/api/redeem/:custPurchase/:custPoints/:searchNumber", (req, res) => {

    const cust_purchase = parseInt(req.params.custPurchase)
    var currentValue = parseInt(req.params.custPoints)
    var cust_Number = req.params.searchNumber

    const sqlUpdate = "UPDATE loyalty SET cust_points = ? WHERE cust_id = ?;"
    db.query(sqlUpdate, [(currentValue-cust_purchase),cust_Number], (err, result) => {
        if(err) console.log(err);
        res.send(result)
    })

})

//delete request to remove a customer from our databse
app.delete("/api/delete/:custNumber",(req,res) => {

    const cust_id = req.params.custNumber
    const sqlSelect = "DELETE FROM loyalty WHERE cust_id = ?"
    db.query(sqlSelect, [cust_id], (err, result) => {
        res.send(result)
    })
})


app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(3001, () => {
    console.log("server running");
})