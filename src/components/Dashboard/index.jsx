import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersChart from "./components/OrdersChart";
import RevenueChart from "./components/RevenueChart";
import TopStats from "./components/TopStats";
import { fetchAdminDashboard } from "../../store/adminSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { stats, monthlyRevenue, monthlyOrders, loading, error } = useSelector(
    (state) => state.admin
  );
  // console.log(monthlyOrders, monthlyRevenue);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading) return <p className="para">Loading dashboard...</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <div className="dashboard-user-img">
          <img src={user.image} alt={user.firstName} />
        </div>
        <div className="dashboard-header-info">
          <h3>
            Welcome back {user.firstName} {user.lastName}!
          </h3>
        </div>
        <TopStats stats={stats} />
      </div>

      <div className="charts">
        <div>
          <RevenueChart data={monthlyRevenue} />
        </div>
        <div>
          <OrdersChart data={monthlyOrders} />
        </div>
      </div>
    </div>
  );
}
