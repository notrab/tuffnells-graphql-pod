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
    Round: String
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

  type ImageInformation {
    PODImage: PODImage
  }

  type PODImage {
    URL: String
  }

  type Pod {
    Authorised: String
    DeliveryAddress: DeliveryAddress
    CollectionAddress: CollectionAddress
    ConsignmentInformation: ConsignmentInformation
    MovementInformation: [Movement]
    TimedInformation: TimedDelivery
    ScanInformation: [Scan]
    ImageInformation: ImageInformation
  }

  type Query {
    Pod(AccountCode: Int!, Reference: String!, Postcode: String!): Pod
  }
`;
