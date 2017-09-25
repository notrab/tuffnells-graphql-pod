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

  type CollectionAddress {
    CompanyName: String!
    Address1: String!
    Address2: String
    Address3: String
    Town: String!
    Postcode: String!
    ContactName: String
    ContactTelephone: String
  }

  type ConsignmentInformation {
    Pieces: Int!
    Pallets: Int!
    Weight: Int!
    Service: String!
    DeliveryDate: String
    ItemsDelivered: Int
    ConsignmentRef: String!
    SpecialInstructions: String
    URN: String
  }

  type Movement {
    MovementDate: String
    MovementTime: String
    Description: String
    DeliveryDepot: String
    Round: Int
    DeliveryDate: String
    PackagesReceived: Int!
    PackagesDelivered: Int!
  }

  type Scan {
    PieceID: ID!
    Description: String!
    Depot: String!
    ScanDate: String
    ScanTime: String
    ScannedBy: String!
  }

  type TimedDelivery {
    Signature: String
    SignatureDate: String
    SignatureTime: String
  }

  type Pod {
    Authorised: String
    DeliveryAddress: DeliveryAddress
    CollectionAddress: CollectionAddress
    ConsignmentInformation: ConsignmentInformation
    MovementInformation: [Movement]
    TimedInformation: TimedDelivery
    ScanInformation: [Scan]
  }

  type Query {
    Pod(AccountCode: Int!, Reference: String!): Pod
  }
`;
