const express = require('express');
const app = express();
const routes = require('./Routes/routes');

const PORT = 5000;

app.use(express.json());

app.get('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})