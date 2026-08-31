import { Component, signal } from '@angular/core';
import { CollectionItemCar } from './components/collection-item-car/collection-item-car';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CollectionItemCar],
})
export class App {
  protected readonly title = signal('DashBoard_Argent_Angular');
}
