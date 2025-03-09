const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    resumeFile: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);

module.exports = JobApplication;