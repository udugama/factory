import inventoryData from '../../../dataStore/inventory/inventory.json'
import { getRecipeByProduce } from './recipeModel'
import { RecipeBuild } from '../factory/RecipeBuild'

let inventory: object = {}
let runningInventory: object = {}
let buildList: any = {}
let recipeArray: any = []
let itemRecipes: any = {}
let inadequateStock: boolean = false;
let buildInventory: any = {};

export const loadInventory = () => {
    inventory = inventoryData
}

// retrieve data
export const getInventory = () => {

    return inventory; 
}

export const inventoryItemCount = () => {
    const length = Object.keys(inventory).length;

    return length;
}

export const getRunningInventory = () => {
    runningInventory = getInventory();
    return runningInventory;
}

export const updateRunningInventory = (index: string, value: number) => {
    if (buildInventory[index]) {
        buildInventory[index] = buildInventory[index] + value;
    } else {
        buildInventory[index] = value;
    }
}

export const getBuildItems = () => {
    return buildList;
}

export const setBuildItem = (recipe: any, value: number) => {
    const index = recipe.index;

    recipeArray.push(index);
    if (buildList[index]) {
        buildList[index] = buildList[index] + value;
    } else {
        buildList[index] = value;
    }
    itemRecipes[index] = recipe;
}

export const setupBuildUnit = (recipe: any) => {

    const recipes = Object.keys(buildList);
    recipes.map((index) => {
        reserveInventory(index, buildList[index]);
    })
}

export const buildUnit = () => {
    const recipes = Object.keys(buildList);
    let i;
    recipes.map((index) => {
        const count = buildCount(index, buildList[index])
        const item = itemRecipes[index];
        updateRunningInventory(item.produce, count);
        for (i = 1; i <= count; i++) {
            new RecipeBuild(itemRecipes[index]);
        }
    })
}

export const reserveInventory = (recipeName: string, count: number) => {
    const { produce: item, consumes: inventory } = itemRecipes[recipeName]
    if(runningInventory[item]) {
        const itemCount = runningInventory[item];
        if (itemCount >= count) {
            runningInventory[item] = itemCount - count;
            buildList[recipeName] = 0
        } else if (itemCount < count) {
            runningInventory[item] = 0
            buildList[recipeName] = count - itemCount;
        }
    }

    Object.keys(inventory).map((inventoryItem) => {
        const consumeCount = inventory[inventoryItem]
        const recipe = getRecipeByProduce(inventoryItem)
        if (recipe === false) {
            if (runningInventory[inventoryItem] >= (consumeCount * buildList[recipeName])) {
                runningInventory[inventoryItem] = runningInventory[inventoryItem] - (consumeCount * buildList[recipeName])
            } else {
                inadequateStock = true
            }
        }
    })
}

export const consumeInventory = () => {
    let result: boolean;
    if (inadequateStock) {
        runningInventory = {};
        result = false;
    } else {
        buildUnit();
        inventory = runningInventory;
        result = true;
    }
    buildList = {};
    itemRecipes = {};
    recipeArray = [];
    inadequateStock = false;

    return result;
}

export const buildCount = (recipe: string, count: number) => {
    if (recipe === 'recipe_cables') {
        return count/2 + count % 2;
    } else {
        return count;
    }
}

export const buildInventoryCount = (recipe: string) => {
    if (recipe === 'recipe_cables') {
        return 2;
    } else {
        return 1;
    }
}

export const displayInventory = () => {
    const items = Object.keys(inventory);
    console.log(`INVENTORY:`);
    items.map((index) => {
        console.log(`* ${index}: ${inventory[index]}`);
    })
}
