module.exports = `
  type DeliveryAddress {
    CompanyName: String!
    Address1: String!
    Address2: String
    Address3: String
    Town: String!
    Postcode: String!
    ContactName: String
    ContactTelephone: String
  }

  type Pod {
    Authorised: String
    DeliveryAddress: DeliveryAddress
  }

  type Query {
    Pod(AccountCode: Int!, Reference: String!): Pod
  }
`;
