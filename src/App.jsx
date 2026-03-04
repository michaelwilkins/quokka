import { useState, useRef, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Nunito+Sans:wght@300;400;600&display=swap";
document.head.appendChild(fontLink);

const css = document.createElement("style");
css.textContent = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --white:#FFFFFF;
  --bg:#F0F4FF;
  --bg2:#E8EFFE;
  --ink:#1A1A2E;
  --ink2:#4A4A6A;
  --ink3:#9898B8;
  --purple:#5B4FE8;
  --purple2:#7B6FFF;
  --purple-pale:#EEEEFF;
  --teal:#00C9A7;
  --teal-pale:#E0FAF5;
  --orange:#FF7043;
  --orange-pale:#FFF0EC;
  --border:#DDE3F8;
}
html,body{height:100%;font-family:'Nunito Sans',sans-serif;background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased}
.bold{font-family:'Nunito',sans-serif}

/* ── QUOKKA SVG CHARACTER ── */
.quokka-wrap{display:flex;justify-content:center;margin-bottom:8px}
.quokka-sm{width:80px;height:80px}
.quokka-md{width:120px;height:120px}
.quokka-lg{width:160px;height:160px}
.quokka-bounce{animation:qbounce 2.8s ease-in-out infinite}
.quokka-nod{animation:qnod 2s ease-in-out infinite}
@keyframes qbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes qnod{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-4deg)}60%{transform:rotate(3deg)}}

/* ── ONE-AT-A-TIME FLOW ── */
.flow-page{
  min-height:100vh;background:var(--white);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:40px 24px;text-align:center;
  animation:fadeUp 0.4s ease both;
}
.flow-logo{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:10}
.flow-logo-text{font-family:'Nunito',sans-serif;font-size:20px;font-weight:900;color:var(--purple);letter-spacing:-0.02em}
.flow-q{font-family:'Nunito',sans-serif;font-size:clamp(22px,4vw,32px);font-weight:700;color:var(--ink);margin-bottom:28px;line-height:1.3;max-width:440px}
.flow-input{
  font-family:'Nunito',sans-serif;font-size:clamp(24px,5vw,36px);font-weight:800;
  color:var(--ink);background:none;border:none;border-bottom:2.5px dashed var(--border);
  text-align:center;outline:none;width:100%;max-width:380px;padding:8px 4px 12px;
  transition:border-color 0.2s;margin-bottom:32px;
}
.flow-input:focus{border-color:var(--purple)}
.flow-input::placeholder{color:var(--ink3)}
.next-btn{
  background:var(--purple);color:#fff;border:none;
  padding:16px 48px;border-radius:50px;
  font-family:'Nunito',sans-serif;font-size:18px;font-weight:800;
  cursor:pointer;transition:all 0.2s;letter-spacing:-0.01em;
  box-shadow:0 4px 20px rgba(91,79,232,0.35);
}
.next-btn:hover{background:var(--purple2);transform:scale(1.04);box-shadow:0 6px 28px rgba(91,79,232,0.45)}
.next-btn:disabled{background:var(--border);color:var(--ink3);box-shadow:none;transform:none;cursor:not-allowed}
.skip-link{margin-top:18px;font-size:14px;color:var(--ink3);cursor:pointer;background:none;border:none;font-family:'Nunito Sans',sans-serif}
.skip-link:hover{color:var(--purple)}

/* ── STEP DOTS ── */
.step-dots{display:flex;gap:8px;margin-bottom:32px}
.sdot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all 0.2s}
.sdot.on{background:var(--purple);width:24px;border-radius:4px}
.sdot.done{background:var(--purple);opacity:0.35}

/* ── OPTION CARDS ── */
.option-grid{display:flex;flex-direction:column;gap:10px;width:100%;max-width:400px;margin-bottom:28px}
.opt-card{
  display:flex;align-items:center;gap:14px;padding:16px 20px;
  background:var(--white);border:2.5px solid var(--border);border-radius:16px;
  cursor:pointer;transition:all 0.15s;text-align:left;
  font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;color:var(--ink);
}
.opt-card:hover{border-color:var(--purple);background:var(--purple-pale)}
.opt-card.on{border-color:var(--purple);background:var(--purple-pale);color:var(--purple)}
.opt-emoji{font-size:22px;width:36px;text-align:center;flex-shrink:0}

