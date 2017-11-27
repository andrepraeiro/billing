export class AggregateRoot {

    constructor() {
        this.changes = []
        this.id = null
        this.version = 1
        this.type = ''
    }

    getUncommitedChanges() {
        return this.changes
    }

    markChangesAsCommited() {
        this.changes = []
    }

    loadsFromHistory(history) {
        history.forEach(function (e) {
            this.applyChange(e, { isNew: false })
        }, this);
    }

    getOptions(opt) {
        if (!opt)
            opt = { isNew: true, child: this }
        else if (!opt.isNew || !opt.child)
            opt = {
                child: !opt.child ? this : opt.child,
                isNew: opt.isNew == undefined ? true : opt.isNew
            }
        return opt
    }

    applyChange(event, opt) {
        opt = this.getOptions(opt)
        opt.child.apply(event);
        if (opt.isNew === true)         
            this.changes.push(event)                            
    }

    //apply(event) {
    //    throw new Error('Apply(event) Not implemented')
    //}
}
