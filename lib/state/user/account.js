
class Account {
  constructor(options) {
  	let defaults = {
  		name: 'New Account',
  		sync: false, 
  		stats: true, 
  		...options
  	}
  	
  	this.sync = defaults.sync;
  	this.stats = defaults.stats;
  	this.name = defaults.name;
  	this.account_type = defaults.account_type;
  	
  }

  onVerify() {
  	console.log("stub");
  }

  onDeviceChange() {
  	console.log("stub2")
  }	
}



class DebitAccount extends Account {
	constructor (data) {
		super(data);
		this.account_type = 'debit';
	}
}

class CreditAccount extends Account {
	constructor (data) {
		super(data);
		this.account_type = 'credit';
	}
}


const account = {
	buildDebit: (options) => {
		return new DebitAccount(options);
	},
	buildCredit: (options) => {
		return new CreditAccount(options);
	},
	build: (options) => {
		return new Account(options);
	}
	
}

module.exports = {
	account
}