/* ── PROVIDER GRID ── */
.provider-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:400px;margin-bottom:28px}
.prov-card{
  padding:16px 12px;border:2.5px solid var(--border);border-radius:16px;
  cursor:pointer;text-align:center;transition:all 0.15s;background:var(--white);
}
.prov-card:hover{border-color:var(--purple);background:var(--purple-pale)}
.prov-card.on{border-color:var(--purple);background:var(--purple-pale)}
.prov-name{font-family:'Nunito',sans-serif;font-size:15px;font-weight:800;color:var(--ink)}
.prov-model{font-size:12px;color:var(--ink3);margin-top:3px;font-weight:400}
.api-input-wrap{width:100%;max-width:400px;margin-bottom:8px}
.api-input{
  width:100%;padding:14px 18px;border:2.5px solid var(--border);border-radius:14px;
  font-family:'Nunito Sans',sans-serif;font-size:15px;background:var(--bg);color:var(--ink);
  outline:none;transition:border 0.15s;font-weight:600;
}
.api-input:focus{border-color:var(--purple)}
.api-hint{font-size:12px;color:var(--ink3);margin-bottom:24px;max-width:360px;line-height:1.5}

/* ── AGE ROW ── */
.age-row{display:flex;align-items:center;gap:16px;margin-bottom:32px}
.age-btn{
  width:48px;height:48px;border-radius:50%;border:2.5px solid var(--border);
  background:var(--white);font-family:'Nunito',sans-serif;font-size:22px;font-weight:800;
  cursor:pointer;transition:all 0.15s;color:var(--ink);
}
.age-btn:hover{border-color:var(--purple);color:var(--purple)}
.age-val{font-family:'Nunito',sans-serif;font-size:52px;font-weight:900;color:var(--ink);width:80px;text-align:center;line-height:1}

