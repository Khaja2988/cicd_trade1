# Currency Conversion Automation

This project includes automated currency conversion capabilities using GitHub Actions and a custom Node.js script.

## Features

- 🔄 **Automated Currency Conversion**: Convert between USD and INR automatically
- 📊 **Real-time Exchange Rates**: Fetches current exchange rates from API
- 🤖 **GitHub Actions Integration**: Automated workflows for CI/CD
- 📝 **Comprehensive Coverage**: Updates all currency references in the codebase
- 🔍 **Dry Run Mode**: Test conversions without making changes

## Quick Start

### Manual Conversion (Local)

```bash
# Convert to Indian Rupees (INR)
npm run convert-to-inr

# Convert to US Dollars (USD)
npm run convert-to-usd

# Test conversion without making changes
npm run currency-dry-run

# Custom conversion with specific rate
node scripts/currency-converter.js --target-currency=INR --conversion-rate=85.0
```

### Automated Conversion (GitHub Actions)

#### 1. Manual Trigger
Go to your repository's Actions tab and run the "Currency Conversion Automation" workflow manually.

#### 2. Scheduled Conversion
The workflow runs daily at 6 AM UTC to check for currency updates and create pull requests if needed.

#### 3. Automatic Trigger
The workflow also triggers when you push changes to:
- `scripts/currency-converter.js`
- `.github/workflows/currency-conversion.yml`

## What Gets Converted

The automation handles:

### 1. Currency Formatting Functions
```javascript
// Before
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

// After
new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
```

### 2. Hardcoded Currency Values
```javascript
// Before
$1,250.00

// After
₹1,03,750.00
```

### 3. Chart Formatters
```javascript
// Before
tickFormatter={(value) => `$${value}`}

// After
tickFormatter={(value) => `₹${value}`}
```

### 4. Competition Prizes
```javascript
// Before
prize: 'Top 10 winners share $5,000 prize pool'

// After
prize: 'Top 10 winners share ₹4,15,000 prize pool'
```

### 5. Virtual Cash Amounts
```javascript
// Before
Start your virtual trading journey with $10,000 virtual cash

// After
Start your virtual trading journey with ₹8,30,000 virtual cash
```

## Files Processed

The automation processes these files:
- `FRONTEND/src/pages/trading/Trading.jsx`
- `FRONTEND/src/pages/dashboard/Profile.jsx`
- `FRONTEND/src/pages/trading/Portfolio.jsx`
- `FRONTEND/src/pages/trading/Market.jsx`
- `FRONTEND/cicdtrade/src/components/Portfolio.jsx`
- `FRONTEND/cicdtrade/src/components/StocksOverview.jsx`
- `FRONTEND/src/pages/Dashboard.jsx`
- `FRONTEND/src/pages/trading/Competitions.jsx`
- `FRONTEND/src/api/client.js`
- `FRONTEND/src/pages/Register.jsx`

## Configuration

### Exchange Rate Source
The automation fetches real-time exchange rates from [ExchangeRate-API](https://exchangerate-api.com/).

### Default Conversion Rate
- USD to INR: 83.0 (configurable)
- INR to USD: 0.012 (calculated as 1/83)

## Workflow Permissions

The GitHub Actions workflow requires these permissions:
- `contents: write` - To commit and push changes
- `pull-requests: write` - To create pull requests for scheduled updates

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure the GitHub token has write permissions
2. **Exchange Rate API Error**: The workflow will use a fallback rate if the API is unavailable
3. **No Changes Detected**: This is normal if the currency is already converted

### Manual Override

If you need to override the automatic conversion:

```bash
# Use a specific conversion rate
node scripts/currency-converter.js --target-currency=INR --conversion-rate=85.5

# Dry run to see what would change
node scripts/currency-converter.js --dry-run
```

## Contributing

To add support for new currencies:

1. Update the `currencyMappings` object in `scripts/currency-converter.js`
2. Add new conversion patterns as needed
3. Update the workflow file to handle the new currency
4. Test with dry run mode first

## Security

- The workflow uses GitHub's built-in `GITHUB_TOKEN`
- Exchange rate API calls are made over HTTPS
- No sensitive data is logged or stored
