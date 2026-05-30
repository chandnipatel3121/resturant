import React, { useState, useEffect } from "react";
import {
  Home,
  BarChart3,
  Calendar,
  Utensils,
  Users,
  Package,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Sparkles,
  TrendingUp,
  Activity,
  Clock,
  ChevronRight,
  ShoppingBag,
  Maximize2
} from "lucide-react";
import "../styles/admin/AdminDashboard.css";

// Import premium images from project assets
import pasta3d from "../assets/pasta_3d.png";
import dish1 from "../assets/dish1.jpg";
import beetroot from "../assets/beetroot.jpg";
import desert from "../assets/desert.jpg";
import italic from "../assets/italic.jpg";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [timeFilter, setTimeFilter] = useState("This Week");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredNode, setHoveredNode] = useState(null);
  const [notifications, setNotifications] = useState(4);
  const [messages, setMessages] = useState(2);
  const [liveOrders, setLiveOrders] = useState([
    { id: "#125", customer: "Dianne Russell", type: "Dine In", amount: "₹1,250", status: "preparing", time: "2 mins ago" },
    { id: "#124", customer: "Marvin McKinney", type: "Delivery", amount: "₹890", status: "on the way", time: "15 mins ago" },
    { id: "#123", customer: "Brooklyn Simmons", type: "Takeaway", amount: "₹680", status: "ready", time: "31 mins ago" },
    { id: "#122", customer: "Cody Fisher", type: "Dine In", amount: "₹1,450", status: "completed", time: "1 hr ago" },
    { id: "#121", customer: "Esther Howard", type: "Delivery", amount: "₹1,120", status: "cancelled", time: "1 hr ago" },
  ]);

  const [tickerItems, setTickerItems] = useState([
    "New Order #125 placed - 2 mins ago",
    "Table 5 Reserved - 5 mins ago",
    "Payment Received for #122 - 15 mins ago",
    "Kitchen Completed Order #124 - 20 mins ago",
    "Chef Special 'Truffle Pasta' ordered - 22 mins ago"
  ]);

  // Handle adding an order dynamically via FAB
  const handleAddOrder = () => {
    const names = ["James Carter", "Arlene McCoy", "Eleanor Pena", "Albert Flores", "Kathryn Murphy"];
    const types = ["Dine In", "Delivery", "Takeaway"];
    const statuses = ["preparing", "ready", "on the way"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomAmount = `₹${(Math.floor(Math.random() * 20) + 5) * 100}`;
    const newId = `#${126 + liveOrders.length}`;

    const newOrder = {
      id: newId,
      customer: randomName,
      type: randomType,
      amount: randomAmount,
      status: randomStatus,
      time: "Just now"
    };

    setLiveOrders([newOrder, ...liveOrders]);
    setNotifications(prev => prev + 1);

    // Add to activity ticker
    setTickerItems(prev => [
      `New Order ${newId} received for ${randomName} (${randomAmount})`,
      ...prev
    ]);
  };

  // Custom Chart Coordinates for the dynamic smooth curved graph
  // Matches weeks or days: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const chartPoints = [
    { day: "Mon", val: 50,  display: "₹20K" },
    { day: "Tue", val: 120, display: "₹15K" },
    { day: "Wed", val: 70,  display: "₹32K" },
    { day: "Thu", val: 140, display: "₹18K" },
    { day: "Fri", val: 110, display: "₹28K" },
    { day: "Sat", val: 90,  display: "₹45K" },
    { day: "Sun", val: 40,  display: "₹65K" },
  ];

  // SVG curved path builder (Catmull-Rom-like approximation with bezier curves)
  const width = 600;
  const height = 160;
  const pointsCount = chartPoints.length;

  // Map index to coordinates
  const getCoordinates = (index, val) => {
    const x = (index / (pointsCount - 1)) * (width - 40) + 20;
    // Lower value means higher on Y axis in SVG space
    const y = height - ((val / 160) * (height - 30) + 15);
    return { x, y };
  };

  // Create SVG path string
  let pathD = "";
  let areaD = "";

  const mappedPoints = chartPoints.map((p, idx) => getCoordinates(idx, p.val));

  if (mappedPoints.length > 0) {
    pathD = `M ${mappedPoints[0].x} ${mappedPoints[0].y}`;
    for (let i = 0; i < mappedPoints.length - 1; i++) {
      const p0 = mappedPoints[i];
      const p1 = mappedPoints[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }

    // Build absolute gradient Area path
    areaD = `${pathD} L ${mappedPoints[mappedPoints.length - 1].x} ${height} L ${mappedPoints[0].x} ${height} Z`;
  }

  return (
    <div className="admin-dashboard-container">

      {/* 🧭 LEFT FLOATING NAV RAIL */}
      <nav className="admin-nav-rail">
        <div className="admin-logo-mark">A</div>

        <div className="admin-nav-items">
          <button
            className={`admin-nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
            title="Dashboard Overview"
          >
            <Home size={22} />
          </button>

          <button
            className={`admin-nav-item ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
            title="Analytics"
          >
            <BarChart3 size={22} />
          </button>

          <button
            className={`admin-nav-item ${activeTab === "reservations" ? "active" : ""}`}
            onClick={() => setActiveTab("reservations")}
            title="Reservations"
          >
            <Calendar size={22} />
          </button>

          <button
            className={`admin-nav-item ${activeTab === "menu" ? "active" : ""}`}
            onClick={() => setActiveTab("menu")}
            title="Menu Editor"
          >
            <Utensils size={22} />
          </button>

          <button
            className={`admin-nav-item ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
            title="Customer Profiles"
          >
            <Users size={22} />
          </button>

          <button
            className={`admin-nav-item ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
            title="Inventory"
          >
            <Package size={22} />
          </button>
        </div>

        <div className="admin-nav-footer">
          <button className="admin-nav-item" title="Settings">
            <Settings size={20} />
          </button>
        </div>
      </nav>

      {/* 🖥️ MAIN WORKSPACE */}
      <main className="admin-workspace">

        {/* 🔝 STICKY HEADER & WELCOME GROUP */}
        <div className="admin-sticky-header-group">
          {/* 🔝 TOP HEADER */}
          <header className="admin-header">
            {/* Left: Welcome Text greeting */}
            <div className="admin-welcome-section-header">
              <h2 className="admin-welcome-title">anandofoods! 👋</h2>
              <p className="admin-welcome-subtitle">Here's what is happening today.</p>
            </div>

            {/* Center: Search bar */}
            <div className="admin-search-bar">
              <Search size={18} className="text-admin-muted" />
              <input
                type="text"
                placeholder="Search orders, customers, dishes..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Right: Badges and user actions */}
            <div className="admin-header-actions">
              <div className="admin-status-badge">
                <span className="admin-status-dot"></span>
                <span>Open Now</span>
              </div>

              <button className="admin-action-btn" onClick={() => setNotifications(0)} title="Notifications">
                <Bell size={18} />
                {notifications > 0 && <span className="admin-btn-badge">{notifications}</span>}
              </button>

              <button className="admin-action-btn" title="Live Message center">
                <MessageSquare size={18} />
              </button>

              <div className="admin-user-profile">
                <div className="admin-avatar-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="James Carter Avatar"
                    className="admin-avatar"
                  />
                </div>
                <div className="admin-user-info">
                  <span className="admin-user-name">James Carter</span>
                  <span className="admin-user-role">Owner</span>
                </div>
              </div>
            </div>
          </header>
        </div>

        {/* 📜 SCROLLABLE GRID CONTENT SECTION */}
        <div className="admin-scrollable-content">

          {/* 📊 FIVE KPI CARDS ROW */}
          <div className="admin-kpis-grid">

          {/* Revenue */}
          <div className="admin-kpi-card">
            <div className="admin-kpi-header">
              <span className="admin-kpi-title">Revenue Today</span>
              <div className="admin-kpi-icon-container" style={{background: 'rgba(224, 169, 75, 0.1)', color: '#E0A94B'}}>
                <ShoppingBag size={16} />
              </div>
            </div>
            <span className="admin-kpi-value">₹24,500</span>
            <div className="admin-kpi-footer">
              <span className="admin-kpi-trend positive">
                <ArrowUpRight size={12} /> 18.6%
              </span>
              <span className="admin-kpi-comparison">vs yesterday</span>
              <div className="admin-kpi-sparkline">
                <svg width="60" height="20">
                  <path d="M 0 15 Q 15 5, 30 18 T 60 5" fill="none" stroke="#E0A94B" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="admin-kpi-card">
            <div className="admin-kpi-header">
              <span className="admin-kpi-title">Orders Today</span>
              <div className="admin-kpi-icon-container" style={{background: 'rgba(15, 92, 92, 0.1)', color: '#0F5C5C'}}>
                <Activity size={16} />
              </div>
            </div>
            <span className="admin-kpi-value">142</span>
            <div className="admin-kpi-footer">
              <span className="admin-kpi-trend positive">
                <ArrowUpRight size={12} /> 12.4%
              </span>
              <span className="admin-kpi-comparison">vs yesterday</span>
              <div className="admin-kpi-sparkline">
                <svg width="60" height="20">
                  <path d="M 0 18 Q 15 10, 30 5 T 60 12" fill="none" stroke="#0F5C5C" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reservations */}
          <div className="admin-kpi-card">
            <div className="admin-kpi-header">
              <span className="admin-kpi-title">Reservations</span>
              <div className="admin-kpi-icon-container" style={{background: 'rgba(122, 104, 138, 0.1)', color: '#7A688A'}}>
                <Calendar size={16} />
              </div>
            </div>
            <span className="admin-kpi-value">28</span>
            <div className="admin-kpi-footer">
              <span className="admin-kpi-trend positive">
                <ArrowUpRight size={12} /> 8.0%
              </span>
              <span className="admin-kpi-comparison">vs yesterday</span>
              <div className="admin-kpi-sparkline">
                <svg width="60" height="20">
                  <path d="M 0 10 Q 15 15, 30 5 T 60 14" fill="none" stroke="#7A688A" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="admin-kpi-card">
            <div className="admin-kpi-header">
              <span className="admin-kpi-title">Customers</span>
              <div className="admin-kpi-icon-container" style={{background: 'rgba(15, 92, 92, 0.1)', color: '#0F5C5C'}}>
                <Users size={16} />
              </div>
            </div>
            <span className="admin-kpi-value">458</span>
            <div className="admin-kpi-footer">
              <span className="admin-kpi-trend positive">
                <ArrowUpRight size={12} /> 16.2%
              </span>
              <span className="admin-kpi-comparison">vs yesterday</span>
              <div className="admin-kpi-sparkline">
                <svg width="60" height="20">
                  <path d="M 0 16 Q 15 5, 30 18 T 60 10" fill="none" stroke="#0F5C5C" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="admin-kpi-card">
            <div className="admin-kpi-header">
              <span className="admin-kpi-title">Average Rating</span>
              <div className="admin-kpi-icon-container" style={{background: 'rgba(224, 169, 75, 0.1)', color: '#E0A94B'}}>
                <Star size={16} />
              </div>
            </div>
            <span className="admin-kpi-value">4.8</span>
            <div className="admin-kpi-footer">
              <span className="admin-kpi-trend positive" style={{color: '#2ecc71'}}>
                <ArrowUpRight size={12} /> 0.3
              </span>
              <span className="admin-kpi-comparison">vs yesterday</span>
              <div className="admin-kpi-sparkline">
                <svg width="60" height="20">
                  <path d="M 0 12 Q 15 8, 30 15 T 60 4" fill="none" stroke="#E0A94B" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 📈 MIDDLE ROW: REVENUE ANALYTICS + AI INSIGHT + LIVE KITCHEN */}
        <div className="admin-middle-grid">

          {/* Revenue Analytics Curve Graph */}
          <div className="admin-glass-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Revenue Overview</h3>
              <button className="admin-dropdown-trigger">
                {timeFilter}
              </button>
            </div>

            <div className="admin-chart-value-group">
              <span className="admin-chart-total">₹1,45,000</span>
              <span className="admin-chart-trend">
                <ArrowUpRight size={14} /> 15.6%
              </span>
              <span className="admin-chart-trend-sub"> vs last week</span>
            </div>

            <div className="admin-chart-container">
              <svg className="admin-chart-svg" viewBox={`0 0 ${width} ${height}`}>
                <defs>
                  {/* Luxury Green Gradient Area */}
                  <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F5C5C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0F5C5C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="20" y1="30" x2="580" y2="30" className="admin-chart-grid-line" />
                <line x1="20" y1="70" x2="580" y2="70" className="admin-chart-grid-line" />
                <line x1="20" y1="110" x2="580" y2="110" className="admin-chart-grid-line" />
                <line x1="20" y1="150" x2="580" y2="150" className="admin-chart-grid-line" />

                {/* Curved Gradient Area */}
                <path d={areaD} fill="url(#chartAreaGradient)" />

                {/* Curved Stroke Line */}
                <path d={pathD} fill="none" stroke="#0F5C5C" strokeWidth="3.5" strokeLinecap="round" />

                {/* Mapped point markers with interactive hover bubbles */}
                {mappedPoints.map((point, index) => (
                  <g key={index} onMouseEnter={() => setHoveredNode(index)} onMouseLeave={() => setHoveredNode(null)}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={hoveredNode === index ? 7 : 4}
                      fill={hoveredNode === index ? "#E0A94B" : "#0F5C5C"}
                      stroke="#fff"
                      strokeWidth="2.5"
                      className={hoveredNode === index ? "chart-point-active" : ""}
                      style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                    />

                    {/* Glowing active label popup */}
                    {hoveredNode === index && (
                      <g>
                        <rect
                          x={point.x - 30}
                          y={point.y - 35}
                          width="60"
                          height="22"
                          rx="6"
                          fill="#0F5C5C"
                          boxShadow="0 4px 10px rgba(0,0,0,0.2)"
                        />
                        <text
                          x={point.x}
                          y={point.y - 21}
                          fill="#fff"
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {chartPoints[index].display}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>

              <div className="admin-chart-x-axis">
                {chartPoints.map((p, idx) => (
                  <span key={idx} style={{fontWeight: hoveredNode === idx ? "bold" : "normal"}}>{p.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Premium AI Insight card (Dark Emerald) */}
          <div className="admin-ai-card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{fontFamily: 'Playfair Display', fontSize: '1.2rem', margin: 0}}>AI Insight</h3>
              <span className="admin-ai-badge">AI</span>
            </div>

            <p className="admin-ai-text">
              Pasta demand is expected to increase this weekend.
            </p>

            <div className="admin-ai-rec-box">
              <span className="admin-ai-rec-title">Recommended action:</span>
              <p className="admin-ai-rec-body">Increase stock of fresh truffle pasta ingredients by 15% before Saturday.</p>
            </div>

            <div className="admin-ai-illustration-container">
              <img
                src={pasta3d || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=150&q=80"}
                alt="Pasta gourmet illustration"
                className="admin-ai-food-img"
              />
            </div>

            <button className="admin-ai-btn" onClick={() => alert("Loading advanced predictive demand model...")}>
              View Details
            </button>
          </div>

          {/* Live Kitchen Status Card with circular glowing progress */}
          <div className="admin-glass-card admin-kitchen-card">
            <div className="admin-kitchen-header">
              <h3 className="admin-card-title">Live Kitchen Status</h3>
              <div className="admin-kitchen-icon">
                <Utensils size={16} />
              </div>
            </div>

            <div className="admin-kitchen-progress-wrapper">
              <svg width="140" height="140" className="admin-kitchen-svg">
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  strokeWidth="8"
                  fill="transparent"
                  className="admin-kitchen-track"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  strokeWidth="8"
                  fill="transparent"
                  className="admin-kitchen-fill"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - 0.75)}
                />
              </svg>
              <div className="admin-kitchen-center-text">
                <span className="admin-kitchen-percentage">75%</span>
                <span className="admin-kitchen-desc">Orders Completed</span>
              </div>
            </div>

            <div className="admin-kitchen-stats">
              <span className="admin-kitchen-stats-label">Active Queue Orders</span>
              <span className="admin-kitchen-stats-value">12</span>
            </div>
          </div>
        </div>

        {/* 🧾 BOTTOM ROW: RECENT ORDERS + LEADERBOARD */}
        <div className="admin-bottom-grid">

          {/* Recent Orders table */}
          <div className="admin-glass-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Recent Orders</h3>
              <button className="admin-btn-text" onClick={() => alert("Showing order dispatch console...")}>
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div className="admin-orders-table-wrapper">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {liveOrders.map((order, idx) => (
                    <tr key={idx}>
                      <td className="order-id">{order.id}</td>
                      <td>
                        <div className="customer-cell">
                          <img
                            src={`https://images.unsplash.com/photo-${1500000000000 + (idx*100000)}?auto=format&fit=crop&w=60&q=80`}
                            alt={order.customer}
                            className="customer-avatar"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
                            }}
                          />
                          <span className="customer-name">{order.customer}</span>
                        </div>
                      </td>
                      <td>
                        <span className="type-cell">
                          <Clock size={12} /> {order.type}
                        </span>
                      </td>
                      <td className="amount-cell">{order.amount}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="time-cell">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Dishes Leaderboard */}
          <div className="admin-glass-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Top Dishes</h3>
              <button className="admin-btn-text" onClick={() => alert("Loading full popularity menu analytics...")}>
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div className="admin-dishes-list">

              {/* Truffle Pasta */}
              <div className="admin-dish-row">
                <span className="admin-dish-rank">1</span>
                <img src={dish1 || beetroot} alt="Truffle Pasta" className="admin-dish-img" />
                <div className="admin-dish-details">
                  <span className="admin-dish-name">Truffle Pasta</span>
                  <span className="admin-dish-sales">42 Orders today</span>
                </div>
                <span className="admin-dish-revenue">₹18,900</span>
              </div>

              {/* Grilled Salmon */}
              <div className="admin-dish-row">
                <span className="admin-dish-rank">2</span>
                <img src={beetroot} alt="Grilled Salmon" className="admin-dish-img" />
                <div className="admin-dish-details">
                  <span className="admin-dish-name">Grilled Salmon</span>
                  <span className="admin-dish-sales">38 Orders today</span>
                </div>
                <span className="admin-dish-revenue">₹16,200</span>
              </div>

              {/* Chicken Steak */}
              <div className="admin-dish-row">
                <span className="admin-dish-rank">3</span>
                <img src={desert} alt="Chicken Steak" className="admin-dish-img" />
                <div className="admin-dish-details">
                  <span className="admin-dish-name">Chicken Steak</span>
                  <span className="admin-dish-sales">35 Orders today</span>
                </div>
                <span className="admin-dish-revenue">₹14,700</span>
              </div>

              {/* Margherita Pizza */}
              <div className="admin-dish-row">
                <span className="admin-dish-rank">4</span>
                <img src={italic} alt="Margherita Pizza" className="admin-dish-img" />
                <div className="admin-dish-details">
                  <span className="admin-dish-name">Margherita Pizza</span>
                  <span className="admin-dish-sales">30 Orders today</span>
                </div>
                <span className="admin-dish-revenue">₹12,500</span>
              </div>

              {/* Chocolate Lava */}
              <div className="admin-dish-row">
                <span className="admin-dish-rank">5</span>
                <img src={dish1 || desert} alt="Chocolate Lava" className="admin-dish-img" />
                <div className="admin-dish-details">
                  <span className="admin-dish-name">Chocolate Lava</span>
                  <span className="admin-dish-sales">28 Orders today</span>
                </div>
                <span className="admin-dish-revenue">₹10,800</span>
              </div>

            </div>
          </div>
        </div>

        </div> {/* end of admin-scrollable-content */}
      </main>

      {/* 🏷️ FLOATING LIVE ACTIVITY BAR */}
      <footer className="admin-activity-bar">
        <div className="admin-activity-label">
          <Activity size={14} style={{animation: 'pulse 1s infinite'}} /> Live Activity
        </div>
        <div className="admin-activity-ticker">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="admin-ticker-item">
              <span className="admin-ticker-dot"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}
