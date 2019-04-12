const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('dist/marvel-manager'))
app.use('/static', express.static(path.join(__dirname, 'dist', 'marvel-manager')));
app.get('/', (req, res) => {
  res.status = 200;
  res.sendFile('index');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listten on port ${port}`);
});
