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

    t.deepEqual(mockedResponse, expectedResponse, 'HTML from mocked response should match expected');
    t.end();
})

// Test for version 1 `protect` route
test('test POST for API v1 protect endpoint, should receive some JSON', async(t) => {
    
    const method = 'post'
    let request_body = {filename: 'testfile', password: 'deaba315ababa315adeaa315deabafed'};
    
    nock(`http://localhost:3500`, {
        reqheaders: {...defaultHeaders},
    })
        .post(`/v1/protect/`, request_body)
        .reply(200, 
            { 
                userId: 2100,
                message: "Cipher Text stored in Cache",
            }
        );

    const mockedResponse = await useRoute('http://localhost:3500/v1/protect/', method, request_body, defaultHeaders);
    // console.log(mockedResponse);
    const mockedUserId = mockedResponse['userId'];
    const expectedResponse = { 
        userId: 2100,
        message: "Cipher Text stored in Cache",
    };

    t.ok(Number.isInteger(mockedUserId), "userId should be integer");
    t.ok(mockedUserId >= 0, "userId should be geq 0");
    t.ok(mockedUserId <= 3000, "userId should be leq 3000");
    t.deepEqual(mockedResponse, expectedResponse, 'JSON from mocked response should match expected');
    t.end();
})

// Test for version 0 `unlock` route
test('test PUT for API v0 unlock endpoint, should receive some HTML', async(t) => {
    
    const method = 'put'
    let request_body = {filename: 'testfile', extension: 'csv', password: 'deaba315ababa315adeaa315deabafed'};
    
    nock(`http://localhost:3500`, {
        reqheaders: {...defaultHeaders},
    })
        .put(`/v0/unlock/`, request_body)
        .reply(200, 
            "<div>Received File Unlock Request</div>", 
        );

    const mockedResponse = await useRoute('http://localhost:3500/v0/unlock/', method, request_body, defaultHeaders);
    const expectedResponse = "<div>Received File Unlock Request</div>";

    t.equal(mockedResponse, expectedResponse, 'HTML from mocked response should match expected');
    t.end();
})

// Failure test for version 0 `unlock` route
// Simulate failure with empty password provided
test('test failure API v0 unlock endpoint when empty password, should some error JSON', async(t) => {
    
    const method = 'put'
    let request_body = {filename: 'testfile', extension: 'csv', password: ''};
    
    nock(`http://localhost:3500`, {
        reqheaders: {...defaultHeaders},
    })
        .put(`/v0/unlock/`, request_body)
        .reply(200, 
            {message: "Error 500"}, 
        );

    const mockedResponse = await useRoute('http://localhost:3500/v0/unlock/', method, request_body, defaultHeaders);
    const expectedResponse = {message: "Error 500"};

    t.deepEqual(mockedResponse, expectedResponse, 'JSON from mocked response should match expected');
    t.end();
})

// Test for version 1 `unlock` route
test('test POST for API v1 unlock endpoint, should receive some JSON', async(t) => {
    
    const method = 'post';
    let filename = 'testfile.md';
    let userId = 1800;
    let request_body = {
        decipherText: 'Lorem ipsum something or other', 
        userId: userId,
    };
    
    let responseMsg = `Decrypted message for user ${userId} enclosed`;

    nock(`http://localhost:3500`, {
        reqheaders: {...defaultHeaders},
    })
        .post(`/v1/unlock/${filename}`, request_body)
        .reply(200, 
            { 
                myDecipherText: "Decrypted lorem ipsum",
                message: responseMsg,
            }
        );

    const mockedResponse = await useRoute('http://localhost:3500/v1/unlock/testfile.md', method, request_body, defaultHeaders);
    const expectedResponse = { 
        myDecipherText: "Decrypted lorem ipsum",
        message: responseMsg,
    };

    t.deepEqual(mockedResponse, expectedResponse, 'JSON from mocked response should match expected');
    t.end();
})

