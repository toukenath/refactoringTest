import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    describe('decay rate for', ()=>{
        describe("'normal' items", ()=>{
            it('should decrease quality by one', ()=>{
                const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20),new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(9);
                expect(resultItems[0].quality).to.equal(19);

                expect(resultItems[1].sellIn).to.equal(14);
                expect(resultItems[1].quality).to.equal(21);
            });

            it('should decrease quality by two when the sellin is passed', ()=>{
                const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 20)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(-1);
                expect(resultItems[0].quality).to.equal(18);
            });
        });

        describe('cheeses', ()=> {
            it('should increase!', ()=>{
                const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(1);
                expect(resultItems[0].quality).to.equal(1);
            });

            it('should increase!', ()=>{
                const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(-1);
                expect(resultItems[0].quality).to.equal(2);
            });
        });

        describe('concert ticket', ()=>{
            it('should drop the quality to 0 if the date is passed', ()=>{
                const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].quality).to.equal(0);
            });

            it('should decrease twice as fast when there are 10 days or less', ()=>{
                const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(9);
                expect(resultItems[0].quality).to.equal(22);
            });

            it('should decrease thrice as fast when there are 5 days or less', ()=>{
                const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(4);
                expect(resultItems[0].quality).to.equal(23);
            });
        });

        describe('mage food', ()=>{
            it('should decrease by 2', ()=>{
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 3, 6)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(2);
                expect(resultItems[0].quality).to.equal(4);
            });

            it('should decrease by 4 if the sellin is passed', ()=>{
                const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 0, 6)]);
                const resultItems = gildedRose.updateQuality();
                expect(resultItems[0].sellIn).to.equal(-1);
                expect(resultItems[0].quality).to.equal(2);
            });
        })
    });

    describe('general quality',()=>{
        it('should never have a quality higher than 50', ()=>{
            const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(50);
        });

        it('should never be negative', ()=>{
            const gildedRose = new GildedRose([new Item("Elixir of the Mongoose", -1, 0)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(0);
        });

        it('should never touch the quality of sulfuras', ()=>{
            const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
            const resultItems = gildedRose.updateQuality();
            expect(resultItems[0].quality).to.equal(80);
            expect(resultItems[0].sellIn).to.equal(0);
        });
    });
});
