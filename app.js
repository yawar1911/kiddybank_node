const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const mobileRoute = require('./routes/mobile/mobileRoute');
const adminRoute = require('./routes/admin/adminRoute');
const cors = require('cors');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());

app.use('/mobile', mobileRoute);
app.use('/admin', adminRoute);;


mongoose.connect('mongodb://127.0.0.1:27017/Likewise', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log('Error in connecting with db')
    } else {
        console.log('Successfully connected db')
    }
});

app.listen(8000, () => {
    console.log('app running on port 8000')
})



