import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css'],
})
export class InspectComponent implements OnInit {
  username: string = '';
  userData: any = null; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    console.log('onSubmit clicked with username:', this.username);
    this.userService.inspectUser(this.username).then((data) => {
      console.log('API response:', data);
      this.userData = data; // <- Save it
    }).catch(err => console.error(err));
  }
}
