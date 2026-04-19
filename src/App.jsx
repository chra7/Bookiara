import { useState, useEffect } from “react”;
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = “https://zhkurihcjivwlfvuxnms.supabase.co”;
const SUPABASE_ANON_KEY = “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpoa3VyaWhjaml2d2xmdnV4bm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1ODQ1NjgsImV4cCI6MjA5MjE2MDU2OH0.1PxlxOS5U7PkHQYkX7_hH5gBmm9_C2fnSnjBn2o9K54”;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PASTEL = {
rose: “#FFB7C5”, roseDark: “#F4829A”, rosePale: “#FFE4EC”, roseDeep: “#E8607A”,
cream: “#FFF5F8”, lilac: “#F5C6D8”, mint: “#C8F0E8”, gold: “#FFE0A3”,
text: “#5C2D3E”, textLight: “#9B6B7C”, white: “#FFFFFF”,
};

const HELLO_KITTY_STAGES = [
{ min: 0, max: 499, label: “Bébé 🍼”, size: 48, emoji: “🐱” },
{ min: 500, max: 999, label: “Petit chaton 🌸”, size: 60, emoji: “😸” },
{ min: 1000, max: 2499, label: “Chaton kawaii ✨”, size: 74, emoji: “😻” },
{ min: 2500, max: 4999, label: “Hello Kitty junior 💖”, size: 88, emoji: “🎀” },
{ min: 5000, max: 9999, label: “Hello Kitty star ⭐”, size: 100, emoji: “👑” },
{ min: 10000, max: Infinity, label: “Hello Kitty légendaire 🌈”, size: 120, emoji: “🦄” },
];

const STICKERS = [“🎉”, “💖”, “✨”, “🌸”, “🎀”, “⭐”, “🦋”, “🌈”, “💫”, “🍓”, “🎊”, “💝”];

function FloatingSticker({ sticker, onDone }) {
useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);
return <div style={{ position: “fixed”, top: “50%”, left: “50%”, transform: “translate(-50%,-50%)”, fontSize: 80, zIndex: 9999, animation: “floatUp 2s ease forwards”, pointerEvents: “none” }}>{sticker}</div>;
}

function HelloKitty({ totalRevenue }) {
const stage = HELLO_KITTY_STAGES.find(s => totalRevenue >= s.min && totalRevenue <= s.max) || HELLO_KITTY_STAGES[0];
const nextStage = HELLO_KITTY_STAGES[HELLO_KITTY_STAGES.indexOf(stage) + 1];
const progress = nextStage ? ((totalRevenue - stage.min) / (nextStage.min - stage.min)) * 100 : 100;
return (
<div style={{ textAlign: “center”, padding: “16px 0” }}>
<div style={{ fontSize: stage.size, lineHeight: 1, marginBottom: 8, transition: “font-size 0.5s” }}>{stage.emoji}</div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 13, fontWeight: 700 }}>{stage.label}</div>
{nextStage && (
<div style={{ marginTop: 8 }}>
<div style={{ fontSize: 11, color: PASTEL.textLight, marginBottom: 4 }}>Prochain palier : {nextStage.min}€</div>
<div style={{ background: PASTEL.lilac, borderRadius: 99, height: 8, overflow: “hidden”, width: 120, margin: “0 auto” }}>
<div style={{ background: `linear-gradient(90deg, ${PASTEL.roseDark}, ${PASTEL.roseDeep})`, height: “100%”, width: `${progress}%`, borderRadius: 99, transition: “width 0.6s ease” }} />
</div>
</div>
)}
</div>
);
}

function Modal({ title, onClose, children }) {
return (
<div style={{ position: “fixed”, inset: 0, background: “rgba(92,45,62,0.18)”, zIndex: 500, display: “flex”, alignItems: “center”, justifyContent: “center”, backdropFilter: “blur(4px)” }} onClick={onClose}>
<div style={{ background: PASTEL.white, borderRadius: 24, padding: 28, maxWidth: 480, width: “90%”, boxShadow: “0 20px 60px rgba(244,130,154,0.25)”, maxHeight: “90vh”, overflowY: “auto” }} onClick={e => e.stopPropagation()}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 20 }}>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, margin: 0, fontSize: 20 }}>{title}</h2>
<button onClick={onClose} style={{ background: PASTEL.rosePale, border: “none”, borderRadius: 50, width: 32, height: 32, cursor: “pointer”, fontSize: 16, color: PASTEL.roseDeep }}>✕</button>
</div>
{children}
</div>
</div>
);
}

function Input({ label, value, onChange, type = “text”, placeholder }) {
return (
<div style={{ marginBottom: 14 }}>
<label style={{ fontSize: 12, color: PASTEL.textLight, fontFamily: “‘Playfair Display’, serif”, fontWeight: 600, display: “block”, marginBottom: 4 }}>{label}</label>
<input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
style={{ width: “100%”, padding: “10px 14px”, borderRadius: 12, border: `1.5px solid ${PASTEL.lilac}`, background: PASTEL.cream, color: PASTEL.text, fontFamily: “inherit”, fontSize: 14, outline: “none”, boxSizing: “border-box” }}
onFocus={e => e.target.style.borderColor = PASTEL.roseDark}
onBlur={e => e.target.style.borderColor = PASTEL.lilac}
/>
</div>
);
}

