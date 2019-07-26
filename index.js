const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =  require('cors');
const morgan = require('morgan');
const path = require('path');

const MONGOURL = 'mongodb+srv://CommentiMemorabili:commentimemorabili@cluster0-pnqd7.mongodb.net/test'
//THIS STUFF JUST TO SILENCE ANNOYING MODULE WARNINGS
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//Establish connection to mongo database
try{
  mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    dbName: "CommentiMemorabili"
  });
}catch(error){
  console.log("Db connection failed", error);
}
//On connection
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open');
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('oh fuck')
  console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


const app = express();
app.timeout = 5000;
app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true, parameterLimit:1000}));
app.use(morgan("dev"));
app.listen( process.env.PORT || 3000, () => {
  console.log(app);
});

app.get('/stocazzo', (req, res) => {
  console.log('ok');
  res.send('stocazzo ricevuto')
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
