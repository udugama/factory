exports.buildTypes = [
    {name: 'Electric Engine', recipe: 'recipe_elec_engine'},
    {name: 'Electric Circuit', recipe: 'recipe_circuit'},
];

exports.typesPlain = exports.buildTypes.map(function(o) {
    return o.name + ' (' + o.recipe + ')';
});

// build count 
exports.count = [
    {name: '1', count: '1'},
    {name: '2', count: '2'},
    {name: '3', count: '3'},
    {name: '4', count: '4'},
    {name: '5', count: '5'},
    {name: '6', count: '6'},
    {name: '7', count: '7'},
];