function PinkButton({ onClick, children, secondary, small, disabled }) {
return (
<button onClick={onClick} disabled={disabled} style={{
background: disabled ? PASTEL.lilac : secondary ? PASTEL.rosePale : `linear-gradient(135deg, ${PASTEL.rose}, ${PASTEL.roseDeep})`,
color: secondary ? PASTEL.roseDeep : PASTEL.white, border: “none”, borderRadius: 12,
padding: small ? “8px 16px” : “12px 24px”, fontFamily: “‘Playfair Display’, serif”, fontWeight: 700,
fontSize: small ? 12 : 14, cursor: disabled ? “not-allowed” : “pointer”,
boxShadow: secondary || disabled ? “none” : “0 4px 16px rgba(244,130,154,0.35)”,
}}>{children}</button>
);
}

// –– AUTH ––
function AuthScreen() {
const [mode, setMode] = useState(“login”);
const [email, setEmail] = useState(””);
const [password, setPassword] = useState(””);
const [pseudo, setPseudo] = useState(””);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(””);
const [success, setSuccess] = useState(””);

const handleSubmit = async () => {
setError(””); setSuccess(””); setLoading(true);
try {
if (mode === “signup”) {
const { error } = await supabase.auth.signUp({ email, password, options: { data: { pseudo } } });
if (error) throw error;
setSuccess(“Compte créé ! Vérifie tes emails pour confirmer 🌸”);
} else {
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) throw error;
}
} catch (e) {
setError(e.message === “Invalid login credentials” ? “Email ou mot de passe incorrect 😢” : e.message);
}
setLoading(false);
};

