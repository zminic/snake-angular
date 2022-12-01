import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('board') board!: BoardComponent;

  private timer: number = 0;

  title = 'snake-angular';

  ngAfterViewInit(): void {
    this.startGameTimer();
    document.addEventListener("keydown", this.handleKeyDown);
  }

  ngOnDestroy(): void {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      this.board.setDirection('r');
    } else if (event.key === 'ArrowLeft') {
      this.board.setDirection('l');
    } else if (event.key === 'ArrowUp') {
      this.board.setDirection('u');
    } else if (event.key === 'ArrowDown') {
      this.board.setDirection('d');
    }
  };

  gameOver(result: string) {
    this.stopGameTimer();
  }

  stopGameTimer = () =>  clearInterval(this.timer);

  startGameTimer()
  {
    this.stopGameTimer();

    this.timer = window.setInterval(() => { 
      window.requestAnimationFrame(() => {
        this.board.move();
      });
     }, 200);
  }
}
