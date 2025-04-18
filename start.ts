import promptSync from 'prompt-sync';
import { calcSum, dealCards, showCards, hitOrStandUtil } from './utils';
import { Deck } from './deck';
import { CardData } from './types';
import chalk from 'chalk';
const prompt = promptSync({ sigint: true });

function playersTurn(deck: Deck, playersHand: CardData[]): 'BUST' | undefined {
  let sum = calcSum(playersHand);

  if (sum > 21) {
    console.log(
      chalk.red(
        `Your hand: ${showCards(playersHand)}, Total: ${sum} - Player BUSTS!`
      )
    );
    return 'BUST';
  }

  while (true) {
    let hitOrStand = hitOrStandUtil();
    if (hitOrStand === 'hit') {
      dealCards(deck, playersHand);
      let sum = calcSum(playersHand);

      if (sum > 21) {
        console.log(
          chalk.red(
            `Your hand: ${showCards(
              playersHand
            )}, Total: ${sum} - Player BUSTS!`
          )
        );
        return 'BUST';
      } else {
        console.log(`Your hand: ${showCards(playersHand)}, Total: ${sum}`);
      }
      continue;
    }
    return;
  }
}

function dealersTurn(deck: Deck, dealersHand: CardData[]): 'BUST' | undefined {
  let sum = calcSum(dealersHand);
  while (sum < 17) {
    dealCards(deck, dealersHand);
    sum = calcSum(dealersHand);
    if (sum > 21) return 'BUST';
  }
}

let availableFund = 100;
const blackjackMultiplier = 1.5;

while (true) {
  if (availableFund <= 0) {
    console.log('No more available funds!');
    break;
  }
  console.log(`Available funds: ${availableFund}`);
  const input = prompt('Your bet: ');
  const bet = Number(input);
  if (isNaN(bet)) {
    console.log('Invalid value!');
    continue;
  } else if (bet > availableFund) {
    console.log('Not enough funds!');
    continue;
  }

  let playersHand: CardData[] = [];
  let dealersHand: CardData[] = [];

  availableFund -= bet;

  const deck = new Deck();
  dealCards(deck, playersHand, true);
  dealCards(deck, dealersHand, true);

  let playerSum = calcSum(playersHand);
  let dealerSum = calcSum(dealersHand);

  console.log(`Your hand: ${showCards(playersHand)}, Total: ${playerSum}`);
  console.log(`Dealers hand: ${showCards(dealersHand, true)} [hidden]`);

  // check for blackjack
  const playerHasBJ = calcSum(playersHand) === 21;
  const dealerHasBJ = calcSum(dealersHand) === 21;

  if (playerHasBJ && dealerHasBJ) {
    console.log('Both have blackjack! Tie.');
    availableFund += bet;
    continue;
  } else if (dealerHasBJ) {
    console.log('Dealer has blackjack! Player loses.');
    continue;
  } else if (playerHasBJ) {
    console.log('Player has blackjack!');
    availableFund += bet * (1 + blackjackMultiplier);
    continue;
  }

  const playersTurnResult = playersTurn(deck, playersHand);

  if (playersTurnResult === 'BUST') {
    continue;
  }

  // if player stands:
  console.log(
    `Dealer's hand: ${showCards(dealersHand)}, Total: ${calcSum(dealersHand)}`
  );

  const dealersTurnResult = dealersTurn(deck, dealersHand);
  if (dealersTurnResult === 'BUST') {
    console.log(
      `Dealer's hits: ${showCards(dealersHand)}, Total: ${calcSum(
        dealersHand
      )} Dealer BUSTS!`
    );
    console.log(chalk.green('Player won!'));
    availableFund += bet * (1 + blackjackMultiplier);
    continue;
  }

  playerSum = calcSum(playersHand);
  dealerSum = calcSum(dealersHand);

  console.log(`Dealer's hits: ${showCards(dealersHand)}, Total: ${dealerSum}`);

  if (dealerSum === playerSum) {
    console.log('TIE');
    availableFund += bet;
    continue;
  } else if (dealerSum > playerSum) {
    console.log(
      chalk.red(`Player lost! Player: ${playerSum} vs. Dealer: ${dealerSum} `)
    );
    continue;
  } else {
    console.log(
      chalk.green(`Player won! Player: ${playerSum} vs. Dealer: ${dealerSum} `)
    );
    availableFund += bet * (1 + blackjackMultiplier);
    continue;
  }
}
