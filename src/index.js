const express = require('express');
const cors = require('cors');
const { sequelize } = require('./dbconnection');
const app = express();
const route = require('./route/route');
const port = 3000;

app.use(express.json());

// Enable CORS
app.use(cors());

// Allow all origins (you may want to restrict this in a production environment)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', route);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Server is running at http://localhost:${port}`);
});
