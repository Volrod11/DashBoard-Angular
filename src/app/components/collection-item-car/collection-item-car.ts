import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CollectionItem } from '../../models/collection-item';

@Component({
  selector: 'app-collection-item-car',
  imports: [],
  templateUrl: './collection-item-car.html',
  styleUrl: './collection-item-car.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionItemCar {
  item: InputSignal<CollectionItem> = input.required<CollectionItem>();
}