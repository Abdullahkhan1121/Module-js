import express from 'express'
import productRouter from './Routes/ProductRoutes.mjs'

const app = express()
const port = 3000
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/product",productRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
