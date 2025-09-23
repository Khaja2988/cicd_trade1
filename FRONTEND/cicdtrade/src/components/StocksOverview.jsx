const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 228.72, change: +1.24, pct: +0.55, volume: '42.1M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 419.15, change: -2.11, pct: -0.50, volume: '23.4M' },
  { symbol: 'GOOGL', name: 'Alphabet Class A', price: 172.84, change: +0.66, pct: +0.38, volume: '18.7M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 254.09, change: +5.23, pct: +2.10, volume: '69.4M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 183.42, change: -0.77, pct: -0.42, volume: '31.9M' },
]

function StocksOverview() {
  return (
    <section id="home" className="stocks">
      <div className="stocks-inner">
        <h2 className="stocks-title">Market Snapshot</h2>
        <div className="table-wrap">
          <table className="stocks-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company</th>
                <th>Price</th>
                <th>Change</th>
                <th>%</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STOCKS.map((s) => (
                <tr key={s.symbol}>
                  <td>{s.symbol}</td>
                  <td className="muted">{s.name}</td>
                  <td>${s.price.toFixed(2)}</td>
                  <td className={s.change >= 0 ? 'pos' : 'neg'}>
                    {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                  </td>
                  <td className={s.pct >= 0 ? 'pos' : 'neg'}>
                    {s.pct >= 0 ? '+' : ''}{s.pct.toFixed(2)}%
                  </td>
                  <td>{s.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default StocksOverview


