import { useState } from "react";

const FONTS = [
  { label: "Playfair Display", value: "Playfair Display", import: "Playfair+Display:ital,wght@0,400;0,700;1,400" },
  { label: "Merriweather", value: "Merriweather", import: "Merriweather:wght@300;400;700" },
  { label: "Lora", value: "Lora", import: "Lora:ital,wght@0,400;0,600;1,400" },
  { label: "Montserrat", value: "Montserrat", import: "Montserrat:wght@300;400;600;700" },
  { label: "Raleway", value: "Raleway", import: "Raleway:wght@300;400;600;700" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond", import: "Cormorant+Garamond:ital,wght@0,400;0,600;1,400" },
];

const TONES = [
  { value: "Professionnel", icon: "💼" }, { value: "Inspirant", icon: "✨" },
  { value: "Éducatif", icon: "🎓" }, { value: "Storytelling", icon: "📖" },
  { value: "Minimaliste", icon: "◽" }, { value: "Motivationnel", icon: "🔥" },
];

const THEMES = [
  { label: "Obsidian", bg: "#0a0a0f", card: "#13131c", accent: "#d4a843", text: "#f5f0e8", border: "#d4a84322" },
  { label: "Ivory",    bg: "#faf7f2", card: "#ffffff",  accent: "#1a1a2e", text: "#1a1a1a", border: "#1a1a2e15" },
  { label: "Midnight", bg: "#080d1a", card: "#0f1829",  accent: "#60a5fa", text: "#e2eeff", border: "#60a5fa22" },
  { label: "Emerald",  bg: "#071410", card: "#0e2219",  accent: "#34d399", text: "#d1fae5", border: "#34d39922" },
  { label: "Rose",     bg: "#130a0e", card: "#1e0f15",  accent: "#f472b6", text: "#fce7f3", border: "#f472b622" },
];

const LAYOUTS = [
  { value: "classique",  label: "Classique",  icon: "📄", desc: "Simple et élégant" },
  { value: "moderne",    label: "Moderne",    icon: "🔲", desc: "Encadrés et accents" },
  { value: "magazine",   label: "Magazine",   icon: "📰", desc: "Citations et visuels" },
  { value: "minimaliste",label: "Minimaliste",icon: "◻️", desc: "Épuré et aéré" },
];

const COVER_STYLES = [
  { value: "gradient",  label: "Dégradé",    icon: "🌅" },
  { value: "geometric", label: "Géométrique",icon: "◆" },
  { value: "bold",      label: "Bold",       icon: "⬛" },
  { value: "elegant",   label: "Élégant",    icon: "✦" },
];

const DECORATORS = {
  classique:   { separator: "— ✦ —", quoteStyle: "«", chapterPrefix: "Chapitre" },
  moderne:     { separator: "▬▬▬▬▬", quoteStyle: "❝", chapterPrefix: "◈" },
  magazine:    { separator: "✦ ✦ ✦", quoteStyle: "❛", chapterPrefix: "№" },
  minimaliste: { separator: "···", quoteStyle: '"', chapterPrefix: "" },
};

const BG = "#07070d"; const CARD = "#0f0f18"; const ACCENT = "#c9a84c";
const TEXT = "#f0ece0"; const BORDER = "#c9a84c18";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Cabinet+Grotesk:wght@400;500;700;800&family=Syne:wght@700;800&family=${FONTS.map(f=>f.import).join("&family=")}&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:${BG};color:${TEXT};font-family:'Cabinet Grotesk',sans-serif;min-height:100vh;overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${BG}}::-webkit-scrollbar-thumb{background:${ACCENT}55;border-radius:2px}
button{font-family:'Cabinet Grotesk',sans-serif;cursor:pointer}
input,textarea{font-family:'Cabinet Grotesk',sans-serif}
.page{min-height:100vh;background:${BG};color:${TEXT}}
.container{max-width:1100px;margin:0 auto;padding:0 2rem}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.2rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${BORDER};background:${BG}cc;backdrop-filter:blur(16px)}
.nav-logo{display:flex;align-items:center;gap:.6rem;cursor:pointer}
.nav-logo-icon{width:34px;height:34px;background:${ACCENT};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0}
.nav-logo-text{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;letter-spacing:-.5px}
.nav-links{display:flex;align-items:center;gap:2rem;margin-left:3rem}
.nav-link{font-size:.88rem;opacity:.5;background:none;border:none;color:${TEXT};font-weight:500;transition:opacity .2s;cursor:pointer}
.nav-link:hover{opacity:1}
.nav-cta{padding:.55rem 1.2rem;background:${ACCENT};color:${BG};border:none;border-radius:8px;font-size:.85rem;font-weight:700;letter-spacing:.5px;transition:opacity .2s}
.nav-cta:hover{opacity:.85}
.btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:1rem 2rem;background:${ACCENT};color:${BG};border:none;border-radius:10px;font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:all .2s}
.btn-primary:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 12px 32px ${ACCENT}44}
.btn-primary:disabled{opacity:.3;cursor:not-allowed;transform:none}
.btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.9rem 1.8rem;background:transparent;color:${TEXT};border:1px solid ${BORDER};border-radius:10px;font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;transition:all .2s}
.btn-outline:hover{border-color:${ACCENT}88;color:${ACCENT}}
.btn-ghost{padding:.85rem 1.2rem;background:${CARD};color:${TEXT};border:1px solid ${BORDER};border-radius:10px;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .2s}
.btn-ghost:hover{border-color:${ACCENT}66}
.field-wrap{margin-bottom:1.2rem}
.field-label{font-size:.72rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-bottom:.5rem;display:block}
.field{width:100%;background:#ffffff08;border:1px solid ${BORDER};border-radius:10px;padding:.9rem 1.1rem;color:${TEXT};font-size:.95rem;outline:none;transition:border-color .2s,box-shadow .2s;resize:none}
.field:focus{border-color:${ACCENT}88;box-shadow:0 0 0 3px ${ACCENT}11}
.field::placeholder{opacity:.3}
.hero{padding:10rem 2rem 6rem;text-align:center;position:relative;overflow:hidden}
.hero-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);width:700px;height:700px;background:radial-gradient(circle,${ACCENT}12 0%,transparent 70%);pointer-events:none}
.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem 1rem;border:1px solid ${ACCENT}44;border-radius:20px;font-size:.75rem;color:${ACCENT};font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:2rem}
.hero-title{font-family:'DM Serif Display',serif;font-size:clamp(2.8rem,7vw,5.5rem);line-height:1.05;letter-spacing:-2px;margin-bottom:1.5rem}
.hero-title em{font-style:italic;color:${ACCENT}}
.hero-sub{font-size:1.1rem;opacity:.55;line-height:1.7;max-width:560px;margin:0 auto 2.5rem}
.hero-actions{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.hero-scroll{margin-top:4rem;opacity:.3;font-size:.75rem;letter-spacing:2px;text-transform:uppercase}
.features{padding:6rem 2rem}
.features-header{text-align:center;margin-bottom:4rem}
.section-eyebrow{font-size:.7rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${ACCENT};margin-bottom:.8rem}
.section-title{font-family:'DM Serif Display',serif;font-size:clamp(2rem,4vw,3rem);line-height:1.15;letter-spacing:-1px;margin-bottom:.8rem}
.section-sub{opacity:.5;font-size:.95rem;line-height:1.7;max-width:500px;margin:0 auto}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
@media(max-width:768px){.features-grid{grid-template-columns:1fr}}
.feat-card{background:${CARD};border:1px solid ${BORDER};border-radius:16px;padding:2rem;transition:border-color .2s,transform .2s}
.feat-card:hover{border-color:${ACCENT}44;transform:translateY(-3px)}
.feat-icon{width:48px;height:48px;background:${ACCENT}18;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.2rem}
.feat-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-bottom:.6rem}
.feat-desc{font-size:.88rem;opacity:.5;line-height:1.7}
.how{padding:6rem 2rem;background:linear-gradient(180deg,transparent,${CARD}44,transparent)}
.how-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:3rem}
@media(max-width:768px){.how-steps{grid-template-columns:1fr 1fr}}
.how-step{text-align:center;padding:1.5rem 1rem}
.how-num{font-family:'Syne',sans-serif;font-size:2.5rem;font-weight:800;color:${ACCENT};opacity:.2;line-height:1;margin-bottom:.8rem}
.how-title{font-weight:700;font-size:.95rem;margin-bottom:.4rem}
.how-desc{font-size:.82rem;opacity:.45;line-height:1.6}
.testimonials{padding:6rem 2rem}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
@media(max-width:768px){.testi-grid{grid-template-columns:1fr}}
.testi-card{background:${CARD};border:1px solid ${BORDER};border-radius:14px;padding:1.8rem}
.testi-stars{color:${ACCENT};font-size:.9rem;margin-bottom:1rem;letter-spacing:2px}
.testi-text{font-size:.9rem;opacity:.7;line-height:1.75;font-style:italic;margin-bottom:1.2rem}
.testi-author{display:flex;align-items:center;gap:.8rem}
.testi-avatar{width:36px;height:36px;border-radius:50%;background:${ACCENT}33;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:${ACCENT}}
.testi-name{font-size:.85rem;font-weight:600}
.testi-role{font-size:.72rem;opacity:.4}
.landing-pricing{padding:6rem 2rem;text-align:center}
.lp-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;max-width:700px;margin:3rem auto 0}
@media(max-width:600px){.lp-grid{grid-template-columns:1fr}}
.lp-card{background:${CARD};border:2px solid ${BORDER};border-radius:18px;padding:2rem;text-align:left;position:relative;overflow:hidden;transition:transform .2s}
.lp-card:hover{transform:translateY(-3px)}
.lp-card.popular{border-color:${ACCENT}88}
.lp-popular-tag{position:absolute;top:1rem;right:1rem;background:${ACCENT};color:${BG};font-size:.62rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:.25rem .6rem;border-radius:20px}
.lp-plan{font-size:.68rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};margin-bottom:.6rem}
.lp-price{font-family:'Syne',sans-serif;font-size:2.5rem;font-weight:800;color:${ACCENT};line-height:1}
.lp-period{font-size:.78rem;opacity:.4;margin-bottom:1.5rem}
.lp-features{list-style:none;margin-bottom:1.5rem}
.lp-feat{display:flex;align-items:flex-start;gap:.6rem;padding:.4rem 0;font-size:.85rem;opacity:.75}
.lp-feat-icon{color:${ACCENT};flex-shrink:0;margin-top:1px}
.lp-feat-icon.no{opacity:.25}
.lp-btn{width:100%;padding:.9rem;border-radius:10px;font-family:'Syne',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:all .2s;border:1px solid ${ACCENT}55;background:transparent;color:${ACCENT}}
.lp-card.popular .lp-btn{background:${ACCENT};color:${BG};border-color:${ACCENT}}
.lp-btn:hover{opacity:.85}
.cta-banner{padding:6rem 2rem;text-align:center}
.cta-banner-inner{background:linear-gradient(135deg,${ACCENT}18,${CARD});border:1px solid ${ACCENT}33;border-radius:24px;padding:4rem 2rem;position:relative;overflow:hidden}
.footer{padding:3rem 2rem;border-top:1px solid ${BORDER};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.footer-copy{font-size:.8rem;opacity:.3}
.footer-link{font-size:.8rem;opacity:.3;background:none;border:none;color:${TEXT};cursor:pointer;transition:opacity .2s;margin-left:1.5rem}
.footer-link:hover{opacity:.7}
.auth-page{min-height:100vh;background:${BG};display:flex;align-items:center;justify-content:center;padding:2rem;position:relative;overflow:hidden}
.auth-glow{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;background:radial-gradient(${ACCENT}10,transparent 70%);pointer-events:none}
.auth-card{background:${CARD};border:1px solid ${BORDER};border-radius:20px;padding:2.5rem;width:100%;max-width:440px;position:relative;z-index:1}
.auth-logo{display:flex;align-items:center;gap:.6rem;justify-content:center;margin-bottom:2rem}
.auth-logo-icon{width:40px;height:40px;background:${ACCENT};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.auth-logo-text{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem}
.auth-title{font-family:'DM Serif Display',serif;font-size:1.8rem;text-align:center;margin-bottom:.4rem}
.auth-sub{font-size:.85rem;opacity:.45;text-align:center;margin-bottom:2rem;line-height:1.5}
.auth-divider{display:flex;align-items:center;gap:1rem;margin:1.5rem 0;font-size:.75rem;opacity:.3}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:${BORDER}}
.auth-switch{text-align:center;margin-top:1.5rem;font-size:.85rem;opacity:.5}
.auth-switch button{background:none;border:none;color:${ACCENT};font-size:.85rem;font-weight:600;cursor:pointer;opacity:1}
.auth-error{background:#f8717122;border:1px solid #f8717144;border-radius:8px;padding:.75rem 1rem;font-size:.83rem;color:#f87171;margin-bottom:1rem}
.app-nav{position:sticky;top:0;z-index:50;padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${BORDER};background:${BG}ee;backdrop-filter:blur(12px)}
.app-nav-right{display:flex;align-items:center;gap:1rem}
.plan-pill{padding:.3rem .8rem;border:1px solid ${ACCENT}44;border-radius:20px;font-size:.7rem;color:${ACCENT};font-weight:600;letter-spacing:1px}
.steps-bar{display:flex;max-width:760px;margin:2rem auto 0;padding:0 1.5rem;position:relative}
.steps-bar::before{content:'';position:absolute;top:17px;left:calc(1.5rem + 17px);right:calc(1.5rem + 17px);height:1px;background:${BORDER}}
.step-node{flex:1;display:flex;flex-direction:column;align-items:center;gap:.4rem}
.step-dot{width:34px;height:34px;border-radius:50%;border:1.5px solid ${BORDER};background:${BG};color:${TEXT}44;font-family:'Syne',sans-serif;font-size:.7rem;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .3s;z-index:1}
.step-dot.sa{background:${ACCENT};border-color:${ACCENT};color:${BG};box-shadow:0 0 18px ${ACCENT}44}
.step-dot.sd{background:${ACCENT}22;border-color:${ACCENT}88;color:${ACCENT}}
.step-lbl{font-size:.56rem;letter-spacing:1.5px;text-transform:uppercase;opacity:.35;font-weight:500}
.step-lbl.sa{opacity:1;color:${ACCENT}}.step-lbl.sd{opacity:.6}
.app-main{max-width:760px;margin:0 auto;padding:2rem 1.5rem 5rem}
.sec-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:.3rem;letter-spacing:-.5px}
.sec-sub{font-size:.85rem;opacity:.4;margin-bottom:1.8rem;line-height:1.5}
.panel{background:${CARD};border:1px solid ${BORDER};border-radius:14px;padding:1.5rem;margin-bottom:1rem}
.p-label{font-size:.68rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}
.p-label::after{content:'';flex:1;height:1px;background:${ACCENT}18}
.app-field{width:100%;background:#ffffff06;border:1px solid ${BORDER};border-radius:10px;padding:.85rem 1.1rem;color:${TEXT};font-size:.92rem;outline:none;transition:border-color .2s,box-shadow .2s;resize:none}
.app-field:focus{border-color:${ACCENT}88;box-shadow:0 0 0 3px ${ACCENT}0d}
.app-field::placeholder{opacity:.3}
.f-label{font-size:.7rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;opacity:.45;margin-bottom:.5rem;display:block}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:500px){.f-row{grid-template-columns:1fr}}
.f-grp{margin-bottom:1rem}.f-grp:last-child{margin-bottom:0}
.tone-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}
.tone-btn{padding:.7rem .4rem;border-radius:10px;border:1px solid ${BORDER};background:transparent;color:${TEXT};font-size:.8rem;font-weight:500;cursor:pointer;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:.25rem}
.tone-btn:hover{border-color:${ACCENT}66;background:${ACCENT}08}
.tone-btn.sel{background:${ACCENT}18;border-color:${ACCENT};color:${ACCENT}}
.ctr-wrap{display:flex;align-items:center;gap:1rem}
.ctr-btn{width:40px;height:40px;border-radius:8px;border:1px solid ${BORDER};background:transparent;color:${TEXT};font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.ctr-btn:hover{border-color:${ACCENT};color:${ACCENT}}
.ctr-btn:disabled{opacity:.25;cursor:not-allowed}
.ctr-val{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:${ACCENT};min-width:48px;text-align:center}
.ctr-desc{font-size:.78rem;opacity:.4;line-height:1.5}
.font-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}
@media(max-width:500px){.font-grid{grid-template-columns:repeat(2,1fr)}}
.font-btn{padding:.85rem .7rem;border-radius:10px;border:1px solid ${BORDER};background:transparent;color:${TEXT};cursor:pointer;transition:all .2s;text-align:left;font-size:.9rem;line-height:1.2}
.font-btn:hover{border-color:${ACCENT}66}
.font-btn.sel{background:${ACCENT}18;border-color:${ACCENT};color:${ACCENT}}
.font-small{font-size:.58rem;opacity:.35;text-transform:uppercase;letter-spacing:1px;margin-top:2px;font-family:'Cabinet Grotesk',sans-serif}
.theme-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:.6rem}
@media(max-width:420px){.theme-grid{grid-template-columns:repeat(3,1fr)}}
.theme-sw{aspect-ratio:1;border-radius:10px;cursor:pointer;border:2px solid transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:all .2s}
.sw-dot{width:13px;height:13px;border-radius:50%}
.sw-name{font-size:.52rem;letter-spacing:1px;font-weight:600;text-transform:uppercase}
.layout-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem}
@media(max-width:500px){.layout-grid{grid-template-columns:repeat(2,1fr)}}
.layout-btn{padding:1rem .5rem;border-radius:10px;border:1px solid ${BORDER};background:transparent;color:${TEXT};cursor:pointer;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:.4rem}
.layout-btn:hover{border-color:${ACCENT}66;background:${ACCENT}08}
.layout-btn.sel{background:${ACCENT}18;border-color:${ACCENT};color:${ACCENT}}
.layout-icon{font-size:1.4rem}
.layout-name{font-size:.8rem;font-weight:600}
.layout-desc{font-size:.65rem;opacity:.4}
.cover-style-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem}
.cover-style-btn{padding:.9rem .5rem;border-radius:10px;border:1px solid ${BORDER};background:transparent;color:${TEXT};cursor:pointer;transition:all .2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:.4rem}
.cover-style-btn:hover{border-color:${ACCENT}66}
.cover-style-btn.sel{background:${ACCENT}18;border-color:${ACCENT};color:${ACCENT}}
.nav-row{display:flex;gap:.8rem;margin-top:1.8rem}
.nav-back{padding:.9rem 1.3rem;background:transparent;color:${TEXT};border:1px solid ${BORDER};border-radius:10px;font-size:.85rem;font-weight:600;cursor:pointer;transition:all .2s}
.nav-back:hover{border-color:${ACCENT}66}
.nav-next{flex:1;padding:.9rem 1.3rem;background:${ACCENT};color:${BG};border:none;border-radius:10px;font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem}
.nav-next:hover:not(:disabled){opacity:.88;transform:translateY(-1px);box-shadow:0 8px 24px ${ACCENT}33}
.nav-next:disabled{opacity:.3;cursor:not-allowed;transform:none}
.pricing-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem}
@media(max-width:480px){.pricing-grid{grid-template-columns:1fr}}
.plan-card{border-radius:16px;padding:1.8rem 1.5rem;border:2px solid ${BORDER};cursor:pointer;transition:all .25s;position:relative;overflow:hidden;background:${CARD}}
.plan-card:hover{border-color:${ACCENT}66;transform:translateY(-2px)}
.plan-card.active{border-color:${ACCENT};box-shadow:0 0 0 3px ${ACCENT}1a}
.plan-card.pro-card{background:linear-gradient(135deg,${ACCENT}0d 0%,${CARD} 60%)}
.plan-badge{display:inline-block;padding:.2rem .6rem;border-radius:20px;font-size:.6rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:.8rem}
.plan-badge.starter{background:${BORDER};color:${TEXT};opacity:.8}
.plan-badge.pro{background:${ACCENT};color:${BG}}
.plan-name{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:.2rem}
.plan-price{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:${ACCENT};line-height:1}
.plan-period{font-size:.73rem;opacity:.4;margin-bottom:1rem}
.plan-feats{list-style:none;display:flex;flex-direction:column;gap:.45rem}
.plan-feat{display:flex;align-items:flex-start;gap:.5rem;font-size:.81rem;opacity:.72}
.pfeat-ok{color:${ACCENT};flex-shrink:0}
.pfeat-no{opacity:.25}
.plan-sel{width:100%;margin-top:1.2rem;padding:.75rem;border-radius:8px;border:1px solid ${ACCENT}44;background:transparent;color:${ACCENT};font-family:'Syne',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:all .2s}
.plan-card.active .plan-sel{background:${ACCENT};color:${BG};border-color:${ACCENT}}
.pro-glow{position:absolute;top:-20px;right:-20px;width:80px;height:80px;background:${ACCENT}22;border-radius:50%;filter:blur(20px)}
.limit-note{font-size:.75rem;color:${ACCENT};opacity:.7;text-align:center;margin-top:.5rem}
.gen-wrap{text-align:center;padding:4rem 1rem}
.gen-ring{width:72px;height:72px;border-radius:50%;border:3px solid ${BORDER};border-top-color:${ACCENT};animation:spin .9s linear infinite;margin:0 auto 2rem}
@keyframes spin{to{transform:rotate(360deg)}}
.gen-title{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;margin-bottom:.5rem}
.gen-sub{font-size:.82rem;opacity:.4;margin-bottom:.4rem}
.gen-label{font-size:.78rem;color:${ACCENT};margin-bottom:1.5rem;min-height:1.2em}
.prog-bar{width:260px;height:3px;background:${BORDER};border-radius:2px;margin:0 auto;overflow:hidden}
.prog-fill{height:100%;background:${ACCENT};border-radius:2px;transition:width .4s ease}
.rs{background:${CARD};border:1px solid ${BORDER};border-radius:14px;padding:1.5rem;margin-bottom:.8rem}
.rs-lb{font-size:.62rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ACCENT};margin-bottom:1rem;opacity:.8}
.rs-ct{font-size:.88rem;line-height:1.9;opacity:.75;white-space:pre-wrap}
.toc-list{list-style:none}
.toc-it{display:flex;align-items:center;gap:1rem;padding:.6rem 0;border-bottom:1px solid ${BORDER};cursor:pointer;transition:all .15s}
.toc-it:last-child{border-bottom:none}
.toc-it:hover{padding-left:4px}
.toc-nm{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;color:${ACCENT};opacity:.45;min-width:24px}
.toc-tl{font-size:.87rem;font-weight:500;flex:1}
.toc-sm{font-size:.73rem;opacity:.35}
.ch-card{background:${CARD};border:1px solid ${BORDER};border-radius:14px;margin-bottom:.8rem;overflow:hidden}
.ch-hdr{display:flex;align-items:center;gap:1rem;padding:1.2rem 1.5rem;cursor:pointer;transition:background .15s}
.ch-hdr:hover{background:${ACCENT}06}
.ch-nm{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;color:${ACCENT};opacity:.2;line-height:1;min-width:40px}
.ch-inf{flex:1}
.ch-tl{font-size:1rem;font-weight:600;margin-bottom:.2rem;letter-spacing:-.3px}
.ch-sm{font-size:.76rem;opacity:.38}
.ch-tog{color:${ACCENT};font-size:.78rem;transition:transform .2s}
.ch-tog.open{transform:rotate(180deg)}
.ch-body{padding:1.2rem 1.5rem 1.5rem;border-top:1px solid ${BORDER}}
.tk-it{display:flex;gap:.8rem;padding:.65rem 0;border-bottom:1px solid ${BORDER};align-items:flex-start}
.tk-it:last-child{border-bottom:none}
.tk-ic{width:22px;height:22px;border-radius:50%;background:${ACCENT}22;color:${ACCENT};font-size:.65rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-weight:700}
.act-bar{display:flex;gap:.8rem;margin-top:1.5rem;position:sticky;bottom:1rem}
.act-solid{flex:1;padding:.9rem 1.3rem;background:${ACCENT};color:${BG};border:none;border-radius:10px;font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;letter-spacing:.5px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem;backdrop-filter:blur(8px)}
.act-solid:hover{opacity:.88;box-shadow:0 8px 24px ${ACCENT}33}
.err-box{color:#f87171;padding:1rem;font-size:.87rem;background:#f8717118;border-radius:10px;border:1px solid #f8717133;text-align:center}
`;

// ── Cover renderer ─────────────────────────────────────────────
function EbookCover({ title, subtitle, author, theme: t, font, coverStyle, tone }) {
  const styles = {
    gradient: {
      background: `linear-gradient(135deg, ${t.accent}33 0%, ${t.bg} 50%, ${t.accent}11 100%)`,
      extra: <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(circle at 70% 30%, ${t.accent}22, transparent 60%)`}} />,
    },
    geometric: {
      background: t.bg,
      extra: <>
        <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",border:`2px solid ${t.accent}33`}} />
        <div style={{position:"absolute",bottom:-60,left:-30,width:160,height:160,borderRadius:"50%",border:`1px solid ${t.accent}22`}} />
        <div style={{position:"absolute",top:"40%",right:20,width:60,height:60,background:`${t.accent}18`,transform:"rotate(45deg)"}} />
      </>,
    },
    bold: {
      background: t.accent,
      extra: <div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:`${t.bg}22`}} />,
    },
    elegant: {
      background: t.bg,
      extra: <>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:t.accent}} />
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:4,background:t.accent}} />
        <div style={{position:"absolute",top:0,bottom:0,left:0,width:4,background:t.accent}} />
        <div style={{position:"absolute",top:0,bottom:0,right:0,width:4,background:t.accent}} />
        <div style={{position:"absolute",top:12,left:12,right:12,bottom:12,border:`1px solid ${t.accent}44`}} />
      </>,
    },
  };
  const cs = styles[coverStyle] || styles.gradient;
  const isBold = coverStyle === "bold";
  const textColor = isBold ? t.bg : t.text;
  const accentColor = isBold ? t.bg : t.accent;
  return (
    <div style={{position:"relative",borderRadius:16,overflow:"hidden",padding:"3rem 2.5rem",background:cs.background,fontFamily:font.value,color:textColor,textAlign:"center",minHeight:340,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`1px solid ${t.accent}33`}}>
      {cs.extra}
      <div style={{position:"relative",zIndex:1,width:"100%"}}>
        <div style={{fontSize:".62rem",letterSpacing:"4px",textTransform:"uppercase",color:accentColor,opacity:.7,marginBottom:"1.2rem",fontFamily:"'Cabinet Grotesk',sans-serif",fontWeight:700}}>{tone.toUpperCase()} · EBOOK</div>
        <div style={{fontSize:"clamp(1.4rem,4vw,2.2rem)",fontWeight:700,lineHeight:1.2,marginBottom:".8rem",color:textColor}}>{title || "Titre de votre ebook"}</div>
        {subtitle && <div style={{fontSize:".9rem",opacity:.6,fontStyle:"italic",marginBottom:"1.5rem"}}>{subtitle}</div>}
        <div style={{width:60,height:2,background:accentColor,margin:"1.2rem auto"}} />
        <div style={{fontSize:".75rem",opacity:.5,letterSpacing:"2px",textTransform:"uppercase",fontFamily:"'Cabinet Grotesk',sans-serif"}}>Par {author || "Auteur"}</div>
      </div>
    </div>
  );
}

