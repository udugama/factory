
import { addBuiltTime } from '../model/timeModel'
// import { addItem, buildInventoryCount  } from './../model/InventoryModel'

export class RecipeBuild {
    reciepe: any;

    constructor(recipe: any) {
        this.reciepe = recipe
        addBuiltTime(this.reciepe.time)
        console.log(`> building recipe '${this.reciepe.index}' in ${this.reciepe.time}s (${this.reciepe.time}s total)`);
    }
}