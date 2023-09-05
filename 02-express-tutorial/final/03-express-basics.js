const express = require('express')
const {readFileSync} = require('fs');
let wp = readFileSync('./temp.html',{encoding:'utf-8'});
/*@type {express}**/
const app = express()
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
app.get('/', (req, res) => {
  console.log('user hit the resource')
  res.status(200).send(wp)
  console.log(wp);
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
