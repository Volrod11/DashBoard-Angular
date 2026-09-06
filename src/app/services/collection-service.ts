import { Injectable } from '@angular/core';
import { CollectionItem } from '../models/collection-item';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private collections: Collection[] = [];
  private currentId = 1;
  private currentItemIndex: {[key: number]: number} = {};

  constructor(){
    this.load();
  }

  private save(){
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  private load(){
    const collectionsJson = localStorage.getItem('collections');
    if (collectionsJson){
      this.collections = JSON.parse(collectionsJson).map((collectionJson: any) => {
        const collection = Object.assign(new Collection(), collectionJson);
        const itemsJson = collectionsJson['items'] || [];
        collection.items = itemsJson.map((item: any) => Object.assign(new CollectionItem()));
        return collection;
      });
      this.currentId = Math.max(...this.collections.map(collection => collection));
      this.currentItemIndex = this.collections.reduce(
        (indexes: {[key: number]: number}, collection) => {
          indexes[collection.id] = Mathmax[...collectionsJson.items.map(item => )]
          return indexes;
        }, {}
      );
    } else {
      this.generateDummyData();
      this.save();
    }
  }

  generateDummyData(){
    const chiron = new CollectionItem();
    chiron.name = "Chiron";
    chiron.description = "Hypercar française de chez bugatti développement 1500cv à l'aide de son W16 4 turbos.";
    chiron.rarity = "Legendaire";
    chiron.price = 1500000;
    chiron.image = "img/chiron2.jpg";

    const revuelto = new CollectionItem();
    revuelto.name = "Revuelto";
    revuelto.description = "Supercar hybride de chez Lamborghini developpement plus de 1000cv à l'aide de son v12.";
    revuelto.rarity = "Rare";
    revuelto.price = 550000;
    revuelto.image = "img/revuelto2.jpg";

    const gclass = new CollectionItem();
    gclass.name = "Classe G Mansory";
    gclass.description = "Classe G Mercedes préparé par Mansory avec son V8 6.3L.";
    gclass.rarity = "Legendaire";
    gclass.price = 800000;
    gclass.image = "img/gclass.jpg";

    const defaut = new CollectionItem();

    const defaultCollection = new Collection();
    defaultCollection.title = "Collection mix";

    const storedCollection = this.add(defaultCollection);
    this.addItem(storedCollection, chiron);
    this.addItem(storedCollection, revuelto);
    this.addItem(storedCollection, gclass);
    this.addItem(storedCollection, defaut);
  }

  getAll(): Collection[]{
    return this.collections.map(collection => collection.copy());
  }

  get(collectionId: number): Collection | null {
    const storedCopy = this.collections.find(
      collection => collection.id === collectionId
    );

    if(!storedCopy) return null;
    return storedCopy.copy();
  }

  add(collection: Omit<Collection, 'id' |'item'>): Collection {
    const storedCopy = collection.copy();
    storedCopy.id = this.currentId;
    this.collections.push(storedCopy);

    this.currentItemIndex[storedCopy.id] = 1;
    this.currentId ++;

    return storedCopy.copy();
  }

  update(collection: Omit<Collection, 'item'>): Collection | null {
    const storedCopy = this.collections.find(
      c => c.id === collection.id
    );

    if (!storedCopy) return null;

    Object.assign(storedCopy, collection);
    return storedCopy.copy();
  }

  delete(collectionId: number): void{
    this.collections = this.collections.filter(
      collection => collection.id !== collectionId
    );
  }

  addItem(collection: Collection, item: CollectionItem): Collection | null {
    const storedCollection = this.collections.find(c => c.id === collection.id);

    if (!storedCollection) return null;

    const nextIndex = this.currentItemIndex[storedCollection.id] ?? 1;
    const newItem = item.copy ? item.copy() : Object.assign(new CollectionItem(), item);
    newItem.id = nextIndex;
    this.currentItemIndex[storedCollection.id] = nextIndex + 1;

    storedCollection.items.push(newItem);
    return storedCollection.copy();
  }

  updateItem(collection: Collection, item: CollectionItem): Collection | null {
    const storedCollection = this.collections.find(c => c.id === collection.id);

    if (!storedCollection) return null;

    const storedItem = storedCollection.items.find(i => i.id === item.id);
    if (!storedItem) return null;

    Object.assign(storedItem, item);
    return storedCollection.copy();
  }

  deleteItem(collectionId: number, itemId: number): Collection | null {
    const storedCollection = this.collections.find(
      collection => collection.id === collectionId
    );

    if (!storedCollection) return null;

    storedCollection.items = storedCollection.items.filter(i => i.id !== itemId);
    return storedCollection.copy();
  }
}
