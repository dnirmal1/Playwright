const { expect,test } = require('@playwright/test');

test("my first test",async({page}) =>{
    expect("Aishwarya").toContain("Aishwarya");
})

test("My second test", async({page}) =>{
    expect("Aishwarya Patil".includes("Patil")).toBeTruthy();
})

test("My third test",async({page}) =>{
    expect(2.1).toBe(2.1);
})

test("My fourth test" , async({page}) =>{
    expect("Aishwarya Patil").toContain("Aishwarya")
    expect(true).toBeTruthy();
})