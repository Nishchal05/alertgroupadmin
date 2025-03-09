const mongoose = require('mongoose');

const CounsellingData = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  canadaProvinces: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  assistance: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  }
}, {
    timestamps: true
  });

const Counselling = mongoose.models.CounsellingData || mongoose.model("CounsellingData", CounsellingData);
export default Counselling;
