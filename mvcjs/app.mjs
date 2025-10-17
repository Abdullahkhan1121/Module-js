import express from 'express'
import productRouter from './Routes/ProductRoutes.mjs'
import mongoose from 'mongoose'
import userRouter from './Routes/UserRoutes.mjs'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB is connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/product",productRouter)
app.use("/user",userRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
