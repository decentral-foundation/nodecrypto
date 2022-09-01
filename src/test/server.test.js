const nock = require('nock');
const test = require('tape');
const axios = require('axios');

const useRoute = async (url, method, data, headers) => {
    // const res = await axios.get('http://localhost:3500/v0/updates');
    const res = await axios({
        method: method,
        url: url,
        data: {...data},
        headers: {...headers}
      });
    console.log("res.data: ",res.data);
    const response_data = res.data;
    return response_data;
}

const defaultHeaders = {'Connection': 'keep-alive', 'Pragma': 'no-cache'}

test('test server routes, should receive an object with a key of updates', async(t) => {
    nock(`http://localhost:3500`)
        .get(`/v0/updates`)
        .reply(200, { updates: ["no new updates"]});

    const mockedResponse = await useRoute('http://localhost:3500/v0/updates');
    const expectedResponse = { updates: ["no new updates"]};

    t.deepEqual(mockedResponse, expectedResponse, 'json from mocked response should match expected');
    t.end();
})

// Test for version 0 `protect` route
test('test POST for API v0 protect endpoint, should receive some HTML', async(t) => {
    
    const method = 'post'
    let request_body = {filename: 'testfile', extension: 'csv', password: 'deaba315ababa315adeaa315deabafed'};
    
    nock(`http://localhost:3500`, {
        reqheaders: {...defaultHeaders},
    })
        .post(`/v0/protect/`, request_body)
        .reply(200, 
            "<div>Received File Protection Request</div>", 
            { 'Content-type': 'text/plain',}
        );

    const mockedResponse = await useRoute('http://localhost:3500/v0/protect/', method, request_body, defaultHeaders);
    const expectedResponse = "<div>Received File Protection Request</div>";

    t.deepEqual(mockedResponse, expectedResponse, 'json from mocked response should match expected');
    t.end();
})

// Test for version 1 `protect` route