return (
<div style={{ minHeight: “100vh”, background: `linear-gradient(135deg, ${PASTEL.rosePale} 0%, ${PASTEL.cream} 50%, ${PASTEL.lilac} 100%)`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontFamily: “‘Lato’, sans-serif”, padding: 24 }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600&display=swap'); @keyframes fadeIn { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }`}</style>
<div style={{ textAlign: “center”, animation: “fadeIn 0.6s ease”, width: “100%”, maxWidth: 380 }}>
<div style={{ fontSize: 64, marginBottom: 12 }}>🎀</div>
<h1 style={{ fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 34, margin: “0 0 6px” }}>Bookiara</h1>
<p style={{ color: PASTEL.textLight, marginBottom: 28, fontSize: 14 }}>Ton espace de revente coquette 💖</p>
<div style={{ background: PASTEL.white, borderRadius: 24, padding: 28, boxShadow: “0 20px 60px rgba(244,130,154,0.2)” }}>
<div style={{ display: “flex”, background: PASTEL.rosePale, borderRadius: 12, padding: 4, marginBottom: 20 }}>
{[“login”, “signup”].map(m => (
<button key={m} onClick={() => { setMode(m); setError(””); setSuccess(””); }}
style={{ flex: 1, padding: “8px”, borderRadius: 10, border: “none”, cursor: “pointer”, fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, fontSize: 13, background: mode === m ? PASTEL.white : “transparent”, color: mode === m ? PASTEL.roseDeep : PASTEL.textLight, boxShadow: mode === m ? “0 2px 8px rgba(244,130,154,0.2)” : “none” }}>
{m === “login” ? “Se connecter” : “S’inscrire”}
</button>
))}
</div>
{mode === “signup” && <Input label="Ton prénom 🌸" value={pseudo} onChange={setPseudo} placeholder="ex: Sophie" />}
<Input label="Email" value={email} onChange={setEmail} type="email" placeholder="ton@email.com" />
<Input label="Mot de passe" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
{error && <div style={{ background: “#FFF0F0”, border: “1px solid #FFB7B7”, borderRadius: 10, padding: “10px 14px”, fontSize: 13, color: “#C0392B”, marginBottom: 14 }}>⚠️ {error}</div>}
{success && <div style={{ background: “#F0FFF4”, border: “1px solid #A8E6CF”, borderRadius: 10, padding: “10px 14px”, fontSize: 13, color: “#2D7A6B”, marginBottom: 14 }}>✅ {success}</div>}
<PinkButton onClick={handleSubmit} disabled={loading}>{loading ? “Chargement. . .” : mode === “login” ? “Se connecter ✨” : “Créer mon compte 🌸”}</PinkButton>
</div>
</div>
</div>
);
}

// –– SETUP (SQL instructions) ––
function SetupScreen() {
const sql = `create table sales ( id uuid default gen_random_uuid() primary key, user_id uuid references auth.users, article text, sold_price float, buy_price float, profit float, partners int, per_person float, date text, created_at timestamptz default now() ); create table stock ( id uuid default gen_random_uuid() primary key, user_id uuid references auth.users, article text, buy_price float, target_price float, note text, created_at timestamptz default now() ); create table expenses ( id uuid default gen_random_uuid() primary key, user_id uuid references auth.users, label text, amount float, category text, date text, created_at timestamptz default now() ); create table projects ( id uuid default gen_random_uuid() primary key, user_id uuid references auth.users, name text, goal float, saved float default 0, emoji text, created_at timestamptz default now() ); alter table sales enable row level security; alter table stock enable row level security; alter table expenses enable row level security; alter table projects enable row level security; create policy "own" on sales for all using (auth.uid() = user_id); create policy "own" on stock for all using (auth.uid() = user_id); create policy "own" on expenses for all using (auth.uid() = user_id); create policy "own" on projects for all using (auth.uid() = user_id);`;

const [copied, setCopied] = useState(false);
const copy = () => { navigator.clipboard.writeText(sql); setCopied(true); setTimeout(() => setCopied(false), 2000); };

return (
<div style={{ minHeight: “100vh”, background: `linear-gradient(135deg, ${PASTEL.rosePale}, ${PASTEL.cream})`, display: “flex”, alignItems: “center”, justifyContent: “center”, fontFamily: “‘Lato’, sans-serif”, padding: 24 }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');`}</style>
<div style={{ background: PASTEL.white, borderRadius: 24, padding: 28, maxWidth: 520, boxShadow: “0 20px 60px rgba(244,130,154,0.2)” }}>
<div style={{ fontSize: 48, textAlign: “center”, marginBottom: 12 }}>⚙️</div>
<h2 style={{ fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, textAlign: “center”, marginBottom: 12, fontSize: 20 }}>Une dernière étape !</h2>
<p style={{ color: PASTEL.textLight, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
Tu dois créer les tables dans Supabase. Voici comment :
</p>
<ol style={{ color: PASTEL.text, fontSize: 13, lineHeight: 2, paddingLeft: 20, marginBottom: 16 }}>
<li>Va sur <strong>supabase.com</strong> → ton projet <strong>bookiara</strong></li>
<li>Clique sur <strong>SQL Editor</strong> dans le menu gauche</li>
<li>Clique sur <strong>New query</strong></li>
<li>Colle le code ci-dessous et clique <strong>Run</strong></li>
<li>Reviens ici et recharge la page 🌸</li>
</ol>
<div style={{ position: “relative” }}>
<pre style={{ background: PASTEL.cream, borderRadius: 12, padding: 14, fontSize: 10.5, overflowX: “auto”, color: PASTEL.text, lineHeight: 1.6, margin: 0 }}>{sql}</pre>
<button onClick={copy} style={{ position: “absolute”, top: 8, right: 8, background: copied ? PASTEL.mint : PASTEL.rosePale, border: “none”, borderRadius: 8, padding: “5px 12px”, cursor: “pointer”, fontSize: 12, color: copied ? “#2D7A6B” : PASTEL.roseDeep, fontWeight: 700 }}>
{copied ? “Copié ✓” : “Copier”}
</button>
</div>
<div style={{ marginTop: 16, textAlign: “center” }}>
<PinkButton onClick={() => window.location.reload()}>J’ai terminé, recharger 🌸</PinkButton>
</div>
</div>
</div>
);
}

// –– DASHBOARD ––
function Dashboard({ userId }) {
const [stats, setStats] = useState({ revenue: 0, expenses: 0, stock: 0, sales: 0 });
useEffect(() => {
Promise.all([
supabase.from(“sales”).select(“profit”).eq(“user_id”, userId),
supabase.from(“expenses”).select(“amount”).eq(“user_id”, userId),
supabase.from(“stock”).select(“id”, { count: “exact” }).eq(“user_id”, userId),
]).then(([s, e, st]) => setStats({ revenue: (s.data||[]).reduce((a,x)=>a+x.profit,0), expenses: (e.data||[]).reduce((a,x)=>a+x.amount,0), stock: st.count||0, sales: (s.data||[]).length }));
}, [userId]);
const net = stats.revenue - stats.expenses;
return (
<div>
<div style={{ textAlign: “center”, marginBottom: 20 }}><HelloKitty totalRevenue={stats.revenue} /></div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 12 }}>
{[{ label: “Revenus nets”, value: `${stats.revenue.toFixed(2)}€`, color: “#5BA85A”, emoji: “💚”, bg: “#F0FFF4” }, { label: “Dépenses”, value: `${stats.expenses.toFixed(2)}€`, color: “#E85A5A”, emoji: “💸”, bg: “#FFF5F5” }, { label: “Solde net”, value: `${net.toFixed(2)}€`, color: net >= 0 ? “#5BA85A” : “#E85A5A”, emoji: “🏦”, bg: PASTEL.cream }, { label: “Stock en attente”, value: `${stats.stock} articles`, color: PASTEL.roseDark, emoji: “📦”, bg: PASTEL.rosePale }].map(c => (
<div key={c.label} style={{ background: c.bg, borderRadius: 18, padding: “16px 14px”, textAlign: “center”, border: `1px solid ${PASTEL.lilac}` }}>
<div style={{ fontSize: 28, marginBottom: 4 }}>{c.emoji}</div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: c.color, fontSize: 18 }}>{c.value}</div>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>{c.label}</div>
</div>
))}
</div>
</div>
);
}

// –– SALES ––
function SalesSection({ userId, partnerCount, triggerSticker }) {
const [sales, setSales] = useState([]);
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({ article: “”, soldPrice: “”, buyPrice: “”, date: new Date().toISOString().slice(0,10), partners: “” });

useEffect(() => {
supabase.from(“sales”).select(”*”).eq(“user_id”, userId).order(“created_at”, { ascending: false }).then(({ data }) => { if (data) setSales(data); setLoading(false); });
}, [userId]);

const handleAdd = async () => {
if (!form.article || !form.soldPrice || !form.buyPrice) return;
const sold = parseFloat(form.soldPrice), bought = parseFloat(form.buyPrice);
const profit = sold - bought, partners = parseInt(form.partners) || partnerCount;
const { data } = await supabase.from(“sales”).insert({ user_id: userId, article: form.article, sold_price: sold, buy_price: bought, profit, partners, per_person: profit/partners, date: form.date }).select().single();
if (data) setSales(p => [data, . . .p]);
triggerSticker();
setModal(false);
setForm({ article: “”, soldPrice: “”, buyPrice: “”, date: new Date().toISOString().slice(0,10), partners: “” });
};

const totalRevenue = sales.reduce((a,s) => a+s.profit, 0);
const topItem = sales.length > 0 ? sales.reduce((a,b) => a.profit > b.profit ? a : b) : null;
const articleCount = {};
sales.forEach(s => { articleCount[s.article] = (articleCount[s.article]||0)+1; });
const mostSold = Object.entries(articleCount).sort((a,b) => b[1]-a[1])[0];

return (
<div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr 1fr”, gap: 12, marginBottom: 20 }}>
{[{ label: “Bénéfice total”, value: `${totalRevenue.toFixed(2)}€`, emoji: “💰” }, { label: “Ventes”, value: sales.length, emoji: “🛍️” }, { label: “Meilleure vente”, value: topItem ? `${topItem.profit.toFixed(0)}€` : “—”, emoji: “⭐” }].map(c => (
<div key={c.label} style={{ background: PASTEL.cream, borderRadius: 16, padding: “14px 12px”, textAlign: “center”, border: `1px solid ${PASTEL.lilac}` }}>
<div style={{ fontSize: 24 }}>{c.emoji}</div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: PASTEL.roseDeep, fontSize: 18 }}>{c.value}</div>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>{c.label}</div>
</div>
))}
</div>
{mostSold && <div style={{ background: `linear-gradient(135deg, ${PASTEL.rosePale}, ${PASTEL.cream})`, borderRadius: 16, padding: “12px 16px”, marginBottom: 16, border: `1px solid ${PASTEL.rose}` }}>
<span style={{ fontSize: 12, color: PASTEL.textLight }}>🏆 Article le plus vendu : </span>
<strong style={{ color: PASTEL.roseDeep, fontFamily: “‘Playfair Display’, serif” }}>{mostSold[0]}</strong>
<span style={{ fontSize: 12, color: PASTEL.textLight }}> × {mostSold[1]}</span>
</div>}
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 12 }}>
<h3 style={{ margin: 0, fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 16 }}>Mes ventes</h3>
<PinkButton onClick={() => setModal(true)} small>+ Ajouter une vente</PinkButton>
</div>
{loading && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight }}>Chargement. . . 🌸</div>}
{!loading && sales.length === 0 && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight, fontSize: 13 }}>🌸 Aucune vente pour l’instant !</div>}
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{sales.map(s => (
<div key={s.id} style={{ background: PASTEL.white, borderRadius: 16, padding: “14px 16px”, border: `1px solid ${PASTEL.lilac}`, display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: PASTEL.text, fontSize: 15 }}>{s.article}</div>
<div style={{ fontSize: 11, color: PASTEL.textLight, marginTop: 2 }}>Acheté {s.buy_price}€ → Vendu {s.sold_price}€ · {s.date}</div>
{s.partners > 1 && <div style={{ fontSize: 11, color: PASTEL.roseDark, marginTop: 2 }}>👯 {s.partners} pers. · {s.per_person?.toFixed(2)}€ chacune</div>}
</div>
<div style={{ textAlign: “right” }}>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: s.profit >= 0 ? “#5BA85A” : “#E85A5A”, fontSize: 18 }}>{s.profit >= 0 ? “+” : “”}{s.profit.toFixed(2)}€</div>
<div style={{ fontSize: 10, color: PASTEL.textLight }}>bénéfice</div>
</div>
</div>
))}
</div>
{modal && (
<Modal title=“🛍️ Nouvelle vente” onClose={() => setModal(false)}>
<Input label=“Article vendu” value={form.article} onChange={v => setForm(p=>({. . .p,article:v}))} placeholder=“ex: Sac Longchamp” />
<Input label=“Prix de vente (€)” value={form.soldPrice} onChange={v => setForm(p=>({. . .p,soldPrice:v}))} type=“number” placeholder=“0” />
<Input label=“Prix d’achat (€)” value={form.buyPrice} onChange={v => setForm(p=>({. . .p,buyPrice:v}))} type=“number” placeholder=“0” />
<Input label=“Date” value={form.date} onChange={v => setForm(p=>({. . .p,date:v}))} type=“date” />
<Input label=“Nombre de personnes” value={form.partners} onChange={v => setForm(p=>({. . .p,partners:v}))} type=“number” placeholder={`${partnerCount} (défaut)`} />
{form.soldPrice && form.buyPrice && (
<div style={{ background: PASTEL.rosePale, borderRadius: 12, padding: “10px 14px”, marginBottom: 14, fontSize: 13 }}>
💸 Bénéfice : <strong style={{ color: PASTEL.roseDeep }}>{(parseFloat(form.soldPrice||0)-parseFloat(form.buyPrice||0)).toFixed(2)}€</strong>
{(parseInt(form.partners)||partnerCount) > 1 && <span style={{ color: PASTEL.textLight }}> · {((parseFloat(form.soldPrice||0)-parseFloat(form.buyPrice||0))/(parseInt(form.partners)||partnerCount)).toFixed(2)}€/pers.</span>}
</div>
)}
<PinkButton onClick={handleAdd}>Enregistrer ✨</PinkButton>
</Modal>
)}
</div>
);
}

