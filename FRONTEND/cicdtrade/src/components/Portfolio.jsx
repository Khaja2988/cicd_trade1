const HOLDINGS = [
  { symbol: 'AAPL', qty: 10, avg: 210.10, price: 228.72 },
  { symbol: 'MSFT', qty: 5, avg: 412.00, price: 419.15 },
  { symbol: 'TSLA', qty: 8, avg: 248.30, price: 254.09 },
]

function computePnL(h) {
  const cost = h.qty * h.avg
  const value = h.qty * h.price
  const pnl = value - cost
  const pct = (pnl / cost) * 100
  return { cost, value, pnl, pct }
}

function Portfolio() {
  const totals = HOLDINGS.reduce((acc, h) => {
    const { cost, value, pnl } = computePnL(h)
    acc.cost += cost; acc.value += value; acc.pnl += pnl
    return acc
  }, { cost: 0, value: 0, pnl: 0 })
  const pct = totals.cost ? (totals.pnl / totals.cost) * 100 : 0

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-inner">
        <div className="portfolio-header">
          <h2>My Portfolio</h2>
          <div className="portfolio-summary">
            <div><span className="label">Invested</span><span>₹{totals.cost.toFixed(2)}</span></div>
            <div><span className="label">Current Value</span><span>₹{totals.value.toFixed(2)}</span></div>
            <div className={totals.pnl >= 0 ? 'pos' : 'neg'}>
              <span className="label">PnL</span><span>₹{totals.pnl.toFixed(2)} ({pct.toFixed(2)}%)</span>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Last Price</th>
                <th>PnL</th>
              </tr>
            </thead>
            <tbody>
              {HOLDINGS.map((h) => {
                const { pnl } = computePnL(h)
                return (
                  <tr key={h.symbol}>
                    <td>{h.symbol}</td>
                    <td>{h.qty}</td>
                    <td>₹{h.avg.toFixed(2)}</td>
                    <td>₹{h.price.toFixed(2)}</td>
                    <td className={pnl >= 0 ? 'pos' : 'neg'}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Portfolio


