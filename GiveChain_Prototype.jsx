import { useState, useEffect, useCallback, useMemo } from "react";

// ─── Mock Data ────────────────────────────────────────────
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    title: "Build a School in Nairobi",
    org: "EduBridge Foundation",
    orgVerified: true,
    category: "Education",
    region: "Africa",
    description: "Building a primary school for 200 children in Kibera, Nairobi. The project includes classrooms, a library, clean water facilities, and a playground.",
    goal: 15000,
    raised: 11250,
    donors: 342,
    token: "USDC",
    deadline: "2026-04-15",
    stellarAddress: "GBXF...K4QR",
    image: "🏫",
    color: "#3B82F6",
    milestones: [
      { id: 1, title: "Land Acquisition", pct: 20, verified: true, released: true, proof: "0xa3f8...c91d", date: "2026-01-15", desc: "Secured 2-acre plot with government approval" },
      { id: 2, title: "Foundation & Structure", pct: 30, verified: true, released: true, proof: "0xb7e2...d44a", date: "2026-02-10", desc: "Concrete foundation and steel structure completed" },
      { id: 3, title: "Interior & Facilities", pct: 30, verified: false, released: false, proof: null, date: null, desc: "Classroom interiors, plumbing, electrical work" },
      { id: 4, title: "Grand Opening", pct: 20, verified: false, released: false, proof: null, date: null, desc: "Final inspection, furniture, opening ceremony" },
    ],
    txHistory: [
      { hash: "tx_a1b2c3", donor: "GCXL...M8NR", amount: 500, time: "2 min ago", type: "donation" },
      { hash: "tx_d4e5f6", donor: "GBYR...P3QS", amount: 25, time: "8 min ago", type: "donation" },
      { hash: "tx_g7h8i9", donor: "GDHK...R7TU", amount: 1000, time: "23 min ago", type: "donation" },
      { hash: "tx_j0k1l2", donor: "Contract", amount: 3000, time: "3 days ago", type: "release" },
      { hash: "tx_m3n4o5", donor: "GALX...W2YZ", amount: 50, time: "4 days ago", type: "donation" },
    ],
  },
  {
    id: 2,
    title: "Clean Water for Cochabamba",
    org: "AquaVida Chile",
    orgVerified: true,
    category: "Water & Sanitation",
    region: "South America",
    description: "Installing solar-powered water purification systems in 5 rural communities around Cochabamba, Bolivia. Each system serves 500+ people.",
    goal: 8000,
    raised: 6400,
    donors: 189,
    token: "USDC",
    deadline: "2026-03-30",
    stellarAddress: "GDKR...L9MS",
    image: "💧",
    color: "#06B6D4",
    milestones: [
      { id: 1, title: "Equipment Purchase", pct: 30, verified: true, released: true, proof: "0xc4d5...e67f", date: "2026-01-20", desc: "5 solar purification units ordered and shipped" },
      { id: 2, title: "Site Prep & Installation", pct: 40, verified: true, released: false, proof: "0xd8e9...f01a", date: "2026-02-25", desc: "3 of 5 sites prepared, 2 installations complete" },
      { id: 3, title: "Testing & Handover", pct: 30, verified: false, released: false, proof: null, date: null, desc: "Water quality testing and community training" },
    ],
    txHistory: [
      { hash: "tx_p6q7r8", donor: "GCNL...K5MR", amount: 200, time: "5 min ago", type: "donation" },
      { hash: "tx_s9t0u1", donor: "GBKF...P2QS", amount: 75, time: "15 min ago", type: "donation" },
      { hash: "tx_v2w3x4", donor: "Contract", amount: 2400, time: "1 day ago", type: "release" },
    ],
  },
  {
    id: 3,
    title: "Emergency Relief: Earthquake Response",
    org: "Global Aid Network",
    orgVerified: true,
    category: "Disaster Relief",
    region: "Asia",
    description: "Providing emergency shelters, food supplies, and medical kits to 1,000 families affected by the recent earthquake in central Turkey.",
    goal: 25000,
    raised: 22100,
    donors: 1247,
    token: "USDC",
    deadline: "2026-03-10",
    stellarAddress: "GBNR...T4VW",
    image: "🆘",
    color: "#EF4444",
    milestones: [
      { id: 1, title: "Emergency Supplies", pct: 40, verified: true, released: true, proof: "0xe2f3...a45b", date: "2026-02-01", desc: "Food, water, blankets for 1000 families" },
      { id: 2, title: "Temporary Shelters", pct: 35, verified: true, released: true, proof: "0xf6g7...b89c", date: "2026-02-18", desc: "500 emergency tents deployed" },
      { id: 3, title: "Medical Support", pct: 25, verified: false, released: false, proof: null, date: null, desc: "Mobile clinics and medicine distribution" },
    ],
    txHistory: [
      { hash: "tx_y5z6a7", donor: "GCLM...N8PR", amount: 1000, time: "1 min ago", type: "donation" },
      { hash: "tx_b8c9d0", donor: "GBXF...Q3ST", amount: 50, time: "3 min ago", type: "donation" },
      { hash: "tx_e1f2g3", donor: "GDHK...U6WX", amount: 5000, time: "12 min ago", type: "donation" },
    ],
  },
  {
    id: 4,
    title: "Women's Tech Education Hub",
    org: "CodeLatinas",
    orgVerified: true,
    category: "Education",
    region: "South America",
    description: "Creating a technology education center in Santiago, Chile to train 500 women in software development, blockchain, and AI over the next year.",
    goal: 12000,
    raised: 3600,
    donors: 98,
    token: "USDC",
    deadline: "2026-06-01",
    stellarAddress: "GCPQ...Y7ZA",
    image: "👩‍💻",
    color: "#8B5CF6",
    milestones: [
      { id: 1, title: "Space & Equipment", pct: 35, verified: false, released: false, proof: null, date: null, desc: "Lease co-working space, purchase 30 laptops" },
      { id: 2, title: "Curriculum Development", pct: 25, verified: false, released: false, proof: null, date: null, desc: "Develop 6-month training curriculum with mentors" },
      { id: 3, title: "First Cohort Launch", pct: 25, verified: false, released: false, proof: null, date: null, desc: "Enroll and begin training first 100 students" },
      { id: 4, title: "Graduation & Placement", pct: 15, verified: false, released: false, proof: null, date: null, desc: "First cohort graduation and job placement support" },
    ],
    txHistory: [
      { hash: "tx_h4i5j6", donor: "GCYL...M1NR", amount: 100, time: "30 min ago", type: "donation" },
      { hash: "tx_k7l8m9", donor: "GBRF...P4QS", amount: 500, time: "2 hours ago", type: "donation" },
    ],
  },
];

