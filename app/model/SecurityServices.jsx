import mongoose from 'mongoose';

const SecurityServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Security Services', 'Event Security Services', 'Elite Security Services','Display'],
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  subHeading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '/Services', 
  },
});

// Export the model
const SecurityService = mongoose.models.SecurityService || mongoose.model('SecurityService', SecurityServiceSchema);

export default SecurityService;
