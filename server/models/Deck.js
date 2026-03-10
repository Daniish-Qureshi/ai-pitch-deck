const mongoose = require('mongoose')

const deckSchema = new mongoose.Schema({
  shareId: { type: String, required: true, unique: true },
  startupName: { type: String, required: true },
  slides: { type: Array, required: true },
  industry: String,
  fundingGoal: String,
  businessModel: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Deck', deckSchema)