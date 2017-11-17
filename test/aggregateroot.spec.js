import chai from 'chai'
import path from 'path'
import { AggregateRoot } from '../src/aggregateRoot'

chai.should()

describe('AggregateRoot', () => {
    describe('constructor', () => {
        let agg
        beforeEach(() => {
            agg = new AggregateRoot()            
        })

        it('changes length equal 0', () => {
            agg.changes.length.should.equal(0)
        })    
    })

    describe('markChangesAsCommited', () => {
        let agg = new AggregateRoot()            
        beforeEach(() => {
            agg.markChangesAsCommited();             
        })

        it('changes length equal 0', () => {
            agg.changes.length.should.equal(0)
        })    
    })

    describe('getOptions', () => {
        let agg = new AggregateRoot()            
        let opt
        beforeEach(() => {
            opt = agg.getOptions()
        })

        it('opt.isNew equal true', () => {
            opt.isNew.should.equal(true)
        })    

        it('opt.child equal this', () => {
            opt.child.should.equal(agg)
        })    
    })

    


})

