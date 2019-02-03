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

    updateQuality() {
        this.items.forEach((item)=> {
            if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                this.decreaseQuality(item);
            } else {
                this.increaseQuality(item);
                if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (item.sellIn < 11) {
                        this.increaseQuality(item);
                    }
                    if (item.sellIn < 6) {
                        this.increaseQuality(item);
                    }
                }
            }
            this.decreaseSellIn(item);
            if (item.sellIn < 0) {
                if (item.name != 'Aged Brie') {
                    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        this.decreaseQuality(item);
                    } else {
                        item.quality = 0;
                    }
                } else {
                    this.increaseQuality(item);
                }
            }
        });
        return this.items;
    }

    isSulfuras(item: Item): boolean {
        return item.name === 'Sulfuras, Hand of Ragnaros';
    }

    increaseQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    decreaseQuality(item: Item) {
        if (!this.isSulfuras(item) && item.quality > 0) {
            item.quality = item.quality - 1; 
        } 
    }

    decreaseSellIn(item: Item) {
        if (!this.isSulfuras(item)) {
            item.sellIn = item.sellIn - 1;
        }
    }
}
