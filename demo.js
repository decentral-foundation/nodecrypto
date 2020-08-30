const {account} = require('./lib');

console.log('account: ',account);


// should have default value and type is credit
let a = account.build({account_type: 'credit'});

let b = account.buildDebit({name: 'john'});
let c = account.buildCredit({name: 'trinity'});

// should override sync and stats field to whats passed in
let d = account.build({sync: true, stats: false});

console.log('a: ',a);
console.log('b: ',b);
console.log('c: ',c);
console.log('d: ',d);