#!/usr/bin/env node

import * as inquirer from 'inquirer';
const values = require('./lib/values');
import { listInventory, mapOrder } from './handler'
import { build } from './lib/factory/client'

listInventory()

let follow = true;
let orders: any = []
let count = 0;

const inquiry = async () => {
    const questions = [
        { type: 'list', name: 'buildType', message: 'Choose Build Type', choices: values.buildTypes },
        { type: 'list', name: 'buildCount', message: 'Choose count', choices: values.count },
        { type: 'confirm', name: 'newOrder', message: 'Do you prefer to add another order?', default: false },
    ];
    
    return await inquirer
        .prompt(questions)
}

(async () => {
    while (follow) {
        const answers: any = await inquiry ()
        // console.log(answers, answers.newOrder, answers.newOrder === false)
        if (answers.newOrder === false) {
            follow = false
        } else if (count > 2) {
            console.log('exceed number of orders allowed.')
        }
        orders.push(mapOrder(answers))
        count++
    };

    build(orders)
})();
