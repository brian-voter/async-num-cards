"use strict"

const BASE_URL = "https://deckofcardsapi.com"

async function getCardFromShuffle() {
  const deck = await axios.get(`${BASE_URL}/api/deck/new/shuffle`)
  const deckId = deck.data.deck_id

  const response = await axios.get(`${BASE_URL}/api/deck/${deckId}/draw/?count=1`)
  const card = response.data.cards[0]

  const value = card.value
  const suit = card.suit

  console.log("value", value)
  console.log("suit", suit)
}

async function getCardsFromSameDeck() {
  const deck = await axios.get(`${BASE_URL}/api/deck/new/shuffle`)
  const deckId = deck.data.deck_id

  const response = await axios.get(`${BASE_URL}/api/deck/${deckId}/draw/?count=2`)
  const cards = response.data.cards

  for (let card of cards) {
    console.log("value", card.value)
    console.log("suit", card.suit)
  }
}