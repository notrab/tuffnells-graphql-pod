const {createError} = require('apollo-errors');

module.exports.NotAuthorised = createError('NotAuthorised', {
  message: 'This IP is not authorised to perform a search.'
});
