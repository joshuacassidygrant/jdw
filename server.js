const ResumeRecord = require('./data/resume_record.model.js');
const Project = require('./data/project.model.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT  || 4000;
const nodemailer = require('nodemailer');
var path = require('path');
//const creds = require('./creds');
const emailUser = process.env.EM_USER;
const emailPass = process.env.EM_PASS;
const url  = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jdw';
console.log(url);
app.use(cors());
app.use(bodyParser.json());


mongoose.connect(`${url}`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server running on port " + PORT);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

}



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
    var content = `name: ${name} \n email: ${email} \n message: ${content} `
  
    var mail = {
      from: name,
      to: "jc.grant22@gmail.com",  //Change to email address that you want to receive messages on
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

  app.get('*', function (req, res) {
    res.sendFile(path.resolve('./client/public/index.html'));
  }); 
  

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
  