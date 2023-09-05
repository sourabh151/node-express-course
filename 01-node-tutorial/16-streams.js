const { createReadStream } = require('fs')

// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./content/big.txt')
stream.readableHighWaterMark = 16384;
stream.on('data', (result) => {
  console.count();
  console.log(stream.readableHighWaterMark)
})
stream.on('error', (err) => console.log(err))
