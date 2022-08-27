const test = require('tape');

const { range } = require('../app/getCipherKey');

test('range should return an array sorted from start to end', t => {
    const result = range( 2, 8 )
    t.deepEqual(result, [ 2, 3, 4, 5, 6, 7 ])
    t.end()
})