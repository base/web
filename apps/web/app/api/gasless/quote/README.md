# 0x Gasless Quote API

This API endpoint proxies requests to the [0x API gasless quote endpoint](https://api.0x.org/gasless/quote).

## Endpoint

```
GET /api/gasless/quote
```

## Query Parameters

All parameters are required:

- `chainId` (string): The chain ID (e.g., "1" for Ethereum mainnet, "8453" for Base)
- `sellToken` (string): The ERC-20 token address to sell (must be a valid Ethereum address)
- `buyToken` (string): The ERC-20 token address to buy (must be a valid Ethereum address)
- `sellAmount` (string): The amount of sellToken to sell (in base units)
- `taker` (string): The address of the taker (must be a valid Ethereum address)

## Environment Variables

This endpoint requires the following environment variable to be set:

- `ZERO_X_API_KEY`: Your 0x API key (obtain from [0x Dashboard](https://dashboard.0x.org/))

## Example Request

```bash
curl --location --request GET '/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
```

## Response Format

### Success Response (200 OK)

```json
{
  "data": {
    // 0x API response data
  }
}
```

### Error Responses

#### Missing or Invalid Parameters (400 Bad Request)

```json
{
  "error": "Missing chainId parameter"
}
```

Possible error messages:
- `Missing chainId parameter`
- `Missing or invalid sellToken parameter`
- `Missing or invalid buyToken parameter`
- `Missing sellAmount parameter`
- `Missing or invalid taker parameter`

#### API Key Not Configured (500 Internal Server Error)

```json
{
  "error": "API key not configured"
}
```

#### 0x API Error

The endpoint will return the same status code and error message from the 0x API.

#### Internal Server Error (500 Internal Server Error)

```json
{
  "error": "Internal server error"
}
```

## Testing

The endpoint includes comprehensive test coverage (18 test cases). Run tests with:

```bash
yarn workspace @app/web test apps/web/app/api/gasless/quote/route.test.ts
```

## Implementation Details

- Uses `viem`'s `isAddress` for Ethereum address validation
- Uses `URLSearchParams` for safe URL encoding
- Proxies requests with proper headers: `0x-api-key` and `0x-version: v2`
- Handles both JSON and text responses
- Includes proper error handling and logging
