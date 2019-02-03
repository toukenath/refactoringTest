import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
        new Item("Conjured Mana Cake", 3, 6)];

    describe('decay rate', function(){

    });

    it('should decrease quality for normal item', function() {
        const gildedRose = new GildedRose(items);
        const resultItems = gildedRose.updateQuality();

        expect(resultItems[0].sellIn,'vest').to.equal(9);
        expect(resultItems[0].quality,'vest').to.equal(19);

        expect(resultItems[1].sellIn, 'brie').to.equal(1);
        expect(resultItems[1].quality, 'brie').to.equal(1);

        expect(resultItems[2].sellIn, 'sulfuras').to.equal(0);
        expect(resultItems[2].quality, 'sulfuras').to.equal(80);

        expect(resultItems[3].sellIn, 'concert ticket 1').to.equal(14);
        expect(resultItems[3].quality, 'concert ticket 1').to.equal(21);

        expect(resultItems[4].sellIn, 'concert ticket 2').to.equal(9);
        expect(resultItems[4].quality, 'concert ticket 2').to.equal(22);

        expect(resultItems[5].sellIn, 'concert ticket 3').to.equal(4);
        expect(resultItems[5].quality, 'concert ticket 3').to.equal(23);

        // expect(resultItems[6].sellIn, 'mage food').to.equal(2);
        // expect(resultItems[6].quality, 'mage food').to.equal(4); TODO don't work yet
    });

    describe('quality',function(){
        it('should never have a quality higher than 50 excepted for sulfuras', function() {
            const gildedRose = new GildedRose([
                new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
            ]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(50);
        });

        it('should never be negative', function(){
            const gildedRose = new GildedRose([new Item("Elixir of the Mongoose", -1, 0)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(0);
        });

        it('should never touch the quality of sulfuras', function(){
            const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(80);
        });

        it('should drop the quality for concert ticket if the date is passed', function(){
            const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(0);
        });
    });
});