// –– STOCK ––
function StockSection({ userId, triggerSticker }) {
const [stock, setStock] = useState([]);
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({ article: “”, buyPrice: “”, targetPrice: “”, note: “” });

useEffect(() => {
supabase.from(“stock”).select(”*”).eq(“user_id”, userId).order(“created_at”, { ascending: false }).then(({ data }) => { if (data) setStock(data); setLoading(false); });
}, [userId]);

const handleAdd = async () => {
if (!form.article) return;
const { data } = await supabase.from(“stock”).insert({ user_id: userId, article: form.article, buy_price: parseFloat(form.buyPrice)||0, target_price: parseFloat(form.targetPrice)||0, note: form.note }).select().single();
if (data) setStock(p => [data, . . .p]);
setModal(false);
setForm({ article: “”, buyPrice: “”, targetPrice: “”, note: “” });
};

const handleSold = async (id) => {
await supabase.from(“stock”).delete().eq(“id”, id);
setStock(p => p.filter(s => s.id !== id));
triggerSticker();
};

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 16 }}>
<div>
<h3 style={{ margin: 0, fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 16 }}>Mon stock</h3>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>{stock.length} article(s) à vendre</div>
</div>
<PinkButton onClick={() => setModal(true)} small>+ Ajouter au stock</PinkButton>
</div>
{loading && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight }}>Chargement. . . 🌸</div>}
{!loading && stock.length === 0 && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight, fontSize: 13 }}>🌷 Ton stock est vide !</div>}
<div style={{ display: “flex”, flexDirection: “column”, gap: 10 }}>
{stock.map(s => (
<div key={s.id} style={{ background: PASTEL.white, borderRadius: 16, padding: “14px 16px”, border: `1px solid ${PASTEL.lilac}`, display: “flex”, justifyContent: “space-between”, alignItems: “flex-start” }}>
<div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: PASTEL.text, fontSize: 15 }}>{s.article}</div>
<div style={{ fontSize: 11, color: PASTEL.textLight, marginTop: 2 }}>Acheté {s.buy_price}€ · Objectif {s.target_price}€</div>
{s.note && <div style={{ fontSize: 11, color: PASTEL.roseDark, marginTop: 2 }}>📝 {s.note}</div>}
</div>
<div style={{ display: “flex”, gap: 6, alignItems: “center”, flexShrink: 0, marginLeft: 8 }}>
<div style={{ background: PASTEL.gold, borderRadius: 99, padding: “3px 10px”, fontSize: 11, fontWeight: 700, color: “#8B6A00” }}>+{(s.target_price-s.buy_price).toFixed(0)}€</div>
<button onClick={() => handleSold(s.id)} style={{ background: PASTEL.mint, border: “none”, borderRadius: 10, padding: “5px 10px”, fontSize: 11, cursor: “pointer”, color: “#2D7A6B”, fontWeight: 700 }}>Vendu ✓</button>
</div>
</div>
))}
</div>
{modal && (
<Modal title=“📦 Ajouter au stock” onClose={() => setModal(false)}>
<Input label=“Article” value={form.article} onChange={v => setForm(p=>({. . .p,article:v}))} placeholder=“ex: Veste Zara” />
<Input label=“Prix d’achat (€)” value={form.buyPrice} onChange={v => setForm(p=>({. . .p,buyPrice:v}))} type=“number” placeholder=“0” />
<Input label=“Prix de vente cible (€)” value={form.targetPrice} onChange={v => setForm(p=>({. . .p,targetPrice:v}))} type=“number” placeholder=“0” />
<Input label=“Note (optionnel)” value={form.note} onChange={v => setForm(p=>({. . .p,note:v}))} placeholder=“ex: vendu sur Vinted” />
<PinkButton onClick={handleAdd}>Ajouter 🌸</PinkButton>
</Modal>
)}
</div>
);
}

