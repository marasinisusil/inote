const connecttomongo=require('./db');
const express = require('express')
const cors = require("cors");


connecttomongo();

const app = express()
const port = 5000
app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello sushhl!')
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})