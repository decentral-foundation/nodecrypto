function Request(options) {
  options = options || {};

  if (!options.headers) {
    throw new InvalidArgumentError('Missing parameter: `headers`');
  }

  if (!options.method) {
    throw new InvalidArgumentError('Missing parameter: `method`');
  }

  if (!options.query) {
    throw new InvalidArgumentError('Missing parameter: `query`');
  }

  this.body = options.body || {};
  this.headers = {};
  this.method = options.method;
  this.query = options.query;

  // Store the headers in lower case.
  for (var field in options.headers) {
    if (Object.prototype.hasOwnProperty.call(options.headers, field)) {
      this.headers[field.toLowerCase()] = options.headers[field];
    }
  }

  // Store additional properties of the request object passed in
  for (var property in options) {
    if (Object.prototype.hasOwnProperty.call(options, property) && !this[property]) {
      this[property] = options[property];
    }
  }
}

/**
 * Get a request header.
 */

Request.prototype.get = function(field) {
  return this.headers[field.toLowerCase()];
};



/**
 * Export constructor.
 */

module.exports = Request;