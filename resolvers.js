const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {NotAuthorised} = require('./errors');

module.exports = {
  Query: {
    Pod: (_, {AccountCode, Reference}) =>
      fetch(
        `http://www.tpeweb.co.uk/WebServices/Customer/PODTrackingData.asmx/GetTrackingRecord?AccountCode=${AccountCode}&Reference=${Reference}`
      )
        .then(res => res.text())
        .then(xml => parseXML(xml, {trim: true, explicitArray: false}))
        .then(data => JSON.parse(JSON.stringify(data['ArrayOfTrackingRecord']['TrackingRecord'])))
        .then(data => {
          if (data.Authorised.startsWith('Not')) {
            throw new NotAuthorised();
          }

          return data;
        })
  }
};
