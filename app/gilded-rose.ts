export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {

    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Item[] {
        this.items.forEach((item)=> {
            this.decreaseSellIn(item);
            if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                this.handleConcertTicket(item);
                return;
            } 
            if (item.name === 'Aged Brie') {
                this.increaseQuality(item, (item.sellIn < 0)? 2 : 1);
                return;
            } 
            if (item.name === 'Conjured Mana Cake') {
                this.decreaseQuality(item, (item.sellIn < 0)? 4 : 2);
                return;
            }
            this.decreaseQuality(item, (item.sellIn < 0)? 2 : 1);
            
        });
        return this.items;
    }

    isSulfuras(item: Item): boolean {
        return item.name === 'Sulfuras, Hand of Ragnaros';
    }

    increaseQuality(item: Item, incrementBy = 1): void {
        if (!this.isSulfuras(item)) {
            item.quality = (item.quality + incrementBy <= 50)? item.quality + incrementBy : 50
        }
    }

    decreaseQuality(item: Item, decrementBy = 1): void {
        if (!this.isSulfuras(item)) {
            item.quality = (item.quality - decrementBy >= 0)? item.quality - decrementBy : 0; 
        } 
    }

    decreaseSellIn(item: Item): void {
        if (!this.isSulfuras(item)) {
            item.sellIn --;
        }
    }

    handleConcertTicket(item: Item): void {
        if (item.sellIn < 0) {
            item.quality = 0;
        }
        else {
            this.increaseQuality(item);
            if (item.sellIn <= 10) {
                this.increaseQuality(item, (item.sellIn <= 5)? 2 : 1);
            }
        }
    }
}
