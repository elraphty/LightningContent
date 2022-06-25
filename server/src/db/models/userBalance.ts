import mongoose from 'mongoose';

const UserBalance = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  sats: {
    type: Number,
    default: 0,
  },
  usd: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  eur: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  ngn: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },
  ghs: {
    type: mongoose.Types.Decimal128,
    default: 0,
  }
});

const Balance = mongoose.model("UserBalance", UserBalance);

export default Balance;