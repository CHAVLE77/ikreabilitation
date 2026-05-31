import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";

/* ─────────────────────────────────────────────── */
/* Helpers */
/* ─────────────────────────────────────────────── */

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString("ka-GE", { day: "2-digit", month: "short", year: "numeric" });
}
function formatTime(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleTimeString("ka-GE", { hour: "2-digit", minute: "2-digit" });
}
function timeAgo(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d} დღის წინ`;
  if (h > 0) return `${h} სთ წინ`;
  return "ახლახანს";
}

const STATUS_CONFIG = {
  pending:   { label: "მოლოდინში",      color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  dot: "#F59E0B" },
  confirmed: { label: "დადასტურებულია", color: "#10B981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  dot: "#10B981" },
  rejected:  { label: "უარყოფილია",     color: "#EF4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.3)",   dot: "#EF4444" },
  deleted: { label: "წაშლილია", color: "#6B7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.3)", dot: "#6B7280" }
};
/* ─────────────────────────────────────────────── */
/* Icons */
/* ─────────────────────────────────────────────── */
const IconCheck   = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconX       = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconPhone   = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.28 5.18 2 2 0 015.27 3h3.09a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 11.09a16 16 0 006.83 6.83l1.61-1.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconUser    = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/></svg>;
const IconClock   = ({ size = 13 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconMsg     = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconSearch  = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconBell    = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconEye     = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>;
const IconLogout  = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconRefresh = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconTrash   = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const IconEdit    = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;

/* ─────────────────────────────────────────────── */
/* Global Styles */
/* ─────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans Georgian', sans-serif; }

  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes rowIn   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  @keyframes toastIn { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:none; } }
  @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }

  ::-webkit-scrollbar { width:5px; height:5px; }
  ::-webkit-scrollbar-track { background:rgba(255,255,255,0.03); }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:4px; }

  .ap-tab { background:none; border:none; cursor:pointer; font-family:'Noto Sans Georgian',sans-serif; padding:7px 14px; border-radius:8px; font-size:11.5px; font-weight:700; transition:all 0.2s ease; color:rgba(255,255,255,0.4); }
  .ap-tab:hover { color:rgba(255,255,255,0.8); background:rgba(255,255,255,0.06); }
  .ap-tab.active-all       { color:#fff; background:rgba(255,255,255,0.1); }
  .ap-tab.active-pending   { color:#F59E0B; background:rgba(245,158,11,0.15); }
  .ap-tab.active-confirmed { color:#10B981; background:rgba(16,185,129,0.15); }
  .ap-tab.active-rejected  { color:#EF4444; background:rgba(239,68,68,0.15); }

  .ap-stat { transition:all 0.25s ease; cursor:pointer; }
  .ap-stat:hover { transform:translateY(-3px) !important; }

  .ap-icon-btn { display:flex; align-items:center; justify-content:center; border-radius:8px; cursor:pointer; border:none; transition:all 0.18s ease; }
  .ap-row { transition:background 0.18s ease; }
  .ap-row:hover { background:rgba(255,255,255,0.04) !important; }

  .ap-input { font-family:'Noto Sans Georgian',sans-serif; outline:none; transition:all 0.2s ease; color:#fff; }
  .ap-input::placeholder { color:rgba(255,255,255,0.22); }
  .ap-input:focus { border-color:rgba(245,166,35,0.45) !important; background:rgba(245,166,35,0.04) !important; box-shadow:0 0 0 4px rgba(245,166,35,0.07) !important; }

  .ap-action-btns { opacity:0.35; transition:opacity 0.18s ease; }
  .ap-row:hover .ap-action-btns { opacity:1; }
  .ap-tab.active-deleted { color:#9CA3AF; background:rgba(107,114,128,0.15); }
  
  @media (max-width:900px) {
    .ap-table-header, .ap-row-grid { grid-template-columns: 1.6fr 1fr 0.8fr 0.7fr !important; }
    .ap-col-specialist, .ap-col-time { display:none !important; }
  }
  @media (max-width:600px) {
    .ap-table-header, .ap-row-grid { grid-template-columns: 1fr 0.7fr !important; }
    .ap-col-phone { display:none !important; }
  }
`;

