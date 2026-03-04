import { useState, useRef, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap";
document.head.appendChild(fontLink);

const css = document.createElement("style");
css.textContent = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --cream: #F6F1E9;
  --cream2: #EDE8DF;
  --white: #FDFAF5;
  --ink: #1C1917;
  --ink2: #57534E;
  --ink3: #A8A29E;
  --red: #D0391A;
  --red2: #E8512E;
  --red-pale: #FEF0EC;
  --green: #1A6B3C;
  --green-pale: #E6F4EC;
  --border: #E0D9CE;
  --border2: #C8BFB0;
  --r: 12px;
}
html, body { height: 100%; font-family: 'Syne', sans-serif; background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }
.serif { font-family: 'Lora', serif; }

/* ─── LANDING ─── */
.land { min-height: 100vh; background: var(--cream); display: flex; flex-direction: column; }
.land-nav { padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; }
.land-logo { font-size: 22px; font-weight: 800; letter-spacing: -0.03em; }
.land-logo span { color: var(--red); }
.land-hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 24px 80px; }
.land-kicker { display: inline-flex; align-items: center; gap: 8px; background: var(--red-pale); color: var(--red); font-size: 13px; font-weight: 700; letter-spacing: 0.05em; padding: 7px 16px; border-radius: 40px; margin-bottom: 28px; border: 1.5px solid rgba(208,57,26,0.2); }
.land-h1 { font-size: clamp(48px, 9vw, 88px); font-weight: 800; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 24px; max-width: 700px; }
.land-h1 em { font-family: 'Lora', serif; font-style: italic; font-weight: 400; color: var(--red); }
.land-p { font-size: 18px; color: var(--ink2); max-width: 420px; line-height: 1.65; margin-bottom: 44px; font-weight: 400; }
.google-btn {
  display: inline-flex; align-items: center; gap: 12px;
  background: var(--ink); color: #fff; padding: 17px 32px;
  border-radius: 50px; font-size: 16px; font-weight: 700;
  border: none; cursor: pointer; transition: all 0.2s;
  letter-spacing: -0.01em;
}
.google-btn:hover { background: var(--red); transform: scale(1.02); }
.google-btn svg { width: 20px; height: 20px; }
.land-small { margin-top: 16px; font-size: 13px; color: var(--ink3); }
.land-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 52px; }
.land-pill { background: var(--white); border: 1.5px solid var(--border); padding: 9px 18px; border-radius: 40px; font-size: 13px; font-weight: 600; color: var(--ink2); }

/* ─── SHELL ─── */
.shell { min-height: 100vh; background: var(--cream); display: flex; flex-direction: column; }
.topbar { height: 58px; background: var(--white); border-bottom: 2px solid var(--ink); display: flex; align-items: center; padding: 0 24px; gap: 16px; flex-shrink: 0; }
.tlogo { font-size: 20px; font-weight: 800; letter-spacing: -0.03em; }
.tlogo span { color: var(--red); }
.tright { margin-left: auto; display: flex; align-items: center; gap: 14px; }
.tavatar { width: 34px; height: 34px; background: var(--red); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; }
.tname { font-size: 13px; font-weight: 600; color: var(--ink2); }
.tbtn { background: none; border: 2px solid var(--border); padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; color: var(--ink2); font-family: 'Syne', sans-serif; transition: all 0.15s; }
.tbtn:hover { border-color: var(--ink); color: var(--ink); }
.tab-row { display: flex; gap: 0; border-bottom: 2px solid var(--ink); background: var(--white); }
.tab { padding: 12px 22px; font-size: 13px; font-weight: 700; cursor: pointer; border: none; background: none; font-family: 'Syne', sans-serif; color: var(--ink3); border-bottom: 3px solid transparent; margin-bottom: -2px; transition: all 0.15s; letter-spacing: 0.02em; }
.tab.on { color: var(--ink); border-bottom-color: var(--red); }
.tab:hover:not(.on) { color: var(--ink2); }

