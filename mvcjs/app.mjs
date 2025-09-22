import express from 'express'
import productRouter from './Routes/ProductRoutes.mjs'
import mongoose from 'mongoose'

const app = express()
const port = 3000
app.use(express.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://abdullahkhan221121:AQpGBfwAMlsp3ZPT@firstcluster.hgkas6e.mongodb.net/abdullah1');
  console.log("DB is connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/product",productRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