// ── Chapter content renderer ───────────────────────────────────
function ChapterContent({ content, layout, theme: t, font }) {
  const dec = DECORATORS[layout] || DECORATORS.classique;
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  const renderParagraph = (p, i) => {
    const isQuote = p.startsWith('"') || p.startsWith("«") || p.length < 120;
    if (layout === "magazine" && isQuote && i > 0 && i % 3 === 0) {
      return (
        <div key={i} style={{margin:"1.5rem 0",padding:"1.2rem 1.5rem",borderLeft:`3px solid ${t.accent}`,background:`${t.accent}08`,borderRadius:"0 10px 10px 0",fontStyle:"italic",fontSize:".95rem",color:t.accent,opacity:.9}}>
          <span style={{fontSize:"1.5rem",lineHeight:0,verticalAlign:"-0.4em",marginRight:".3rem",opacity:.5}}>{dec.quoteStyle}</span>
          {p}
        </div>
      );
    }
    if (layout === "moderne" && i > 0 && i % 4 === 0) {
      return (
        <div key={i} style={{margin:"1.5rem 0",padding:"1rem 1.2rem",background:`${t.accent}0d`,border:`1px solid ${t.accent}33`,borderRadius:10,fontSize:".88rem",lineHeight:1.85,opacity:.85}}>
          💡 <strong>Point clé :</strong> {p}
        </div>
      );
    }
    return <p key={i} style={{fontSize:".88rem",lineHeight:1.9,opacity:.78,marginBottom:"1rem",fontFamily:font.value}}>{p}</p>;
  };

  return (
    <div>
      {paragraphs.map((p, i) => renderParagraph(p, i))}
      {layout !== "minimaliste" && (
        <div style={{textAlign:"center",margin:"1.5rem 0 .5rem",opacity:.2,letterSpacing:"6px",fontSize:".75rem",color:t.accent}}>{dec.separator}</div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  function goTo(p) { setPage(p); window.scrollTo(0,0); }
  function handleAuth(u, pl) { setUser(u); if(pl){setPlan(pl);goTo("app");}else goTo("pricing"); }
  function logout() { setUser(null); setPlan(null); goTo("landing"); }
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {page==="landing"  && <Landing onLogin={()=>goTo("login")} onSignup={()=>goTo("signup")} onStart={()=>goTo("signup")} />}
      {page==="login"    && <AuthPage mode="login"  onAuth={handleAuth} switchMode={()=>goTo("signup")} onBack={()=>goTo("landing")} />}
      {page==="signup"   && <AuthPage mode="signup" onAuth={handleAuth} switchMode={()=>goTo("login")}  onBack={()=>goTo("landing")} />}
      {page==="pricing"  && <PricingPage user={user} onSelect={pl=>{setPlan(pl);goTo("app")}} />}
      {page==="app"      && <Generator user={user} plan={plan} onLogout={logout} onHome={()=>goTo("landing")} />}
    </>
  );
}

// ── Landing ───────────────────────────────────────────────────
function Landing({ onLogin, onSignup, onStart }) {
  const features = [
    {icon:"✍️",title:"Rédaction IA avancée",desc:"Notre IA génère du contenu professionnel, structuré et engageant adapté à votre audience."},
    {icon:"🎨",title:"Design personnalisable",desc:"6 polices, 5 thèmes, 4 styles de mise en page et 4 styles de couverture pour un ebook unique."},
    {icon:"🖼️",title:"Couvertures visuelles",desc:"Générez une vraie page de couverture avec dégradés, formes géométriques et typographie soignée."},
    {icon:"📐",title:"Mises en page variées",desc:"Classique, Moderne, Magazine ou Minimaliste — chaque style transforme la présentation du contenu."},
    {icon:"⚡",title:"Génération ultra-rapide",desc:"Recevez un ebook complet en moins de 2 minutes. Mode Pro pour un contenu encore plus riche."},
    {icon:"📚",title:"Chapitres illimités",desc:"En mode Pro, ajoutez autant de chapitres que vous voulez. Aucune limite, aucun compromis."},
  ];
  const testimonials = [
    {stars:"★★★★★",text:"J'ai créé mon premier ebook en 10 minutes. La qualité m'a vraiment surpris, mes clients adorent.",name:"Camille D.",role:"Consultante Marketing"},
    {stars:"★★★★★",text:"Le mode Pro est incroyable. Chaque chapitre est détaillé et professionnel. Ça m'économise des heures.",name:"Thomas R.",role:"Formateur en ligne"},
    {stars:"★★★★☆",text:"Les styles de mise en page sont superbes. Mon ebook ressemble vraiment à un vrai livre pro.",name:"Inès M.",role:"Coach Business"},
  ];
  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-icon">📚</div><div className="nav-logo-text">EbookAI</div></div>
        <div className="nav-links">
          <button className="nav-link">Fonctionnalités</button>
          <button className="nav-link">Tarifs</button>
          <button className="nav-link" onClick={onLogin}>Connexion</button>
          <button className="nav-cta" onClick={onSignup}>Commencer</button>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-badge">✦ Générateur d'ebooks propulsé par l'IA</div>
        <h1 className="hero-title">Créez des ebooks<br/><em>professionnels</em><br/>en quelques minutes</h1>
        <p className="hero-sub">Transformez n'importe quelle idée en ebook complet, structuré et prêt à vendre. Polices, thèmes, couvertures et mises en page au choix.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onStart}>Créer mon ebook gratuitement →</button>
          <button className="btn-outline">Voir un exemple</button>
        </div>
        <div className="hero-scroll">↓ Découvrir</div>
      </section>
      <section className="features">
        <div className="container">
          <div className="features-header">
            <div className="section-eyebrow">Fonctionnalités</div>
            <h2 className="section-title">Tout ce dont vous avez besoin</h2>
            <p className="section-sub">Un outil complet pour créer des ebooks de qualité professionnelle sans effort.</p>
          </div>
          <div className="features-grid">
            {features.map((f,i)=>(
              <div key={i} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="how">
        <div className="container">
          <div style={{textAlign:"center"}}>
            <div className="section-eyebrow">Comment ça marche</div>
            <h2 className="section-title">4 étapes, c'est tout</h2>
          </div>
          <div className="how-steps">
            {[{n:"01",t:"Décrivez votre idée",d:"Sujet, audience, ton de rédaction et nombre de chapitres."},{n:"02",t:"Choisissez le style",d:"Police, thème, mise en page et style de couverture visuelle."},{n:"03",t:"L'IA génère",d:"Rédaction complète chapitre par chapitre avec contenu enrichi."},{n:"04",t:"Téléchargez",d:"Exportez et commencez à vendre ou partager votre ebook."}].map((s,i)=>(
              <div key={i} className="how-step">
                <div className="how-num">{s.n}</div>
                <div className="how-title">{s.t}</div>
                <div className="how-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="testimonials">
        <div className="container">
          <div style={{textAlign:"center",marginBottom:"1rem"}}>
            <div className="section-eyebrow">Témoignages</div>
            <h2 className="section-title">Ils nous font confiance</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t,i)=>(
              <div key={i} className="testi-card">
                <div className="testi-stars">{t.stars}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="landing-pricing">
        <div className="container">
          <div className="section-eyebrow">Tarifs</div>
          <h2 className="section-title">Simple et transparent</h2>
          <p className="section-sub" style={{margin:"0 auto"}}>Commencez avec le plan qui vous convient.</p>
          <div className="lp-grid">
            <div className="lp-card">
              <div className="lp-plan">Starter</div>
              <div className="lp-price">10€</div>
              <div className="lp-period">par mois</div>
              <ul className="lp-features">
                {["Jusqu'à 5 chapitres","6 polices au choix","5 thèmes de couleurs","4 styles de mise en page","4 styles de couverture","Génération rapide"].map(f=>(
                  <li key={f} className="lp-feat"><span className="lp-feat-icon">✓</span>{f}</li>
                ))}
                {["Génération chapitre/chapitre","Relecture IA avancée"].map(f=>(
                  <li key={f} className="lp-feat"><span className="lp-feat-icon no">✗</span><span style={{opacity:.35}}>{f}</span></li>
                ))}
              </ul>
              <button className="lp-btn" onClick={onSignup}>Commencer →</button>
            </div>
            <div className="lp-card popular">
              <div className="lp-popular-tag">⭐ Populaire</div>
              <div className="lp-plan">Pro</div>
              <div className="lp-price">20€</div>
              <div className="lp-period">par mois</div>
              <ul className="lp-features">
                {["Chapitres illimités","6 polices au choix","5 thèmes de couleurs","4 styles de mise en page","4 styles de couverture","Génération chapitre/chapitre","Contenu 3× plus détaillé","Relecture IA avancée"].map(f=>(
                  <li key={f} className="lp-feat"><span className="lp-feat-icon">✓</span>{f}</li>
                ))}
              </ul>
              <button className="lp-btn" onClick={onSignup}>Commencer →</button>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <div className="section-eyebrow">Prêt à commencer ?</div>
            <h2 className="section-title" style={{marginBottom:"1rem"}}>Créez votre premier ebook<br/>dès aujourd'hui</h2>
            <p style={{opacity:.5,marginBottom:"2rem",fontSize:".95rem"}}>Rejoignez des milliers d'auteurs qui utilisent EbookAI.</p>
            <button className="btn-primary" onClick={onSignup}>Créer mon compte →</button>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem",width:"100%"}}>
          <div className="footer-copy">© 2026 EbookAI — Tous droits réservés</div>
          <div><button className="footer-link">Confidentialité</button><button className="footer-link">CGU</button><button className="footer-link">Contact</button></div>
        </div>
      </footer>
    </div>
  );
}

// ── Auth ──────────────────────────────────────────────────────
function AuthPage({ mode, onAuth, switchMode, onBack }) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [name,setName]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const isLogin = mode==="login";
  function handleSubmit(){
    setError("");
    if(!email.trim()||!password.trim()){setError("Veuillez remplir tous les champs.");return;}
    if(!email.includes("@")){setError("Adresse email invalide.");return;}
    if(password.length<6){setError("Le mot de passe doit faire au moins 6 caractères.");return;}
    setLoading(true);
    setTimeout(()=>{setLoading(false);onAuth({email,name:name||email.split("@")[0]});},900);
  }
  return (
    <div className="auth-page">
      <div className="auth-glow" />
      <div className="auth-card">
        <div className="auth-logo"><div className="auth-logo-icon">📚</div><div className="auth-logo-text">EbookAI</div></div>
        <h2 className="auth-title">{isLogin?"Bon retour 👋":"Créer un compte"}</h2>
        <p className="auth-sub">{isLogin?"Connectez-vous à votre espace EbookAI.":"Rejoignez des milliers d'auteurs qui utilisent EbookAI."}</p>
        {error&&<div className="auth-error">{error}</div>}
        {!isLogin&&<div className="field-wrap"><label className="field-label">Prénom ou nom</label><input className="field" placeholder="Votre nom" value={name} onChange={e=>setName(e.target.value)} /></div>}
        <div className="field-wrap"><label className="field-label">Adresse email</label><input className="field" type="email" placeholder="vous@exemple.com" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="field-wrap"><label className="field-label">Mot de passe</label><input className="field" type="password" placeholder={isLogin?"Votre mot de passe":"Minimum 6 caractères"} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} /></div>
        <button className="btn-primary" style={{width:"100%",marginTop:".5rem"}} onClick={handleSubmit} disabled={loading}>{loading?"Connexion…":isLogin?"Se connecter →":"Créer mon compte →"}</button>
        <div className="auth-divider">ou</div>
        <button className="btn-outline" style={{width:"100%"}} onClick={onBack}>← Retour à l'accueil</button>
        <div className="auth-switch">{isLogin?"Pas encore de compte ? ":"Déjà un compte ? "}<button onClick={switchMode}>{isLogin?"S'inscrire":"Se connecter"}</button></div>
      </div>
    </div>
  );
}

// ── Pricing ───────────────────────────────────────────────────
function PricingPage({ user, onSelect }) {
  return (
    <div className="page" style={{paddingTop:"5rem"}}>
      <nav className="nav">
        <div className="nav-logo"><div className="nav-logo-icon">📚</div><div className="nav-logo-text">EbookAI</div></div>
        <div className="nav-links"><span style={{fontSize:".85rem",opacity:.5}}>Connecté : {user?.name}</span></div>
      </nav>
      <div style={{padding:"6rem 2rem 4rem",textAlign:"center"}}>
        <div className="section-eyebrow">Choisissez votre offre</div>
        <h2 className="section-title">Quel plan vous convient ?</h2>
        <p style={{opacity:.45,fontSize:".95rem",margin:".8rem auto 3rem",maxWidth:"480px",lineHeight:1.7}}>Commencez avec le Starter ou optez directement pour le Pro pour une qualité maximale.</p>
        <div className="lp-grid" style={{maxWidth:"700px",margin:"0 auto"}}>
          <div className="lp-card" style={{cursor:"pointer"}} onClick={()=>onSelect("starter")}>
            <div className="lp-plan">Starter</div>
            <div className="lp-price">10€</div>
            <div className="lp-period">par mois</div>
            <ul className="lp-features">
              {["Jusqu'à 5 chapitres","6 polices au choix","5 thèmes de couleurs","4 styles de mise en page","4 styles de couverture","Génération rapide"].map(f=>(
                <li key={f} className="lp-feat"><span className="lp-feat-icon">✓</span>{f}</li>
              ))}
              {["Génération chapitre/chapitre","Relecture IA avancée"].map(f=>(
                <li key={f} className="lp-feat"><span className="lp-feat-icon no">✗</span><span style={{opacity:.35}}>{f}</span></li>
              ))}
            </ul>
            <button className="lp-btn" onClick={()=>onSelect("starter")}>Choisir Starter →</button>
          </div>
          <div className="lp-card popular" style={{cursor:"pointer"}} onClick={()=>onSelect("pro")}>
            <div className="lp-popular-tag">⭐ Recommandé</div>
            <div className="lp-plan">Pro</div>
            <div className="lp-price">20€</div>
            <div className="lp-period">par mois</div>
            <ul className="lp-features">
              {["Chapitres illimités","6 polices au choix","5 thèmes de couleurs","4 styles de mise en page","4 styles de couverture","Génération chapitre/chapitre","Contenu 3× plus détaillé","Relecture IA avancée"].map(f=>(
                <li key={f} className="lp-feat"><span className="lp-feat-icon">✓</span>{f}</li>
              ))}
            </ul>
            <button className="lp-btn" onClick={()=>onSelect("pro")}>Choisir Pro →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Generator ─────────────────────────────────────────────────
function Generator({ user, plan, onLogout, onHome }) {
  const [step,setStep]=useState(0);
  const [topic,setTopic]=useState(""); const [audience,setAudience]=useState("");
  const [tone,setTone]=useState(TONES[0].value); const [chapterCount,setChapterCount]=useState(5);
  const [font,setFont]=useState(FONTS[0]); const [theme,setTheme]=useState(THEMES[0]);
  const [layout,setLayout]=useState("classique"); const [coverStyle,setCoverStyle]=useState("gradient");
  const [coverTitle,setCoverTitle]=useState(""); const [coverSubtitle,setCoverSubtitle]=useState("");
  const [authorName,setAuthorName]=useState(user?.name||"");
  const [generating,setGenerating]=useState(false); const [generated,setGenerated]=useState(false);
  const [ebook,setEbook]=useState(null); const [error,setError]=useState("");
  const [progress,setProgress]=useState(0); const [progressLabel,setProgressLabel]=useState("");
  const [expandedCh,setExpandedCh]=useState(null);
  const isPro = plan==="pro"; const maxCh = isPro?999:5;
  const STEPS=[{label:"Contenu",icon:"01"},{label:"Style",icon:"02"},{label:"Couverture",icon:"03"},{label:"Résultat",icon:"04"}];

  async function apiCall(messages,maxTokens=2000){
    const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:maxTokens,messages})});
    const d=await r.json(); return d.content.map(i=>i.text||"").join("").trim();
  }

  async function generateStarter(){
    const text=await apiCall([{role:"user",content:`Tu es un auteur expert. Crée un ebook complet sur : "${topic}". Audience : ${audience||"grand public"}. Ton : ${tone}. Chapitres : ${Math.min(chapterCount,5)}. Titre : "${coverTitle||topic}". Auteur : "${authorName||"Auteur"}".
Réponds UNIQUEMENT en JSON valide :
{"title":"Titre","subtitle":"Sous-titre","author":"${authorName||"Auteur"}","description":"Description 2-3 phrases","introduction":"Introduction 250 mots","chapters":[{"number":1,"title":"Titre","summary":"Résumé","content":"Contenu 400 mots paragraphes séparés par \\n\\n"}],"conclusion":"Conclusion 180 mots","keyTakeaways":["Point 1","Point 2","Point 3","Point 4","Point 5"]}`}],6000);
    return JSON.parse(text.replace(/```json|```/g,"").trim());
  }

  async function generatePro(){
    setProgressLabel("Création de la structure…"); setProgress(5);
    const structText=await apiCall([{role:"user",content:`Plan d'un ebook pro sur : "${topic}". Audience : ${audience||"grand public"}. Ton : ${tone}. Chapitres : ${chapterCount}. Auteur : "${authorName||"Auteur Expert"}".
JSON uniquement : {"title":"Titre percutant","subtitle":"Sous-titre","author":"${authorName||"Auteur Expert"}","description":"Description premium 3 phrases","chapterPlan":[{"number":1,"title":"Titre","summary":"Ce que le lecteur apprend"}]}`}],2000);
    const struct=JSON.parse(structText.replace(/```json|```/g,"").trim()); setProgress(12);
    setProgressLabel("Rédaction de l'introduction…");
    const intro=await apiCall([{role:"user",content:`Introduction professionnelle 400-500 mots pour l'ebook "${struct.title}" sur "${topic}". Ton : ${tone}. Audience : ${audience||"grand public"}. Accroche, problème, solution, promesse. Texte uniquement.`}],1500); setProgress(20);
    const chapters=[];
    for(let i=0;i<struct.chapterPlan.length;i++){
      const ch=struct.chapterPlan[i];
      setProgressLabel(`Chapitre ${i+1}/${struct.chapterPlan.length} : "${ch.title}"…`);
      const content=await apiCall([{role:"user",content:`Contenu COMPLET du chapitre ${ch.number} "${ch.title}" pour ebook pro sur "${topic}". Contexte : ${ch.summary}. Ton : ${tone}. EXIGENCES : 700-900 mots, exemples concrets, conseils actionnables, paragraphes séparés par \\n\\n. Texte uniquement sans titre.`}],3000);
      chapters.push({number:ch.number,title:ch.title,summary:ch.summary,content});
      setProgress(20+Math.round(((i+1)/struct.chapterPlan.length)*60));
    }
    setProgressLabel("Conclusion…");
    const conclusion=await apiCall([{role:"user",content:`Conclusion impactante 250-300 mots pour "${struct.title}" sur "${topic}". Synthèse, motivation à l'action. Ton : ${tone}. Texte uniquement.`}],1000); setProgress(88);
    setProgressLabel("Points clés…");
    const tkText=await apiCall([{role:"user",content:`7 points clés actionnables de l'ebook "${struct.title}" sur "${topic}". JSON uniquement : {"keyTakeaways":["point 1","point 2","point 3","point 4","point 5","point 6","point 7"]}`}],600);
    const {keyTakeaways}=JSON.parse(tkText.replace(/```json|```/g,"").trim());
    setProgressLabel("Relecture IA…"); setProgress(96);
    await new Promise(r=>setTimeout(r,700)); setProgress(100);
    return {title:struct.title,subtitle:struct.subtitle,author:struct.author,description:struct.description,introduction:intro,chapters,conclusion,keyTakeaways};
  }

  async function handleGenerate(){
    if(!topic.trim()) return;
    setGenerating(true); setError(""); setProgress(0); setProgressLabel("Initialisation…");
    try {
      let result;
      if(isPro){result=await generatePro();}
      else{const prog=setInterval(()=>setProgress(p=>Math.min(p+Math.random()*10,88)),500);setProgressLabel("Génération en cours…");result=await generateStarter();clearInterval(prog);setProgress(100);}
      setTimeout(()=>{setEbook(result);setGenerated(true);setGenerating(false);},400);
    } catch(e){setError("Une erreur s'est produite. Réessaie !");setGenerating(false);}
  }

  function downloadEbook(){
    if(!ebook) return;
    const dec=DECORATORS[layout]||DECORATORS.classique;
    const L=[];
    L.push("═".repeat(60)); L.push(ebook.title.toUpperCase()); L.push(ebook.subtitle); L.push(`Par ${ebook.author}`);
    if(isPro) L.push("── Édition PRO ──");
    L.push(`Style : ${layout} · Couverture : ${coverStyle}`);
    L.push("═".repeat(60)); L.push(""); L.push("TABLE DES MATIÈRES"); L.push("─".repeat(40));
    L.push("Introduction"); ebook.chapters.forEach(c=>L.push(`${dec.chapterPrefix} ${c.number} — ${c.title}`));
    L.push("Conclusion"); L.push("Points clés"); L.push("");
    L.push("═".repeat(60)); L.push("INTRODUCTION"); L.push("═".repeat(60)); L.push(""); L.push(ebook.introduction); L.push(dec.separator); L.push("");
    ebook.chapters.forEach(c=>{L.push("═".repeat(60));L.push(`${dec.chapterPrefix} ${c.number} — ${c.title.toUpperCase()}`);L.push("═".repeat(60));L.push("");L.push(c.content);L.push(dec.separator);L.push("");});
    L.push("═".repeat(60)); L.push("CONCLUSION"); L.push("═".repeat(60)); L.push(""); L.push(ebook.conclusion); L.push("");
    L.push("═".repeat(60)); L.push("POINTS CLÉS"); L.push("═".repeat(60)); L.push("");
    ebook.keyTakeaways.forEach((k,i)=>L.push(`  ${i+1}. ${k}`)); L.push(""); L.push("═".repeat(60));
    const blob=new Blob([L.join("\n")],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url; a.download=`${(ebook.title||"ebook").replace(/[^a-z0-9]/gi,"_")}_${isPro?"PRO":"STARTER"}.txt`; a.click();
  }

  function reset(){setStep(0);setGenerated(false);setEbook(null);setTopic("");setCoverTitle("");setCoverSubtitle("");setAudience("");setProgress(0);setExpandedCh(null);}
  const t=theme;

  return (
    <div className="page">
      <nav className="app-nav">
        <div style={{display:"flex",alignItems:"center",gap:".6rem",cursor:"pointer"}} onClick={onHome}>
          <div className="nav-logo-icon">📚</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem"}}>EbookAI</div>
        </div>
        <div className="app-nav-right">
          <div className="plan-pill">{isPro?"⭐ PRO":"◈ Starter"}</div>
          <span style={{fontSize:".82rem",opacity:.4}}>{user?.name}</span>
          <button className="btn-ghost" style={{padding:".5rem .9rem",fontSize:".8rem"}} onClick={onLogout}>Déconnexion</button>
        </div>
      </nav>

      {!generated&&(
        <div className="steps-bar">
          {STEPS.map((s,i)=>(
            <div key={i} className="step-node">
              <div className={`step-dot ${i===step?"sa":i<step?"sd":""}`}>{i<step?"✓":s.icon}</div>
              <div className={`step-lbl ${i===step?"sa":i<step?"sd":""}`}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="app-main">

        {/* STEP 0 — CONTENU */}
        {step===0&&(
          <>
            <div className="sec-title">Votre ebook en quelques infos</div>
            <div className="sec-sub">{isPro?"Mode Pro — contenu ultra-détaillé, chapitre par chapitre.":"Mode Starter — génération rapide, jusqu'à 5 chapitres."}</div>
            <div className="panel">
              <div className="p-label">Sujet principal</div>
              <div className="f-grp"><textarea className="app-field" rows={3} placeholder="Ex : Comment lancer une boutique en ligne rentable en 30 jours..." value={topic} onChange={e=>setTopic(e.target.value)} /></div>
              <div className="f-grp"><label className="f-label">Audience cible (optionnel)</label><input className="app-field" placeholder="Ex : Entrepreneurs débutants, étudiants…" value={audience} onChange={e=>setAudience(e.target.value)} /></div>
            </div>
            <div className="panel">
              <div className="p-label">Ton de rédaction</div>
              <div className="tone-grid">
                {TONES.map(to=>(
                  <button key={to.value} className={`tone-btn ${tone===to.value?"sel":""}`} onClick={()=>setTone(to.value)}>
                    <span style={{fontSize:"1.1rem"}}>{to.icon}</span><span>{to.value}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="panel">
              <div className="p-label">Nombre de chapitres</div>
              <div className="ctr-wrap">
                <button className="ctr-btn" onClick={()=>setChapterCount(c=>Math.max(1,c-1))} disabled={chapterCount<=1}>−</button>
                <div className="ctr-val">{chapterCount}</div>
                <button className="ctr-btn" onClick={()=>setChapterCount(c=>Math.min(c+1,maxCh))}>+</button>
                <div className="ctr-desc">Chapitres<br/><span style={{color:ACCENT,fontSize:".76rem"}}>{isPro?"Illimité · 700-900 mots/ch":"Max 5 · 400 mots/ch"}</span></div>
              </div>
              {!isPro&&chapterCount>=5&&<div className="limit-note">⭐ Passez en Pro pour des chapitres illimités</div>}
            </div>
            <div className="nav-row">
              <button className="nav-next" disabled={!topic.trim()} onClick={()=>setStep(1)}>Continuer →</button>
            </div>
          </>
        )}

        {/* STEP 1 — STYLE */}
        {step===1&&(
          <>
            <div className="sec-title">Personnalisez le style</div>
            <div className="sec-sub">Police, thème, mise en page et style de couverture.</div>

            <div className="panel">
              <div className="p-label">Police de caractères</div>
              <div className="font-grid">
                {FONTS.map(f=>(
                  <button key={f.value} className={`font-btn ${font.value===f.value?"sel":""}`} style={{fontFamily:f.value}} onClick={()=>setFont(f)}>
                    <div>{f.label}</div><div className="font-small">Abc — 123</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="p-label">Thème de couleurs</div>
              <div className="theme-grid">
                {THEMES.map(th=>(
                  <button key={th.label} className={`theme-sw ${theme.label===th.label?"sel":""}`} style={{background:th.bg,color:th.text,border:`2px solid ${theme.label===th.label?th.accent:"transparent"}`}} onClick={()=>setTheme(th)}>
                    <div className="sw-dot" style={{background:th.accent}} />
                    <div className="sw-name" style={{color:th.text,opacity:.6}}>{th.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="p-label">Mise en page du contenu</div>
              <div className="layout-grid">
                {LAYOUTS.map(l=>(
                  <button key={l.value} className={`layout-btn ${layout===l.value?"sel":""}`} onClick={()=>setLayout(l.value)}>
                    <div className="layout-icon">{l.icon}</div>
                    <div className="layout-name">{l.label}</div>
                    <div className="layout-desc">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="p-label">Style de couverture</div>
              <div className="cover-style-grid">
                {COVER_STYLES.map(cs=>(
                  <button key={cs.value} className={`cover-style-btn ${coverStyle===cs.value?"sel":""}`} onClick={()=>setCoverStyle(cs.value)}>
                    <span style={{fontSize:"1.4rem"}}>{cs.icon}</span>
                    <span style={{fontSize:".8rem",fontWeight:600}}>{cs.label}</span>
                  </button>
                ))}
              </div>
              {/* Live cover preview */}
              <div style={{marginTop:"1rem"}}>
                <EbookCover title={coverTitle||topic||"Aperçu de couverture"} subtitle={coverSubtitle} author={authorName||user?.name||"Auteur"} theme={t} font={font} coverStyle={coverStyle} tone={tone} />
              </div>
            </div>

            <div className="nav-row">
              <button className="nav-back" onClick={()=>setStep(0)}>← Retour</button>
              <button className="nav-next" onClick={()=>setStep(2)}>Continuer →</button>
            </div>
          </>
        )}

        {/* STEP 2 — COUVERTURE */}
        {step===2&&(
          <>
            <div className="sec-title">Couverture & identité</div>
            <div className="sec-sub">Finalisez les détails avant la génération.</div>
            <div className="panel">
              <div className="p-label">Informations</div>
              <div className="f-row" style={{marginBottom:"1rem"}}>
                <div><label className="f-label">Titre (optionnel)</label><input className="app-field" placeholder={topic} value={coverTitle} onChange={e=>setCoverTitle(e.target.value)} /></div>
                <div><label className="f-label">Auteur</label><input className="app-field" placeholder="Votre nom" value={authorName} onChange={e=>setAuthorName(e.target.value)} /></div>
              </div>
              <label className="f-label">Sous-titre (optionnel)</label>
              <input className="app-field" placeholder="Le guide ultime pour…" value={coverSubtitle} onChange={e=>setCoverSubtitle(e.target.value)} />
            </div>
            <div className="panel">
              <div className="p-label">Aperçu final de la couverture</div>
              <EbookCover title={coverTitle||topic||"Titre de votre ebook"} subtitle={coverSubtitle} author={authorName||user?.name||"Auteur"} theme={t} font={font} coverStyle={coverStyle} tone={tone} />
            </div>
            <div className="nav-row">
              <button className="nav-back" onClick={()=>setStep(1)}>← Retour</button>
              <button className="nav-next" onClick={()=>{setStep(3);handleGenerate();}}>{isPro?"⭐ Générer en mode Pro":"✦ Générer l'ebook"}</button>
            </div>
          </>
        )}

        {/* STEP 3 — RÉSULTAT */}
        {step===3&&(
          <>
            {generating&&(
              <div className="gen-wrap">
                <div className="gen-ring" />
                <div className="gen-title">{isPro?"Génération Pro…":"Génération en cours…"}</div>
                <div className="gen-sub">{isPro?"Rédaction chapitre par chapitre":"Votre ebook est en cours de rédaction"}</div>
                <div className="gen-label">{progressLabel}</div>
                <div className="prog-bar"><div className="prog-fill" style={{width:`${progress}%`}} /></div>
                <div style={{marginTop:".8rem",fontSize:".7rem",opacity:.3,letterSpacing:1}}>{Math.round(progress)}%</div>
              </div>
            )}
            {error&&<div className="err-box">{error}<br/><button className="btn-ghost" style={{marginTop:"1rem"}} onClick={()=>{setStep(2);setError("");}}>← Réessayer</button></div>}

            {generated&&ebook&&(
              <>
                {/* Visual Cover */}
                <div style={{marginBottom:"1rem"}}>
                  <EbookCover title={ebook.title} subtitle={ebook.subtitle} author={ebook.author} theme={t} font={font} coverStyle={coverStyle} tone={tone} />
                </div>

                {/* Meta */}
                <div className="rs">
                  <div className="rs-lb">Informations</div>
                  <div style={{display:"flex",gap:".5rem",flexWrap:"wrap"}}>
                    {[isPro?"⭐ PRO":"◈ Starter",tone,`${ebook.chapters.length} chapitres`,font.label,LAYOUTS.find(l=>l.value===layout)?.label,COVER_STYLES.find(c=>c.value===coverStyle)?.label].filter(Boolean).map(c=>(
                      <span key={c} style={{padding:".22rem .65rem",border:`1px solid ${ACCENT}44`,borderRadius:20,fontSize:".68rem",color:ACCENT,fontWeight:500}}>{c}</span>
                    ))}
                  </div>
                </div>

                {ebook.description&&<div className="rs" style={{fontFamily:font.value}}><div className="rs-lb">À propos</div><div className="rs-ct">{ebook.description}</div></div>}

                <div className="rs">
                  <div className="rs-lb">Table des matières</div>
                  <ul className="toc-list">
                    {ebook.chapters.map((ch,i)=>(
                      <li key={i} className="toc-it" onClick={()=>setExpandedCh(expandedCh===i?null:i)}>
                        <span className="toc-nm">{String(ch.number).padStart(2,"0")}</span>
                        <div style={{flex:1}}><div className="toc-tl" style={{fontFamily:font.value}}>{ch.title}</div>{ch.summary&&<div className="toc-sm">{ch.summary}</div>}</div>
                        <span style={{color:ACCENT,opacity:.3,fontSize:".8rem"}}>↓</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rs" style={{fontFamily:font.value}}><div className="rs-lb">Introduction</div><div className="rs-ct">{ebook.introduction}</div></div>

                {ebook.chapters.map((ch,i)=>(
                  <div key={i} className="ch-card">
                    <div className="ch-hdr" onClick={()=>setExpandedCh(expandedCh===i?null:i)}>
                      <span className="ch-nm">{String(ch.number).padStart(2,"0")}</span>
                      <div className="ch-inf"><div className="ch-tl" style={{fontFamily:font.value}}>{ch.title}</div>{ch.summary&&<div className="ch-sm">{ch.summary}</div>}</div>
                      <span className={`ch-tog ${expandedCh===i?"open":""}`}>▼</span>
                    </div>
                    {expandedCh===i&&(
                      <div className="ch-body">
                        <ChapterContent content={ch.content} layout={layout} theme={t} font={font} />
                      </div>
                    )}
                  </div>
                ))}

                <div className="rs" style={{fontFamily:font.value}}><div className="rs-lb">Conclusion</div><div className="rs-ct">{ebook.conclusion}</div></div>

                <div className="rs" style={{fontFamily:font.value}}>
                  <div className="rs-lb">Points clés à retenir</div>
                  {ebook.keyTakeaways.map((k,i)=>(
                    <div key={i} className="tk-it"><div className="tk-ic">{i+1}</div><span style={{fontSize:".87rem",lineHeight:1.6}}>{k}</span></div>
                  ))}
                </div>

                <div className="act-bar">
                  <button className="btn-ghost" onClick={reset}>↩ Nouveau</button>
                  <button className="act-solid" onClick={downloadEbook}>⬇ Télécharger</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
