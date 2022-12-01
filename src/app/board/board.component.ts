import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Field } from '../Field';

type Directions = "l" | "r" | "u" | "d";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Output() gameOverEvent = new EventEmitter<string>();

  rows = 30;
  cols = 30;
  dir: Directions = "r";
  initialLength = 4;
  data: Field[] = [];
  head: Field = new Field(0);
  tail: Field = new Field(0);

  ngOnInit() {
    // initialize empty fields
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.data[i] = new Field(i);
    }

    if (this.initialLength < 2) throw "Invalid initial snake length";

    this.head = this.data[0];
    this.tail = this.data[0];

    // initialize the snake
    for (let i = 0; i < this.initialLength; i++) {
      let f = this.data[i];

      if (i == this.initialLength - 1) {
        this.head = f;
        f.setHead();
      } else {
        f.isEmpty = false;
      }
    }

    this.plantFood();
  }

  setDirection(dir: Directions) {
    // do not allow changing to opposing direction
    if (this.dir == 'l' && dir == 'r' || 
        this.dir == 'r' && dir == 'l' || 
        this.dir == 'u' && dir == 'd' || 
        this.dir == 'd' && dir == 'u') {
      return;
    }

    this.dir = dir;
  }

  move() {
    let nextFieldIndex = this.getNextHeadIndex();

    // check boundaries
    if (nextFieldIndex < 0 || nextFieldIndex % this.cols == 0 || nextFieldIndex > this.rows * this.cols - 1) {
      this.gameOver("loss");
      return;
    }

    // check self hit
    if (!this.data[nextFieldIndex].isEmpty && !this.data[nextFieldIndex].isFood) {
      this.gameOver("loss");
      return;
    }

    // check food hit

    // perform move
    this.head.setBody();
    this.tail.setEmpty();
    this.data[nextFieldIndex].setHead();
    this.head = this.data[nextFieldIndex];

    if (!this.data[nextFieldIndex].isFood) {
      this.tail = this.data[this.getNextTailIndex()];
    } else {
      this.plantFood();
    }
  }

  private plantFood() {
    let fieldCount = this.rows * this.cols;
    let index = this.getRandomNumber(fieldCount);

    while (!this.data[index].isEmpty) {
      index = this.getRandomNumber(fieldCount);
    }

    this.data[index].setFood();
  }

  private getNextHeadIndex() {
    return this.dir === 'r' ? this.head.pos + 1 :
      this.dir == 'l' ? this.head.pos - 1 :
        this.dir == 'u' ? this.head.pos - this.cols :
          this.head.pos + this.cols;
  }

  private getNextTailIndex() {
    if (!this.data[this.tail.pos + 1].isEmpty) return this.tail.pos + 1;
    if (!this.data[this.tail.pos - 1].isEmpty) return this.tail.pos - 1;
    if (!this.data[this.tail.pos + this.cols].isEmpty) return this.tail.pos + this.cols;
    return this.tail.pos - this.cols;
  }

  gameOver(result: string) {
    this.gameOverEvent.emit(result);
  }

  getRandomNumber = (max: number) => Math.floor((Math.random() * 1000) + 1) % max;
}
