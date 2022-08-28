const test = require('tape');

const { range } = require('../app/getCipherKey');

// test the simple logic at a handful of inputs, which include single and double digit numbers
for (let i = 5; i < 10; i++) {
    test('range should return an array sorted from "start" to "end-1", given as parameters, when start is less than end', t => {
        const result = range( i, i + 4 )

        t.deepEqual(result, [ i, i + 1, i + 2, i + 3 ])
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

for (let i = -5; i < 0; i++) {
    test('range should still return a sorted array when parameters are all, or partially, negative', t => {
        const result = range(i, i + 4)

        t.deepEqual(result, [ i, i + 1, i + 2, i + 3 ])
        t.end()
    })
}

test('range should still return a sorted array when the start parameter is a float expressed as a decimal', t => {
    const result = range(4.22, 8)

    t.deepEqual(result, [ 4.22, 5.22, 6.22, 7.22 ])
    t.end()
})

test('range should still return a sorted array when the start parameter is a float expressed as a fraction', t => {
    const result = range(3/4, 4)

    t.deepEqual(result, [ 0.75, 1.75, 2.75, 3.75 ])
    t.end()
})