import mongoose from 'mongoose';

const UserDetails = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  bio: {
    type: String,
  }
});

const Details = mongoose.model("UserDetails", UserDetails);

export default Details;