import mongoose from 'mongoose';

const UserSettings = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  defaultCurrency: {
    type: String,
    enum : ['sats','usd', 'eur', 'ngn', 'ghs'],
    default: 'sats'
  },
  satsRatio: {
    type: String,
    default: '1:1'
  },
  apiKey: {
    type: String,
  }
});

const Settings = mongoose.model("UserSettings", UserSettings);

export default Settings;