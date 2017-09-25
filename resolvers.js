const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

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
          console.log(data);
          return data;
        })
        .catch(err => console.log(err))
  }
};
