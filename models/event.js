
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const attendeeSchema = new Schema({
    attendeeName: String,
    email: String,
    status: { type: String, default: 'Unpaid', enum: ['Unpaid', 'Paid'] }
})

const budgetItemSchema = new Schema({
    itemName: String,
    itemPrice: Number,
})

const eventSchema = new Schema({
    eventName: String,
    description: String,
    startDate: Date,
    endDate: Date,
    location: String,
    budgetItems: [budgetItemSchema],
    attendeeList: [attendeeSchema],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