const GLOBAL_STATS = { totalRaised: 1847300, totalDonors: 28491, totalCampaigns: 156, avgTxCost: 0.00001, countries: 47 };

const LIVE_FEED = [
  { id: 1, donor: "GCXL...M8NR", campaign: "Build a School in Nairobi", amount: 500, time: "2 min ago", flag: "🇺🇸" },
  { id: 2, donor: "GBYR...P3QS", campaign: "Clean Water for Cochabamba", amount: 25, time: "5 min ago", flag: "🇨🇱" },
  { id: 3, donor: "GDHK...R7TU", campaign: "Emergency Relief", amount: 1000, time: "8 min ago", flag: "🇩🇪" },
  { id: 4, donor: "GALX...W2YZ", campaign: "Women's Tech Hub", amount: 100, time: "12 min ago", flag: "🇧🇷" },
  { id: 5, donor: "GCNL...K5MR", campaign: "Build a School in Nairobi", amount: 50, time: "15 min ago", flag: "🇯🇵" },
  { id: 6, donor: "GBKF...P2QS", campaign: "Clean Water for Cochabamba", amount: 200, time: "20 min ago", flag: "🇬🇧" },
];

const MY_DONATIONS = [
  { campaign: "Build a School in Nairobi", amount: 150, date: "2026-02-25", status: "Milestone 2 reached", hash: "tx_mydon1" },
  { campaign: "Emergency Relief", amount: 500, date: "2026-02-20", status: "Milestone 2 reached", hash: "tx_mydon2" },
  { campaign: "Clean Water for Cochabamba", amount: 75, date: "2026-02-10", status: "Milestone 1 released", hash: "tx_mydon3" },
];

