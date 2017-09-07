const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BetSchema = new Schema({
    Bet: {
        type: String,
        required: true,
    },
    Description: {
    	type: String,
    	required: true,
    },
    endDate: {
    	type: Date,
    	required: true
    },
    Prize: {
    	type: Number,
    	required: false
    },
    Users: {
    	type: String
    }
});

const Bets = mongoose.model('Bets', BetsSchema);
module.exports = Bets;
