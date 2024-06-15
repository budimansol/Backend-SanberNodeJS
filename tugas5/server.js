const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});


app.get('/hello', (req, res) => {
  
  res.send({
    "message" : "Success fetch message",
    "data": "Hello World!"
  });
});

app.get('/user', (req, res) => {
  
  res.send({
    "message" : "Success fetch message",
    "data": {
        "id": 1,
        "name": "Budi",
        "username": "budidu",
        "email": "budidu@mail.com"
      }
  });
});

app.use('/static', express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
