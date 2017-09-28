# GraphQL POD Fetcher

This serverless function returns a GraphQL resolver for consuming the Tuffnells XML endpoint.

## Installation

  ```bash
  git clone https://github.com/Norseal/pod-fetcher.api.norseal.co.uk.git
  cd pod-fetcher.api.norseal.co.uk
  yarn
  ```

## Configuration

Tuffnells uses IP based authentication. In production, it is recommended you use a Proxy with a fixed IP to relay requests.

The `PROXY_URI` must be available to the current `process`.

  ```bash
  export PROXY_URI=
  ```

## Development

To start the development server, you must run:

  ```bash
  yarn dev
  ```

## Example Query

  ```graphql
  {
    Pod(AccountCode: 123456, Reference:"N123456", Postcode: "NE42 6PX") {
      Authorised
      DeliveryAddress {
        CompanyName
        Postcode
      }
      ConsignmentInformation {
        Pieces
        Pallets
        Weight
        Service
        DeliveryDate
        ItemsDelivered
        ConsignmentRef
        SpecialInstructions
        URN
      }
      MovementInformation{
        MovementDate
        Round
        DeliveryDepot
      }
      TimedInformation {
        Signature
        SignatureDate
        SignatureTime
      }
      ScanInformation{
        PieceID
      }
      ImageInformation {
        PODImage {
          URL
        }
      }
    }
  }
  ```

## Deploy

  ```
  now
  ```
