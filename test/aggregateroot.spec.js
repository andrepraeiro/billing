import chai from 'chai'
import path from 'path'
import  AggregateRoot  from '../src/Domain/aggregateroot'
import  MockAggregate  from './Mocks/mockaggregate'

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

    describe('getOptions opt null', () => {
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

    describe('getOptions !opt.isNew || !opt.child', () => {
        let agg = new AggregateRoot()            
        let opt = {a: 1}
        beforeEach(() => {
            opt = agg.getOptions(opt)
        })

        it('opt.isNew equal true', () => {
            opt.isNew.should.equal(true)
        })    

        it('opt.child equal this', () => {
            opt.child.should.equal(agg)
        })    
    })

    describe('getOptions !opt.child && opt.isNew: true', () => {
        let agg = new AggregateRoot()            
        let opt = {isNew: true}
        beforeEach(() => {
            opt = agg.getOptions(opt)
        })

        it('opt.isNew equal true', () => {
            opt.isNew.should.equal(true)
        })    

        it('opt.child equal this', () => {
            opt.child.should.equal(agg)
        })    
    })

    describe('getOptions !opt.child && opt.isNew: false', () => {
        let agg = new AggregateRoot()            
        let opt = {isNew: false}
        beforeEach(() => {
            opt = agg.getOptions(opt)
        })

        it('opt.isNew equal false', () => {
            opt.isNew.should.equal(false)
        })    

        it('opt.child equal null', () => {
            opt.child.should.equal(agg)
        })    
    })

    describe('applyChange opt.isNew: false', () => {
        let agg = new MockAggregate()            
        let opt = {isNew: false}
        let event = {}
        beforeEach(() => {
            agg.applyChange(event, opt)
            
        })
        
        it('changes.length should be 1', () => {
            agg.changes.length.should.equal(1)
        })    
    })
    
    describe('applyChange opt.isNew: true', () => {
        let agg = new MockAggregate()            
        let opt = {isNew: true}
        let event = {}
        beforeEach(() => {
            agg.applyChange(event, opt)
            
        })
        
        it('changes.length should be 2', () => {
            agg.changes.length.should.equal(2)
        })    
    })
})

