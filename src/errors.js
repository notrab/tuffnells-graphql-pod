const {createError} = require('apollo-errors');

module.exports.NotAuthorised = createError('NotAuthorised', {
  message: 'This IP is not authorised to perform a search.'
});

module.exports.InvalidPostcode = createError('InvalidPostcode', {
  message: 'Invalid Postcode entered.'
});

module.exports.IncorrectPostcode = createError('IncorrectPostcode', {
  message: 'Please check the post code matches the DELIVERY post code and try again.'
});
