const nock = require('nock');
const test = require('tape');

test('test server routes, should receive an object with a key of updates', async(t) => {
    // because we are testing a server internally, we must allow localhost connections to test our routes
    const scope = await nock(`http://localhost:3500`)
        .get(`/v0/updates`)
        .reply(200, { updates: ["no new updates"]});

    // retrieve the body from the intercepted route, and parse the string to return the expected JSON
    const response = JSON.parse(scope.keyedInterceptors['GET http://localhost:3500/v0/updates'][0].body);

    t.deepEqual(response, { updates :["no new updates"]}, 'json response should match expected');
    t.end();
})