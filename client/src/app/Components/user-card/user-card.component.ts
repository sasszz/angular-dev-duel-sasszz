import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnChanges {
  @Input() user: any;
  @Input() isUserOne: boolean = false;
  stats: any[] = [];

  ngOnChanges(): void {
    if (this.user) {
      this.stats = [
        { label: 'username', value: this.user.username },
        { label: 'bio', value: this.user.bio },
        { label: 'name', value: this.user.name },
        { label: 'location', value: this.user.location },
        { label: 'titles', value: this.user.titles?.join(', ') || 'None' },
        { label: 'fav language', value: this.user['favorite-language'] },
        { label: 'total stars', value: this.user['total-stars'] },
        { label: 'highest star count', value: this.user['highest-starred'] },
        { label: 'public repos', value: this.user['public-repos'] },
        { label: 'perfect repos', value: this.user['perfect-repos'] },
        { label: 'followers', value: this.user.followers },
        { label: 'following', value: this.user.following },
      ];
    }
  }
}
