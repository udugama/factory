import { getMappedRecipe } from '../model/recipeModel'
import { Factory } from './Factory'
import { displayInventory } from './../model/InventoryModel'

export const build = (orders: any) => {
    orders.map((order) => {
        let i = 1
        const name = order[0]
        const count = order[1]
        const recipe = getMappedRecipe(name)

        for (i = 1; i <= count; i++) {
            processRecipe(recipe)
        }

        displayInventory();
    }) 
}

export const processRecipe = (recipe: any) => {
    new Factory(recipe)
}