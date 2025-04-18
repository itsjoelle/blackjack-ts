import { dealersTurn } from '../dealersTurn';
import { Deck } from '../deck';
import { CardData, Suit } from '../types';
import { calcSum } from '../utils';
import { mockCard } from './mocks';

describe('dealersTurn', () => {
  test('case: dealer hits until reaching 17', () => {
    const deck = new Deck();
    const dealersHand: CardData[] = [
      mockCard('5', Suit.diamond, 5),
      mockCard('6', Suit.spade, 6),
    ];
    deck.pushCardToTop(mockCard('7', Suit.heart, 7));
    const result = dealersTurn(deck, dealersHand);

    expect(result).toBeUndefined(); // not bust
    expect(calcSum(dealersHand)).toBe(18);
  });

  test('case: dealer stands at 17', () => {
    const deck = new Deck();
    const dealersHand: CardData[] = [
      mockCard('J', Suit.diamond, 10),
      mockCard('7', Suit.club, 7),
    ];
    const result = dealersTurn(deck, dealersHand);

    expect(result).toBeUndefined(); // not bust
    expect(calcSum(dealersHand)).toBe(17);
  });

  test('case: dealer busts after hitting over 21', () => {
    const deck = new Deck();
    const dealersHand: CardData[] = [
      mockCard('J', Suit.diamond, 10),
      mockCard('6', Suit.club, 6),
    ];
    deck.pushCardToTop(mockCard('8', Suit.club, 8));
    const result = dealersTurn(deck, dealersHand);
    expect(result).toBe('BUST');
    expect(calcSum(dealersHand)).toBeGreaterThan(21);
  });
});
