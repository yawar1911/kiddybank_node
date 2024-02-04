const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const mobileRoute = require('./routes/mobile/mobileRoute');
const planRoute = require('./routes/mobile/planRoute');
const adminRoute = require('./routes/admin/adminRoute');
const cors = require('cors');
const db = require("./config/db-conn")
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
var server = require('http').Server(app);
var io = require('socket.io')(server);
let EventEmitter = require("events");
const CONFIG = require('./config/config') ;


const eventEmitter = new EventEmitter();


db.dbConnect(eventEmitter);

eventEmitter.on("cron-start", () => {
  let cron = require("./cron/cron");
  console.log(cron)
  cron.start();
});

const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:4100",
    "http://localhost:4000",
    "http://13.51.174.156:3000",
    "https://13.51.174.156:3000",
    "http://13.51.174.156:8080",
    "https://13.51.174.156:8080",
    "http://13.51.174.156:4100",
    "https://13.51.174.156:4100",
    "13.51.174.156:3000",
    "13.51.174.156:8080",
    "13.51.174.156:4100",

  ];


app.use(cors({
    origin: (origin, callback) => {
      console.log(origin);
      // allow requests with no origin ( like mobile apps or curl requests )
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy don't allow access from the specified Origin. (${origin})`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }));

app.use('/mobile', mobileRoute);
app.use('/admin', adminRoute);
app.use('/plan', planRoute);

// let uri=`mongodb+srv://its99786:cQRR8tM83cIpvTP3@cluster0.ltotvo7.mongodb.net/likewise?retryWrites=true&w=majority`;
// let uri="mongodb://localhost:27017/Likewise"
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }, (err) => {
//     if (err) {
//         console.log(err)
//         console.log('Error in connecting with db')
//     } else {
//         console.log('Successfully connected db')
//     }
// });

app.listen(CONFIG.PORT, () => {
    console.log(`app running on PORT:${CONFIG.PORT}`)
})



