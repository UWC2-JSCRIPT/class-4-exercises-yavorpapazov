/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */
const getDeck = () => {
  	let arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
 	const deck = []
  	let suit = ''
	let val = 0
	for(let i = 1; i <=4; i++) {
		if(i === 1) {
			suit = 'hearts'
		}
		if(i === 2) {
			suit = 'spades'
		}
		if(i === 3) {
			suit = 'clubs'
		}
		if(i === 4) {
			suit = 'diamonds'
		}
		for(let j of arr) {
			if(typeof j === 'number') {
				val = j
			} else if(j === 'Ace') {
				val = 11
			} else {
				val = 10
			}
			let card = {
				val, 
				displayVal: j.toString(),
				suit
			}
			deck.push(card)
		}
	}
	return deck
}  

// CHECKS
const deck = getDeck()
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
