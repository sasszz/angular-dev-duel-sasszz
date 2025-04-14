import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css'],
})
export class DuelComponent implements OnInit {
  usernameOne: string = '';
  usernameTwo: string = '';
  data: any[] = [];
  userOneData: any = null;
  userTwoData: any = null;

  duelTriggered = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  onSubmit() {
    this.duelTriggered = true;
    console.log(
      'onSubmit clicked with usernames:',
      this.usernameOne,
      this.usernameTwo
    );

    this.userService
      .duelUsers(this.usernameOne, this.usernameTwo)
      .then((data) => {
        console.log('API response:', data);

        if (Array.isArray(data)) {
          this.userOneData = data[0];
          this.userTwoData = data[1];
          console.log('userOneData:', this.userOneData);
          console.log('userTwoData:', this.userTwoData);
        }
      })

      .catch((err) => console.error(err));
  }

  duelComplete = false;

  onDuelComplete() {
    this.duelComplete = true;
  }
}
