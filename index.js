const express = require('express')
const cors = require('cors')
const { connectDb } = require('./config/db')
const { userRouter } = require('./routes/user.route')
const { restaurantRouter } = require('./routes/restaurant.route')
const { orderRouter } = require('./routes/order.route')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Food delivery app")
})
app.use("/api", userRouter)
app.use("/api/restaurants", restaurantRouter)
app.use("/api/orders", orderRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connectDb;
        console.log("connected to db");
        console.log(`server running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error.message);        
    }
})