// ─── Utility Components ──────────────────────────────────
const Badge = ({ children, color = "#3B82F6" }) => (
  <span style={{ background: `${color}20`, color, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{children}</span>
);

const ProgressBar = ({ value, max, color = "#3B82F6", height = 8 }) => (
  <div style={{ background: "#E5E7EB", borderRadius: height, height, width: "100%", overflow: "hidden" }}>
    <div style={{ background: color, height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, borderRadius: height, transition: "width 0.8s ease" }} />
  </div>
);

const StatCard = ({ icon, label, value, sub }) => (
  <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6" }}>
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>{value}</div>
    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: "#10B981", marginTop: 4 }}>{sub}</div>}
  </div>
);

const StellarLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#000"/>
    <path d="M18.3 7.7L6.7 13.5c-.3.1-.5.5-.3.8l.1.1c.2.2.4.3.7.2l11.5-5.8c.3-.1.5-.5.3-.8l-.1-.1c-.2-.2-.5-.3-.6-.2z" fill="#fff"/>
    <path d="M18.3 10.2L6.7 16c-.3.1-.5.5-.3.8l.1.1c.2.2.4.3.7.2l11.5-5.8c.3-.2.5-.5.3-.8l-.1-.1c-.2-.3-.5-.3-.6-.2z" fill="#fff"/>
    <circle cx="6" cy="9" r="1.5" fill="#fff"/>
    <circle cx="18" cy="15" r="1.5" fill="#fff"/>
  </svg>
);

