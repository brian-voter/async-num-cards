"use strict";

const BASE_URL = "https://deckofcardsapi.com";

const $gimmiebtn = $("#gimmiebtn");
const $main = $("main");

let deckId;
let cardsRemaining = 52;

/**
 * Shuffles a deck and prints the value/suit of one card
 */
async function getCardFromShuffle() {
  const deck = await axios.get(`${BASE_URL}/api/deck/new/shuffle`);
  const deckId = deck.data.deck_id;

  const response = await axios.get(`${BASE_URL}/api/deck/${deckId}/draw/?count=1`);
  const card = response.data.cards[0];

  const value = card.value;
  const suit = card.suit;

  console.log("value", value);
  console.log("suit", suit);
}

/**
 * Shuffles a deck and prints the value/suit of two cards
 */
async function getCardsFromSameDeck() {
  const deck = await axios.get(`${BASE_URL}/api/deck/new/shuffle`);
  const deckId = deck.data.deck_id;

  const response = await axios.get(`${BASE_URL}/api/deck/${deckId}/draw/?count=2`);
  const cards = response.data.cards;

  for (let card of cards) {
    console.log("value", card.value);
    console.log("suit", card.suit);
  }
}

/**
 * gets a deckID from the API and sets the global const
 */
async function setDeckId() {
  const deck = await axios.get(`${BASE_URL}/api/deck/new/shuffle`);
  deckId = deck.data.deck_id;
}

/**
 * gets a card using the global deckID and returns the image URL
 */
async function getCardImageFromDeck() {
  const response = await axios.get(`${BASE_URL}/api/deck/${deckId}/draw/?count=1`);
  return response.data.cards[0].image;
}

/**
 * adds an image to the main element in the DOM
 * @param {string} cardImage image URL
 */
async function addCardToDOM(cardImage) {
  $main.append(`<img src="${cardImage}" alt="really cool card">`);
}

/**
 * gets a card image from the deck and adds its image to the DOM
 */
async function drawCard() {
  if (cardsRemaining > 0) {
    const cardImage = await getCardImageFromDeck();
    addCardToDOM(cardImage);
    cardsRemaining--;
  }

  if (cardsRemaining <= 0) {
    $gimmiebtn.hide();
  }
}

/**
 * initializes the deckId variable and adds the event handler
 */
async function init() {
  await setDeckId();
  $gimmiebtn.on("click", drawCard);
}

init();