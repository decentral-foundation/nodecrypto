/**
For corporations having no par value stock the authorized 
shares method will always result in the lesser tax.

- 5,000 shares or less (minimum tax) $175.00.
- 5,001 – 10,000 shares – $250.00,
- each additional 10,000 shares or portion thereof add $85.00
- maximum annual tax is $200,000.00

*/

class Corporation {
  
  constructor(name, total_shares, incorp_date) {
    this.name = name;
  	this.total_shares = total_shares;
  	this.authorized_shares = 0;
    this.issued_shares = 0;
    this.fiscal_years = []; // numbers only
    this.total_gross_asset_history = [{
      entry_date: "31.1.2016",
      total_gross_assets: 100,
    }];
  }

  issueShares(amount) {
    this.authorized_shares -= amount;
    this.issued_shares += amount;
  }

  /**
   * @param {string} entry_date - date string of form 15.7.2018 for tax deadline July 15th
   */
  issueAnnualReport(entry_date,total_gross_assets) {
    let entries = entry_date.split('.');
    let last_entry_year = entries[entries.length-1];
    this.fiscal_years.push(parseInt(last_entry_year));

    this.total_gross_asset_history.push({ 
      total_gross_assets, 
      entry_date 
    })  
  }

  /** 
   * Sets value for authorized and unauthorized shares
   * @param {number} amount
   */
  authorizeShares(amount) {
    this.total_shares -= amount;
    this.authorized_shares += amount;
  }

  /** 
   * Executor pattern 
   * @param {string} method 
   * @param {number} fiscal_year
   */
  calculateTax(method, fiscal_year) {
    let fy = this.fiscal_years.find(year => year === fiscal_year) === 'undefined';
    if (typeof fy === 'undefined') {
      throw new Error('year not found')
    }
    let tax_year = fy;
    let authorized_shares = this.authorized_shares;
    let total_shares = this.total_shares;

    if (method === 'AuthorizedShares') {
      return this.franchiseTaxAuthorizedSharesMethod({
        authorized_shares,
        total_shares,
        tax_year,
      })
    } else if (method === 'AssumedParValue') {
      let issued_shares = this.issued_shares;
      return this.franchiseTaxAssumedParValueMethod({
        authorized_shares,
        total_shares,
        tax_year,      
        issued_shares,  
      })
    }
  }

  /**
   * Each chunk beyond 10k
   * @param  {object} state - current state of corp when calculation was made
   * @return {number}
   */
  franchiseTaxAuthorizedSharesMethod(state) {
    let { authorized_shares, total_shares, tax_year } = state;
    
    if (authorized_shares < 5000) { 
      return 175
    } else if (authorized_shares >= 5000 & authorized_shares <= 10000) {
      return 250;
    } 

    let subtotals = [];
    if (authorized_shares > 10000) {
      let shares_over = authorized_shares - 10000; //shares_less_ten_gs
      let portions = Math.ceil(shares_over / 10000);
      let cost_all_portions = portions * 85
      return [...subtotals, 250, cost_all_portions].reduce((accum, curr) => accum + curr,0);
    }
  }

  franchiseTaxAssumedParValueMethod(state) {
    let { authorized_shares, total_shares, tax_year, issued_shares } = state;

    // > Divide your total gross assets by your total issued shares carrying to 6 decimal places. The result is your “assumed par”.
    // > Example: $1,000,000 assets, 485,000 issued shares = $2.061856 assumed par.

    
    // total gross assets gets most up to date 
    let { total_gross_assets } = this.total_gross_asset_history[this.total_gross_asset_history.length - 1];
    let assumed_par = total_gross_assets / this.issued_shares;

    // then need to partition it around assumed par

    // > Multiply the assumed par by the number of authorized shares having a par value of less than the assumed par. 
    // > Example: $2.061856 assumed par s 1,000,000 shares = $2,061,856.
    let p1 = assumed_par * authorized_shares;

    // > Multiply the number of authorized shares with a par value greater than the assumed par by their respective par value. 
    // > Example: 250,000 shares $5.00 par value = $1,250,000


  }
	
}

module.exports = {Corporation};