import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Field } from '../Field';
import { Snake } from '../Snake';

type Directions = "l" | "r" | "u" | "d";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Output() gameOverEvent = new EventEmitter<string>();
  @Output() pointEvent = new EventEmitter<void>();

  rows = 25;
  cols = 25;
  initialLength = 4;
  data: Field[] = [];
  snake: Snake = new Snake();

  ngOnInit() {
    this.new();
  }

  new() {
    this.snake = new Snake();
    this.data = [];

    // initialize empty fields
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.data[i] = new Field(i);
    }

    if (this.initialLength < 2) throw "Invalid initial snake length";

    // initialize the snake
    for (let i = 0; i < this.initialLength; i++) {
      this.snake.addPart(this.data[i]);
    }

    this.plantFood();
  }

  move(dir: Directions) {
    let nextFieldIndex = this.getNextHeadIndex(dir);

    // check boundaries
    if (dir == 'r' && nextFieldIndex % this.cols == 0 ||
        dir == 'l' && (nextFieldIndex + 1) % this.cols == 0 ||
        dir == 'u' && nextFieldIndex < 0 ||
        dir == 'd' && nextFieldIndex > this.rows * this.cols) {
      this.gameOver("loss");
      return;
    }

    // check self hit
    if (!this.data[nextFieldIndex].isEmpty && !this.data[nextFieldIndex].isFood) {
      this.gameOver("loss");
      return;
    }

    // perform move
    let isFood = this.data[nextFieldIndex].isFood;
    this.snake.move(this.data[nextFieldIndex]);
    
    if (isFood)  {
      this.pointEvent.emit();
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

  private getNextHeadIndex(dir: Directions) {
    let head = this.snake.getHead();

    return dir === 'r' ? head.pos + 1 :
      dir == 'l' ? head.pos - 1 :
        dir == 'u' ? head.pos - this.cols :
          head.pos + this.cols;
  }

  gameOver(result: string) {
    this.gameOverEvent.emit(result);
  }

  getRandomNumber = (max: number) => Math.floor((Math.random() * 1000) + 1) % max;
}
