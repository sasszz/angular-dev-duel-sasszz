import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dev-duel';

  constructor(private userService: UserService) {
    // Warm up the backend API to avoid cold start lag
    fetch('https://dev-duel-api-p9sy.onrender.com/api/health-check');
  }

  async inspectUser(username: string = 'andrew') {
    const data = await this.userService.inspectUser(username);
  }

  async duelUsers(user1: string, user2: string) {
    const data = await this.userService.duelUsers(user1, user2);
  }
}
