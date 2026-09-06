export class CollectionItem{
    id = -1;
    name = "Voiture";
    description = "Aucune description";
    rarity = "Commun";
    price = 10000;
    image = "img/chiron2.jpg"
    
    copy() {
        return Object.assign(new CollectionItem, this);
    }
}