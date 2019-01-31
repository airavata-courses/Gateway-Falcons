const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ViewerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  viewerId: {
    type: String,
    required: false
  },
  oauthProvider: {
    type: String,
    required: true
  },
  social_id: {
    type: String,
    required: true
  },
  social_token: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: String,
    default: Date.now
  },
  accountType: {
    type: String,
    default: "viewer"
  }
});

module.exports = Viewer = mongoose.model("viewers", ViewerSchema);
