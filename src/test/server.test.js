const nock = require('nock');
const test = require('tape');
const axios = require('axios');

const useRoute = async () => {
    const res = await axios.get('http://localhost:3500/v0/updates');
    console.log("res.data: ",res.data);
    const data = res.data;
    return data;
}

test('test server routes, should receive an object with a key of updates', async(t) => {
    nock(`http://localhost:3500`)
        .get(`/v0/updates`)
        .reply(200, { updates: ["no new updates"]});

    const mockedResponse = await useRoute();
    const expectedResponse = { updates: ["no new updates"]};

    t.deepEqual(mockedResponse, expectedResponse, 'json from mocked response should match expected');
    t.end();
})