import { ChangeDetectionStrategy, Component, computed, effect, inject, model, signal } from '@angular/core';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";
import { Collection } from './models/collection';
import { CollectionItemCar } from './components/collection-item-car/collection-item-car';
import { CollectionService } from './services/collection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [SearchBar, CollectionItemCar],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  private collectionService = inject(CollectionService);
  search = model('');

  chiron!: CollectionItem;
  revuelto!: CollectionItem;
  gclass!: CollectionItem;

  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items;
    return allItems?.filter(
      item => item.name.toLocaleLowerCase().includes(
        this.search().toLocaleLowerCase()
    ))
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0){
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addGenericItem(){
    const collection = this.selectedCollection();
    if(collection) {
      const storedCollection = this.collectionService.addItem(
        collection, new CollectionItem()
      );

      this.selectedCollection.set(storedCollection);
    }
  }

  private save(){
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }
}
