import { loadInventory, getInventory, inventoryItemCount } from './lib/model/InventoryModel'
import { loadRecipes, getRecipes, recipeItemCount } from './lib/model/recipeModel'

export const listInventory = () => {
    loadRecipes();
    loadInventory();
    const inventory: any = getInventory();
    const recipes: any = getRecipes();

    console.log(`Inventory loaded: ${inventoryItemCount()} unique components`);
    console.log(`Recipes loaded: ${recipeItemCount()} total \n`);
    console.log('INVENTORY:');
    console.log(`* iron_plate: ${inventory.iron_plate}`);
    console.log(`* iron_gear: ${inventory.iron_gear}`);
    console.log(`* copper_plate: ${inventory.copper_plate}`);
    console.log(`* copper_cable: ${inventory.copper_cable}`);
    console.log(`* lubricant: ${inventory.lubricant} \n`);
}

export const mapOrder = (answer: any) => {
    return [ answer.buildType, parseInt(answer.buildCount) ]
}