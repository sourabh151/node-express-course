const express = require('express')
const path = require('path')

const app = express()
let pathToIndex = path.resolve(__dirname, '../navbar-app/index.html');
console.log(pathToIndex);
// setup static and middleware
app.use(express.static('./public'))
//this lets us have access to any file residing inside the public folder

app.get('/', (req, res) => {
  res.sendFile(pathToIndex)
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
