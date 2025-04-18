import { Deck } from '../deck';
import { CardData, Suit } from '../types';
import { calcSum, dealCards, shuffleArray } from '../utils';
import { cards, mockCard } from './mocks';

describe('shuffleArray', () => {
  test('case: should contain same cards after shuffle ', () => {
    const original = cards;
    const shuffled = shuffleArray(cards);

    expect(original).toEqual(expect.arrayContaining(shuffled));
    expect(shuffled).toEqual(expect.arrayContaining(original));
  });

  test('case: should be of equal length', () => {
    const originalLength = cards.length;
    const shuffledLength = shuffleArray(cards).length;

    expect(originalLength).toBe(shuffledLength);
  });
});

describe('dealCards', () => {
  test('case: should deal 2 cards initially', () => {
    const deck = new Deck();
    const playerHand: CardData[] = [];
    dealCards(deck, playerHand, true);

    expect(playerHand.length).toBe(2);
  });

  test('case: should deal one card per hit', () => {
    const deck = new Deck();
    const playerHand: CardData[] = [];
    dealCards(deck, playerHand);

    expect(playerHand.length).toBe(1);
  });
});

describe('calcSum', () => {
  test('case: should calculate sum without aces correctly', () => {
    const hand: CardData[] = [
      mockCard('2', Suit.diamond, 2),
      mockCard('J', Suit.spade, 10),
    ];

    const result = calcSum(hand);
    expect(result).toBe(12);
  });

  test('case: should calculate sum with one ace correctly', () => {
    const hand: CardData[] = [
      mockCard('2', Suit.diamond, 2),
      mockCard('A', Suit.spade, 1),
      mockCard('8', Suit.spade, 8),
    ];

    const result = calcSum(hand);
    expect(result).toBe(21);
  });

  test('case: should calculate sum with two aces correctly', () => {
    const hand: CardData[] = [
      mockCard('5', Suit.diamond, 5),
      mockCard('A', Suit.spade, 1),
      mockCard('A', Suit.spade, 1),
    ];

    const result = calcSum(hand);
    expect(result).toBe(17);
  });
});