// –– EXPENSES ––
function ExpensesSection({ userId }) {
const [expenses, setExpenses] = useState([]);
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({ label: “”, amount: “”, category: “Achats”, date: new Date().toISOString().slice(0,10) });
const cats = [“Achats”, “Transport”, “Emballage”, “Abonnement”, “Autre”];

useEffect(() => {
supabase.from(“expenses”).select(”*”).eq(“user_id”, userId).order(“created_at”, { ascending: false }).then(({ data }) => { if (data) setExpenses(data); setLoading(false); });
}, [userId]);

const handleAdd = async () => {
if (!form.label || !form.amount) return;
const { data } = await supabase.from(“expenses”).insert({ user_id: userId, label: form.label, amount: parseFloat(form.amount), category: form.category, date: form.date }).select().single();
if (data) setExpenses(p => [data, . . .p]);
setModal(false);
setForm({ label: “”, amount: “”, category: “Achats”, date: new Date().toISOString().slice(0,10) });
};

const total = expenses.reduce((a,e) => a+e.amount, 0);
const byCat = cats.map(c => ({ cat: c, total: expenses.filter(e => e.category===c).reduce((a,e)=>a+e.amount,0) })).filter(x => x.total > 0);

return (
<div>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 12, marginBottom: 16 }}>
<div style={{ background: PASTEL.cream, borderRadius: 16, padding: “14px 12px”, textAlign: “center”, border: `1px solid ${PASTEL.lilac}` }}>
<div style={{ fontSize: 24 }}>💸</div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: “#E85A5A”, fontSize: 20 }}>{total.toFixed(2)}€</div>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>Total dépenses</div>
</div>
<div style={{ background: PASTEL.cream, borderRadius: 16, padding: “14px 12px”, border: `1px solid ${PASTEL.lilac}` }}>
{byCat.map(c => <div key={c.cat} style={{ display: “flex”, justifyContent: “space-between”, fontSize: 12, marginBottom: 2 }}><span style={{ color: PASTEL.textLight }}>{c.cat}</span><span style={{ color: PASTEL.text, fontWeight: 600 }}>{c.total.toFixed(0)}€</span></div>)}
{byCat.length === 0 && <div style={{ fontSize: 12, color: PASTEL.textLight, textAlign: “center”, paddingTop: 8 }}>Aucune catégorie</div>}
</div>
</div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 12 }}>
<h3 style={{ margin: 0, fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 16 }}>Mes dépenses</h3>
<PinkButton onClick={() => setModal(true)} small>+ Ajouter</PinkButton>
</div>
{loading && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight }}>Chargement. . . 🌸</div>}
{!loading && expenses.length === 0 && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight, fontSize: 13 }}>🎀 Aucune dépense enregistrée !</div>}
<div style={{ display: “flex”, flexDirection: “column”, gap: 8 }}>
{expenses.map(e => (
<div key={e.id} style={{ background: PASTEL.white, borderRadius: 14, padding: “12px 16px”, border: `1px solid ${PASTEL.lilac}`, display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 600, color: PASTEL.text, fontSize: 14 }}>{e.label}</div>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>{e.category} · {e.date}</div>
</div>
<div style={{ color: “#E85A5A”, fontWeight: 700, fontFamily: “‘Playfair Display’, serif”, fontSize: 16 }}>-{e.amount.toFixed(2)}€</div>
</div>
))}
</div>
{modal && (
<Modal title=“💸 Nouvelle dépense” onClose={() => setModal(false)}>
<Input label=“Description” value={form.label} onChange={v => setForm(p=>({. . .p,label:v}))} placeholder=“ex: Achat sac Longchamp” />
<Input label=“Montant (€)” value={form.amount} onChange={v => setForm(p=>({. . .p,amount:v}))} type=“number” placeholder=“0” />
<div style={{ marginBottom: 14 }}>
<label style={{ fontSize: 12, color: PASTEL.textLight, fontFamily: “‘Playfair Display’, serif”, fontWeight: 600, display: “block”, marginBottom: 4 }}>Catégorie</label>
<select value={form.category} onChange={e => setForm(p=>({. . .p,category:e.target.value}))} style={{ width: “100%”, padding: “10px 14px”, borderRadius: 12, border: `1.5px solid ${PASTEL.lilac}`, background: PASTEL.cream, color: PASTEL.text, fontFamily: “inherit”, fontSize: 14, outline: “none”, boxSizing: “border-box” }}>
{cats.map(c => <option key={c}>{c}</option>)}
</select>
</div>
<Input label=“Date” value={form.date} onChange={v => setForm(p=>({. . .p,date:v}))} type=“date” />
<PinkButton onClick={handleAdd}>Enregistrer ✨</PinkButton>
</Modal>
)}
</div>
);
}

