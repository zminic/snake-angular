import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

type Directions = "l" | "r" | "u" | "d";

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('board') board!: BoardComponent;

  private timer: number = 0;

  title = 'snake-angular';
  dir: Directions = "r";
  nextDir: Directions = "r";
  points = 0;
  message = "";
  running = false;
  gameOver = false;

  ngAfterViewInit(): void {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  ngOnDestroy(): void {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      this.nextDir = 'r';
    } else if (event.key === 'ArrowLeft') {
      this.nextDir = 'l';
    } else if (event.key === 'ArrowUp') {
      this.nextDir = 'u';
    } else if (event.key === 'ArrowDown') {
      this.nextDir = 'd';
    } else if (event.key === ' ') {
      this.running ? this.pause() : this.start();
    } else if (event.key === 'F2') {
      this.new();
    }
  };


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

  new() {
    this.running = false;
    this.gameOver = false;
    this.dir = 'r';
    this.nextDir = 'r';
    this.points = 0;
    this.message = "";
    this.board.new();
  }

  start() {
    if (!this.gameOver) {
      this.message = "";
      this.running = true;
      window.requestAnimationFrame(this.gameLoop);
    }
  }

  pause() {
    this.message = "PAUSE";
    this.running = false;
  }

  onGameOver(result: string) {
    this.message = result == "loss" ? "GAME OVER" : "YOU WIN!";
    this.running = false;
    this.gameOver = true;
  }

  onPoint() {
    this.points++;
  }

  loopCount = 0;
  gameLoop = () => {
    // lower speed
    if (this.loopCount == 7) {
      this.setDirection(this.nextDir);
      this.board.move(this.dir);
      this.loopCount = 0;
    }

    if (this.running) {
      this.loopCount++;
      window.requestAnimationFrame(this.gameLoop);
    }
  }
}
