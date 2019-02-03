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


    readonly NEVER_GONNE_DROP_ITEM: string = 'Sulfuras, Hand of Ragnaros';
    readonly CONCERT_TICKET: string = 'Backstage passes to a TAFKAL80ETC concert';
    readonly OLD_CHEESE: string = 'Aged Brie';
    readonly MAGE_FOOD: string = 'Conjured Mana Cake';
    readonly MAX_QUALITY: number = 50;
    readonly MIN_QUALITY: number = 0;
    readonly TICKET_INTERMEDIATE_SELLIN: number = 10;
    readonly TICKET_LAST_CALL: number = 5;


    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Item[] {
        this.items.forEach((item)=> {
            this.decreaseSellIn(item);
            if (item.name === this.CONCERT_TICKET) {
                this.handleConcertTicket(item);
                return;
            } 
            if (item.name === this.OLD_CHEESE) {
                this.increaseQuality(item, (item.sellIn < 0)? 2 : 1);
                return;
            } 
            if (item.name === this.MAGE_FOOD) {
                this.decreaseQuality(item, (item.sellIn < 0)? 4 : 2);
                return;
            }
            this.decreaseQuality(item, (item.sellIn < 0)? 2 : 1);
            
        });
        return this.items;
    }

    isSulfuras(item: Item): boolean {
        return item.name === this.NEVER_GONNE_DROP_ITEM;
    }

    increaseQuality(item: Item, incrementBy = 1): void {
        if (!this.isSulfuras(item)) {
            item.quality = (item.quality + incrementBy <= this.MAX_QUALITY)? item.quality + incrementBy : this.MAX_QUALITY
        }
    }

    decreaseQuality(item: Item, decrementBy = 1): void {
        if (!this.isSulfuras(item)) {
            item.quality = (item.quality - decrementBy >= this.MIN_QUALITY)? item.quality - decrementBy : this.MIN_QUALITY; 
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
            if (item.sellIn <= this.TICKET_INTERMEDIATE_SELLIN) {
                this.increaseQuality(item, (item.sellIn <= this.TICKET_LAST_CALL)? 2 : 1);
            }
        }
    }
}
