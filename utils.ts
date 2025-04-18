import { CardData, DeckData, PlayerAction } from './types';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

export function shuffleArray(array: CardData[]): CardData[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function dealCards(deck: DeckData, hand: CardData[], initial = false) {
  let numCard = initial ? 2 : 1;

  for (let i = 0; i < numCard; i++) {
    const card = deck.popTopCard();
    if (card) {
      hand.push(card!);
    }
  }

  return hand;
}

export function showCards(hand: CardData[], hidden = false) {
  if (hidden) {
    return hand[0].getName();
  }
  let result = [];
  for (let card of hand) {
    result.push(`${card.getName()}${card.getSuit()}`);
  }
  const res = result.join(',');
  return res;
}

export function calcSum(hand: CardData[]) {
  let sum = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card.getName() === 'A') {
      aceCount++;
      continue;
    }
    sum += card.getValue();
  }

  // handle Aces
  for (let i = 0; i < aceCount; i++) {
    if (sum + 11 > 21) {
      sum += 1;
    } else {
      sum += 11;
    }
  }

  return sum;
}

export function hitOrStandUtil(): PlayerAction {
  while (true) {
    const input = prompt('Hit or stand? ');
    if (input === 'hit' || input === 'stand') return input;
    console.log('Invalid input!');
  }
}
