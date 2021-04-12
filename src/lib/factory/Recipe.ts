import { getRecipeByProduce } from '../model/recipeModel'
import {
    setBuildItem,
    setupBuildUnit,
    getRunningInventory,
    consumeInventory,
    displayInventory,
} from '../model/InventoryModel'
import { getBuiltTime, resetBuiltTime } from '../model/timeModel'
import { Factory } from './Factory'

export class Recipe {
    partName: string = '';
    reciepe: any;
    buildStatus: boolean = false;

    constructor(recipe: any, sub: boolean = false) {
        getRunningInventory();
        const { consumes } = recipe
        const elements = Object.keys(consumes)
        elements.map((element) => {
            let i = 0;
            let count = consumes[element]
            const subRecipe = getRecipeByProduce(element)
            if (subRecipe) {
                for (i = 1; i <= count; i++) {
                    this.buildRecipe(subRecipe)
                }
            }
        })

        setBuildItem(recipe, 1)
        if (!sub) {
            setupBuildUnit(recipe);
            const incompleteInventory = consumeInventory();
            if (incompleteInventory) {
                console.log(` Built ${recipe.title} in ${getBuiltTime()} seconds\n`);
            } else {
                console.log(` Insufficient resources to build: ${recipe.title}\n`);
            }
            resetBuiltTime();
        }
    }

    buildRecipe = (recipe: any) => {
        let pendingConumableItems = false;
        const { consumes, time, title } = recipe
        const elements = Object.keys(consumes)
        elements.map((element) => {
            const recipe = getRecipeByProduce(element)
            if (recipe) {
                pendingConumableItems = true;
            }
        })
        if (pendingConumableItems) {
            new Factory(recipe, true)
        } else {
            setBuildItem(recipe, 1)
        }
    }

}