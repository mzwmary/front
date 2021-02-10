const express = require('express');
const app = express()
// const cors = require('cors')
// app.use(cors())

app.get('/api/getUserInfo', (reg, res) => {
  res.send({
    name: 'wyq',
    age: 16
  })
})
app.listen(9999, () => {
  console.log('http://localhost:9999')
})