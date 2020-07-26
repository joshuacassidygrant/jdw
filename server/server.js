const ResumeRecord = require('./data/resume_record.model.js');
const Project = require('./data/project.model.js');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT  || 4000;
const nodemailer = require('nodemailer');
var path = require('path');
const emailUser = process.env.EM_USER;
const emailPass = process.env.EM_PASS;
const url  =  process.env.MONGODB_URI;
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(`${url}`, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


const root = path.join(__dirname, '..', 'client', 'build');

app.listen(PORT, function() {
    console.log("Server running on port " + PORT);
});

//if (process.env.NODE_ENV === 'production') {
  app.use(express.static(root));
//}

const api = express.Router();
app.use("/api", api);


api.route('/projects/').get((req, res) => {
    Project.find((err, projects) => {
        if (err) {
            console.log(err);
        } else {
            res.json(projects);
        }
    });
});

api.route('/resume/:type').get((req, res) => {
    ResumeRecord.find((err, records) => {
        if (err) {
            console.log(err);
        } else {
            res.json(records.filter(record => record.record_type == req.params.type));
        }
    });
});

api.route('/resume/:type/:subtype').get((req, res) => {
    ResumeRecord.find((err, records) => {
        if (err) {
            console.log(err);
        } else {
            res.json(records.filter(record => record.record_type == req.params.type && record.record_subtype == req.params.subtype));
        }
    });
});


api.route('/send').post((req, res) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      to: "jc.grant22@gmail.com",
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  let transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  }


  let transporter;

  if (emailUser != null) {
    transporter = nodemailer.createTransport(transport)
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take messages');
      }
    });
  }


  app.get('/files/:file', function (req, res) {
    var data = fs.readFileSync( path.resolve(`../files/${req.params.file}`));
    res.contentType("application/pdf");
    res.send(data);
  })

  app.use(function(req, res, next) {
    if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
      res.sendFile('index.html', {root})
    } else next()
  })
  