import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  pubkey: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  }
});

const User = mongoose.model("User", UserSchema);

export default User;