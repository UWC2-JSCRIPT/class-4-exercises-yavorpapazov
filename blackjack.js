let blackjackDeck = getDeck();

/**
* Represents a card player (including dealer).
* @constructor
* @param {string} name - The name of the player
*/

class CardPlayer {
    constructor(name) {
        this.name = name
        this.hand = []
    }
    drawCard() {
        let randomCard = blackjackDeck[Math.floor(Math.random() * 52)]
        this.hand.push(randomCard)
    }
}; //TODO

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer'); // TODO
const player = new CardPlayer('Player'); // TODO
player.drawCard()
player.drawCard()
dealer.drawCard()
dealer.drawCard()

/**
* Calculates the score of a Blackjack hand
* @param {Array} hand - Array of card objects with val, displayVal, suit properties
* @returns {Object} blackJackScore
* @returns {number} blackJackScore.total
* @returns {boolean} blackJackScore.isSoft
*/

const calcPoints = (hand) => {
    // CREATE FUNCTION HERE
    let total = 0
    let isSoft
    let countAce = 0
    for(let i of hand) {
        total = total + i.val
        if(i.displayVal === 'Ace') {
            countAce++
        }
    }
    if(total > 21 && countAce === 1) {
        total = 0
        for(let i of hand) {
            if(i.displayVal === 'Ace') {
                i.val = 1
            }
            total = total + i.val
        }
    }
    if(total > 21 && countAce > 1) {
        total = 0
        for(let i of hand) {
            if(i.displayVal === 'Ace') {
                i.val = 1
            }
            total = total + i.val
        }
        if(total + 10 <= 21) {
            for(let i of hand) {
                if(i.displayVal === 'Ace') {
                    i.val = 11
                    break   
                }
            }
        }
        total = 0
        for(let i of hand) {
           total = total + i.val
        }
    }
    let oneAce11Points = hand.find(item => item.displayVal === 'Ace' && item.val === 11)
    if(oneAce11Points) {
        return {
            total,
            isSoft: true
        }
    } else {
        return {
            total,
            isSoft: false
        }
    }
}
let playerTotalPoints = calcPoints(player.hand)
console.log(playerTotalPoints)

/**
* Determines whether the dealer should draw another card.
* 
* @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
* @returns {boolean} whether dealer should draw another card
*/

 let dealerTotalPoints = 0
 const dealerShouldDraw = (dealerHand) => {
    // CREATE FUNCTION HERE
    dealerTotalPoints = calcPoints(dealerHand)
    if(dealerTotalPoints.total <= 16) {
        return true
    } else if(dealerTotalPoints.total === 17 && dealerTotalPoints.isSoft === true) {
        return true
    } else {
        return false
    }
}
console.log(dealerShouldDraw(dealer.hand))

/**
* Determines the winner if both player and dealer stand
* @param {number} playerScore 
* @param {number} dealerScore 
* @returns {string} Shows the player's score, the dealer's score, and who wins
*/

const determineWinner = (playerScore, dealerScore) => {
    // CREATE FUNCTION HERE
    let wins = ''
    if(playerScore > dealerScore) {
        wins = 'Player wins!'
    } else if(playerScore < dealerScore) {
        wins = 'Dealer wins!'
    } else {
        wins = 'It is a tie.'
    }
    return `Player's total score: ${playerScore}. Dealer's total score: ${dealerScore}. ${wins}`
}
console.log(determineWinner(playerTotalPoints.total, dealerTotalPoints.total))

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */

const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */

let h3 = document.createElement('h3')
let body = document.querySelector('body')
body.append(h3)
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  let message = `${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`
  h3.textContent = message
  console.log(message);
}

/**
 * Runs Blackjack Game
 */

const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());