// –– PROJECTS ––
function ProjectsSection({ userId, triggerSticker }) {
const [projects, setProjects] = useState([]);
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({ name: “”, goal: “”, saved: “”, emoji: “🎯” });
const [addingId, setAddingId] = useState(null);
const [addAmt, setAddAmt] = useState(””);
const emojis = [“🎯”,“🚗”,“✈️”,“👜”,“🏠”,“💻”,“👠”,“🎉”,“💍”,“🌴”];

useEffect(() => {
supabase.from(“projects”).select(”*”).eq(“user_id”, userId).order(“created_at”, { ascending: false }).then(({ data }) => { if (data) setProjects(data); setLoading(false); });
}, [userId]);

const handleAdd = async () => {
if (!form.name || !form.goal) return;
const { data } = await supabase.from(“projects”).insert({ user_id: userId, name: form.name, goal: parseFloat(form.goal), saved: parseFloat(form.saved)||0, emoji: form.emoji }).select().single();
if (data) setProjects(p => [data, . . .p]);
setModal(false);
setForm({ name: “”, goal: “”, saved: “”, emoji: “🎯” });
};

const handleAddMoney = async (p) => {
const newSaved = Math.min(p.saved + parseFloat(addAmt||0), p.goal);
await supabase.from(“projects”).update({ saved: newSaved }).eq(“id”, p.id);
setProjects(prev => prev.map(x => x.id === p.id ? { . . .x, saved: newSaved } : x));
if (newSaved >= p.goal) triggerSticker();
setAddingId(null); setAddAmt(””);
};

return (
<div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 16 }}>
<div>
<h3 style={{ margin: 0, fontFamily: “‘Playfair Display’, serif”, color: PASTEL.roseDeep, fontSize: 16 }}>Mes projets</h3>
<div style={{ fontSize: 11, color: PASTEL.textLight }}>{projects.length} projet(s)</div>
</div>
<PinkButton onClick={() => setModal(true)} small>+ Nouveau projet</PinkButton>
</div>
{loading && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight }}>Chargement. . . 🌸</div>}
{!loading && projects.length === 0 && <div style={{ textAlign: “center”, padding: 32, color: PASTEL.textLight, fontSize: 13 }}>🌟 Aucun projet. Rêve grand !</div>}
<div style={{ display: “flex”, flexDirection: “column”, gap: 14 }}>
{projects.map(p => {
const percent = Math.min((p.saved/p.goal)*100, 100);
const done = p.saved >= p.goal;
return (
<div key={p.id} style={{ background: PASTEL.white, borderRadius: 20, padding: “18px 20px”, border: `1.5px solid ${done ? "#A8E6CF" : PASTEL.lilac}`, position: “relative” }}>
{done && <div style={{ position: “absolute”, top: 12, right: 14, fontSize: 20 }}>🎉</div>}
<div style={{ display: “flex”, alignItems: “center”, gap: 10, marginBottom: 10 }}>
<span style={{ fontSize: 28 }}>{p.emoji}</span>
<div>
<div style={{ fontFamily: “‘Playfair Display’, serif”, fontWeight: 700, color: PASTEL.text, fontSize: 16 }}>{p.name}</div>
<div style={{ fontSize: 12, color: PASTEL.textLight }}>
{p.saved.toFixed(0)}€ / {p.goal.toFixed(0)}€
{!done && <span style={{ color: PASTEL.roseDark }}> · il manque {(p.goal-p.saved).toFixed(0)}€</span>}
</div>
</div>
</div>
<div style={{ background: PASTEL.lilac, borderRadius: 99, height: 10, overflow: “hidden”, marginBottom: 10 }}>
<div style={{ background: done ? “linear-gradient(90deg,#A8E6CF,#56C596)” : `linear-gradient(90deg,${PASTEL.rose},${PASTEL.roseDeep})`, height: “100%”, width: `${percent}%`, borderRadius: 99, transition: “width 0.6s ease” }} />
</div>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center” }}>
<span style={{ fontSize: 12, color: PASTEL.textLight }}>{percent.toFixed(0)}% accompli</span>
{!done && (addingId === p.id ? (
<div style={{ display: “flex”, gap: 6 }}>
<input value={addAmt} onChange={e => setAddAmt(e.target.value)} type=“number” placeholder=“€” style={{ width: 70, padding: “5px 10px”, borderRadius: 10, border: `1.5px solid ${PASTEL.lilac}`, background: PASTEL.cream, fontSize: 12, outline: “none” }} />
<button onClick={() => handleAddMoney(p)} style={{ background: PASTEL.mint, border: “none”, borderRadius: 10, padding: “5px 10px”, cursor: “pointer”, fontSize: 12, color: “#2D7A6B”, fontWeight: 700 }}>OK</button>
<button onClick={() => { setAddingId(null); setAddAmt(””); }} style={{ background: PASTEL.rosePale, border: “none”, borderRadius: 10, padding: “5px 8px”, cursor: “pointer”, fontSize: 11, color: PASTEL.roseDeep }}>✕</button>
</div>
) : <PinkButton onClick={() => setAddingId(p.id)} small secondary>+ Ajouter</PinkButton>)}
</div>
</div>
);
})}
</div>
{modal && (
<Modal title=“🌟 Nouveau projet” onClose={() => setModal(false)}>
<Input label=“Nom du projet” value={form.name} onChange={v => setForm(p=>({. . .p,name:v}))} placeholder=“ex: Acheter une voiture” />
<Input label=“Objectif (€)” value={form.goal} onChange={v => setForm(p=>({. . .p,goal:v}))} type=“number” placeholder=“5000” />
<Input label=“Déjà économisé (€)” value={form.saved} onChange={v => setForm(p=>({. . .p,saved:v}))} type=“number” placeholder=“0” />
<div style={{ marginBottom: 14 }}>
<label style={{ fontSize: 12, color: PASTEL.textLight, fontFamily: “‘Playfair Display’, serif”, fontWeight: 600, display: “block”, marginBottom: 6 }}>Emoji</label>
<div style={{ display: “flex”, gap: 8, flexWrap: “wrap” }}>
{emojis.map(e => <button key={e} onClick={() => setForm(p=>({. . .p,emoji:e}))} style={{ fontSize: 20, background: form.emoji===e ? PASTEL.rosePale : “transparent”, border: form.emoji===e ? `2px solid ${PASTEL.roseDark}` : “2px solid transparent”, borderRadius: 10, padding: “4px 8px”, cursor: “pointer” }}>{e}</button>)}
</div>
</div>
<PinkButton onClick={handleAdd}>Créer le projet 💫</PinkButton>
</Modal>
)}
</div>
);
}

// –– MAIN ––
export default function Bookiara() {
const [session, setSession] = useState(null);
const [loading, setLoading] = useState(true);
const [dbReady, setDbReady] = useState(true);
const [section, setSection] = useState(“dashboard”);
const [menuOpen, setMenuOpen] = useState(false);
const [sticker, setSticker] = useState(null);
const [partnerCount, setPartnerCount] = useState(1);

useEffect(() => {
supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
return () => subscription.unsubscribe();
}, []);

useEffect(() => {
if (!session) return;
supabase.from(“sales”).select(“id”).limit(1).then(({ error }) => { if (error?.code === “42P01”) setDbReady(false); });
}, [session]);

const triggerSticker = () => setSticker(STICKERS[Math.floor(Math.random()*STICKERS.length)]);
const pseudo = session?.user?.user_metadata?.pseudo || session?.user?.email?.split(”@”)[0] || “chérie”;
const sections = [{ id: “dashboard”, label: “🏠 Tableau de bord” }, { id: “sales”, label: “🛍️ Mes ventes” }, { id: “stock”, label: “📦 Mon stock” }, { id: “expenses”, label: “💸 Mes dépenses” }, { id: “projects”, label: “🌟 Mes projets” }];

if (loading) return (
<div style={{ minHeight: “100vh”, background: `linear-gradient(135deg, ${PASTEL.rosePale}, ${PASTEL.cream})`, display: “flex”, alignItems: “center”, justifyContent: “center” }}>
<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
<div style={{ fontSize: 48, animation: “spin 1s linear infinite” }}>🎀</div>
</div>
);

if (!session) return <AuthScreen />;
if (!dbReady) return <SetupScreen />;

return (
<div style={{ minHeight: “100vh”, background: `linear-gradient(160deg, ${PASTEL.rosePale} 0%, ${PASTEL.cream} 60%, ${PASTEL.lilac} 100%)`, fontFamily: “‘Lato’, sans-serif”, color: PASTEL.text }}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600&display=swap'); @keyframes floatUp { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-200%) scale(1.5)} } @keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} } @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} } * { box-sizing: border-box; }`}</style>

```
  {sticker && <FloatingSticker sticker={sticker} onDone={() => setSticker(null)} />}

  <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,245,248,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${PASTEL.lilac}`, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${PASTEL.rose}, ${PASTEL.roseDeep})`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎀</div>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: PASTEL.roseDeep, fontSize: 18, lineHeight: 1 }}>Bookiara</div>
        <div style={{ fontSize: 10, color: PASTEL.textLight }}>Bonjour, {pseudo} 🌸</div>
      </div>
    </div>
    <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2.5, background: PASTEL.roseDeep, borderRadius: 99, transition: "all 0.3s", transform: menuOpen ? (i===1?"scaleX(0)":i===0?"rotate(45deg) translate(4px,4px)":"rotate(-45deg) translate(4px,-4px)") : "none" }} />)}
    </button>
  </div>

  {menuOpen && (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setMenuOpen(false)}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 260, background: PASTEL.white, boxShadow: "-8px 0 40px rgba(244,130,154,0.2)", animation: "slideIn 0.25s ease", padding: "24px 20px", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'Playfair Display', serif", color: PASTEL.roseDeep, fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎀 Menu</div>
        {sections.map(s => (
          <button key={s.id} onClick={() => { setSection(s.id); setMenuOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: 14, marginBottom: 6, background: section===s.id ? PASTEL.rosePale : "transparent", border: section===s.id ? `1.5px solid ${PASTEL.rose}` : "1.5px solid transparent", cursor: "pointer", fontFamily: "'Playfair Display', serif", fontWeight: section===s.id ? 700 : 400, color: section===s.id ? PASTEL.roseDeep : PASTEL.text, fontSize: 14 }}>
            {s.label}
          </button>
        ))}
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${PASTEL.lilac}` }}>
          <div style={{ fontSize: 12, color: PASTEL.textLight, marginBottom: 8 }}>Personnes par vente (défaut)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <button onClick={() => setPartnerCount(p=>Math.max(1,p-1))} style={{ background: PASTEL.rosePale, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: PASTEL.roseDeep }}>−</button>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: PASTEL.roseDeep, fontSize: 18 }}>{partnerCount}</span>
            <button onClick={() => setPartnerCount(p=>p+1)} style={{ background: PASTEL.rosePale, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: PASTEL.roseDeep }}>+</button>
          </div>
          <button onClick={() => supabase.auth.signOut()} style={{ background: PASTEL.rosePale, border: "none", borderRadius: 12, padding: "10px 16px", cursor: "pointer", color: PASTEL.roseDeep, fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 13, width: "100%" }}>Se déconnecter 👋</button>
        </div>
      </div>
    </div>
  )}

  <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 40px", animation: "fadeIn 0.3s ease" }}>
    <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
      {sections.map(s => (
        <button key={s.id} onClick={() => setSection(s.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 99, cursor: "pointer", fontSize: 12, fontFamily: "'Lato', sans-serif", fontWeight: 600, transition: "all 0.2s", background: section===s.id ? `linear-gradient(135deg,${PASTEL.rose},${PASTEL.roseDeep})` : PASTEL.white, color: section===s.id ? PASTEL.white : PASTEL.textLight, boxShadow: section===s.id ? "0 4px 12px rgba(244,130,154,0.35)" : "none", border: section===s.id ? "none" : `1px solid ${PASTEL.lilac}` }}>
          {s.label.split(" ")[0]}
        </button>
      ))}
    </div>
    {section === "dashboard" && <Dashboard userId={session.user.id} />}
    {section === "sales" && <SalesSection userId={session.user.id} partnerCount={partnerCount} triggerSticker={triggerSticker} />}
    {section === "stock" && <StockSection userId={session.user.id} triggerSticker={triggerSticker} />}
    {section === "expenses" && <ExpensesSection userId={session.user.id} />}
    {section === "projects" && <ProjectsSection userId={session.user.id} triggerSticker={triggerSticker} />}
  </div>
</div>
```

);
}
