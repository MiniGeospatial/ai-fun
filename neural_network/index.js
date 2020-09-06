const { Network } = require('./network');
const { dot } = require('mathjs');

dataset = [
    [[0,0], [1]],
    [[1,0], [0]],
    [[0,1], [0]],
    [[1,1], [1]],
];

const network = new Network(2,3,1);

dataset.map(d => {
    const answer = network.activate(d[0]);
    console.log(`For inputs ${d[0]} the answer is ${answer}`);
});

network.train(dataset, 100000);

dataset.map(d => {
    const answer = network.activate(d[0]);
    console.log(`For inputs ${d[0]} the answer is ${answer}`);
});