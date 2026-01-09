import { questionsPool } from "@/data/questions-pool";
import { revesPool } from "@/data/reves-pool";
import type { QuestionCard } from "@/interfaces/question-card";

class GameLogicService {
  private revesDeck: QuestionCard[] = [];
  private revesDiscardPile: QuestionCard[] = [];

  constructor() {
    this.initializeRevesDeck();
  }

  public shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  public getShuffledQuestions(): QuestionCard[] {
    return this.shuffle(questionsPool);
  }

  private initializeRevesDeck() {
    this.revesDeck = this.shuffle([...revesPool]);
    this.revesDiscardPile = [];
  }

  public drawRevesCard(): QuestionCard {
    if (this.revesDeck.length === 0) {
      this.recycleRevesDeck();
    }

    const card = this.revesDeck.pop();
    if (!card) throw new Error("Revés deck is empty!");

    this.revesDiscardPile.push(card);
    return card;
  }

  private recycleRevesDeck() {
    if (this.revesDiscardPile.length === 0) {
      this.revesDeck = this.shuffle([...revesPool]);
      return;
    }

    const lastCard = this.revesDiscardPile[this.revesDiscardPile.length - 1];
    let newDeck = this.shuffle([...this.revesDiscardPile]);

    if (newDeck.length > 1 && newDeck[newDeck.length - 1].id === lastCard.id) {
      [newDeck[newDeck.length - 1], newDeck[0]] = [
        newDeck[0],
        newDeck[newDeck.length - 1],
      ];
    }

    this.revesDeck = newDeck;
    this.revesDiscardPile = [];
  }
}

export const gameLogic = new GameLogicService();
