const test = require('tape');

const { range } = require('../app/getCipherKey');


for (let i = 0; i < 10; i++) {
    test('range should return an array sorted from "start" to "end", given as parameters, when start is less than end', t => {
        const result = range( i, i + 5 )

        t.deepEqual(result, [ i, i + 1, i + 2, i + 3, i + 4 ])
        t.end()
    })
}

test('range should return an empty array when the end is less than the start', t => {
    const result = range(5, 4)

    t.deepEqual(result, [])
    t.end()
})

test('range should return an array sorted from 0 to start-1 whenever the end parameter has a data type of undefined', t => {
    // declare x as an undefined variable
    let x;
    const result = range(4, x)

    t.deepEqual(result, [0, 1, 2, 3])
    t.end()
})