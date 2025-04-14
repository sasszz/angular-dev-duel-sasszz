import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-duel-scene',
  templateUrl: './duel-scene.component.html',
  styleUrls: ['./duel-scene.component.css'],
})
export class DuelSceneComponent implements OnChanges {
  @Input() userOneData: any;
  @Input() userTwoData: any;
  @Output() duelComplete = new EventEmitter<void>();

  dueling = false;
  showFightText = false;
  showWinnerText = false;

  brawlerGirlGif = 'assets/brawlerGirl/idle.gif';
  enemyPunkGif = 'assets/enemyPunk/idle.gif';

  brawlerLeftClass = 'left-10';
  brawlerBottomClass = 'bottom-0';

  enemyState: 'idle' | 'hurt' | 'final' = 'idle';

  ngOnChanges(changes: SimpleChanges) {
    if (this.userOneData && this.userTwoData) {
      this.startDuel();
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async startDuel() {
    this.showFightText = true;
    this.showWinnerText = false;
    this.dueling = true;
    this.enemyState = 'idle';

    this.brawlerGirlGif = 'assets/brawlerGirl/idle.gif';
    this.enemyPunkGif = 'assets/enemyPunk/idle.gif';
    this.brawlerLeftClass = 'left-10';
    this.brawlerBottomClass = 'bottom-0';

    setTimeout(() => {
      this.showFightText = false;
    }, 800);

    await this.delay(100);
    this.brawlerGirlGif = 'assets/brawlerGirl/jump.gif';
    this.brawlerLeftClass = 'left-1/3';
    this.brawlerBottomClass = 'bottom-24';

    await this.delay(300);
    this.brawlerGirlGif = 'assets/brawlerGirl/jump_kick.gif';
    this.brawlerLeftClass = 'left-[63%]';
    this.brawlerBottomClass = 'bottom-0';

    await this.delay(600);
    this.enemyPunkGif = `assets/enemyPunk/hurt.gif?${Date.now()}`;
    this.brawlerGirlGif = 'assets/brawlerGirl/punch.gif';

    await this.delay(1000);
    this.dueling = false;
    this.enemyState = 'idle';
    this.brawlerGirlGif = 'assets/brawlerGirl/idle.gif';
    this.brawlerLeftClass = 'left-10';
    this.brawlerBottomClass = 'bottom-0';

    this.showWinnerText = true;
    this.duelComplete.emit();
  }
}
