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
  errorMessage: string | null = null;

  duelTriggered = false;
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  onSubmit() {
    this.duelComplete = false;
    this.duelTriggered = true;
    this.loading = true;
    this.errorMessage = null;

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
        } else {
          this.errorMessage = 'One or both usernames are invalid.';
        }
      })

      .catch((err) => {
        console.error(err);
        this.errorMessage = 'One or both usernames are invalid.';
      })

      .finally(() => {
        this.loading = false;
      });
  }

  duelComplete = false;

  onDuelComplete() {
    this.duelComplete = true;
  }
}
