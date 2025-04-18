import { Card } from './card';
import { shuffleArray } from './utils';
import { faces, nums, suits } from './card';
import { DeckData, Name, Suit, Value } from './types';

export class Deck implements DeckData {
  private deck: Card[];
  constructor() {
    this.deck = [];
    this.createDeck();
    this.reset();
  }

  reset() {
    const shuffledArray = shuffleArray(this.deck);
    this.deck = shuffledArray;
  }

  createDeck() {
    for (let i = 0; i < suits.length; i++) {
      const suit = suits[i];
      for (let j = 0; j < nums.length; j++) {
        const card = new Card(suit, nums[j][0] as Name, nums[j][1] as Value);
        this.deck.push(card);
      }

      for (let k = 0; k < faces.length; k++) {
        const card = new Card(suit, faces[k][0] as Name, faces[k][1] as Value);
        this.deck.push(card);
      }

      const card = new Card(suit, 'A', 1 as Value);
      this.deck.push(card);
    }
  }

  popTopCard() {
    return this.deck.pop();
  }

  // for testing purposes only:
  pushCardToTop(card: Card) {
    this.deck.push(card);
  }
}
