const connectToMongo = require('./db')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
connectToMongo()
app.use(cors())
app.use(express.json()) // --> To take req.body in the form of json | To take data in json format


// Available Routes
app.use('/api/auth', require('./routes/auth')) // --> Create a user using this path
app.use("/api/notes",require('./routes/notes'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Inotebook App listening on port ${port}`)
})
// 9:20