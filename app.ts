import express from 'express';
const dotenv = require('dotenv');
const app = express();

import routes from './src/routes.ts';


dotenv.config({ path: '.env' });
const connectToMongo = require('./db/conn');
require('./db/conn');

//Connect to database
connectToMongo();
const port = process.env.PORT || 8000;

app.use(express.json()); // middleware to use req.body

// available routes
app.use('/', routes);


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});