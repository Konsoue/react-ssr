const express = require('express');

const app = express();
const port = 5000;

const data = [{
  name: 'konsoue',
  id: 1,
}, {
  name: 'as',
  id: 2,
}, {
  name: 'aada',
  id: 3,
}, {
  name: 'fasbjf',
  id: 4,
}, {
  name: 'abjb',
  id: 5,
}, {
  name: 'fasadpbjf',
  id: 6,
}]

app.use((req, res, next) => {
  if (req.url.includes('/api')) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json');
    next();
  }
})

app.get('/api/list', (req, res) => {
  res.end(JSON.stringify(data));
})

app.listen(port, () => console.log('mock server open on ' + port));

