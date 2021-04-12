import recipesData from '../../../dataStore/recipes/recipes.json'

let recipes: object = {}

export const loadRecipes = () => {
    recipes = recipesData;
}

export const getRecipes = () => {

    return recipes;
}

export const recipeItemCount = () => {
    const length = Object.keys(recipes).length;

    return length;
}

export const getMappedRecipe = (recipe: string) => {
    let itemRecipe: any;
    const indexes = Object.keys(recipes);
    indexes.map((index) => {
        const item = recipes[index];
        const { produces } = item
        const [ value ] = Object.entries(produces)[0]
        if (item.title === recipe) {
            itemRecipe = item;
            itemRecipe.index = index;
            itemRecipe.produce = value;
        }
    })

    return itemRecipe;
}

export const getRecipeByProduce = (produce: string) => {
    let response: any = false
    const keys = Object.keys(recipes);
    keys.map((index) => {
        const currentRecipe = recipes[index]
        const { produces } = currentRecipe
        const [ value ] = Object.entries(produces)[0]
        if (produce === value) {
            currentRecipe.index = index;
            currentRecipe.produce = produce;
            response = currentRecipe;
        }
    })
    
    return response
}