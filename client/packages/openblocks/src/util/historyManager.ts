export class HistoryManager<HistoryItem> {
  private history: HistoryItem[];
  private curIndex: number;
  private endIndex: number;
  private readonly limit: number;

  constructor(limit: number = 50) {
    this.limit = limit;
    this.history = [];
    this.curIndex = -1;
    this.endIndex = -1;
  }

  clear() {
    this.history = [];
    this.curIndex = -1;
    this.endIndex = -1;
  }

  add(comp: HistoryItem) {
    if (this.history.length + 1 > this.limit) {
      this.history.shift();
      this.curIndex--;
    }
    this.history[++this.curIndex] = comp;
    this.endIndex = this.curIndex;
  }

  next(): HistoryItem | null {
    if (this.curIndex < this.history.length - 1 && this.curIndex < this.endIndex) {
      return this.history[++this.curIndex];
    }
    return null;
  }

  last(): HistoryItem | null {
    if (this.curIndex > 0) {
      return this.history[--this.curIndex];
    }
    return null;
  }

  isEmpty() {
    return !this.history || this.history.length <= 0;
  }
}