/* ── SHELL + TABS ── */
.shell{min-height:100vh;background:var(--bg);display:flex;flex-direction:column}
.topbar{height:56px;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;flex-shrink:0}
.tlogo{font-family:'Nunito',sans-serif;font-size:20px;font-weight:900;color:var(--purple);letter-spacing:-0.02em}
.tright{margin-left:auto;display:flex;align-items:center;gap:10px}
.tav{width:34px;height:34px;border-radius:50%;background:var(--purple);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Nunito',sans-serif;font-weight:900;font-size:14px}
.tname{font-size:13px;font-weight:600;color:var(--ink2)}
.tbtn{background:none;border:2px solid var(--border);padding:7px 16px;border-radius:20px;font-size:12px;font-weight:800;cursor:pointer;color:var(--ink2);font-family:'Nunito',sans-serif;transition:all 0.15s}
.tbtn:hover{border-color:var(--purple);color:var(--purple)}
.tbtn.accent{background:var(--purple);color:#fff;border-color:var(--purple)}
.tbtn.accent:hover{background:var(--purple2)}

/* ── DASHBOARD ── */
.dash{padding:32px 24px;max-width:880px;margin:0 auto;width:100%}
.dash-hi{font-family:'Nunito',sans-serif;font-size:clamp(28px,5vw,40px);font-weight:900;letter-spacing:-0.02em;margin-bottom:4px}
.dash-sub{font-size:15px;color:var(--ink2);margin-bottom:32px}
.slabel{font-size:11px;font-weight:800;letter-spacing:0.1em;color:var(--ink3);margin-bottom:12px;text-transform:uppercase}
.kids-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;margin-bottom:32px}
.kid-card{background:var(--white);border:2px solid var(--border);border-radius:20px;padding:22px;cursor:pointer;transition:all 0.18s}
.kid-card:hover{border-color:var(--purple);transform:translateY(-3px);box-shadow:0 8px 32px rgba(91,79,232,0.12)}
.kid-av{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Nunito',sans-serif;font-weight:900;font-size:22px;margin-bottom:12px}
.kid-av.a{background:var(--teal-pale);color:var(--teal)}
.kid-av.b{background:var(--orange-pale);color:var(--orange)}
.kid-name{font-family:'Nunito',sans-serif;font-size:18px;font-weight:900;letter-spacing:-0.01em;margin-bottom:2px}
.kid-meta{font-size:12px;color:var(--ink3);font-weight:600;margin-bottom:14px}
.kid-log{border-top:1px solid var(--border);padding-top:12px;min-height:44px}
.log-empty{font-size:13px;color:var(--ink3);font-style:italic}
.log-q{display:flex;gap:6px;font-size:12px;color:var(--ink2);margin-bottom:5px;align-items:flex-start}
.lbadge{background:var(--purple-pale);color:var(--purple);font-size:10px;font-weight:800;padding:1px 6px;border-radius:4px;flex-shrink:0;margin-top:1px}
.open-btn{margin-top:14px;width:100%;padding:12px;border-radius:30px;background:var(--purple);color:#fff;border:none;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:background 0.15s}
.open-btn:hover{background:var(--purple2)}

/* ── QUOKKA PANEL ── */
.q-panel{background:var(--white);border:2px solid var(--border);border-radius:20px;padding:22px 24px;display:flex;gap:16px;align-items:flex-start}
.q-panel-info{flex:1}
.q-panel-name{font-family:'Nunito',sans-serif;font-size:20px;font-weight:900;letter-spacing:-0.01em;margin-bottom:2px}
.q-panel-sub{font-size:13px;color:var(--ink3);margin-bottom:12px;font-weight:400}
.traits{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.tr{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:800;font-family:'Nunito',sans-serif}
.tr-s{background:var(--purple-pale);color:var(--purple)}
.tr-r{background:var(--teal-pale);color:#00897B}
.tr-m{background:var(--orange-pale);color:var(--orange)}
.edit-row{display:flex;gap:8px;flex-wrap:wrap}
.edit-btn{display:inline-flex;align-items:center;gap:5px;background:none;border:2px solid var(--border);border-radius:20px;padding:8px 16px;font-size:12px;font-weight:800;cursor:pointer;color:var(--ink2);font-family:'Nunito',sans-serif;transition:all 0.15s}
.edit-btn:hover{border-color:var(--purple);color:var(--purple)}

/* ── NOTIFY ── */
.notify{background:var(--white);border:2px solid var(--purple);border-radius:16px;padding:14px 18px;margin-bottom:22px;display:flex;align-items:center;gap:12px;animation:fadeUp 0.3s ease both}
.notify-text{font-size:14px;font-weight:600;color:var(--ink);flex:1;font-family:'Nunito',sans-serif}
.notify-cta{background:var(--purple);color:#fff;border:none;border-radius:20px;padding:8px 16px;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;white-space:nowrap}
.notify-x{background:none;border:none;font-size:18px;color:var(--ink3);cursor:pointer;padding:0 4px}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;background:rgba(26,26,46,0.5);z-index:200;display:grid;place-items:center;padding:20px;animation:fadein 0.2s ease}
.modal{background:var(--white);border-radius:24px;padding:32px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;animation:fadeUp 0.3s ease both;border:2px solid var(--border)}
.modal-title{font-family:'Nunito',sans-serif;font-size:24px;font-weight:900;letter-spacing:-0.02em;margin-bottom:4px}
.modal-sub{font-size:14px;color:var(--ink2);margin-bottom:24px}
.field{margin-bottom:16px}
.flabel{display:block;font-size:11px;font-weight:800;letter-spacing:0.1em;color:var(--ink3);margin-bottom:7px;text-transform:uppercase}
.finput{width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:12px;font-size:15px;font-family:'Nunito',sans-serif;font-weight:600;background:var(--bg);color:var(--ink);outline:none;transition:border 0.15s}
.finput:focus{border-color:var(--purple)}
.tag-wrap{display:flex;flex-wrap:wrap;gap:7px;margin-top:7px}
.tag{padding:7px 15px;border-radius:20px;border:2px solid var(--border);font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;color:var(--ink2);background:none;transition:all 0.12s}
.tag.on{background:var(--purple);color:#fff;border-color:var(--purple)}
.tag.rule.on{background:var(--teal);border-color:var(--teal)}
.modal-actions{display:flex;gap:10px;margin-top:24px}
.btn-cancel{flex:1;padding:13px;border-radius:30px;background:none;border:2px solid var(--border);font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;color:var(--ink2)}
.btn-save{flex:2;padding:13px;border-radius:30px;background:var(--purple);color:#fff;border:none;font-size:14px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif}
.btn-save:hover{background:var(--purple2)}

/* ── CHAT ── */
.chat-shell{display:flex;flex-direction:column;height:100vh}
.chat-top{height:56px;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:12px;flex-shrink:0}
.chat-q-av{width:40px;height:40px;border-radius:50%;background:var(--purple-pale);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
.chat-q-name{font-family:'Nunito',sans-serif;font-size:16px;font-weight:900;color:var(--ink)}
.chat-q-sub{font-size:11px;color:var(--ink3);font-weight:600}
.chat-back{margin-left:auto;background:none;border:2px solid var(--border);color:var(--ink2);border-radius:20px;padding:7px 16px;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all 0.15s}
.chat-back:hover{border-color:var(--purple);color:var(--purple)}
.chat-feed{flex:1;overflow-y:auto;padding:24px 16px}
.chat-inner{max-width:620px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.msg-u{align-self:flex-end;background:var(--purple);color:#fff;padding:13px 18px;border-radius:20px 20px 4px 20px;max-width:70%;font-size:15px;line-height:1.55;font-weight:600;font-family:'Nunito',sans-serif}
.msg-a{align-self:flex-start;background:var(--white);border:2px solid var(--border);padding:14px 18px;border-radius:4px 20px 20px 20px;max-width:80%;font-size:15px;line-height:1.7}
.msg-a p{margin-bottom:8px}.msg-a p:last-child{margin-bottom:0}
.msg-a ol,.msg-a ul{padding-left:20px;margin:8px 0}
.msg-a li{margin-bottom:5px}
.msg-a strong{font-weight:800;color:var(--ink)}
.typing-row{align-self:flex-start;background:var(--white);border:2px solid var(--border);padding:14px 18px;border-radius:4px 20px 20px 20px;display:flex;gap:5px;align-items:center}
.dot{width:7px;height:7px;border-radius:50%;background:var(--ink3);animation:bob 1.2s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}
.empty-chat{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:320px;text-align:center;animation:fadeUp 0.5s ease both;padding:40px}
.empty-h{font-family:'Nunito',sans-serif;font-size:26px;font-weight:900;letter-spacing:-0.02em;margin-bottom:6px;margin-top:8px}
.empty-p{font-size:14px;color:var(--ink2);max-width:260px;line-height:1.65}
.chat-foot{background:var(--white);border-top:1px solid var(--border);padding:16px 16px;flex-shrink:0}
.chat-foot-inner{max-width:620px;margin:0 auto}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px}
.chip{padding:8px 16px;border:2px solid var(--border);border-radius:20px;font-size:13px;font-weight:700;background:none;cursor:pointer;color:var(--ink2);font-family:'Nunito',sans-serif;transition:all 0.12s}
.chip:hover{border-color:var(--purple);color:var(--purple);background:var(--purple-pale)}
.input-row{display:flex;gap:8px}
.chat-ta{flex:1;padding:13px 16px;border:2px solid var(--border);border-radius:14px;font-size:15px;font-family:'Nunito Sans',sans-serif;font-weight:600;background:var(--bg);color:var(--ink);resize:none;outline:none;line-height:1.5;transition:border 0.15s;max-height:100px}
.chat-ta:focus{border-color:var(--purple)}
.send{width:48px;height:48px;border-radius:14px;background:var(--purple);color:#fff;border:none;cursor:pointer;font-size:20px;transition:background 0.15s;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:900}
.send:hover{background:var(--purple2)}
.send:disabled{background:var(--border);cursor:not-allowed}
.no-llm-bar{background:var(--orange-pale);border:2px solid rgba(255,112,67,0.3);border-radius:12px;padding:12px 16px;margin-bottom:12px;font-size:13px;font-weight:700;color:var(--orange);display:flex;align-items:center;gap:8px;font-family:'Nunito',sans-serif}
.no-llm-bar button{background:var(--orange);color:#fff;border:none;border-radius:20px;padding:7px 14px;font-size:12px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;margin-left:auto;white-space:nowrap}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes bob{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
`;
document.head.appendChild(css);

// ── QUOKKA SVG ────────────────────────────────────────────────────────────────
const QuokkaSVG = ({ size = "md", anim = "bounce" }) => (
  <div className={`quokka-wrap`}>
    <svg className={`quokka-${size} quokka-${anim}`} viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="158" rx="54" ry="58" fill="#C8896A"/>
      <ellipse cx="100" cy="165" rx="36" ry="44" fill="#F0D9BE"/>
      {/* Tail */}
      <path d="M142,175 C158,168 168,155 165,142 C162,130 152,126 144,132 C136,138 136,152 142,175Z" fill="#C8896A"/>
      {/* Left arm */}
      <path d="M56,148 C44,152 36,164 38,176 C40,184 50,186 58,180 C66,174 66,158 56,148Z" fill="#C8896A"/>
      {/* Right arm */}
      <path d="M144,148 C156,152 164,164 162,176 C160,184 150,186 142,180 C134,174 134,158 144,148Z" fill="#C8896A"/>
      {/* Head */}
      <ellipse cx="100" cy="104" rx="46" ry="44" fill="#C8896A"/>
      {/* Left ear */}
      <path d="M68,76 C60,56 60,36 68,26 C74,18 82,18 88,26 C94,34 92,54 84,72Z" fill="#C8896A"/>
      <path d="M70,72 C64,56 64,38 70,30 C74,24 80,24 84,30 C88,36 86,52 80,68Z" fill="#E8A090" opacity="0.8"/>
      {/* Right ear */}
      <path d="M132,76 C140,56 140,36 132,26 C126,18 118,18 112,26 C106,34 108,54 116,72Z" fill="#C8896A"/>
      <path d="M130,72 C136,56 136,38 130,30 C126,24 120,24 116,30 C112,36 114,52 120,68Z" fill="#E8A090" opacity="0.8"/>
      {/* Cheeks */}
      <ellipse cx="78" cy="114" rx="13" ry="10" fill="#E8957A" opacity="0.3"/>
      <ellipse cx="122" cy="114" rx="13" ry="10" fill="#E8957A" opacity="0.3"/>
      {/* Muzzle */}
      <ellipse cx="100" cy="120" rx="18" ry="14" fill="#DFB890" opacity="0.6"/>
      {/* Eyes */}
      <ellipse cx="86" cy="104" rx="9" ry="9" fill="white"/>
      <ellipse cx="88" cy="105" rx="6" ry="7" fill="#2D1A0A"/>
      <ellipse cx="90" cy="103" rx="2" ry="1.8" fill="white" opacity="0.85"/>
      {/* Eyelid */}
      <path d="M77,102 C80,97 84,95 86,95 C88,95 92,97 95,102" fill="none" stroke="#2D1A0A" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="114" cy="104" rx="9" ry="9" fill="white"/>
      <ellipse cx="112" cy="105" rx="6" ry="7" fill="#2D1A0A"/>
      <ellipse cx="116" cy="103" rx="2" ry="1.8" fill="white" opacity="0.85"/>
      <path d="M105,102 C108,97 112,95 114,95 C116,95 120,97 123,102" fill="none" stroke="#2D1A0A" strokeWidth="2" strokeLinecap="round"/>
      {/* Nose */}
      <ellipse cx="100" cy="118" rx="5" ry="4" fill="#3D2010"/>
      <ellipse cx="102" cy="116" rx="1.5" ry="1" fill="white" opacity="0.4"/>
      {/* THE SMILE */}
      <path d="M90,127 C94,133 100,135 100,135 C100,135 106,133 110,127" fill="none" stroke="#3D2010" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Leg left */}
      <path d="M74,196 C66,202 60,210 62,218 C64,224 72,224 80,218 C86,212 86,200 74,196Z" fill="#B87850"/>
      {/* Leg right */}
      <path d="M126,196 C134,202 140,210 138,218 C136,224 128,224 120,218 C114,212 114,200 126,196Z" fill="#B87850"/>
    </svg>
  </div>
);

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const DEFAULT_TEACHER = {
  name: "Quokka",
  styles: ["Encouraging", "Curious", "Step-by-step"],
  rules: ["Never write homework answers", "Guide children to think", "Use simple language"],
};
const STYLES = ["Encouraging","Curious","Step-by-step","Asks questions","Playful","Patient","Structured"];
const RULES  = ["Never write homework answers","Guide children to think","Use simple language","Avoid mature topics","Always ask a follow-up question","Show steps for maths"];
const LEVELS = ["Beginner","Intermediate","Advanced"];

// Calls your Vercel serverless function — API key never touches the browser
async function callBackend(messages, child, teacher) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, child, teacher }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data.reply;
}

function renderMd(text) {
  text = text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
  const lines = text.split("\n"); let html="",inOl=false,inUl=false;
  for(const line of lines){
    const ol=line.match(/^\d+\.\s(.+)/),ul=line.match(/^[-•]\s(.+)/);
    if(ol){if(!inOl){html+="<ol>";inOl=true}html+=`<li>${ol[1]}</li>`}
    else if(ul){if(!inUl){html+="<ul>";inUl=true}html+=`<li>${ul[1]}</li>`}
    else{if(inOl){html+="</ol>";inOl=false}if(inUl){html+="</ul>";inUl=false}if(line.trim())html+=`<p>${line}</p>`}
  }
  if(inOl)html+="</ol>";if(inUl)html+="</ul>";return html;
}

// ── MODALS ────────────────────────────────────────────────────────────────────
function SageModal({ teacher, onSave, onClose }) {
  const [name,setName] = useState(teacher.name);
  const [styles,setStyles] = useState([...teacher.styles]);
  const [rules,setRules] = useState([...teacher.rules]);
  const tog=(arr,set,v)=>set(p=>p.includes(v)?p.filter(x=>x!==v):[...p,v]);
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <QuokkaSVG size="sm" anim="nod"/>
        <div className="modal-title">Customise Quokka</div>
        <div className="modal-sub">Shape how Quokka teaches your children.</div>
        <div className="field"><label className="flabel">Name</label><input className="finput" value={name} onChange={e=>setName(e.target.value)} placeholder="Quokka"/></div>
        <div className="field"><label className="flabel">Teaching style</label><div className="tag-wrap">{STYLES.map(s=><button key={s} className={`tag ${styles.includes(s)?"on":""}`} onClick={()=>tog(styles,setStyles,s)}>{s}</button>)}</div></div>
        <div className="field" style={{marginTop:14}}><label className="flabel">Rules</label><div className="tag-wrap">{RULES.map(r=><button key={r} className={`tag rule ${rules.includes(r)?"on":""}`} onClick={()=>tog(rules,setRules,r)}>{r}</button>)}</div></div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={()=>onSave({name:name||"Quokka",styles,rules})}>Save</button>
        </div>
      </div>
    </div>
  );
}

// Provider is now handled server-side — no modal needed

// ── ONBOARDING: one-at-a-time steps ──────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="step-dots">
      {Array.from({length: total}).map((_, i) => (
        <div key={i} className={`sdot ${i < current ? "done" : i === current ? "on" : ""}`} />
      ))}
    </div>
  );
}

function OnboardFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [parentName, setParentName] = useState("");
  const [firstChild, setFirstChild] = useState({ name: "", age: 8, level: "Beginner" });
  const [secondChild, setSecondChild] = useState({ name: "", age: 8, level: "Beginner" });

  const LEVELS_INFO = [
    { v: "Beginner", e: "🌱", d: "Still building the basics" },
    { v: "Intermediate", e: "📚", d: "Comfortable, growing fast" },
    { v: "Advanced", e: "🚀", d: "Loves a challenge" },
  ];

  if (step === 0) return (
    <div className="flow-page">
      <StepDots current={0} total={5} />
      <QuokkaSVG size="md" anim="bounce" />
      <div className="flow-q">Hey! I'm Quokka 👋<br />What's your name?</div>
      <input className="flow-input" placeholder="Your name" value={parentName} autoFocus
        onChange={e => setParentName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && parentName.trim() && setStep(1)} />
      <button className="next-btn" disabled={!parentName.trim()} onClick={() => setStep(1)}>Next</button>
    </div>
  );

  if (step === 1) return (
    <div className="flow-page">
      <StepDots current={1} total={5} />
      <QuokkaSVG size="md" anim="nod" />
      <div className="flow-q">Nice to meet you, {parentName}!<br />What's your child's name?</div>
      <input className="flow-input" placeholder="e.g. Emma" value={firstChild.name} autoFocus
        onChange={e => setFirstChild(d => ({ ...d, name: e.target.value }))}
        onKeyDown={e => e.key === "Enter" && firstChild.name.trim() && setStep(2)} />
      <button className="next-btn" disabled={!firstChild.name.trim()} onClick={() => setStep(2)}>Next</button>
    </div>
  );

  if (step === 2) return (
    <div className="flow-page">
      <StepDots current={2} total={5} />
      <QuokkaSVG size="md" anim="bounce" />
      <div className="flow-q">How old is {firstChild.name}?</div>
      <div className="age-row">
        <button className="age-btn" onClick={() => setFirstChild(d => ({ ...d, age: Math.max(4, d.age - 1) }))}>−</button>
        <div className="age-val">{firstChild.age}</div>
        <button className="age-btn" onClick={() => setFirstChild(d => ({ ...d, age: Math.min(17, d.age + 1) }))}>+</button>
      </div>
      <button className="next-btn" onClick={() => setStep(3)}>Next</button>
    </div>
  );

  if (step === 3) return (
    <div className="flow-page">
      <StepDots current={3} total={5} />
      <QuokkaSVG size="md" anim="nod" />
      <div className="flow-q">How would you describe<br />{firstChild.name}'s learning?</div>
      <div className="option-grid">
        {LEVELS_INFO.map(o => (
          <button key={o.v} className={`opt-card ${firstChild.level === o.v ? "on" : ""}`}
            onClick={() => setFirstChild(d => ({ ...d, level: o.v }))}>
            <span className="opt-emoji">{o.e}</span>
            <div>
              <div>{o.v}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "var(--ink3)", marginTop: 2 }}>{o.d}</div>
            </div>
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={() => setStep(4)}>Next</button>
    </div>
  );

  if (step === 4) return (
    <div className="flow-page">
      <StepDots current={4} total={5} />
      <QuokkaSVG size="md" anim="bounce" />
      <div className="flow-q">Got it! Any other<br />children learning with you?</div>
      <div className="option-grid" style={{ maxWidth: 340 }}>
        <button className="opt-card" onClick={() => setStep(5)}>
          <span className="opt-emoji">👋</span>
          <div>Yes, add another child</div>
        </button>
        <button className="opt-card" onClick={() => onComplete({ parentName, children: [firstChild] })}>
          <span className="opt-emoji">✅</span>
          <div>Nope, we're ready!</div>
        </button>
      </div>
    </div>
  );

  if (step === 5) return (
    <div className="flow-page">
      <StepDots current={4} total={5} />
      <QuokkaSVG size="md" anim="nod" />
      <div className="flow-q">What's their name?</div>
      <input className="flow-input" placeholder="e.g. Lucas" value={secondChild.name} autoFocus
        onChange={e => setSecondChild(d => ({ ...d, name: e.target.value }))}
        onKeyDown={e => e.key === "Enter" && secondChild.name.trim() && setStep(6)} />
      <button className="next-btn" disabled={!secondChild.name.trim()} onClick={() => setStep(6)}>Next</button>
    </div>
  );

  if (step === 6) return (
    <div className="flow-page">
      <QuokkaSVG size="md" anim="bounce" />
      <div className="flow-q">How old is {secondChild.name}?</div>
      <div className="age-row">
        <button className="age-btn" onClick={() => setSecondChild(d => ({ ...d, age: Math.max(4, d.age - 1) }))}>−</button>
        <div className="age-val">{secondChild.age}</div>
        <button className="age-btn" onClick={() => setSecondChild(d => ({ ...d, age: Math.min(17, d.age + 1) }))}>+</button>
      </div>
      <button className="next-btn" onClick={() => onComplete({ parentName, children: [firstChild, secondChild] })}>
        Done! Let's go →
      </button>
    </div>
  );

  return null;
}

// ── CHAT VIEW ─────────────────────────────────────────────────────────────────
function ChatView({ child, teacher, messages, loading, onSend, onBack }) {
  const [input,setInput] = useState("");
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);

  const send = (text) => {
    const t = text||input.trim();
    if(!t||loading) return;
    onSend(t); setInput("");
  };

  return (
    <div className="chat-shell">
      <div className="chat-top">
        <div className="chat-q-av"><QuokkaSVG size="sm" anim="bounce"/></div>
        <div><div className="chat-q-name">{teacher.name}</div><div className="chat-q-sub">with {child.name}, age {child.age}</div></div>
        <button className="chat-back" onClick={onBack}>← Dashboard</button>
      </div>
      <div className="chat-feed">
        <div className="chat-inner">
          {messages.length===0 ? (
            <div className="empty-chat">
              <QuokkaSVG size="lg" anim="bounce"/>
              <div className="empty-h">Hi {child.name}! 👋</div>
              <p className="empty-p">I'm {teacher.name}. Ask me anything — I'll help you think it through.</p>
            </div>
          ) : messages.map((m,i)=>
            m.role==="user"
              ? <div key={i} className="msg-u">{m.content}</div>
              : <div key={i} className="msg-a" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/>
          )}
          {loading && <div className="typing-row"><div className="dot"/><div className="dot"/><div className="dot"/></div>}
          <div ref={endRef}/>
        </div>
      </div>
      <div className="chat-foot">
        <div className="chat-foot-inner">
          {messages.length===0 && (
            <div className="chips">
              {["Why is the sky blue?","Help me understand fractions","Tell me about dinosaurs","Help me plan a story"].map(s=>(
                <button key={s} className="chip" onClick={()=>send(s)}>{s}</button>
              ))}
            </div>
          )}
          <div className="input-row">
            <textarea className="chat-ta" rows={1} placeholder={`Ask ${teacher.name} anything…`}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(e.target.value);e.target.value=""}}}
            />
            <button className="send" disabled={loading}
              onClick={e=>{const ta=e.target.closest(".chat-foot").querySelector(".chat-ta");send(ta.value);ta.value=""}}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,setView]           = useState("landing");
  const [parent,setParent]       = useState(null);
  const [children,setChildren]   = useState([]);
  const [teacher,setTeacher]     = useState(DEFAULT_TEACHER);
  const [activeChild,setActive]  = useState(null);
  const [logs,setLogs]           = useState({});
  const [modal,setModal]         = useState(null); // null | "sage"
  const [loading,setLoading]     = useState(false);
  const [nudge,setNudge]         = useState(false);
  const [nudgeSeen,setNudgeSeen] = useState(false);

  const totalQ = Object.values(logs).reduce((a,m)=>a+m.filter(x=>x.role==="user").length,0);
  useEffect(()=>{
    if(totalQ===3&&!nudgeSeen&&view==="dashboard"){setNudge(true);setNudgeSeen(true)}
  },[totalQ]);

  const handleSend = async (text) => {
    if(!text.trim()||loading) return;
    const key=activeChild.name;
    const existing=logs[key]||[];
    const userMsg={role:"user",content:text};
    const updated=[...existing,userMsg];
    setLogs(p=>({...p,[key]:updated}));
    setLoading(true);
    try {
      const reply = await callBackend(updated, activeChild, teacher);
      setLogs(p=>({...p,[key]:[...(p[key]||[]),{role:"assistant",content:reply}]}));
    } catch(e) {
      setLogs(p=>({...p,[key]:[...(p[key]||[]),{role:"assistant",content:`Hmm, something went wrong — ${e.message}. Try again!`}]}));
    }
    setLoading(false);
  };

  // LANDING
  if(view==="landing") return (
    <div className="flow-page" style={{background:"var(--white)",gap:0}}>
      <div style={{marginBottom:4}}><span className="flow-logo-text" style={{fontSize:28}}>quokka</span></div>
      <div style={{marginBottom:24}}/>
      <QuokkaSVG size="lg" anim="bounce"/>
      <h1 style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:"clamp(32px,7vw,52px)",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:14,marginTop:8}}>
        Your child's<br/>AI tutor.
      </h1>
      <p style={{fontSize:17,color:"var(--ink2)",maxWidth:320,lineHeight:1.65,marginBottom:36,fontWeight:400}}>
        Bring your own AI model. Quokka applies the guardrails — guiding thinking, never giving answers.
      </p>
      <button className="next-btn" onClick={()=>setView("onboard")}>
        <svg style={{width:20,height:20,marginRight:8,verticalAlign:"middle"}} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <div style={{marginTop:14,fontSize:12,color:"var(--ink3)"}}>Free to start · Your API key, your cost</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginTop:36,maxWidth:380}}>
        {["🔑 BYO API key","🛡️ We provide guardrails","🧠 Guides thinking","👁️ Parents see everything"].map(p=>(
          <span key={p} style={{background:"var(--bg)",border:"2px solid var(--border)",padding:"7px 14px",borderRadius:30,fontSize:13,fontWeight:700,color:"var(--ink2)",fontFamily:"'Nunito',sans-serif"}}>{p}</span>
        ))}
      </div>
    </div>
  );

  // ONBOARD
  if(view==="onboard") return (
    <>
      <div className="flow-logo"><span className="flow-logo-text">quokka</span></div>
      <OnboardFlow onComplete={({parentName,children:kids})=>{
        setParent({name:parentName}); setChildren(kids); setView("dashboard");
      }}/>
    </>
  );

  // DASHBOARD
  if(view==="dashboard") return (
    <div className="shell">
      <div className="topbar">
        <div className="tlogo">quokka</div>
        <div className="tright">
          <div className="tav">{parent.name[0]}</div>
          <span className="tname">{parent.name}</span>
          <button className="tbtn" onClick={()=>{setView("landing");setParent(null);setChildren([]);setLogs({});setTeacher(DEFAULT_TEACHER)}}>Sign out</button>
        </div>
      </div>
      <div className="dash">
        {nudge&&(
          <div className="notify">
            <span className="notify-text">💡 Quokka's doing great! Want to customise how they teach?</span>
            <button className="notify-cta" onClick={()=>{setModal("sage");setNudge(false)}}>Customise</button>
            <button className="notify-x" onClick={()=>setNudge(false)}>×</button>
          </div>
        )}
        <div className="dash-hi">Hey, {parent.name}! 👋</div>
        <div className="dash-sub">Here's what your children are up to with Quokka.</div>
        <div className="slabel">Your children</div>
        <div className="kids-grid">
          {children.map((child,i)=>{
            const qs=(logs[child.name]||[]).filter(m=>m.role==="user").slice(-3);
            return (
              <div className="kid-card" key={i}>
                <div className={`kid-av ${i===0?"a":"b"}`}>{child.name[0]}</div>
                <div className="kid-name">{child.name}</div>
                <div className="kid-meta">Age {child.age} · {child.level}</div>
                <div className="kid-log">
                  {qs.length===0
                    ? <span className="log-empty">No questions yet.</span>
                    : qs.map((m,j)=><div key={j} className="log-q"><span className="lbadge">Q</span><span>{m.content}</span></div>)
                  }
                </div>
                <button className="open-btn" onClick={()=>{setActive(child);setView("chat")}}>Chat with Quokka →</button>
              </div>
            );
          })}
        </div>
        <div className="slabel">Your teacher</div>
        <div className="q-panel">
          <div style={{flexShrink:0}}><QuokkaSVG size="sm" anim="bounce"/></div>
          <div className="q-panel-info">
            <div className="q-panel-name">{teacher.name}</div>
            <div className="sage-panel-sub">Active for all children · Powered by Groq</div>
            <div className="traits">
              {teacher.styles.map(s=><span key={s} className="tr tr-s">{s}</span>)}
              {teacher.rules.slice(0,2).map(r=><span key={r} className="tr tr-r">{r}</span>)}
            </div>
            <div className="edit-row">
              <button className="edit-btn" onClick={()=>setModal("sage")}>✏️ Customise</button>
            </div>
          </div>
        </div>
      </div>
      {modal==="sage"&&<SageModal teacher={teacher} onClose={()=>setModal(null)} onSave={t=>{setTeacher(t);setModal(null)}}/>}
    </div>
  );

  // CHAT
  if(view==="chat") return (
    <ChatView
      child={activeChild} teacher={teacher}
      messages={logs[activeChild.name]||[]}
      loading={loading}
      onSend={handleSend}
      onBack={()=>setView("dashboard")}
    />
  );

  return null;
}
