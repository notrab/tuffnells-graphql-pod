const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);
const {NotAuthorised, InvalidPostcode, IncorrectPostcode} = require('./errors');
const Posty = require('postcode');
var HttpsProxyAgent = require('https-proxy-agent');

let agent = null;
const {QUOTAGUARDSTATIC_URL} = process.env;

if (QUOTAGUARDSTATIC_URL) {
  agent = new HttpsProxyAgent(QUOTAGUARDSTATIC_URL);
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
          if (data.Authorised.startsWith('Not')) {
            throw new NotAuthorised();
          }

          const postyCode = new Posty(Postcode);

          if (!postyCode.valid()) {
            throw new InvalidPostcode();
          }

          if (data.DeliveryAddress.Postcode !== postyCode.normalise()) {
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
