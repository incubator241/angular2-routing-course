import { Component } from '@angular/core';
import { Auth } from './auth.service';

@Component({
  selector: 'my-app',
  styles: [`
    .active   {
      color: #FFF !important;
    }
  `],
  templateUrl: './app/app.component.html'
})
export class AppComponent {
  constructor(private auth: Auth) {
  console.log(auth);
  }
  message = 'This is the sample message.';
}