/* ─────────────────────────────────────────────── */
/* Login Screen */
/* ─────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      setErr(error.message);
      setLoading(false);
    } else {
      onLogin();
    }
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(145deg,#060F20 0%,#0A1A36 50%,#071228 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Noto Sans Georgian',sans-serif", position:"relative", overflow:"hidden",
    }}>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ position:"absolute", width:500, height:500, top:-150, right:-100, borderRadius:"50%", background:"radial-gradient(circle,rgba(58,123,213,0.18) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, bottom:-80, left:-80, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,166,35,0.1) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"56px 56px", pointerEvents:"none" }} />

      <div style={{
        background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420,
        position:"relative", backdropFilter:"blur(20px)",
        animation:"fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
      }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, borderRadius:"24px 24px 0 0", background:"linear-gradient(90deg,transparent,#F5A623,#FFD166,transparent)" }} />
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ width:56, height:56, background:"rgba(245,166,35,0.1)", border:"1px solid rgba(245,166,35,0.25)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#F5A623" strokeWidth="1.5"/><path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#F5A623" strokeWidth="2"/><circle cx="20" cy="24" r="4" fill="#F5A623"/></svg>
          </div>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(245,166,35,0.7)", marginBottom:6 }}>ადმინ პანელი</div>
          <h1 style={{ fontSize:22, fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>რეაბილიტაციის ცენტრი</h1>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:6 }}>შედით თქვენი ანგარიშით</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { label:"ელ-ფოსტა", type:"email",    ph:"admin@example.com", val:email, set:setEmail },
            { label:"პაროლი",   type:"password",  ph:"••••••••",          val:pass,  set:setPass  },
          ].map((f, i) => (
            <div key={i} style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(245,166,35,0.75)" }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} required className="ap-input"
                style={{ padding:"12px 16px", borderRadius:12, border: err ? "1.5px solid rgba(239,68,68,0.5)" : "1.5px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.04)", fontSize:13 }} />
            </div>
          ))}

          {err && (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:10, color:"#FCA5A5", fontSize:12 }}>
              <IconX size={13} /> {err}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop:4, padding:14, borderRadius:60, border:"none",
            background: loading ? "rgba(245,166,35,0.4)" : "linear-gradient(135deg,#F5A623,#FFD166)",
            color:"#0F2344", fontFamily:"'Noto Sans Georgian',sans-serif",
            fontWeight:900, fontSize:13, cursor: loading ? "default" : "pointer",
            boxShadow:"0 8px 28px rgba(245,166,35,0.25)", transition:"all 0.25s ease",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
          }}>
            {loading
              ? <><span style={{ width:14, height:14, border:"2px solid rgba(15,35,68,0.3)", borderTopColor:"#0F2344", borderRadius:"50%", animation:"spin 0.7s linear infinite", display:"block" }} /> შესვლა...</>
              : "პანელში შესვლა"
            }
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Reject Modal */
/* ─────────────────────────────────────────────── */
function RejectModal({ submission, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 30); }, []);

  return (
    <div onClick={onCancel} style={{
      position:"fixed", inset:0, zIndex:2000,
      background:"rgba(1,10,28,0.85)", backdropFilter:"blur(16px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
      opacity:vis?1:0, transition:"opacity 0.3s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(145deg,#071222,#04101E)",
        border:"1px solid rgba(239,68,68,0.3)", borderRadius:22,
        padding:"32px 28px", maxWidth:460, width:"100%",
        transform:vis?"translateY(0) scale(1)":"translateY(24px) scale(0.97)",
        transition:"transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        boxShadow:"0 40px 80px rgba(0,0,0,0.7)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444", flexShrink:0 }}>
            <IconX size={18} />
          </div>
          <div>
            <h3 style={{ fontSize:16, fontWeight:900, color:"#fff" }}>განაცხადის უარყოფა</h3>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{submission?.name}</p>
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(239,68,68,0.75)", display:"block", marginBottom:6 }}>
            უარყოფის მიზეზი (სურვილისამებრ)
          </label>
          <textarea value={reason} onChange={e=>setReason(e.target.value)}
            placeholder="მაგ: სპეციალისტი დასვენებაზეა..."
            className="ap-input"
            style={{ width:"100%", minHeight:90, padding:"12px 14px", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, background:"rgba(255,255,255,0.04)", fontSize:12.5, resize:"vertical" }}
          />
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => onConfirm(reason)} style={{
            flex:1, padding:12, borderRadius:12, border:"none",
            background:"linear-gradient(135deg,#EF4444,#DC2626)", color:"#fff",
            fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:800, fontSize:12.5, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          }}>
            <IconX size={13} /> უარყოფა
          </button>
          <button onClick={onCancel} style={{
            padding:"12px 18px", borderRadius:12,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.5)", fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:700, fontSize:12.5, cursor:"pointer",
          }}>გაუქმება</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Edit Modal */
/* ─────────────────────────────────────────────── */
function EditModal({ submission, onConfirm, onCancel }) {
  const [status, setStatus] = useState(submission?.status || "pending");
  const [reason, setReason] = useState(submission?.rejectReason || "");
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 30); }, []);

  const STATUS_OPTIONS = [
    { value:"pending",   label:"მოლოდინში",      color:"#F59E0B", rgb:"245,158,11"  },
    { value:"confirmed", label:"დადასტურებულია", color:"#10B981", rgb:"16,185,129"  },
    { value:"rejected",  label:"უარყოფილია",     color:"#EF4444", rgb:"239,68,68"   },
  ];

  return (
    <div onClick={onCancel} style={{
      position:"fixed", inset:0, zIndex:2000,
      background:"rgba(1,10,28,0.85)", backdropFilter:"blur(16px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
      opacity:vis?1:0, transition:"opacity 0.3s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(145deg,#071222,#04101E)",
        border:"1px solid rgba(58,123,213,0.3)", borderRadius:22,
        padding:"32px 28px", maxWidth:460, width:"100%",
        transform:vis?"translateY(0) scale(1)":"translateY(24px) scale(0.97)",
        transition:"transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        boxShadow:"0 40px 80px rgba(0,0,0,0.7)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:"rgba(58,123,213,0.15)", border:"1px solid rgba(58,123,213,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4DA6FF", flexShrink:0 }}>
            <IconEdit size={18} />
          </div>
          <div>
            <h3 style={{ fontSize:16, fontWeight:900, color:"#fff" }}>სტატუსის შეცვლა</h3>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{submission?.name}</p>
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(58,123,213,0.75)", display:"block", marginBottom:10 }}>სტატუსი</label>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {STATUS_OPTIONS.map(opt => (
              <div key={opt.value} onClick={() => setStatus(opt.value)} style={{
                display:"flex", alignItems:"center", gap:12, padding:"12px 16px",
                borderRadius:12, cursor:"pointer",
                background: status === opt.value ? `rgba(${opt.rgb},0.12)` : "rgba(255,255,255,0.04)",
                border: status === opt.value ? `1.5px solid rgba(${opt.rgb},0.4)` : "1px solid rgba(255,255,255,0.08)",
                transition:"all 0.18s ease",
              }}>
                <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${opt.color}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {status === opt.value && <div style={{ width:8, height:8, borderRadius:"50%", background:opt.color }} />}
                </div>
                <span style={{ fontSize:13, fontWeight:700, color: status === opt.value ? opt.color : "rgba(255,255,255,0.6)" }}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        {status === "rejected" && (
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(239,68,68,0.75)", display:"block", marginBottom:6 }}>
              უარყოფის მიზეზი (სურვილისამებრ)
            </label>
            <textarea value={reason} onChange={e=>setReason(e.target.value)}
              placeholder="მაგ: სპეციალისტი დასვენებაზეა..."
              className="ap-input"
              style={{ width:"100%", minHeight:80, padding:"12px 14px", border:"1.5px solid rgba(255,255,255,0.08)", borderRadius:12, background:"rgba(255,255,255,0.04)", fontSize:12.5, resize:"vertical" }}
            />
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => onConfirm(status, status === "rejected" ? reason : null)} style={{
            flex:1, padding:12, borderRadius:12, border:"none",
            background:"linear-gradient(135deg,#3A7BD5,#1A5BC4)", color:"#fff",
            fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:800, fontSize:12.5, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          }}>
            <IconCheck size={13}/> შენახვა
          </button>
          <button onClick={onCancel} style={{
            padding:"12px 18px", borderRadius:12,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.5)", fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:700, fontSize:12.5, cursor:"pointer",
          }}>გაუქმება</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Delete Modal */
/* ─────────────────────────────────────────────── */
function DeleteModal({ submission, onConfirm, onCancel }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 30); }, []);

  return (
    <div onClick={onCancel} style={{
      position:"fixed", inset:0, zIndex:2000,
      background:"rgba(1,10,28,0.85)", backdropFilter:"blur(16px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24,
      opacity:vis?1:0, transition:"opacity 0.3s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(145deg,#071222,#04101E)",
        border:"1px solid rgba(239,68,68,0.3)", borderRadius:22,
        padding:"32px 28px", maxWidth:420, width:"100%",
        transform:vis?"translateY(0) scale(1)":"translateY(24px) scale(0.97)",
        transition:"transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        boxShadow:"0 40px 80px rgba(0,0,0,0.7)",
      }}>
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ width:56, height:56, borderRadius:16, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444", margin:"0 auto 16px" }}>
            <IconTrash size={24} />
          </div>
          <h3 style={{ fontSize:17, fontWeight:900, color:"#fff", marginBottom:10 }}>განაცხადის წაშლა</h3>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>
            დარწმუნებული ხარ? <strong style={{ color:"#fff" }}>{submission?.name}</strong>-ის<br/>განაცხადი სამუდამოდ წაიშლება.
          </p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onConfirm} style={{
            flex:1, padding:12, borderRadius:12, border:"none",
            background:"linear-gradient(135deg,#EF4444,#DC2626)", color:"#fff",
            fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:800, fontSize:12.5, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          }}>
            <IconTrash size={13}/> წაშლა
          </button>
          <button onClick={onCancel} style={{
            padding:"12px 18px", borderRadius:12,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.5)", fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:700, fontSize:12.5, cursor:"pointer",
          }}>გაუქმება</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Detail Drawer */
