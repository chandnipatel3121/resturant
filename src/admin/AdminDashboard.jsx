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
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts/umd/Recharts";
import menuData from "../data/menuData.json";
import "../styles/admin/AdminDashboard.css";

// Import premium images from project assets
import pasta3d from "../assets/pasta_3d.png";
import dish1 from "../assets/dish1.jpg";
import beetroot from "../assets/beetroot.jpg";
import desert from "../assets/desert.jpg";
import italic from "../assets/italic.jpg";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [timeFilter, setTimeFilter] = useState("Weekly");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredBar, setHoveredBar] = useState(null);

  const getRevenueData = () => {
    switch (timeFilter) {
      case "Daily":
        return [
          { name: "1 PM", revenue: 12000, orders: 30 },
          { name: "3 PM", revenue: 18000, orders: 45 },
          { name: "5 PM", revenue: 22000, orders: 55 },
          { name: "7 PM", revenue: 35000, orders: 88 },
          { name: "9 PM", revenue: 45000, orders: 112 },
          { name: "11 PM", revenue: 18000, orders: 45 }
        ];
      case "Monthly":
        return [
          { name: "Week 1", revenue: 120000, orders: 300 },
          { name: "Week 2", revenue: 145000, orders: 362 },
          { name: "Week 3", revenue: 110000, orders: 275 },
          { name: "Week 4", revenue: 175000, orders: 438 }
        ];
      case "Yearly":
        return [
          { name: "2017", revenue: 1800000, orders: 4500 },
          { name: "2018", revenue: 2200000, orders: 5500 },
          { name: "2019", revenue: 3100000, orders: 7800 },
          { name: "2020", revenue: 2500000, orders: 6200 },
          { name: "2021", revenue: 4200000, orders: 10500 },
          { name: "2022", revenue: 5800000, orders: 14500 },
          { name: "2023", revenue: 7200000, orders: 18000 },
          { name: "2024", revenue: 9500000, orders: 23800 },
          { name: "2025", revenue: 12000000, orders: 30000 },
          { name: "2026", revenue: 15000000, orders: 37500 }
        ];
      case "Weekly":
      default:
        return [
          { name: "Mon", revenue: 20000, orders: 50 },
          { name: "Tue", revenue: 15000, orders: 38 },
          { name: "Wed", revenue: 32000, orders: 80 },
          { name: "Thu", revenue: 18000, orders: 45 },
          { name: "Fri", revenue: 28000, orders: 70 },
          { name: "Sat", revenue: 45000, orders: 112 },
          { name: "Sun", revenue: 65000, orders: 162 }
        ];
    }
  };

  const getRevenueTotal = () => {
    switch (timeFilter) {
      case "Daily": return "₹1,50,000";
      case "Monthly": return "₹5,50,000";
      case "Yearly": return "₹6,33,00,000";
      case "Weekly":
      default:
        return "₹1,45,000";
    }
  };

  const renderChart = () => {
    const data = getRevenueData();
    switch (timeFilter) {
      case "Daily":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 92, 92, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `₹${val / 1000}K`} />
            <ChartTooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(15, 92, 92, 0.15)',
                borderRadius: '16px',
                color: '#0F5C5C',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: 'bold',
                boxShadow: '0 20px 40px rgba(15, 92, 92, 0.1)',
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar dataKey="revenue" fill="#F59E0B" radius={[8, 8, 0, 0]} barSize={32} />
          </BarChart>
        );
      case "Monthly":
        return (
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 92, 92, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `₹${val / 1000}K`} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'rgba(224, 169, 75, 0.7)', fontSize: 11, fontWeight: 500 }} />
            <ChartTooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(15, 92, 92, 0.15)',
                borderRadius: '16px',
                color: '#0F5C5C',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            />
            <Bar yAxisId="left" dataKey="revenue" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={40} />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#E0A94B" strokeWidth={3} dot={{ fill: '#E0A94B', r: 4 }} />
          </ComposedChart>
        );
      case "Yearly":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 92, 92, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => val >= 10000000 ? `₹${(val / 10000000).toFixed(1)}Cr` : `₹${val / 100000}L`} />
            <ChartTooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(15, 92, 92, 0.15)',
                borderRadius: '16px',
                color: '#0F5C5C',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#0F5C5C" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          </LineChart>
        );
      case "Weekly":
      default:
        return (
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F5C5C" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0F5C5C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15, 92, 92, 0.15)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'rgba(15, 92, 92, 0.6)', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `₹${val / 1000}K`} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'rgba(224, 169, 75, 0.7)', fontSize: 11, fontWeight: 500 }} />
            <ChartTooltip
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(15, 92, 92, 0.15)',
                borderRadius: '16px',
                color: '#0F5C5C',
                fontFamily: 'inherit',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
              formatter={(value, name) => {
                if (name === "revenue") return [`₹${value.toLocaleString()}`, 'Revenue'];
                return [`${value} Orders`, 'Orders'];
              }}
            />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#0F5C5C" strokeWidth={3} fill="url(#chartAreaGradient)" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#E0A94B" strokeWidth={3} dot={{ stroke: '#E0A94B', strokeWidth: 2, r: 4, fill: '#fff' }} />
          </ComposedChart>
        );
    }
  };

  const chartData = [
    { day: "Mon", val: 20000, display: "₹20K", pct: 30 },
    { day: "Tue", val: 15000, display: "₹15K", pct: 23 },
    { day: "Wed", val: 32000, display: "₹32K", pct: 49 },
    { day: "Thu", val: 18000, display: "₹18K", pct: 27 },
    { day: "Fri", val: 28000, display: "₹28K", pct: 43 },
    { day: "Sat", val: 45000, display: "₹45K", pct: 69 },
    { day: "Sun", val: 65000, display: "₹65K", pct: 100 },
  ];
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

  return (
    <div className="admin-dashboard-container">
      {/* Dynamic Background Glow Orbs */}
      <div className="admin-glow-orb admin-orb-1"></div>
      <div className="admin-glow-orb admin-orb-2"></div>
      <div className="admin-glow-orb admin-orb-3"></div>

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

          {/* 📊 SEVEN KPI CARDS ROW */}
          <div className="admin-kpis-grid">

            {/* 1. Today's Revenue - Amber Theme */}
            <div className="admin-kpi-card theme-amber">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <TrendingUp size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#F59E0B">+12%</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Today's Revenue</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">₹24,500</span>
              </div>
              <span className="admin-kpi-subtext">target: ₹30,000</span>
            </div>

            {/* 2. Weekly Revenue - Cyan Theme */}
            <div className="admin-kpi-card theme-cyan">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <BarChart3 size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="35" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#06B6D4">+15%</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Weekly Revenue</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">₹1.82L</span>
              </div>
              <span className="admin-kpi-subtext">target: ₹2.00L</span>
            </div>

            {/* 3. Monthly Revenue - Indigo Theme */}
            <div className="admin-kpi-card theme-indigo">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <ShoppingBag size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="20" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#6366F1">+22%</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Monthly Revenue</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">₹7.45L</span>
              </div>
              <span className="admin-kpi-subtext">target: ₹8.00L</span>
            </div>

            {/* 4. Orders Today - Emerald Theme */}
            <div className="admin-kpi-card theme-emerald">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <Activity size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="44" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#10B981">+42%</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Orders Today</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">142</span>
              </div>
              <span className="admin-kpi-subtext">orders in progress: 12</span>
            </div>

            {/* 5. Active Tables - Sky Blue Theme */}
            <div className="admin-kpi-card theme-skyblue">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <Utensils size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="18" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0EA5E9">18</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Active Tables</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">18</span>
              </div>
              <span className="admin-kpi-subtext">out of 24 total tables</span>
            </div>

            {/* 6. Average Order Value - Violet Theme */}
            <div className="admin-kpi-card theme-violet">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <Package size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(139, 92, 246, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="30" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#8B5CF6">+8%</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">Avg Order Value</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">₹1,250</span>
              </div>
              <span className="admin-kpi-subtext">vs ₹1,150 last week</span>
            </div>

            {/* 7. CSAT Score - Rose Theme */}
            <div className="admin-kpi-card theme-rose">
              <div className="admin-kpi-top-row">
                <div className="admin-kpi-icon-outline">
                  <Star size={32} strokeWidth={1.5} />
                </div>
                <div className="admin-kpi-progress-ring">
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(244, 63, 94, 0.08)" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeDasharray="88" strokeDashoffset="8" strokeLinecap="round" />
                    <text x="18" y="20.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#F43F5E">4.8★</text>
                  </svg>
                </div>
              </div>
              <span className="admin-kpi-title">CSAT Score</span>
              <div className="admin-kpi-value-group">
                <span className="admin-kpi-val-bold">96%</span>
              </div>
              <span className="admin-kpi-subtext">based on 221 reviews</span>
            </div>

          </div>

        {/* 📈 MIDDLE ROW: REVENUE ANALYTICS + AI INSIGHT + LIVE KITCHEN */}
        <div className="admin-middle-grid">

          {/* Revenue Analytics Curve Graph */}
          <div className="admin-glass-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Revenue Overview</h3>
              <select
                className="admin-dropdown-trigger"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                style={{ outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="admin-chart-value-group">
              <span className="admin-chart-total">{getRevenueTotal()}</span>
              <span className="admin-chart-trend">
                <ArrowUpRight size={14} /> 15.6%
              </span>
              <span className="admin-chart-trend-sub"> vs last period</span>
            </div>

            <div className="admin-chart-container" style={{ width: '100%', height: 220, marginTop: '20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>

          {/* 📊 Order Summary PieChart Card (New!) */}
          <div className="admin-glass-card admin-kitchen-card">
            <div className="admin-kitchen-header">
              <h3 className="admin-card-title">Order Summary</h3>
              <div className="admin-kitchen-icon" style={{ color: '#E0A94B', borderColor: 'rgba(224, 169, 75, 0.15)', background: 'rgba(224, 169, 75, 0.05)' }}>
                <ShoppingBag size={16} />
              </div>
            </div>

            <div className="admin-kitchen-progress-wrapper" style={{ width: '140px', height: '140px', position: 'relative', margin: '0 auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="servedGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0F5C5C" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="prepGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E0A94B" />
                      <stop offset="100%" stopColor="#ffb834" />
                    </linearGradient>
                    <linearGradient id="cancelGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ff5252" />
                      <stop offset="100%" stopColor="#ff7b7b" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={[
                      { name: "Served/Delivered", value: 68 },
                      { name: "Preparing/On Delivery", value: 22 },
                      { name: "Cancelled", value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={58}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="url(#servedGradient)" stroke="rgba(15, 92, 92, 0.1)" />
                    <Cell fill="url(#prepGradient)" stroke="rgba(224, 169, 75, 0.1)" />
                    <Cell fill="url(#cancelGradient)" stroke="rgba(255, 82, 82, 0.1)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="admin-kitchen-center-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span className="admin-kitchen-percentage" style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F5C5C' }}>120</span>
                <span className="admin-kitchen-desc" style={{ fontSize: '9px', color: '#7A688A', display: 'block' }}>Total Orders</span>
              </div>
            </div>

            <div className="admin-order-summary-legend" style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '12px', fontWeight: 800, color: '#7A688A', width: '100%', flexWrap: 'wrap', marginTop: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0F5C5C', display: 'inline-block' }}></span> Served (68%)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E0A94B', display: 'inline-block' }}></span> Active (22%)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5252', display: 'inline-block' }}></span> Pending (10%)</span>
            </div>
          </div>



          {/* Live Kitchen Status Card with order-wise preparation progress */}
          <div className="admin-glass-card admin-kitchen-card">
            <div className="admin-kitchen-header">
              <h3 className="admin-card-title">Live Kitchen Status</h3>
              <div className="admin-kitchen-icon">
                <Utensils size={16} />
              </div>
            </div>

            <div className="admin-kitchen-progress-list" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', margin: '15px 0' }}>

              {/* Order 1: #125 Truffle Pasta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7A688A', fontWeight: 600 }}>
                  <span style={{ color: '#0F5C5C', fontWeight: 800 }}>#125 Truffle Pasta</span>
                  <span style={{ color: '#0F5C5C' }}>80% (Prep • 2m left)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(15, 92, 92, 0.05)', border: '1px solid rgba(15, 92, 92, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #0F5C5C, #10B981)', borderRadius: '4px', boxShadow: '0 0 8px rgba(16, 185, 129, 0.3)' }}></div>
                </div>
              </div>

              {/* Order 2: #124 Grilled Salmon */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7A688A', fontWeight: 600 }}>
                  <span style={{ color: '#E0A94B', fontWeight: 800 }}>#124 Grilled Salmon</span>
                  <span style={{ color: '#E0A94B' }}>45% (Baking • 6m left)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(15, 92, 92, 0.05)', border: '1px solid rgba(15, 92, 92, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, #E0A94B, #ffb834)', borderRadius: '4px', boxShadow: '0 0 8px rgba(224, 169, 75, 0.3)' }}></div>
                </div>
              </div>

              {/* Order 3: #123 Chocolate Lava */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7A688A', fontWeight: 600 }}>
                  <span style={{ color: '#7A688A', fontWeight: 800 }}>#123 Chocolate Lava</span>
                  <span style={{ color: '#7A688A' }}>95% (Plating • 1m left)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(15, 92, 92, 0.05)', border: '1px solid rgba(15, 92, 92, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '95%', height: '100%', background: 'linear-gradient(90deg, #7A688A, #A18CD1)', borderRadius: '4px', boxShadow: '0 0 8px rgba(122, 104, 138, 0.3)' }}></div>
                </div>
              </div>

            </div>

            <div className="admin-kitchen-stats" style={{ borderTop: '1px dashed rgba(15, 92, 92, 0.1)', paddingTop: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="admin-kitchen-stats-label" style={{ fontSize: '12px', color: '#7A688A', fontWeight: 800 }}>Active Queue Orders</span>
              <span className="admin-kitchen-stats-value" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F5C5C' }}>3</span>
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
