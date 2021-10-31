"use strict";

let assert = require("assert").strict;
let {Corporation} = require("./corporation");

/**
 * @description - should calculate franchise tax using authorized shares method
 */
function TestAuthorizedShares() {
  
  let method = 'AuthorizedShares'
  let corporation = new Corporation('C Corp',10000000);
  corporation.issueAnnualReport('31.1.2018');
  corporation.authorizeShares(10005); //10,005 shares
  let tax = corporation.calculateTax(method,2018);
  assert.deepEqual(335,tax);
}


/**
 * @description - should calculate franchise tax using authorized shares method
 */
function TestCorporation() {
  let method = 'AuthorizedShares'
  let corporation = new Corporation('C Corp',100000000);
  corporation.issueAnnualReport('31.1.2019');
  corporation.authorizeShares(100000) // 100,000 shares 

  assert.deepEqual(corporation.authorized_shares,100000)
  let tax = corporation.calculateTax(method,2019);
  assert.deepEqual(1015,tax);// $1,015.00($250.00 plus $765.00[$85.00 x 9]).

  corporation.authorizeShares(20000);
  corporation.fiscal_years.push(2001);
  corporation.fiscal_years.push(2002);
  assert.deepEqual(corporation.authorized_shares,120000);
  corporation.enableDividends(1.00);

}



function TestEarningsPerShare(){
  let method = 'AuthorizedShares';
  let interest_expense = 625000;
  let avg_total_assets = 55720000 / 2; 
  let tax_rate = 40.0 * .01; 
  let product_roi = 6.730078 * .01; 
  let net_income = HelperNetIncome(avg_total_assets, interest_expense, tax_rate, product_roi);
  assert.deepEqual(Math.round(net_income),1500000); // implement better float interface
  

  let corporation = new Corporation('C Corp',700000);
  corporation.authorizeShares(100000);
  let eps = corporation.calculateEarningsPerShare(net_income,43.5 * .01);
  console.log("eps: ",eps);

}


TestAuthorizedShares();
TestCorporation();
TestEarningsPerShare()

/**
 * @description - Alternative net income formula
 * @param averageTotalAssets {number} - Amount in dollars, area under the curve start and end of year
 * @param interestExpense {number} - Amount in dollars, Provided by other formula
 * @param taxRate {number} - Corp tax rate float with 3 precision points, reference number 40%
 * @param productROI {number} - Return on total assets applied through reduce sum function
 */
function HelperNetIncome(averageTotalAssets, interestExpense, taxRate, productROI) {
  let subtotalInterestExpense = (interestExpense * (1 - taxRate));
  let netIncome = (averageTotalAssets * productROI) - subtotalInterestExpense; 
  return netIncome;
}

