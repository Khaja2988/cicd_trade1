#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Command line argument parsing
const args = process.argv.slice(2);
const targetCurrency = args.find(arg => arg.startsWith('--target-currency='))?.split('=')[1] || 'INR';
const conversionRate = parseFloat(args.find(arg => arg.startsWith('--conversion-rate='))?.split('=')[1] || '83.0');
const dryRun = args.includes('--dry-run');

console.log(`🔄 Currency Conversion Tool`);
console.log(`Target Currency: ${targetCurrency}`);
console.log(`Conversion Rate: ${conversionRate} USD to ${targetCurrency}`);
console.log(`Dry Run: ${dryRun ? 'Yes' : 'No'}`);

// Currency conversion mappings
const currencyMappings = {
  'USD_to_INR': {
    symbol: '$',
    newSymbol: '₹',
    locale: 'en-US',
    newLocale: 'en-IN',
    currency: 'USD',
    newCurrency: 'INR',
    rate: conversionRate
  },
  'INR_to_USD': {
    symbol: '₹',
    newSymbol: '$',
    locale: 'en-IN',
    newLocale: 'en-US',
    currency: 'INR',
    newCurrency: 'USD',
    rate: 1 / conversionRate
  }
};

// Files to process
const filesToProcess = [
  'FRONTEND/src/pages/trading/Trading.jsx',
  'FRONTEND/src/pages/dashboard/Profile.jsx',
  'FRONTEND/src/pages/trading/Portfolio.jsx',
  'FRONTEND/src/pages/trading/Market.jsx',
  'FRONTEND/cicdtrade/src/components/Portfolio.jsx',
  'FRONTEND/cicdtrade/src/components/StocksOverview.jsx',
  'FRONTEND/src/pages/Dashboard.jsx',
  'FRONTEND/src/pages/trading/Competitions.jsx',
  'FRONTEND/src/api/client.js',
  'FRONTEND/src/pages/Register.jsx'
];

// Conversion patterns
const conversionPatterns = {
  // Format currency functions
  formatCurrency: {
    pattern: /new Intl\.NumberFormat\('([^']+)',\s*\{\s*style:\s*'currency',\s*currency:\s*'([^']+)'\s*\}\)/g,
    replacement: (match, locale, currency) => {
      const mapping = targetCurrency === 'INR' ? currencyMappings.USD_to_INR : currencyMappings.INR_to_USD;
      return `new Intl.NumberFormat('${mapping.newLocale}', { style: 'currency', currency: '${mapping.newCurrency}' })`;
    }
  },
  
  // Hardcoded currency symbols
  currencySymbols: {
    pattern: /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g,
    replacement: (match, amount) => {
      if (targetCurrency === 'INR') {
        const numericAmount = parseFloat(amount.replace(/,/g, ''));
        const convertedAmount = (numericAmount * conversionRate).toFixed(2);
        return `₹${convertedAmount}`;
      }
      return match;
    }
  },
  
  // Chart formatters
  chartFormatters: {
    pattern: /tickFormatter=\{.*?\$\{.*?\}.*?\}/g,
    replacement: (match) => {
      if (targetCurrency === 'INR') {
        return match.replace(/\$/g, '₹');
      }
      return match;
    }
  },
  
  // Tooltip formatters
  tooltipFormatters: {
    pattern: /formatter=\{.*?\$\{.*?\}.*?\}/g,
    replacement: (match) => {
      if (targetCurrency === 'INR') {
        return match.replace(/\$/g, '₹');
      }
      return match;
    }
  },
  
  // Prize amounts
  prizeAmounts: {
    pattern: /prize:\s*['"`]([^'"`]*\$(\d+(?:,\d{3})*)[^'"`]*)['"`]/g,
    replacement: (match, fullPrize, amount) => {
      if (targetCurrency === 'INR') {
        const numericAmount = parseFloat(amount.replace(/,/g, ''));
        const convertedAmount = (numericAmount * conversionRate).toFixed(0);
        const formattedAmount = convertedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return fullPrize.replace(`$${amount}`, `₹${formattedAmount}`);
      }
      return match;
    }
  },
  
  // Virtual cash amounts
  virtualCash: {
    pattern: /virtual cash[^'"`]*\$(\d+(?:,\d{3})*)/g,
    replacement: (match, amount) => {
      if (targetCurrency === 'INR') {
        const numericAmount = parseFloat(amount.replace(/,/g, ''));
        const convertedAmount = (numericAmount * conversionRate).toFixed(0);
        const formattedAmount = convertedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return match.replace(`$${amount}`, `₹${formattedAmount}`);
      }
      return match;
    }
  }
};

function convertCurrencyInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  const originalContent = content;

  // Apply all conversion patterns
  Object.entries(conversionPatterns).forEach(([name, pattern]) => {
    const newContent = content.replace(pattern.pattern, pattern.replacement);
    if (newContent !== content) {
      console.log(`  ✅ Applied ${name} pattern`);
      content = newContent;
      hasChanges = true;
    }
  });

  if (hasChanges) {
    if (!dryRun) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`🔍 Would update: ${filePath}`);
    }
    return true;
  }

  return false;
}

function main() {
  console.log('\n📁 Processing files...\n');
  
  let totalFilesUpdated = 0;
  
  filesToProcess.forEach(filePath => {
    console.log(`Processing: ${filePath}`);
    if (convertCurrencyInFile(filePath)) {
      totalFilesUpdated++;
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`Files processed: ${filesToProcess.length}`);
  console.log(`Files updated: ${totalFilesUpdated}`);
  
  if (dryRun) {
    console.log(`\n🔍 This was a dry run. No files were actually modified.`);
  } else if (totalFilesUpdated > 0) {
    console.log(`\n✅ Currency conversion completed successfully!`);
    console.log(`Converted ${totalFilesUpdated} files to ${targetCurrency}`);
  } else {
    console.log(`\nℹ️  No currency conversions were needed.`);
  }
}

// Run the conversion
main();
