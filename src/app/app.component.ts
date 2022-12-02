import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

type Directions = "l" | "r" | "u" | "d";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('board') board!: BoardComponent;

  private timer: number = 0;

  title = 'snake-angular';
  dir: Directions = "r";
  nextDir: Directions = "r";
  points = 0;
  message = "";
  running = false;
  inProgress = false;

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
    this.stopGameTimer();
    this.dir = 'r';
    this.nextDir = 'r';
    this.points = 0;
    this.inProgress = true;
    this.message = "";
    this.running = false;
    this.board.new();
  }

  start() {
    this.message = "";
    this.startGameTimer();
    this.running = true;
  }

  pause() {
    this.message = "PAUSE";
    this.stopGameTimer();
    this.running = false;
  }

  onGameOver(result: string) {
    this.message = "GAME OVER";
    this.stopGameTimer();
    this.inProgress = false;
  }

  onPoint(event: any) {
    this.points++;
  }

  stopGameTimer = () =>  clearInterval(this.timer);

  startGameTimer()
  {
    this.stopGameTimer();

    this.timer = window.setInterval(() => { 
      window.requestAnimationFrame(() => {
        this.setDirection(this.nextDir);
        this.board.move(this.dir);
      });
     }, 120);
  }
}
