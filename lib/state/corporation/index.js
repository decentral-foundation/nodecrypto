const { Corporation } = require('corporation.js');

module.exports = {
  corporation: Corporation
}

/*
Assumed Par Value Capital Method

  To use this method, you must give figures for all issued shares 
  (including treasury shares) and total gross assets in the spaces
   provided in your Annual Franchise Tax Report. Total Gross Assets
    shall be those “total assets” reported on the U.S. Form 1120, 
    Schedule L (Federal Return) relative to the company’s fiscal 
    year ending the calendar year of the report. The tax rate under this 
 */


/*
Assumed Par Value Capital Method

  Total Gross Assets shall be those “total assets” reported on the 
  U.S. Form 1120, Schedule L (Federal Return) relative to the company’s 
  fiscal year ending the calendar year of the report. 

  NOTE: If an amendment changing your stock or par value was filed with 
  the Division of Corporations during the year, issued shares and total 
  gross assets within 30 days of the amendment must be given for each 
  portion of the year during which each distinct authorized amount of 
  capital stock or par value was in effect. The tax is then prorated 
  for each portion of the year dividing the number of days the stock/par 
  value was in effect by 365 days (366 leap year), then multiplying this 
  result by the tax calculated for that portion of the year. 

  The total tax for the year is the sum of all the prorated taxes for 
  each portion of the year.
*/