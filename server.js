// https://www.youtube.com/watch?v=fgTGADljAeg
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

const express = require('express');
const app = express();
// install https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
// error solve https://stackoverflow.com/questions/30235200/mongodb-data-directory-data-db-not-found
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'))

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
// our server will except json as body instated of post or get element
app.use(express.json())

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const port = 3000;
app.listen(port, () => {
    console.log('server started on ' + port);
});
