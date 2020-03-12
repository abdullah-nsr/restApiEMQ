const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
name:{
    type: String,
    required: true
},
subscriberToChannel: {
    type: String,
    required: true
},
subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
}
})

// this module allow as when we importing this it allows us to 
// interact directly to the database using this schema
module.exports = mongoose.model('Subscriber', subscriberSchema);