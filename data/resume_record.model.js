const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResumeRecord = new Schema({
    record_type: {
        type: String
    },
    record_subtype: {
        type: String
    },
    record_title: {
        type: String
    },
    record_date: {
        type: String
    },
    record_text: {
        type: String
    },
    record_priority: {
        type: Number
    }
})

module.exports = mongoose.model("resume_records", ResumeRecord);