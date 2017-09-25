const rp = require('request-promise');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {NotAuthorised} = require('./errors');

const {QUOTAGUARDSTATIC_URL} = process.env;

module.exports = {
  Query: {
    Pod: (_, {AccountCode, Reference}) => {
      let options = {
        uri: `http://www.tpeweb.co.uk/WebServices/Customer/PODTrackingData.asmx/GetTrackingRecord?AccountCode=${AccountCode}&Reference=${Reference}`
      };

      if (QUOTAGUARDSTATIC_URL) {
        options = Object.assign({}, options, {
          proxy: QUOTAGUARDSTATIC_URL
        });
      }

      return rp(options)
        .then(xml => parseXML(xml, {trim: true, explicitArray: false}))
        .then(data => JSON.parse(JSON.stringify(data['ArrayOfTrackingRecord']['TrackingRecord'])))
        .then(data => {
          if (data.Authorised.startsWith('Not')) {
            throw new NotAuthorised();
          }

          return data;
        });
    }
  }
};
