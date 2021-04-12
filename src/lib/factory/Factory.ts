import { Recipe } from './Recipe'
 
export class Factory {

    constructor (recipe: any, subRecipe: boolean = false) {
        new Recipe(recipe, subRecipe);
    }
}