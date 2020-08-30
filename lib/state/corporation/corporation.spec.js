const {Corporation} = require('./corporation');


describe('corporation test suite', () => {

  it('should calculate franchise tax using assumed par value method', () => {
     
  });

  it('should calculate franchise tax using authorized shares method', () => { 
     let method = 'AuthorizedShares'
     let corporation = new Corporation('C Corp',10000000);
     corporation.issueAnnualReport('31.1.2018');
     corporation.authorizeShares(10005); //10,005 shares


     let tax = corporation.calculateTax(method,2018);
     expect(tax).toEqual(335); // expectedResult is always the second value

  });


  //A corporation with authorized pays 
  it('should calculate franchise tax using authorized shares method', () => { 
    let method = 'AuthorizedShares'
    let corporation = new Corporation('C Corp',100000000);
    corporation.issueAnnualReport('31.1.2019');
    corporation.authorizeShares(100000) // 100,000 shares 
    
    expect(corporation.authorized_shares).toEqual(100000)
    let tax = corporation.calculateTax(method,2019);
    expect(tax).toEqual(1015); // $1,015.00($250.00 plus $765.00[$85.00 x 9]).
  });

});

