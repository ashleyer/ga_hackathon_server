//coming from example with this file named "Event.js"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    description: String,
    date_start: Date,
    date_end: Date,
    location: String,
    total_cost: Number,
    number_of_participants: Number,
    pay_date: Date,
    guests: String,
    image: {
        type: String,
        default: "https://i.imgur.com/VhgsO62.png?1"
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
