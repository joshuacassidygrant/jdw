const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    project_type: {
        type: String
    },
    project_title: {
        type: String
    },
    project_priority: {
        type: Number
    },
    project_year: {
        type: Number
    },
    project_month: {
        type: Number
    },
    project_description: {
        type: String
    },
    project_link: {
        type: String
    },
    project_image: {
        type: String
    },
    project_status: {
        type: String
    },
    project_tags: {
        type: [String]
    }
})

module.exports = mongoose.model("project", Project);