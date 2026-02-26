const TopStats = ({ stats }) => (
  <div className="stats-grid">
    <div className="stars-card">
      Revenue <h3>${Math.round(stats.totalRevenue)}</h3>
    </div>
    <div className="stats-card">
      Orders <h3>{stats.totalOrders}</h3>
    </div>
    <div className="stats-card">
      Customers <h3>{stats.totalCustomers}</h3>
    </div>
    <div className="stats-card">
      Products <h3>{stats.totalProducts}</h3>
    </div>
  </div>
);

export default TopStats;
