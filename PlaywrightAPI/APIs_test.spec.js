const{test, expect} = require('@playwright/test');
const { exec } = require('child_process');
const { request } = require('http');
var userID;

test('GET users' ,async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('POST users' , async ({request}) => {
    const response = await request.post('https://reqres.in/api/users', {
        data : { "name": "morpheus","job": "leader" }, 
        headers : { "Accept" : "application/json"}
    });
    console.log(await response.json());
    expect(response.status()).toBe(201);
    var res =  await response.json();
    userID = res.id;
    console.log(userID);
});

test('Update users' , async({request}) => {
    const response = await request.put('https://reqres.in/api/users/'+userID,{
        data : {"name": "morpheus","job": "zion resident"},
        headers : {"Accepyt" : "application/json"}
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test('DELETE users' , async({request}) => {
    const response = await request.delete('https://reqres.in/api/users/'+userID);
    expect(response.status()).toBe(204);
});