/* ─── ONBOARD ─── */
.onboard { flex: 1; display: grid; place-items: center; padding: 32px 20px; }
.ocard { background: var(--white); border: 2px solid var(--ink); border-radius: 20px; padding: 40px 36px; max-width: 500px; width: 100%; animation: up 0.4s ease both; }
.ostep { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--ink3); margin-bottom: 12px; }
.otitle { font-size: 32px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 8px; }
.osub { font-size: 15px; color: var(--ink2); margin-bottom: 28px; line-height: 1.6; font-weight: 400; }
.field { margin-bottom: 16px; }
.flabel { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 7px; text-transform: uppercase; }
.finput { width: 100%; padding: 12px 16px; border: 2px solid var(--border); border-radius: 10px; font-size: 15px; font-family: 'Syne', sans-serif; font-weight: 500; background: var(--cream); color: var(--ink); outline: none; transition: border 0.15s; }
.finput:focus { border-color: var(--ink); }
.frow { display: grid; grid-template-columns: 1fr 90px; gap: 12px; }
.fselect { width: 100%; padding: 12px 16px; border: 2px solid var(--border); border-radius: 10px; font-size: 15px; font-family: 'Syne', sans-serif; font-weight: 500; background: var(--cream); color: var(--ink); outline: none; }
.child-chip { display: flex; align-items: center; gap: 12px; background: var(--green-pale); border: 2px solid #B3D9C4; border-radius: 12px; padding: 12px 16px; margin-bottom: 10px; }
.chip-av { width: 38px; height: 38px; border-radius: 50%; background: var(--green); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex-shrink: 0; }
.chip-av.b { background: #7C3AED; }
.chip-name { font-weight: 700; font-size: 15px; }
.chip-meta { font-size: 12px; color: var(--green); font-weight: 600; }
.add-btn { width: 100%; padding: 13px; border: 2.5px dashed var(--border2); border-radius: 12px; background: none; font-size: 14px; font-weight: 700; color: var(--ink3); cursor: pointer; font-family: 'Syne', sans-serif; margin-bottom: 18px; transition: all 0.15s; }
.add-btn:hover { border-color: var(--red); color: var(--red); }
.divider { height: 2px; background: var(--cream2); margin: 20px 0; }
.btn-big { width: 100%; padding: 16px; border-radius: 50px; font-size: 16px; font-weight: 800; border: none; cursor: pointer; font-family: 'Syne', sans-serif; letter-spacing: -0.01em; transition: all 0.2s; }
.btn-red { background: var(--red); color: #fff; }
.btn-red:hover { background: var(--red2); transform: scale(1.01); }
.btn-red:disabled { background: var(--border); color: var(--ink3); cursor: not-allowed; transform: none; }
.btn-ink { background: var(--ink); color: #fff; }
.btn-ink:hover { background: #3C3835; }
.back-btn { background: none; border: none; font-size: 13px; font-weight: 700; color: var(--ink3); cursor: pointer; font-family: 'Syne', sans-serif; display: flex; align-items: center; gap: 5px; margin-bottom: 20px; padding: 0; }
.back-btn:hover { color: var(--red); }

/* ─── DASHBOARD ─── */
.dash { flex: 1; padding: 32px 28px; max-width: 900px; margin: 0 auto; width: 100%; }
.dash-hi { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 4px; }
.dash-hi em { font-family: 'Lora', serif; font-style: italic; font-weight: 400; color: var(--red); }
.dash-sub { font-size: 15px; color: var(--ink2); margin-bottom: 32px; font-weight: 400; }
.slabel { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 14px; }
.kids-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 16px; margin-bottom: 36px; }
.kid-card { background: var(--white); border: 2px solid var(--ink); border-radius: 16px; padding: 22px; cursor: pointer; transition: all 0.15s; }
.kid-card:hover { background: var(--cream2); transform: translateY(-2px); box-shadow: 4px 4px 0 var(--ink); }
.kid-av { width: 50px; height: 50px; border-radius: 50%; background: var(--red-pale); border: 2px solid var(--red); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: var(--red); margin-bottom: 12px; }
.kid-av.b { background: #EDE9F6; border-color: #7C3AED; color: #7C3AED; }
.kid-name { font-size: 18px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 2px; }
.kid-meta { font-size: 12px; color: var(--ink3); font-weight: 600; margin-bottom: 14px; }
.kid-log { border-top: 1.5px solid var(--cream2); padding-top: 12px; min-height: 42px; }
.log-empty { font-size: 13px; color: var(--ink3); font-style: italic; font-family: 'Lora', serif; }
.log-q { display: flex; gap: 6px; align-items: flex-start; margin-bottom: 5px; font-size: 12px; color: var(--ink2); }
.log-badge { background: var(--cream2); border-radius: 4px; padding: 1px 6px; font-size: 10px; font-weight: 800; color: var(--ink3); flex-shrink: 0; }
.open-btn { margin-top: 14px; width: 100%; padding: 11px; border-radius: 30px; background: var(--red); color: #fff; border: none; font-size: 13px; font-weight: 800; cursor: pointer; font-family: 'Syne', sans-serif; transition: background 0.15s; letter-spacing: -0.01em; }
.open-btn:hover { background: var(--red2); }

/* ─── SAGE PANEL ─── */
.sage-row { background: var(--white); border: 2px solid var(--ink); border-radius: 16px; padding: 24px; display: flex; gap: 20px; align-items: flex-start; }
.sage-av-big { width: 60px; height: 60px; border-radius: 50%; background: var(--ink); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; flex-shrink: 0; border: 2px solid var(--ink); font-family: 'Lora', serif; font-style: italic; }
.sage-name { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 2px; }
.sage-tagline { font-size: 13px; color: var(--ink3); font-weight: 500; margin-bottom: 12px; }
.traits { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.tr { padding: 5px 13px; border-radius: 20px; font-size: 12px; font-weight: 700; }
.tr-style { background: var(--cream2); color: var(--ink2); }
.tr-rule { background: var(--red-pale); color: var(--red); }
.tr-model { background: var(--green-pale); color: var(--green); border: 1.5px solid #B3D9C4; }
.edit-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 2px solid var(--border); border-radius: 30px; padding: 8px 18px; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--ink2); font-family: 'Syne', sans-serif; transition: all 0.15s; }
.edit-btn:hover { border-color: var(--ink); color: var(--ink); }

/* ─── NOTIFY ─── */
.notify { background: var(--white); border: 2px solid var(--green); border-radius: 14px; padding: 14px 18px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; animation: up 0.3s ease both; }
.notify-text { font-size: 14px; font-weight: 600; color: var(--ink); flex: 1; }
.notify-cta { background: var(--green); color: #fff; border: none; border-radius: 20px; padding: 8px 16px; font-size: 12px; font-weight: 800; cursor: pointer; font-family: 'Syne', sans-serif; white-space: nowrap; }
.notify-x { background: none; border: none; font-size: 18px; color: var(--ink3); cursor: pointer; }

/* ─── MODAL ─── */
.overlay { position: fixed; inset: 0; background: rgba(28,25,23,0.5); z-index: 200; display: grid; place-items: center; padding: 20px; animation: fadein 0.2s ease; }
.modal { background: var(--white); border: 2px solid var(--ink); border-radius: 20px; padding: 36px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; animation: up 0.3s ease both; }
.modal-title { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 4px; }
.modal-sub { font-size: 14px; color: var(--ink2); margin-bottom: 24px; font-weight: 400; }
.tag-wrap { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 7px; }
.tag { padding: 7px 15px; border-radius: 30px; border: 2px solid var(--border); font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; color: var(--ink2); background: none; transition: all 0.12s; }
.tag.on { background: var(--ink); color: #fff; border-color: var(--ink); }
.tag.rule.on { background: var(--red); border-color: var(--red); }
.tag:hover:not(.on) { border-color: var(--ink); color: var(--ink); }
.modal-actions { display: flex; gap: 10px; margin-top: 24px; }
.btn-cancel { flex: 1; padding: 13px; border-radius: 30px; background: none; border: 2px solid var(--border); font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; color: var(--ink2); }
.btn-cancel:hover { border-color: var(--ink); color: var(--ink); }
.btn-save { flex: 2; padding: 13px; border-radius: 30px; background: var(--red); color: #fff; border: none; font-size: 14px; font-weight: 800; cursor: pointer; font-family: 'Syne', sans-serif; }
.btn-save:hover { background: var(--red2); }
.provider-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
.provider-opt { padding: 14px 12px; border: 2px solid var(--border); border-radius: 12px; cursor: pointer; text-align: center; transition: all 0.15s; background: none; font-family: 'Syne', sans-serif; }
.provider-opt:hover { border-color: var(--ink); }
.provider-opt.on { border-color: var(--ink); background: var(--cream2); }
.provider-opt .pname { font-size: 14px; font-weight: 800; color: var(--ink); }
.provider-opt .pmodel { font-size: 11px; color: var(--ink3); font-weight: 500; margin-top: 2px; }
.api-hint { font-size: 12px; color: var(--ink3); margin-top: 8px; line-height: 1.5; }
.api-hint a { color: var(--red); text-decoration: none; font-weight: 600; }

/* ─── CHAT ─── */
.chat-shell { display: flex; flex-direction: column; height: 100vh; }
.chat-top { height: 58px; background: var(--ink); display: flex; align-items: center; padding: 0 20px; gap: 14px; flex-shrink: 0; }
.chat-sage-av { width: 38px; height: 38px; border-radius: 50%; background: var(--red); display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 800; color: #fff; font-family: 'Lora', serif; font-style: italic; flex-shrink: 0; }
.chat-sage-name { font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.chat-sage-sub { font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 500; }
.chat-back { margin-left: auto; background: none; border: 1.5px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); border-radius: 20px; padding: 7px 16px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; transition: all 0.15s; }
.chat-back:hover { border-color: rgba(255,255,255,0.5); color: #fff; }
.chat-feed { flex: 1; overflow-y: auto; padding: 32px 20px; }
.chat-inner { max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }
.msg-u { align-self: flex-end; background: var(--ink); color: #fff; padding: 13px 18px; border-radius: 20px 20px 4px 20px; max-width: 68%; font-size: 15px; line-height: 1.55; font-weight: 500; }
.msg-a { align-self: flex-start; background: var(--white); border: 2px solid var(--border); padding: 16px 20px; border-radius: 4px 20px 20px 20px; max-width: 80%; font-size: 15px; line-height: 1.7; font-weight: 400; }
.msg-a p { margin-bottom: 8px; } .msg-a p:last-child { margin-bottom: 0; }
.msg-a ol, .msg-a ul { padding-left: 20px; margin: 8px 0; }
.msg-a li { margin-bottom: 5px; }
.msg-a strong { font-weight: 700; }
.typing-wrap { align-self: flex-start; background: var(--white); border: 2px solid var(--border); padding: 16px 20px; border-radius: 4px 20px 20px 20px; display: flex; gap: 5px; align-items: center; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ink3); animation: bob 1.2s ease-in-out infinite; }
.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }
.empty-chat { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center; animation: up 0.5s ease both; }
.empty-av { width: 80px; height: 80px; border-radius: 50%; background: var(--ink); color: var(--cream); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 800; margin: 0 auto 18px; font-family: 'Lora', serif; font-style: italic; border: 3px solid var(--ink); }
.empty-h { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
.empty-p { font-size: 15px; color: var(--ink2); max-width: 280px; line-height: 1.6; font-weight: 400; }
.chat-foot { background: var(--white); border-top: 2px solid var(--ink); padding: 18px 20px; flex-shrink: 0; }
.chat-foot-inner { max-width: 640px; margin: 0 auto; }
.chips { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.chip { padding: 8px 16px; border: 2px solid var(--border); border-radius: 30px; font-size: 13px; font-weight: 700; background: none; cursor: pointer; color: var(--ink2); font-family: 'Syne', sans-serif; transition: all 0.12s; }
.chip:hover { border-color: var(--red); color: var(--red); background: var(--red-pale); }
.input-row { display: flex; gap: 10px; }
.chat-ta { flex: 1; padding: 13px 16px; border: 2px solid var(--border); border-radius: 12px; font-size: 15px; font-family: 'Syne', sans-serif; font-weight: 500; background: var(--cream); color: var(--ink); resize: none; outline: none; line-height: 1.5; transition: border 0.15s; max-height: 100px; }
.chat-ta:focus { border-color: var(--ink); }
.send { width: 48px; height: 48px; border-radius: 12px; background: var(--red); color: #fff; border: none; cursor: pointer; font-size: 20px; transition: background 0.15s; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.send:hover { background: var(--red2); }
.send:disabled { background: var(--border); cursor: not-allowed; }
.no-provider-banner { background: var(--red-pale); border: 2px solid rgba(208,57,26,0.3); border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; font-size: 14px; color: var(--red); font-weight: 600; display: flex; align-items: center; gap: 10px; }
.no-provider-banner button { background: var(--red); color: #fff; border: none; border-radius: 20px; padding: 7px 14px; font-size: 12px; font-weight: 800; cursor: pointer; font-family: 'Syne', sans-serif; white-space: nowrap; margin-left: auto; }

@keyframes up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadein { from { opacity:0; } to { opacity:1; } }
@keyframes bob { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-5px); } }
`;
document.head.appendChild(css);

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DEFAULT_SAGE = {
  name: "Sage",
  styles: ["Encouraging", "Curious", "Step-by-step"],
  rules: ["Never write homework answers", "Guide children to think", "Use simple language"],
};

const PROVIDERS = [
  { id: "anthropic", name: "Anthropic", model: "Claude Sonnet", apiModel: "claude-sonnet-4-20250514", placeholder: "sk-ant-..." },
  { id: "openai", name: "OpenAI", model: "GPT-4o", apiModel: "gpt-4o", placeholder: "sk-..." },
  { id: "google", name: "Google", model: "Gemini 1.5", apiModel: "gemini-1.5-flash", placeholder: "AIza..." },
  { id: "groq", name: "Groq", model: "Llama 3.1", apiModel: "llama-3.1-70b-versatile", placeholder: "gsk_..." },
];

const STYLES = ["Encouraging", "Curious", "Step-by-step", "Asks questions", "Playful", "Patient", "Structured"];
const RULES = ["Never write homework answers", "Guide children to think", "Use simple language", "Avoid mature topics", "Always ask a follow-up question", "Show steps for maths"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function buildPrompt(sage, child) {
  return `You are ${sage.name}, a warm and dedicated teacher helping ${child.name}, who is ${child.age} years old and at a ${child.level} learning level.

Teaching style: ${sage.styles.join(", ")}.

Rules you follow strictly:
${sage.rules.map(r => `- ${r}`).join("\n")}

Always adapt your language to suit a ${child.age}-year-old at ${child.level} level. Be warm and patient. Never complete homework or write full answers for assignments — guide the student to reach their own understanding. Keep responses appropriately concise and engaging.`;
}

async function callLLM(provider, apiKey, systemPrompt, messages) {
  if (!provider || !apiKey) throw new Error("No provider configured");

  if (provider.id === "anthropic") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: provider.apiModel, max_tokens: 1000, system: systemPrompt, messages: messages.map(m => ({ role: m.role, content: m.content })) }),
    });
    const d = await res.json();
    if (d.error) throw new Error(d.error.message);
    return d.content?.[0]?.text;
  }

  if (provider.id === "openai") {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model: provider.apiModel, messages: [{ role: "system", content: systemPrompt }, ...messages] }),
    });
    const d = await res.json();
    if (d.error) throw new Error(d.error.message);
    return d.choices?.[0]?.message?.content;
  }

  throw new Error("Provider not yet supported in this demo.");
}

function renderMd(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  const lines = text.split("\n");
  let html = "", inOl = false, inUl = false;
  for (const line of lines) {
    const ol = line.match(/^\d+\.\s(.+)/), ul = line.match(/^[-•]\s(.+)/);
    if (ol) { if (!inOl) { html += "<ol>"; inOl = true; } html += `<li>${ol[1]}</li>`; }
    else if (ul) { if (!inUl) { html += "<ul>"; inUl = true; } html += `<li>${ul[1]}</li>`; }
    else {
      if (inOl) { html += "</ol>"; inOl = false; }
      if (inUl) { html += "</ul>"; inUl = false; }
      if (line.trim()) html += `<p>${line}</p>`;
    }
  }
  if (inOl) html += "</ol>"; if (inUl) html += "</ul>";
  return html;
}

// ─── PROVIDER SETTINGS MODAL ─────────────────────────────────────────────────
function ProviderModal({ current, onSave, onClose }) {
  const [selectedId, setSelectedId] = useState(current?.provider?.id || "anthropic");
  const [key, setKey] = useState(current?.apiKey || "");
  const provider = PROVIDERS.find(p => p.id === selectedId);

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">Connect your LLM</div>
        <div className="modal-sub">Bring your own API key. We apply Sage's guardrails on top — you pay only for what you use.</div>
        <div className="field">
          <div className="flabel">Choose provider</div>
          <div className="provider-grid">
            {PROVIDERS.map(p => (
              <button key={p.id} className={`provider-opt ${selectedId === p.id ? "on" : ""}`} onClick={() => setSelectedId(p.id)}>
                <div className="pname">{p.name}</div>
                <div className="pmodel">{p.model}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="field" style={{marginTop:"16px"}}>
          <label className="flabel">API key</label>
          <input className="finput" type="password" placeholder={provider.placeholder} value={key} onChange={e => setKey(e.target.value)} />
          <div className="api-hint">Your key is stored only in this session and never sent to our servers. It goes directly to {provider.name}'s API. <a href="#">Learn more →</a></div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" disabled={!key} onClick={() => onSave({ provider, apiKey: key })}>Connect {provider.name}</button>
        </div>
      </div>
    </div>
  );
}

// ─── SAGE CUSTOMISE MODAL ─────────────────────────────────────────────────────
function SageModal({ sage, onSave, onClose }) {
  const [name, setName] = useState(sage.name);
  const [styles, setStyles] = useState([...sage.styles]);
  const [rules, setRules] = useState([...sage.rules]);
  const tog = (arr, set, v) => set(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">Customise {sage.name}</div>
        <div className="modal-sub">Shape how your teacher interacts with your children.</div>
        <div className="field">
          <label className="flabel">Teacher name</label>
          <input className="finput" value={name} onChange={e => setName(e.target.value)} placeholder="Sage" />
        </div>
        <div className="field">
          <label className="flabel">Teaching style</label>
          <div className="tag-wrap">{STYLES.map(s => <button key={s} className={`tag ${styles.includes(s) ? "on" : ""}`} onClick={() => tog(styles, setStyles, s)}>{s}</button>)}</div>
        </div>
        <div className="field" style={{marginTop:"14px"}}>
          <label className="flabel">Rules</label>
          <div className="tag-wrap">{RULES.map(r => <button key={r} className={`tag rule ${rules.includes(r) ? "on" : ""}`} onClick={() => tog(rules, setRules, r)}>{r}</button>)}</div>
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={() => onSave({ name: name || "Sage", styles, rules })}>Save changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADD CHILD FORM ───────────────────────────────────────────────────────────
function AddChildForm({ count, onAdd, onCancel }) {
  const [f, setF] = useState({ name: "", age: "", level: "Beginner" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <div style={{background:"var(--cream2)",border:"2px solid var(--border2)",borderRadius:"14px",padding:"18px",marginBottom:"12px"}}>
      <div className="frow">
        <div className="field" style={{marginBottom:0}}>
          <label className="flabel">Name</label>
          <input className="finput" value={f.name} onChange={e => s("name", e.target.value)} placeholder="e.g. Emma" />
        </div>
        <div className="field" style={{marginBottom:0}}>
          <label className="flabel">Age</label>
          <input className="finput" type="number" min="4" max="17" value={f.age} onChange={e => s("age", e.target.value)} placeholder="7" />
        </div>
      </div>
      <div className="field" style={{marginTop:"12px"}}>
        <label className="flabel">Learning level</label>
        <select className="fselect" value={f.level} onChange={e => s("level", e.target.value)}>{LEVELS.map(l => <option key={l}>{l}</option>)}</select>
      </div>
      <div style={{display:"flex",gap:"8px",marginTop:"14px"}}>
        <button className="btn-big btn-ink" style={{padding:"13px",fontSize:"14px"}} disabled={!f.name || !f.age} onClick={() => onAdd(f)}>Add {f.name || "child"}</button>
        {count > 0 && <button className="btn-big" style={{padding:"13px",fontSize:"14px",background:"none",border:"2px solid var(--border)",color:"var(--ink2)"}} onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("landing");
  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);
  const [sage, setSage] = useState(DEFAULT_SAGE);
  const [llm, setLlm] = useState(null); // { provider, apiKey }
  const [activeChild, setActiveChild] = useState(null);
  const [logs, setLogs] = useState({});
  const [modal, setModal] = useState(null); // null | "sage" | "provider"
  const [addingChild, setAddingChild] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [nudgeSeen, setNudgeSeen] = useState(false);
  const endRef = useRef(null);

  const totalQ = Object.values(logs).reduce((a, m) => a + m.filter(x => x.role === "user").length, 0);
  useEffect(() => {
    if (totalQ === 3 && !nudgeSeen && view === "dashboard") { setNudge(true); setNudgeSeen(true); }
  }, [totalQ]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs, loading]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const key = activeChild.name;
    const existing = logs[key] || [];
    const userMsg = { role: "user", content: text };
    const updated = [...existing, userMsg];
    setLogs(p => ({ ...p, [key]: updated }));
    setLoading(true);
    try {
      if (!llm) throw new Error("no_provider");
      const reply = await callLLM(llm.provider, llm.apiKey, buildPrompt(sage, activeChild), updated);
      setLogs(p => ({ ...p, [key]: [...(p[key] || []), { role: "assistant", content: reply }] }));
    } catch (e) {
      const msg = e.message === "no_provider"
        ? "No LLM connected yet. Ask a parent to connect one in Settings."
        : `Error: ${e.message}`;
      setLogs(p => ({ ...p, [key]: [...(p[key] || []), { role: "assistant", content: msg }] }));
    }
    setLoading(false);
  };

  // LANDING
  if (view === "landing") return (
    <div className="land">
      <nav className="land-nav">
        <div className="land-logo">sage<span>.</span></div>
        <button className="google-btn" style={{padding:"10px 22px",fontSize:"14px"}} onClick={() => { setParent({ name: "Sarah", email: "sarah@example.com" }); setView("onboard"); }}>
          Sign in
        </button>
      </nav>
      <div className="land-hero">
        <div className="land-kicker">🌿 AI tutoring, your rules</div>
        <h1 className="land-h1">Your child's tutor,<br /><em>shaped by you.</em></h1>
        <p className="land-p">Bring your own AI. We apply the guardrails. Sage guides your children to think — never just handing out answers.</p>
        <button className="google-btn" onClick={() => { setParent({ name: "Sarah", email: "sarah@example.com" }); setView("onboard"); }}>
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <div className="land-small">No obligation · Free to start · Your API key, your cost</div>
        <div className="land-pills">
          <span className="land-pill">🔑 Bring your own API key</span>
          <span className="land-pill">🛡️ We provide the guardrails</span>
          <span className="land-pill">🧠 Guides thinking, not answers</span>
          <span className="land-pill">👁️ Parents see everything</span>
        </div>
      </div>
    </div>
  );

  // ONBOARD
  if (view === "onboard") return (
    <div className="shell">
      <div className="topbar">
        <div className="tlogo">sage<span>.</span></div>
        <div className="tright"><div className="tavatar">{parent.name[0]}</div><span className="tname">{parent.name}</span></div>
      </div>
      <div className="onboard">
        <div className="ocard">
          <div className="ostep">GETTING STARTED</div>
          <div className="otitle">Who's learning with Sage?</div>
          <div className="osub">Add up to two children. Age helps Sage pitch things just right.</div>
          {children.map((c, i) => (
            <div className="child-chip" key={i}>
              <div className={`chip-av ${i === 1 ? "b" : ""}`}>{c.name[0]}</div>
              <div><div className="chip-name">{c.name}</div><div className="chip-meta">Age {c.age} · {c.level}</div></div>
            </div>
          ))}
          {addingChild && <AddChildForm count={children.length} onAdd={c => { setChildren(p => [...p, c]); setAddingChild(false); }} onCancel={() => setAddingChild(false)} />}
          {!addingChild && children.length < 2 && <button className="add-btn" onClick={() => setAddingChild(true)}>+ Add another child</button>}
          {children.length > 0 && !addingChild && (
            <>
              <div className="divider" />
              <button className="btn-big btn-red" onClick={() => setView("dashboard")}>Let's go →</button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // DASHBOARD
  if (view === "dashboard") return (
    <div className="shell">
      <div className="topbar">
        <div className="tlogo">sage<span>.</span></div>
        <div className="tright">
          <button className="tbtn" onClick={() => setModal("provider")}>{llm ? `🔌 ${llm.provider.name}` : "⚡ Connect LLM"}</button>
          <div className="tavatar">{parent.name[0]}</div>
          <span className="tname">{parent.name}</span>
          <button className="tbtn" onClick={() => { setView("landing"); setParent(null); setChildren([]); setLogs({}); setSage(DEFAULT_SAGE); setLlm(null); }}>Sign out</button>
        </div>
      </div>

      <div className="dash">
        {!llm && (
          <div className="notify" style={{borderColor:"var(--red)",background:"var(--red-pale)"}}>
            <span className="notify-text">⚡ Connect your LLM to start chatting with Sage.</span>
            <button className="notify-cta" style={{background:"var(--red)"}} onClick={() => setModal("provider")}>Connect now</button>
            <button className="notify-x" onClick={() => {}}>×</button>
          </div>
        )}
        {nudge && llm && (
          <div className="notify">
            <span className="notify-text">💡 Things going well? You can personalise how Sage teaches.</span>
            <button className="notify-cta" onClick={() => { setModal("sage"); setNudge(false); }}>Customise Sage</button>
            <button className="notify-x" onClick={() => setNudge(false)}>×</button>
          </div>
        )}

        <div className="dash-hi">Hey, <em>{parent.name}.</em></div>
        <div className="dash-sub">Here's what your children have been up to with Sage.</div>

        <div className="slabel">YOUR CHILDREN</div>
        <div className="kids-grid">
          {children.map((child, i) => {
            const qs = (logs[child.name] || []).filter(m => m.role === "user").slice(-3);
            return (
              <div className="kid-card" key={i}>
                <div className={`kid-av ${i === 1 ? "b" : ""}`}>{child.name[0]}</div>
                <div className="kid-name">{child.name}</div>
                <div className="kid-meta">Age {child.age} · {child.level}</div>
                <div className="kid-log">
                  {qs.length === 0
                    ? <span className="log-empty">No questions yet.</span>
                    : qs.map((m, j) => <div key={j} className="log-q"><span className="log-badge">Q</span><span>{m.content}</span></div>)
                  }
                </div>
                <button className="open-btn" onClick={() => { setActiveChild(child); setView("chat"); }}>Open chat →</button>
              </div>
            );
          })}
        </div>

        <div className="slabel">YOUR TEACHER</div>
        <div className="sage-row">
          <div className="sage-av-big">S</div>
          <div style={{flex:1}}>
            <div className="sage-name">{sage.name}</div>
            <div className="sage-tagline">Active for all children · {llm ? `Using ${llm.provider.name}` : "No LLM connected"}</div>
            <div className="traits">
              {sage.styles.map(s => <span key={s} className="tr tr-style">{s}</span>)}
              {sage.rules.slice(0, 2).map(r => <span key={r} className="tr tr-rule">{r}</span>)}
              {llm && <span className="tr tr-model">🔌 {llm.provider.name} · {llm.provider.model}</span>}
            </div>
            <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
              <button className="edit-btn" onClick={() => setModal("sage")}>✏️ Customise {sage.name}</button>
              <button className="edit-btn" onClick={() => setModal("provider")}>{llm ? "🔄 Switch LLM" : "⚡ Connect LLM"}</button>
            </div>
          </div>
        </div>
      </div>

      {modal === "sage" && <SageModal sage={sage} onClose={() => setModal(null)} onSave={s => { setSage(s); setModal(null); }} />}
      {modal === "provider" && <ProviderModal current={llm} onClose={() => setModal(null)} onSave={p => { setLlm(p); setModal(null); }} />}
    </div>
  );

  // CHAT
  if (view === "chat") {
    const messages = logs[activeChild.name] || [];
    return (
      <div className="chat-shell">
        <div className="chat-top">
          <div className="chat-sage-av">S</div>
          <div><div className="chat-sage-name">{sage.name}</div><div className="chat-sage-sub">with {activeChild.name}, age {activeChild.age}</div></div>
          <button className="chat-back" onClick={() => setView("dashboard")}>← Dashboard</button>
        </div>
        <div className="chat-feed">
          <div className="chat-inner">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <div className="empty-av">S</div>
                <div className="empty-h">Hi {activeChild.name}!</div>
                <p className="empty-p">I'm {sage.name}. Ask me anything — I'm here to help you learn and think.</p>
              </div>
            ) : messages.map((m, i) =>
              m.role === "user"
                ? <div key={i} className="msg-u">{m.content}</div>
                : <div key={i} className="msg-a" dangerouslySetInnerHTML={{ __html: renderMd(m.content) }} />
            )}
            {loading && <div className="typing-wrap"><div className="dot"/><div className="dot"/><div className="dot"/></div>}
            <div ref={endRef} />
          </div>
        </div>
        <div className="chat-foot">
          <div className="chat-foot-inner">
            {!llm && (
              <div className="no-provider-banner">
                ⚡ No LLM connected.
                <button onClick={() => { setView("dashboard"); setModal("provider"); }}>Connect one →</button>
              </div>
            )}
            {messages.length === 0 && (
              <div className="chips">
                {["Why is the sky blue?","Help me understand fractions","Tell me about dinosaurs","Help me plan a story"].map(s => (
                  <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
            <div className="input-row">
              <textarea className="chat-ta" rows={1} placeholder={`Ask ${sage.name} anything…`}
                value={""} onChange={() => {}}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e.target.value); e.target.value = ""; } }}
              />
              <button className="send" disabled={loading || !llm} onClick={e => { const ta = e.target.closest(".chat-foot").querySelector(".chat-ta"); send(ta.value); ta.value = ""; }}>↑</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
