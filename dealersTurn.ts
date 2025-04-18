import { Deck } from './deck';
import { CardData } from './types';
import { calcSum, dealCards } from './utils';

export function dealersTurn(
  deck: Deck,
  dealersHand: CardData[]
): 'BUST' | undefined {
  let sum = calcSum(dealersHand);
  while (sum < 17) {
    dealCards(deck, dealersHand);
    sum = calcSum(dealersHand);
    if (sum > 21) return 'BUST';
  }
}