// ─── Main App ─────────────────────────────────────────────
export default function GiveChainApp() {
  const [page, setPage] = useState("home");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [liveFeedIdx, setLiveFeedIdx] = useState(0);
  const [showTxDetail, setShowTxDetail] = useState(null);

  // Simulated live feed rotation
  useEffect(() => {
    const t = setInterval(() => setLiveFeedIdx((i) => (i + 1) % LIVE_FEED.length), 3000);
    return () => clearInterval(t);
  }, []);

  const connectWallet = () => {
    setWalletAddress("GCXL...M8NR");
    setWalletConnected(true);
  };

  const openCampaign = (c) => { setSelectedCampaign(c); setPage("detail"); };
  const goHome = () => { setPage("home"); setSelectedCampaign(null); };

  const handleDonate = () => {
    if (!donateAmount || parseFloat(donateAmount) <= 0) return;
    setDonateSuccess(true);
    setTimeout(() => { setShowDonateModal(false); setDonateSuccess(false); setDonateAmount(""); }, 3000);
  };

  const categories = ["All", "Education", "Water & Sanitation", "Disaster Relief"];
  const filtered = filterCategory === "All" ? MOCK_CAMPAIGNS : MOCK_CAMPAIGNS.filter(c => c.category === filterCategory);

  // ─── Shared Layout ──────────────────────────────────────
  const NavBar = () => (
    <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={goHome}>
          <StellarLogo />
          <span style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>GiveChain</span>
          <span style={{ fontSize: 10, background: "#DBEAFE", color: "#2563EB", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>on Stellar</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span onClick={goHome} style={{ cursor: "pointer", fontSize: 14, fontWeight: page === "home" ? 700 : 400, color: page === "home" ? "#2563EB" : "#6B7280" }}>Campaigns</span>
          <span onClick={() => setPage("dashboard")} style={{ cursor: "pointer", fontSize: 14, fontWeight: page === "dashboard" ? 700 : 400, color: page === "dashboard" ? "#2563EB" : "#6B7280" }}>Dashboard</span>
          <span onClick={() => setPage("explorer")} style={{ cursor: "pointer", fontSize: 14, fontWeight: page === "explorer" ? 700 : 400, color: page === "explorer" ? "#2563EB" : "#6B7280" }}>Explorer</span>
          {walletConnected ? (
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "6px 16px", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D" }}>{walletAddress}</span>
            </div>
          ) : (
            <button onClick={connectWallet} style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // ─── Home Page ──────────────────────────────────────────
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: "10%", width: 200, height: 200, background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: 20, right: "15%", width: 150, height: 150, background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 13, color: "#60A5FA", fontWeight: 600, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Powered by Stellar Blockchain</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
            Every Donation,<br />
            <span style={{ background: "linear-gradient(90deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>100% Transparent</span>
          </h1>
          <p style={{ fontSize: 18, color: "#94A3B8", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Track every cent from your wallet to the final impact. Milestone-based escrow ensures funds are released only when goals are met.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("campaigns")?.scrollIntoView({behavior:"smooth"})} style={{ background: "#3B82F6", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Explore Campaigns
            </button>
            <button onClick={connectWallet} style={{ background: "transparent", color: "#fff", border: "1px solid #475569", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Connect Freighter
            </button>
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div style={{ maxWidth: 1200, margin: "-40px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          <StatCard icon="💰" label="Total Raised" value={`$${(GLOBAL_STATS.totalRaised / 1000000).toFixed(1)}M`} sub="+12.3% this month" />
          <StatCard icon="👥" label="Global Donors" value={GLOBAL_STATS.totalDonors.toLocaleString()} sub="+847 this week" />
          <StatCard icon="🌍" label="Countries" value={GLOBAL_STATS.countries} />
          <StatCard icon="⚡" label="Avg TX Cost" value={`$${GLOBAL_STATS.avgTxCost}`} sub="99.99% cheaper" />
        </div>
      </div>

      {/* Live Feed Ticker */}
      <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 24px" }}>
        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D" }}>LIVE</span>
          <span style={{ fontSize: 13, color: "#374151" }}>
            {LIVE_FEED[liveFeedIdx].flag} <strong>{LIVE_FEED[liveFeedIdx].donor}</strong> donated <strong>${LIVE_FEED[liveFeedIdx].amount}</strong> to "{LIVE_FEED[liveFeedIdx].campaign}" · {LIVE_FEED[liveFeedIdx].time}
          </span>
        </div>
      </div>

      {/* Campaign Grid */}
      <div id="campaigns" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>Active Campaigns</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCategory(cat)} style={{
                background: filterCategory === cat ? "#111827" : "#F3F4F6",
                color: filterCategory === cat ? "#fff" : "#6B7280",
                border: "none", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer"
              }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => openCampaign(c)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}>
              <div style={{ height: 140, background: `linear-gradient(135deg, ${c.color}15, ${c.color}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{c.image}</div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Badge color={c.color}>{c.category}</Badge>
                  <Badge color="#6B7280">{c.region}</Badge>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>{c.title}</h3>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
                  {c.org} {c.orgVerified && <span style={{ color: "#3B82F6" }}>✓</span>}
                </div>
                <ProgressBar value={c.raised} max={c.goal} color={c.color} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>${c.raised.toLocaleString()}</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF" }}>of ${c.goal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#9CA3AF" }}>
                  <span>👥 {c.donors} donors</span>
                  <span>{Math.round((c.raised / c.goal) * 100)}% funded</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: "#F9FAFB", padding: "64px 24px", marginTop: 32 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 40 }}>How GiveChain Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { icon: "🔗", title: "Connect Wallet", desc: "Link your Freighter wallet in one click. No signup, no KYC for donations." },
              { icon: "💝", title: "Choose & Donate", desc: "Pick a campaign and donate in USDC or XLM. Fees under $0.001." },
              { icon: "🔒", title: "Funds in Escrow", desc: "Smart contract holds funds until milestones are verified." },
              { icon: "📊", title: "Track Impact", desc: "Watch real-time progress. Every transaction on-chain, forever." },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Campaign Detail Page ──────────────────────────────
  const DetailPage = () => {
    if (!selectedCampaign) return null;
    const c = selectedCampaign;
    const pct = Math.round((c.raised / c.goal) * 100);
    const releasedPct = c.milestones.filter(m => m.released).reduce((s, m) => s + m.pct, 0);
    const releasedAmt = (c.raised * releasedPct) / 100;

    return (
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={goHome} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 14, cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 4 }}>
          ← Back to Campaigns
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>
          {/* Left Column */}
          <div>
            <div style={{ height: 220, borderRadius: 16, background: `linear-gradient(135deg, ${c.color}15, ${c.color}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, marginBottom: 24 }}>{c.image}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <Badge color={c.color}>{c.category}</Badge>
              <Badge color="#6B7280">{c.region}</Badge>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>{c.title}</h1>
            <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>
              By <strong>{c.org}</strong> {c.orgVerified && <span style={{ background: "#DBEAFE", color: "#2563EB", padding: "1px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>✓ Verified</span>}
            </div>
            <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.7, marginBottom: 32 }}>{c.description}</p>

            {/* Milestones */}
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>Milestone Progress</h3>
            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 2, background: "#E5E7EB" }} />
              {c.milestones.map((m, i) => (
                <div key={m.id} style={{ marginBottom: 24, position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -28, top: 2, width: 24, height: 24, borderRadius: "50%",
                    background: m.released ? "#22C55E" : m.verified ? "#F59E0B" : "#E5E7EB",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700, zIndex: 2
                  }}>
                    {m.released ? "✓" : m.verified ? "⏳" : (i + 1)}
                  </div>
                  <div style={{ background: m.released ? "#F0FDF4" : m.verified ? "#FFFBEB" : "#F9FAFB", borderRadius: 12, padding: 16, border: `1px solid ${m.released ? "#BBF7D0" : m.verified ? "#FDE68A" : "#E5E7EB"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{m.title}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{m.pct}% · ${Math.round(c.goal * m.pct / 100).toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8 }}>{m.desc}</div>
                    {m.verified && (
                      <div style={{ fontSize: 12, color: "#6B7280", display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <span>📅 {m.date}</span>
                        <span style={{ fontFamily: "monospace", background: "#F3F4F6", padding: "1px 6px", borderRadius: 4 }}>Proof: {m.proof}</span>
                        {m.released && <span style={{ color: "#22C55E", fontWeight: 600 }}>✓ Funds Released</span>}
                        {!m.released && <span style={{ color: "#F59E0B", fontWeight: 600 }}>⏳ Pending Release</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Transaction History */}
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 32, marginBottom: 16 }}>Recent Transactions</h3>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
              {c.txHistory.map((tx, i) => (
                <div key={i} style={{ padding: "12px 16px", borderBottom: i < c.txHistory.length - 1 ? "1px solid #F3F4F6" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 12, fontFamily: "monospace", color: "#6B7280" }}>{tx.hash}</span>
                    <div style={{ fontSize: 13, color: "#374151", marginTop: 2 }}>
                      {tx.type === "release" ? "🔓 Milestone Release" : `From ${tx.donor}`}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: tx.type === "release" ? "#F59E0B" : "#22C55E" }}>
                      {tx.type === "release" ? "-" : "+"}${tx.amount.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{tx.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", marginBottom: 16 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#111827" }}>${c.raised.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>raised of ${c.goal.toLocaleString()} goal</div>
              <ProgressBar value={c.raised} max={c.goal} color={c.color} height={10} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13, color: "#6B7280" }}>
                <span><strong style={{ color: "#111827" }}>{pct}%</strong> funded</span>
                <span><strong style={{ color: "#111827" }}>{c.donors}</strong> donors</span>
              </div>
              <div style={{ margin: "16px 0", padding: "12px 16px", background: "#F9FAFB", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: "#6B7280" }}>Released</span>
                  <span style={{ fontWeight: 600, color: "#22C55E" }}>${Math.round(releasedAmt).toLocaleString()} ({releasedPct}%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#6B7280" }}>In Escrow</span>
                  <span style={{ fontWeight: 600, color: "#F59E0B" }}>${Math.round(c.raised - releasedAmt).toLocaleString()}</span>
                </div>
              </div>
              <button onClick={() => { if(!walletConnected) connectWallet(); setShowDonateModal(true); }}
                style={{ width: "100%", background: c.color, color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                Donate Now
              </button>
              <div style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>TX fee: ~$0.00001 · Settles in 3-5s</div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB" }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: 12 }}>Campaign Details</h4>
              <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 2 }}>
                <div>Token: <strong style={{ color: "#111827" }}>{c.token}</strong></div>
                <div>Deadline: <strong style={{ color: "#111827" }}>{c.deadline}</strong></div>
                <div>Contract: <span style={{ fontFamily: "monospace", fontSize: 11 }}>{c.stellarAddress}</span></div>
                <div>Milestones: <strong style={{ color: "#111827" }}>{c.milestones.filter(m=>m.verified).length}/{c.milestones.length} verified</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Dashboard Page ────────────────────────────────────
  const DashboardPage = () => (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>My Dashboard</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>Track your donations and their real-world impact.</p>

      {!walletConnected ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
          <h3 style={{ fontSize: 18, color: "#111827", marginBottom: 8 }}>Connect Your Wallet</h3>
          <p style={{ color: "#6B7280", marginBottom: 20 }}>Link your Freighter wallet to view your donation history.</p>
          <button onClick={connectWallet} style={{ background: "#111827", color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Connect Freighter</button>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
            <StatCard icon="💝" label="Total Donated" value="$725" sub="3 campaigns" />
            <StatCard icon="🎯" label="Impact Score" value="92" sub="Top 5% donor" />
            <StatCard icon="✅" label="Milestones Hit" value="4/7" sub="57% verified" />
            <StatCard icon="🔄" label="Funds Released" value="$480" sub="66% of donations" />
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>My Donations</h3>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden" }}>
            {MY_DONATIONS.map((d, i) => (
              <div key={i} style={{ padding: "16px 20px", borderBottom: i < MY_DONATIONS.length - 1 ? "1px solid #F3F4F6" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{d.campaign}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                    {d.date} · <span style={{ fontFamily: "monospace" }}>{d.hash}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>${d.amount}</div>
                  <Badge color="#22C55E">{d.status}</Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Visualization */}
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 32, marginBottom: 16 }}>Your Impact</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            <div style={{ background: "linear-gradient(135deg, #DBEAFE, #EDE9FE)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🏫</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1E3A8A" }}>12 Children</div>
              <div style={{ fontSize: 14, color: "#3B82F6" }}>will have a new school thanks to your $150 donation</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #FEE2E2, #FFF7ED)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🆘</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#991B1B" }}>5 Families</div>
              <div style={{ fontSize: 14, color: "#EF4444" }}>received emergency shelter from your $500 contribution</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #D1FAE5, #ECFDF5)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>💧</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#065F46" }}>50 People</div>
              <div style={{ fontSize: 14, color: "#059669" }}>now have access to clean water from your $75 donation</div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ─── Explorer Page ─────────────────────────────────────
  const ExplorerPage = () => {
    const allTx = MOCK_CAMPAIGNS.flatMap(c =>
      c.txHistory.map(tx => ({ ...tx, campaign: c.title, campaignColor: c.color }))
    ).sort(() => Math.random() - 0.5).slice(0, 15);

    return (
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Blockchain Explorer</h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>Every transaction is publicly verifiable on the Stellar network.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <StatCard icon="📦" label="Total Transactions" value="4,281" sub="Last 24h: +127" />
          <StatCard icon="⏱️" label="Avg Confirmation" value="3.2s" />
          <StatCard icon="💸" label="Total Volume" value="$1.84M" />
        </div>

        <div style={{ background: "#0F172A", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1E293B", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>Live Transactions</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ fontSize: 12, color: "#22C55E", fontWeight: 600 }}>Stellar Testnet</span>
            </div>
          </div>
          {allTx.map((tx, i) => (
            <div key={i} style={{ padding: "12px 20px", borderBottom: "1px solid #1E293B", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onClick={() => setShowTxDetail(tx)} onMouseOver={e => e.currentTarget.style.background = "#1E293B"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: tx.type === "release" ? "#F59E0B20" : "#22C55E20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                  {tx.type === "release" ? "🔓" : "💝"}
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "#60A5FA" }}>{tx.hash}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{tx.campaign}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: tx.type === "release" ? "#F59E0B" : "#22C55E" }}>${tx.amount.toLocaleString()} USDC</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Donate Modal ──────────────────────────────────────
  const DonateModal = () => {
    if (!showDonateModal || !selectedCampaign) return null;
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => { if(!donateSuccess) { setShowDonateModal(false); setDonateAmount(""); }}}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: 400, maxWidth: "90vw" }} onClick={e => e.stopPropagation()}>
          {donateSuccess ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Donation Successful!</h3>
              <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>
                ${donateAmount} USDC sent to "{selectedCampaign.title}"
              </p>
              <div style={{ background: "#F9FAFB", borderRadius: 10, padding: 12, fontFamily: "monospace", fontSize: 12, color: "#6B7280" }}>
                TX: tx_{Math.random().toString(36).substr(2, 8)}<br />
                Confirmed in 3.1 seconds<br />
                Fee: $0.00001
              </div>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: 4 }}>Donate to Campaign</h3>
              <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>{selectedCampaign.title}</p>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Amount (USDC)</label>
                <input type="number" placeholder="0.00" value={donateAmount} onChange={e => setDonateAmount(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #D1D5DB", fontSize: 18, fontWeight: 600, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[5, 25, 50, 100].map(amt => (
                  <button key={amt} onClick={() => setDonateAmount(String(amt))}
                    style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid #E5E7EB", background: donateAmount === String(amt) ? "#111827" : "#fff",
                      color: donateAmount === String(amt) ? "#fff" : "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                    ${amt}
                  </button>
                ))}
              </div>
              <div style={{ background: "#F9FAFB", borderRadius: 10, padding: 12, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span style={{ color: "#6B7280" }}>Network Fee</span><span style={{ color: "#111827" }}>$0.00001</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#6B7280" }}>Platform Fee</span><span style={{ color: "#22C55E", fontWeight: 600 }}>$0.00 (Free!)</span>
                </div>
              </div>
              <button onClick={handleDonate} disabled={!donateAmount || parseFloat(donateAmount) <= 0}
                style={{ width: "100%", background: !donateAmount || parseFloat(donateAmount) <= 0 ? "#D1D5DB" : selectedCampaign.color,
                  color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontSize: 16, fontWeight: 700,
                  cursor: !donateAmount || parseFloat(donateAmount) <= 0 ? "not-allowed" : "pointer" }}>
                {walletConnected ? "Sign & Send Transaction" : "Connect Wallet First"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // ─── TX Detail Modal ────────────────────────────────────
  const TxDetailModal = () => {
    if (!showTxDetail) return null;
    const tx = showTxDetail;
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
        onClick={() => setShowTxDetail(null)}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: 440, maxWidth: "90vw" }} onClick={e => e.stopPropagation()}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginTop: 0 }}>Transaction Detail</h3>
          <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 16, fontFamily: "monospace", fontSize: 13, lineHeight: 2, color: "#374151" }}>
            <div><span style={{ color: "#9CA3AF" }}>Hash:</span> {tx.hash}</div>
            <div><span style={{ color: "#9CA3AF" }}>Type:</span> {tx.type === "release" ? "Milestone Release" : "Donation"}</div>
            <div><span style={{ color: "#9CA3AF" }}>From:</span> {tx.donor}</div>
            <div><span style={{ color: "#9CA3AF" }}>Amount:</span> ${tx.amount} USDC</div>
            <div><span style={{ color: "#9CA3AF" }}>Campaign:</span> {tx.campaign}</div>
            <div><span style={{ color: "#9CA3AF" }}>Time:</span> {tx.time}</div>
            <div><span style={{ color: "#9CA3AF" }}>Fee:</span> 0.00001 XLM</div>
            <div><span style={{ color: "#9CA3AF" }}>Status:</span> <span style={{ color: "#22C55E" }}>✓ Confirmed</span></div>
            <div><span style={{ color: "#9CA3AF" }}>Ledger:</span> #{Math.floor(Math.random() * 1000000 + 500000)}</div>
            <div><span style={{ color: "#9CA3AF" }}>Network:</span> Stellar Testnet</div>
          </div>
          <button onClick={() => setShowTxDetail(null)} style={{ width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 10, border: "1px solid #E5E7EB", background: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#374151" }}>
            Close
          </button>
        </div>
      </div>
    );
  };

  // ─── Footer ────────────────────────────────────────────
  const Footer = () => (
    <footer style={{ background: "#111827", padding: "40px 24px", marginTop: 64 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <StellarLogo />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>GiveChain</span>
          </div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>Transparent donations powered by Stellar blockchain.</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>Built for Build on Stellar Chile 🇨🇱</div>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>Soroban Smart Contracts</div>
        </div>
      </div>
    </footer>
  );

  // ─── Render ────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      <NavBar />
      {page === "home" && <HomePage />}
      {page === "detail" && <DetailPage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "explorer" && <ExplorerPage />}
      <DonateModal />
      <TxDetailModal />
      <Footer />
    </div>
  );
}
