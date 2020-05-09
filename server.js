const ResumeRecord = require('./data/resume_record.model.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/jdw', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server running on port " + PORT);
});

const routes = express.Router();
app.use("/api", routes);

routes.route('/resume').get((req, res) => {
    ResumeRecord.find((err, records) => {
        if (err) {
            console.log(err);
        } else {
            res.json(records);
        }
    });
});