/* ─────────────────────────────────────────────── */
function DetailDrawer({ submission, onClose, onConfirm, onReject, onEdit, onDelete }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    setTimeout(() => setVis(true), 30);
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  if (!submission) return null;
  const sc = STATUS_CONFIG[submission.status] || STATUS_CONFIG.pending;

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(1,10,28,0.7)", backdropFilter:"blur(12px)",
      opacity:vis?1:0, transition:"opacity 0.3s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute", top:0, right:0, bottom:0,
        width:"min(480px,100vw)",
        background:"linear-gradient(160deg,#071628,#040E1E)",
        borderLeft:"1px solid rgba(255,255,255,0.08)",
        display:"flex", flexDirection:"column", overflowY:"auto",
        transform:vis?"translateX(0)":"translateX(100%)",
        transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        boxShadow:"-20px 0 60px rgba(0,0,0,0.5)",
      }}>
        {/* Header */}
        <div style={{ padding:"24px 24px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", position:"sticky", top:0, background:"linear-gradient(160deg,#071628,#040E1E)", zIndex:10 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <span style={{ fontSize:9, fontWeight:800, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(245,166,35,0.7)" }}>განაცხადის დეტალები</span>
            <button onClick={onClose} className="ap-icon-btn" style={{ width:32, height:32, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)" }}>
              <IconX size={15} />
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"rgba(58,123,213,0.15)", border:"1px solid rgba(58,123,213,0.25)", display:"flex", alignItems:"center", justifyContent:"center", color:"#4DA6FF", flexShrink:0 }}>
              <IconUser size={18} />
            </div>
            <div>
              <h2 style={{ fontSize:18, fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>{submission.name}</h2>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:40, fontSize:10, fontWeight:700, background:sc.bg, border:`1px solid ${sc.border}`, color:sc.color }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:sc.dot }} />
                  {sc.label}
                </span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>#{submission.id?.slice(0,8)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:16, flex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { icon:<IconPhone size={13}/>, label:"ტელეფონი", value:submission.phone, href:`tel:${submission.phone}`, accent:"#10B981" },
              { icon:<IconClock size={13}/>, label:"თარიღი",   value:`${formatDate(submission.date||submission.created_at)} ${formatTime(submission.date||submission.created_at)}`, accent:"#3A7BD5" },
              submission.specialist && { icon:<IconUser size={13}/>, label:"სპეციალისტი", value:submission.specialist, accent:"#F5A623" },
            ].filter(Boolean).map((info, i) => (
              <div key={i} style={{ padding:"12px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5, color:info.accent, marginBottom:5 }}>
                  {info.icon}
                  <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>{info.label}</span>
                </div>
                {info.href
                  ? <a href={info.href} style={{ fontSize:12.5, fontWeight:700, color:"#fff", textDecoration:"none" }}>{info.value}</a>
                  : <span style={{ fontSize:12.5, fontWeight:700, color:"#fff" }}>{info.value}</span>
                }
              </div>
            ))}
          </div>

          <div style={{ padding:"16px 18px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, color:"#F5A623", marginBottom:10 }}>
              <IconMsg size={13} />
              <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase" }}>შეტყობინება</span>
            </div>
            <p style={{ fontSize:13, lineHeight:1.7, color:"rgba(255,255,255,0.75)" }}>{submission.message}</p>
          </div>

          {submission.rejectReason && (
            <div style={{ padding:"14px 16px", background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12 }}>
              <span style={{ fontSize:8, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(239,68,68,0.7)", display:"block", marginBottom:6 }}>უარყოფის მიზეზი</span>
              <p style={{ fontSize:12.5, color:"rgba(239,68,68,0.8)", lineHeight:1.6 }}>{submission.rejectReason}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ padding:"16px 24px 24px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", gap:10 }}>
          {submission.status === "pending" && (
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onConfirm} style={{
                flex:1, padding:13, borderRadius:12, border:"none",
                background:"linear-gradient(135deg,#10B981,#059669)", color:"#fff",
                fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:800, fontSize:12.5, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                boxShadow:"0 6px 20px rgba(16,185,129,0.3)",
              }}><IconCheck size={14}/> დადასტურება</button>
              <button onClick={onReject} style={{
                flex:1, padding:13, borderRadius:12, border:"1px solid rgba(239,68,68,0.3)",
                background:"rgba(239,68,68,0.1)", color:"#EF4444",
                fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:800, fontSize:12.5, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
              }}><IconX size={14}/> უარყოფა</button>
            </div>
          )}
          {/* Edit & Delete always visible */}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onEdit} style={{
              flex:1, padding:11, borderRadius:12,
              background:"rgba(58,123,213,0.12)", border:"1px solid rgba(58,123,213,0.3)",
              color:"#4DA6FF", fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            }}><IconEdit size={13}/> სტატუსი შეცვლა</button>
            <button onClick={onDelete} style={{
              flex:1, padding:11, borderRadius:12,
              background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.2)",
              color:"rgba(239,68,68,0.7)", fontFamily:"'Noto Sans Georgian',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            }}><IconTrash size={13}/> წაშლა</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Submission Row */
/* ─────────────────────────────────────────────── */
function SubmissionRow({ sub, onView, onConfirm, onReject, onEdit, onDelete, idx }) {
  const sc = STATUS_CONFIG[sub.status] || STATUS_CONFIG.pending;
  const dateStr = sub.date || sub.created_at;

  return (
    <div className="ap-row ap-row-grid" style={{
      display:"grid",
      gridTemplateColumns:"2fr 1fr 1.4fr 0.9fr 0.8fr 1fr",
      alignItems:"center", gap:12,
      padding:"14px 20px",
      borderBottom:"1px solid rgba(255,255,255,0.05)",
      animation:`rowIn 0.45s ease forwards ${Math.min(idx*0.05, 0.4)}s`,
      opacity:0,
    }}>
      {/* Name */}
      <div style={{ display:"flex", flexDirection:"column", gap:3, minWidth:0 }}>
        <span style={{ fontSize:13.5, fontWeight:700, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sub.name}</span>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sub.message?.slice(0,60)}…</span>
      </div>

      {/* Phone */}
      <span className="ap-col-phone" style={{ fontSize:12, color:"rgba(255,255,255,0.55)", fontVariantNumeric:"tabular-nums" }}>{sub.phone}</span>

      {/* Specialist */}
      <span className="ap-col-specialist" style={{ fontSize:12, color: sub.specialist ? "rgba(245,166,35,0.8)" : "rgba(255,255,255,0.2)", fontStyle: sub.specialist ? "normal":"italic", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        {sub.specialist || "გაუნაწილებელი"}
      </span>

      {/* Date */}
      <div className="ap-col-time" style={{ display:"flex", flexDirection:"column", gap:2 }}>
        <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.55)", fontVariantNumeric:"tabular-nums" }}>{formatDate(dateStr)}</span>
        <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)" }}>{timeAgo(dateStr)}</span>
      </div>

      {/* Status */}
      <span style={{
        display:"inline-flex", alignItems:"center", gap:5,
        padding:"4px 10px", borderRadius:40, fontSize:10, fontWeight:700,
        background:sc.bg, border:`1px solid ${sc.border}`, color:sc.color, whiteSpace:"nowrap",
      }}>
        <span style={{ width:5, height:5, borderRadius:"50%", background:sc.dot, flexShrink:0 }} />
        {sc.label}
      </span>

      {/* Actions */}
      <div className="ap-action-btns" style={{ display:"flex", gap:5, justifyContent:"flex-end" }}>
        {/* View */}
        <button onClick={()=>onView(sub)} className="ap-icon-btn" style={{ width:30, height:30, background:"rgba(58,123,213,0.12)", border:"1px solid rgba(58,123,213,0.25)", color:"#4DA6FF" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(58,123,213,0.25)";e.currentTarget.style.transform="scale(1.1)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(58,123,213,0.12)";e.currentTarget.style.transform="";}}
        ><IconEye size={13}/></button>

        {/* Edit */}
        <button onClick={()=>onEdit(sub)} className="ap-icon-btn" style={{ width:30, height:30, background:"rgba(245,166,35,0.1)", border:"1px solid rgba(245,166,35,0.25)", color:"#F5A623" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,166,35,0.22)";e.currentTarget.style.transform="scale(1.1)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(245,166,35,0.1)";e.currentTarget.style.transform="";}}
        ><IconEdit size={13}/></button>

        {/* Confirm (pending only) */}
        {sub.status === "pending" && (
          <button onClick={()=>onConfirm(sub.id)} className="ap-icon-btn" style={{ width:30, height:30, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.25)", color:"#10B981" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(16,185,129,0.25)";e.currentTarget.style.transform="scale(1.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(16,185,129,0.12)";e.currentTarget.style.transform="";}}
          ><IconCheck size={13}/></button>
        )}

        {/* Reject (pending only) */}
        {sub.status === "pending" && (
          <button onClick={()=>onReject(sub)} className="ap-icon-btn" style={{ width:30, height:30, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#EF4444" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.22)";e.currentTarget.style.transform="scale(1.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.1)";e.currentTarget.style.transform="";}}
          ><IconX size={13}/></button>
        )}

        {/* Delete */}
        <button onClick={()=>onDelete(sub)} className="ap-icon-btn" style={{ width:30, height:30, background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.15)", color:"rgba(239,68,68,0.55)" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.2)";e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.color="#EF4444";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.07)";e.currentTarget.style.transform="";e.currentTarget.style.color="rgba(239,68,68,0.55)";}}
        ><IconTrash size={13}/></button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Admin Panel */
/* ─────────────────────────────────────────────── */
function AdminPanel({ onLogout }) {
  const [submissions, setSubmissions]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  const [filter, setFilter]             = useState("all");
  const [search, setSearch]             = useState("");
  const [selected, setSelected]         = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [editTarget, setEditTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]               = useState(null);
  const [mounted, setMounted]           = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

 const fetchSubmissions = useCallback(async (silent = false) => {
  if (!silent) setLoading(true); else setRefreshing(true);
  
  const [{ data, error }, { data: delData }] = await Promise.all([
    supabase.from("submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("deleted_count").select("count").single(),
  ]);
  
  if (!error && data) setSubmissions(data);
  if (delData) setDeletedCount(delData.count);
  
  setLoading(false);
  setRefreshing(false);
}, []);

  useEffect(() => {
    fetchSubmissions();
    setTimeout(() => setMounted(true), 60);
    const channel = supabase
      .channel("submissions-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "submissions" }, () => {
        fetchSubmissions(true);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchSubmissions]);

  /* ── Handlers ── */
  const handleConfirm = useCallback(async (id) => {
    await supabase.from("submissions").update({ status: "confirmed" }).eq("id", id);
    fetchSubmissions(true);
    setSelected(null);
    showToast("განაცხადი წარმატებით დადასტურდა ✓");
  }, [fetchSubmissions, showToast]);

  const handleRejectFinal = useCallback(async (reason) => {
    await supabase.from("submissions").update({ status: "rejected", rejectReason: reason || null }).eq("id", rejectTarget.id);
    setRejectTarget(null);
    setSelected(null);
    fetchSubmissions(true);
    showToast("განაცხადი უარყოფილია", "error");
  }, [rejectTarget, fetchSubmissions, showToast]);

  const handleEditFinal = useCallback(async (status, reason) => {
    await supabase.from("submissions").update({
      status,
      rejectReason: reason || null,
    }).eq("id", editTarget.id);
    setEditTarget(null);
    setSelected(null);
    fetchSubmissions(true);
    showToast("სტატუსი წარმატებით განახლდა ✓");
  }, [editTarget, fetchSubmissions, showToast]);

  const handleDeleteFinal = useCallback(async () => {
  await supabase.from("submissions").delete().eq("id", deleteTarget.id);
  
  // counter გაზარდე ბაზაში
  await supabase.rpc("increment_deleted_count");
  setDeletedCount(prev => prev + 1);
  setDeleteTarget(null);
  setSelected(null);
  fetchSubmissions(true);
  showToast("განაცხადი წაშლილია", "error");
}, [deleteTarget, fetchSubmissions, showToast]);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const filtered = submissions.filter(s => {
    const matchF = filter === "all" || s.status === filter;
    const q = search.toLowerCase();
    const matchS = !q || (s.name||"").toLowerCase().includes(q) || (s.phone||"").includes(q) || (s.specialist||"").toLowerCase().includes(q);
    return matchF && matchS;
  });

  const stats = {
  total:     submissions.length,
  pending:   submissions.filter(s => s.status === "pending").length,
  confirmed: submissions.filter(s => s.status === "confirmed").length,
  rejected:  submissions.filter(s => s.status === "rejected").length,
  deleted:   deletedCount, 
};

  const STAT_CARDS = [
    { label:"სულ განაცხადი",  value:stats.total,     key:"all",       color:"#3A7BD5", bg:"rgba(58,123,213,0.1)",  border:"rgba(58,123,213,0.2)",  icon:<IconMsg size={16}/> },
    { label:"მოლოდინში",      value:stats.pending,   key:"pending",   color:"#F59E0B", bg:"rgba(245,158,11,0.1)",  border:"rgba(245,158,11,0.2)",  icon:<IconClock size={16}/> },
    { label:"დადასტურებული",  value:stats.confirmed, key:"confirmed", color:"#10B981", bg:"rgba(16,185,129,0.1)",  border:"rgba(16,185,129,0.2)",  icon:<IconCheck size={16}/> },
    { label:"უარყოფილი",      value:stats.rejected,  key:"rejected",  color:"#EF4444", bg:"rgba(239,68,68,0.1)",   border:"rgba(239,68,68,0.2)",   icon:<IconX size={16}/> },
{ label:"წაშლილი (სეს.)", value:deletedCount, key:"all", color:"#6B7280", bg:"rgba(107,114,128,0.1)", border:"rgba(107,114,128,0.2)", icon:<IconTrash size={16}/> }  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#060F20 0%,#08172E 50%,#060E1C 100%)", fontFamily:"'Noto Sans Georgian',sans-serif", color:"#E2E8F0" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Top Bar */}
      <div style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(6,15,32,0.92)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        padding:"0 28px", height:60,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        opacity:mounted?1:0, transform:mounted?"none":"translateY(-10px)",
        transition:"all 0.5s ease",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:"rgba(245,166,35,0.1)", border:"1px solid rgba(245,166,35,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#F5A623" strokeWidth="1.5"/><path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#F5A623" strokeWidth="2"/><circle cx="20" cy="24" r="4" fill="#F5A623"/></svg>
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>ადმინ პანელი</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em" }}>Irma Khvichia Rehab Center</div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 12px", background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:40 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", animation:"pulse 2s ease infinite" }} />
            <span style={{ fontSize:10, fontWeight:700, color:"rgba(16,185,129,0.8)" }}>Live</span>
          </div>
          {stats.pending > 0 && (
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:40 }}>
              <IconBell size={13} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F59E0B" }}>{stats.pending} მოლოდინში</span>
            </div>
          )}
          <button onClick={() => fetchSubmissions(true)} className="ap-icon-btn" style={{ width:34, height:34, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)" }}>
            <span style={{ display:"flex", animation: refreshing ? "spin 0.7s linear infinite" : "none" }}>
              <IconRefresh size={14}/>
            </span>
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 14px 6px 8px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:40 }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#3A7BD5,#1A3460)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <IconUser size={12}/>
            </div>
            <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.7)" }}>ადმინი</span>
          </div>
          <button onClick={handleLogout} className="ap-icon-btn" style={{ width:34, height:34, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:"rgba(239,68,68,0.7)" }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(239,68,68,0.18)";e.currentTarget.style.color="#EF4444";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(239,68,68,0.08)";e.currentTarget.style.color="rgba(239,68,68,0.7)";}}
          ><IconLogout size={14}/></button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"28px 28px 60px" }}>

        {/* Stats */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28,
          opacity:mounted?1:0, transform:mounted?"none":"translateY(20px)", transition:"all 0.6s ease 0.1s",
        }}>
          {STAT_CARDS.map((s, i) => (
            <div key={i} className="ap-stat" onClick={() => setFilter(s.key)} style={{
              padding:"18px 20px", background:s.bg, border:`1px solid ${s.border}`, borderRadius:16,
              position:"relative", overflow:"hidden",
              boxShadow: filter === s.key ? `0 0 0 1.5px ${s.color}` : "none",
            }}>
              <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:`radial-gradient(circle,${s.color}22 0%,transparent 70%)`, pointerEvents:"none" }} />
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${s.color}22`, border:`1px solid ${s.color}44`, display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>{s.icon}</div>
                {s.key === "pending" && stats.pending > 0 && <span style={{ width:8, height:8, borderRadius:"50%", background:"#F59E0B", animation:"pulse 2s ease infinite" }} />}
              </div>
              <div style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1, letterSpacing:"-0.03em" }}>
                {loading ? <span style={{ display:"inline-block", width:40, height:28, background:"rgba(255,255,255,0.08)", borderRadius:6, animation:"pulse 1.5s ease infinite" }} /> : s.value}
              </div>
              <div style={{ fontSize:10, fontWeight:700, color:`${s.color}cc`, marginTop:4, letterSpacing:"0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{
          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden",
          opacity:mounted?1:0, transform:mounted?"none":"translateY(20px)", transition:"all 0.6s ease 0.2s",
        }}>
          <div style={{ height:2, background:"linear-gradient(90deg,transparent,#F5A623,#FFD166,transparent)" }} />

          {/* Toolbar */}
          <div style={{ padding:"18px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <h2 style={{ fontSize:15, fontWeight:900, color:"#fff", letterSpacing:"-0.02em" }}>განაცხადები</h2>
              {filtered.length !== submissions.length && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:40, background:"rgba(245,166,35,0.12)", color:"#F5A623", fontWeight:700 }}>{filtered.length} / {submissions.length}</span>}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)", pointerEvents:"none" }}><IconSearch size={13}/></span>
                <input
                  placeholder="სახელი, ტელ, სპეციალისტი..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="ap-input"
                  style={{ paddingLeft:30, paddingRight:12, paddingTop:8, paddingBottom:8, border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, background:"rgba(255,255,255,0.04)", fontSize:12, width:200, transition:"all 0.2s ease" }}
                  onFocus={e=>{e.target.style.width="240px";}}
                  onBlur={e=>{e.target.style.width="200px";}}
                />
              </div>
              <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:3 }}>
                {[
                  { key:"all",       label:"ყველა"   },
                  { key:"pending",   label:"მოლოდინი" },
                  { key:"confirmed", label:"დადასტ."  },
                  { key:"rejected",  label:"უარყ."    },
                  { key:"deleted", label:"წაშლილი" },
                ].map(f => (
                  <button key={f.key} className={`ap-tab ${filter===f.key ? `active-${f.key}` : ""}`} onClick={()=>setFilter(f.key)}>{f.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Table head */}
          <div className="ap-table-header" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1.4fr 0.9fr 0.8fr 1fr", gap:12, padding:"10px 20px", background:"rgba(0,0,0,0.2)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            {["სახელი / შეტყობინება","ტელეფონი","სპეციალისტი","თარიღი","სტატუსი","მოქმედება"].map((h,i)=>(
              <span key={i} className={i===2?"ap-col-specialist":i===3?"ap-col-time":i===1?"ap-col-phone":""} style={{ fontSize:9, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", textAlign:i===5?"right":"left" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div>
            {loading ? (
              Array.from({length:4}).map((_,i)=>(
                <div key={i} style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:16, alignItems:"center" }}>
                  {[200,100,140,90,80,80].map((w,j)=>(
                    <div key={j} style={{ height:16, width:w, maxWidth:"100%", background:"rgba(255,255,255,0.06)", borderRadius:6, animation:`pulse ${1.2+j*0.1}s ease infinite` }} />
                  ))}
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div style={{ padding:"48px 24px", textAlign:"center", color:"rgba(255,255,255,0.25)", fontSize:13 }}>
                <div style={{ marginBottom:12 }}><IconMsg size={28}/></div>
                <p>განაცხადი ვერ მოიძებნა</p>
              </div>
            ) : filtered.map((sub, idx) => (
              <SubmissionRow key={sub.id} sub={sub} idx={idx}
                onView={setSelected}
                onConfirm={handleConfirm}
                onReject={setRejectTarget}
                onEdit={setEditTarget}
                onDelete={setDeleteTarget}
              />
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>ნაჩვენებია {filtered.length} სულ {submissions.length}-დან</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>ბოლო განახლება: {formatTime(new Date().toISOString())}</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", top:72, right:24, zIndex:3000,
          display:"flex", alignItems:"center", gap:10, padding:"12px 18px",
          background: toast.type==="error" ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
          border:`1px solid ${toast.type==="error" ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)"}`,
          backdropFilter:"blur(20px)", borderRadius:14,
          color: toast.type==="error" ? "#FCA5A5" : "#6EE7B7",
          fontSize:13, fontWeight:700, animation:"toastIn 0.4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
        }}>
          {toast.type==="error" ? <IconTrash size={14}/> : <IconCheck size={14}/>}
          {toast.msg}
        </div>
      )}

      {/* Detail Drawer */}
      {selected && (
        <DetailDrawer
          submission={selected}
          onClose={() => setSelected(null)}
          onConfirm={() => handleConfirm(selected.id)}
          onReject={() => setRejectTarget(selected)}
          onEdit={() => setEditTarget(selected)}
          onDelete={() => setDeleteTarget(selected)}
        />
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <RejectModal submission={rejectTarget}
          onConfirm={handleRejectFinal}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      {/* Edit Modal */}
      {editTarget && (
        <EditModal submission={editTarget}
          onConfirm={handleEditFinal}
          onCancel={() => setEditTarget(null)}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal submission={deleteTarget}
          onConfirm={handleDeleteFinal}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/* Root */
/* ─────────────────────────────────────────────── */
export default function AdminRoot() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setLoggedIn(true);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) return (
    <div style={{ minHeight:"100vh", background:"#060F20", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{GLOBAL_STYLES}</style>
      <span style={{ width:28, height:28, border:"3px solid rgba(245,166,35,0.2)", borderTopColor:"#F5A623", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"block" }} />
    </div>
  );

  return loggedIn
    ? <AdminPanel onLogout={() => setLoggedIn(false)} />
    : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}