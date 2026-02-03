const express = require('express');
const app = express();
const router = require('./Routes/routes');

const PORT = 5000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})