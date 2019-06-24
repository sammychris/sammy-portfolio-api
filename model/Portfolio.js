const mongoose  = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
	name : { type: String, required: true },
	create_on    : { type: Date, default: Date.now },
	description  : { type: String, required: true },
	code_url     : { type: String, required: true },
	demo_url     : { type: String, required: true },
	type : { type: String, required: true },
	skills: { type: [], required: true },
	img_url : String

});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
