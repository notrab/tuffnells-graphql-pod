const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {NotAuthorised, InvalidPostcode, IncorrectPostcode} = require('./errors');
const Posty = require('postcode');
var HttpsProxyAgent = require('https-proxy-agent');

let agent = null;
const {PROXY_URI} = process.env;

if (PROXY_URI) {
  agent = new HttpsProxyAgent(PROXY_URI);
}

module.exports = {
  Query: {
    Pod: (_, {AccountCode, Reference, Postcode}) =>
      fetch(
        `http://www.tpeweb.co.uk/WebServices/Customer/PODTrackingData.asmx/GetTrackingRecord?AccountCode=${AccountCode}&Reference=${Reference}`,
        {
          agent
        }
      )
        .then(res => res.text())
        .then(xml => parseXML(xml, {trim: true, explicitArray: false}))
        .then(data => JSON.parse(JSON.stringify(data['ArrayOfTrackingRecord']['TrackingRecord'])))
        .then(data => {
          console.log(data);

          if (data.Authorised.startsWith('Not')) {
            throw new NotAuthorised();
          }

          const safePostCode = new Posty(Postcode);

          if (!safePostCode.valid()) {
            throw new InvalidPostcode();
          }

          if (data.DeliveryAddress.Postcode !== safePostCode.normalise()) {
            throw new IncorrectPostcode();
          }

          const movements = data.MovementInformation.Movement;
          const scans = data.ScanInformation.Scan;

          return {
            ...data,
            MovementInformation: [...movements],
            TimedInformation: data.TimedInformation.TimedDelivery,
            ScanInformation: [...scans]
          };
        })
  }
};
