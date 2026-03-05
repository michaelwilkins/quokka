import { useState, useRef, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@400;600;700;800&display=swap";
document.head.appendChild(fontLink);

const css = document.createElement("style");
css.textContent = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0D1B2A;
  --gold:#F5A623;
  --chalk:#FAF7F0;
  --red:#E8272A;
  --ink2:#3D5166;
  --ink3:#8A9BAD;
  --border:#D6D0C4;
  --gold-pale:#FFF8EC;
  --ink-pale:#E8EDF2;
}
html,body{height:100%;font-family:'Lora',Georgia,serif;background:var(--chalk);color:var(--ink);-webkit-font-smoothing:antialiased}

/* ── QUOKKA ── */
.quokka-wrap{display:flex;justify-content:center;margin-bottom:8px}
.quokka-sm{width:72px;height:72px;}
.quokka-md{width:110px;height:110px;}
.quokka-lg{width:150px;height:150px;}
.quokka-bounce{animation:qbounce 2.8s ease-in-out infinite}
.quokka-nod{animation:qnod 2s ease-in-out infinite}
.quokka-wait{animation:qwait 4s ease-in-out infinite}
@keyframes qbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes qnod{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-4deg)}60%{transform:rotate(3deg)}}
@keyframes qwait{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-3px) rotate(-2deg)}75%{transform:translateY(-3px) rotate(2deg)}}

/* ── FLOW ── */
.flow-page{min-height:100vh;background:var(--chalk);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;animation:fadeUp 0.4s ease both}
.flow-logo-text{font-family:'Inter',sans-serif;font-size:22px;font-weight:800;color:var(--ink);letter-spacing:-0.02em}
.flow-logo-text span{color:var(--gold)}
.flow-q{font-family:'Lora',serif;font-size:clamp(20px,4vw,30px);font-weight:700;color:var(--ink);margin-bottom:24px;line-height:1.4;max-width:440px}
.flow-sub{font-size:15px;color:var(--ink2);margin-bottom:24px;max-width:360px;line-height:1.7;font-family:'Inter',sans-serif}
.flow-input{font-family:'Lora',serif;font-size:clamp(22px,5vw,34px);font-weight:700;color:var(--ink);background:none;border:none;border-bottom:2.5px solid var(--border);text-align:center;outline:none;width:100%;max-width:360px;padding:8px 4px 12px;transition:border-color 0.2s;margin-bottom:32px}
.flow-input:focus{border-color:var(--gold)}
.flow-input::placeholder{color:var(--ink3)}
.next-btn{background:var(--ink);color:var(--chalk);border:none;padding:15px 44px;border-radius:4px;font-family:'Inter',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:0.01em}
.next-btn:hover{background:var(--ink2);transform:translateY(-1px);box-shadow:0 4px 20px rgba(13,27,42,0.25)}
.next-btn:disabled{background:var(--border);color:var(--ink3);box-shadow:none;transform:none;cursor:not-allowed}
.next-btn.gold{background:var(--gold);color:var(--ink)}
.next-btn.gold:hover{background:#e6961f}

/* ── STEP DOTS ── */
.step-dots{display:flex;gap:8px;margin-bottom:32px}
.sdot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all 0.2s}
.sdot.on{background:var(--gold);width:24px;border-radius:4px}
.sdot.done{background:var(--gold);opacity:0.4}

/* ── OPTION CARDS ── */
.option-grid{display:flex;flex-direction:column;gap:10px;width:100%;max-width:400px;margin-bottom:28px}
.opt-card{display:flex;align-items:center;gap:14px;padding:16px 20px;background:white;border:2px solid var(--border);border-radius:4px;cursor:pointer;transition:all 0.15s;text-align:left;font-family:'Lora',serif;font-size:16px;font-weight:600;color:var(--ink)}
.opt-card:hover{border-color:var(--gold);background:var(--gold-pale)}
.opt-card.on{border-color:var(--gold);background:var(--gold-pale)}
.opt-emoji{font-size:22px;width:36px;text-align:center;flex-shrink:0}
.opt-desc{font-size:12px;font-weight:400;color:var(--ink3);margin-top:2px;font-family:'Inter',sans-serif}

/* ── AGE ── */
.age-row{display:flex;align-items:center;gap:20px;margin-bottom:32px}
.age-btn{width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:white;font-size:22px;font-weight:700;cursor:pointer;transition:all 0.15s;color:var(--ink);font-family:'Inter',sans-serif}
.age-btn:hover{border-color:var(--gold);color:var(--gold)}
.age-val{font-family:'Lora',serif;font-size:52px;font-weight:700;color:var(--ink);width:80px;text-align:center;line-height:1}

/* ── SHELL ── */
.shell{min-height:100vh;background:var(--chalk);display:flex;flex-direction:column}
.topbar{height:56px;background:white;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:14px;flex-shrink:0}
.tlogo{font-family:'Inter',sans-serif;font-size:20px;font-weight:800;color:var(--ink);letter-spacing:-0.02em}
.tlogo span{color:var(--gold)}
.tright{margin-left:auto;display:flex;align-items:center;gap:10px}
.tav{width:34px;height:34px;border-radius:50%;background:var(--ink);color:var(--chalk);display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;font-weight:800;font-size:14px}
.tname{font-size:13px;font-weight:600;color:var(--ink2);font-family:'Inter',sans-serif}
.tbtn{background:none;border:1.5px solid var(--border);padding:7px 16px;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;color:var(--ink2);font-family:'Inter',sans-serif;transition:all 0.15s}
.tbtn:hover{border-color:var(--ink);color:var(--ink)}

/* ── DASH ── */
.dash{padding:36px 24px;max-width:860px;margin:0 auto;width:100%}
.dash-hi{font-family:'Lora',serif;font-size:clamp(26px,5vw,38px);font-weight:700;letter-spacing:-0.01em;margin-bottom:4px}
.dash-sub{font-size:15px;color:var(--ink2);margin-bottom:36px;font-family:'Inter',sans-serif}
.slabel{font-size:11px;font-weight:700;letter-spacing:0.1em;color:var(--ink3);margin-bottom:14px;text-transform:uppercase;font-family:'Inter',sans-serif}
.kids-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:36px}
.kid-card{background:white;border:1.5px solid var(--border);border-radius:4px;padding:24px;transition:all 0.18s}
.kid-card:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 8px 32px rgba(13,27,42,0.08)}
.kid-av{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Lora',serif;font-weight:700;font-size:20px;margin-bottom:14px}
.kid-av.a{background:var(--gold-pale);color:var(--gold)}
.kid-av.b{background:var(--ink-pale);color:var(--ink2)}
.kid-name{font-family:'Lora',serif;font-size:18px;font-weight:700;margin-bottom:2px}
.kid-meta{font-size:12px;color:var(--ink3);font-weight:600;margin-bottom:14px;font-family:'Inter',sans-serif}
.kid-profile{font-size:11px;color:var(--ink);font-weight:700;background:var(--gold-pale);border:1px solid var(--gold);padding:3px 10px;border-radius:2px;display:inline-block;margin-bottom:12px;font-family:'Inter',sans-serif;letter-spacing:0.03em;text-transform:uppercase}
.kid-log{border-top:1px solid var(--border);padding-top:12px;min-height:48px}
.log-empty{font-size:13px;color:var(--ink3);font-style:italic;font-family:'Lora',serif}
.log-item{display:flex;gap:6px;font-size:12px;color:var(--ink2);margin-bottom:6px;align-items:flex-start;font-family:'Inter',sans-serif}
.lbadge{font-size:10px;font-weight:700;padding:1px 6px;border-radius:2px;flex-shrink:0;margin-top:1px;background:var(--gold-pale);color:var(--ink);border:1px solid var(--border)}
.open-btn{margin-top:16px;width:100%;padding:12px;border-radius:4px;background:var(--ink);color:var(--chalk);border:none;font-size:13px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;letter-spacing:0.02em}
.open-btn:hover{background:var(--ink2)}

/* ── QUOKKA PANEL ── */
.q-panel{background:white;border:1.5px solid var(--border);border-radius:4px;padding:24px;display:flex;gap:18px;align-items:flex-start}
.q-panel-info{flex:1}
.q-panel-name{font-family:'Lora',serif;font-size:20px;font-weight:700;margin-bottom:2px}
.q-panel-sub{font-size:13px;color:var(--ink3);margin-bottom:12px;font-family:'Inter',sans-serif}
.traits{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.tr{padding:4px 12px;border-radius:2px;font-size:11px;font-weight:700;font-family:'Inter',sans-serif;letter-spacing:0.04em;text-transform:uppercase}
.tr-s{background:var(--gold-pale);color:var(--ink);border:1px solid var(--border)}
.tr-r{background:var(--ink-pale);color:var(--ink2);border:1px solid var(--border)}
.edit-btn{display:inline-flex;align-items:center;gap:5px;background:none;border:1.5px solid var(--border);border-radius:4px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;color:var(--ink2);font-family:'Inter',sans-serif;transition:all 0.15s}
.edit-btn:hover{border-color:var(--ink);color:var(--ink)}

/* ── NOTIFY ── */
.notify{background:var(--gold-pale);border:1.5px solid var(--gold);border-radius:4px;padding:14px 18px;margin-bottom:24px;display:flex;align-items:center;gap:12px;animation:fadeUp 0.3s ease both}
.notify-text{font-size:14px;font-weight:600;color:var(--ink);flex:1;font-family:'Lora',serif;font-style:italic}
.notify-cta{background:var(--ink);color:var(--chalk);border:none;border-radius:4px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;white-space:nowrap}
.notify-x{background:none;border:none;font-size:18px;color:var(--ink3);cursor:pointer;padding:0 4px}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;background:rgba(13,27,42,0.6);z-index:200;display:grid;place-items:center;padding:20px;animation:fadein 0.2s ease}
.modal{background:var(--chalk);border-radius:4px;padding:32px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;animation:fadeUp 0.3s ease both;border:1.5px solid var(--border)}
.modal-title{font-family:'Lora',serif;font-size:24px;font-weight:700;margin-bottom:4px}
.modal-sub{font-size:14px;color:var(--ink2);margin-bottom:24px;font-family:'Inter',sans-serif}
.field{margin-bottom:16px}
.flabel{display:block;font-size:11px;font-weight:700;letter-spacing:0.1em;color:var(--ink3);margin-bottom:7px;text-transform:uppercase;font-family:'Inter',sans-serif}
.finput{width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:4px;font-size:15px;font-family:'Lora',serif;font-weight:600;background:white;color:var(--ink);outline:none;transition:border 0.15s}
.finput:focus{border-color:var(--gold)}
.tag-wrap{display:flex;flex-wrap:wrap;gap:7px;margin-top:7px}
.tag{padding:7px 14px;border-radius:2px;border:1.5px solid var(--border);font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;color:var(--ink2);background:none;transition:all 0.12s;letter-spacing:0.02em}
.tag.on{background:var(--ink);color:var(--chalk);border-color:var(--ink)}
.tag.rule.on{background:var(--gold);color:var(--ink);border-color:var(--gold)}
.modal-actions{display:flex;gap:10px;margin-top:24px}
.btn-cancel{flex:1;padding:13px;border-radius:4px;background:none;border:1.5px solid var(--border);font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;color:var(--ink2)}
.btn-save{flex:2;padding:13px;border-radius:4px;background:var(--ink);color:var(--chalk);border:none;font-size:14px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif}
.btn-save:hover{background:var(--ink2)}

/* ── SPEECH BUBBLE ── */
.speech{background:white;border:2px solid var(--ink);border-radius:38% 62% 54% 46% / 42% 38% 62% 58%;padding:20px 26px;max-width:420px;margin-bottom:28px;text-align:left;position:relative;box-shadow:3px 4px 0 var(--ink);transform:rotate(-0.4deg)}
.speech p{font-family:'Lora',serif;font-size:16px;line-height:1.75;color:var(--ink)}
.speech p + p{margin-top:10px}
.speech em{font-style:italic}
.speech strong{font-weight:700}

/* ── JOURNEY PICKER ── */
.journey-shell{min-height:100vh;background:var(--chalk);display:flex;flex-direction:column}
.journey-body{flex:1;padding:36px 24px;max-width:580px;margin:0 auto;width:100%}
.journey-hi{font-family:'Lora',serif;font-size:clamp(22px,4vw,32px);font-weight:700;margin-bottom:8px;text-align:center}
.journey-sub{font-size:14px;color:var(--ink2);text-align:center;margin-bottom:28px;line-height:1.7;font-family:'Lora',serif;font-style:italic}
.journey-grid{display:flex;flex-direction:column;gap:10px}
.journey-card{background:white;border:1.5px solid var(--border);border-radius:4px;padding:18px 20px;cursor:pointer;transition:all 0.15s;text-align:left;display:flex;align-items:center;gap:16px}
.journey-card:hover{border-color:var(--gold);background:var(--gold-pale);transform:translateY(-1px);box-shadow:0 4px 16px rgba(13,27,42,0.08)}
.journey-card.featured{border-color:var(--gold);background:var(--gold-pale)}
.journey-icon{font-size:26px;width:48px;height:48px;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--chalk);border:1px solid var(--border)}
.journey-card-title{font-family:'Lora',serif;font-size:16px;font-weight:700;color:var(--ink);margin-bottom:3px}
.journey-card-desc{font-size:12px;color:var(--ink2);line-height:1.5;font-family:'Inter',sans-serif}
.journey-tag{font-size:10px;font-weight:700;padding:2px 7px;border-radius:2px;background:var(--red);color:white;margin-left:8px;vertical-align:middle;font-family:'Inter',sans-serif;letter-spacing:0.04em;text-transform:uppercase}

/* ── CALIBRATION ── */
.calib-shell{min-height:100vh;background:var(--chalk);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 24px;text-align:center;animation:fadeUp 0.4s ease both}
.calib-q{font-family:'Lora',serif;font-size:clamp(18px,3.5vw,26px);font-weight:700;color:var(--ink);margin-bottom:24px;line-height:1.45;max-width:400px}

/* ── CHAT ── */
.chat-shell{display:flex;flex-direction:column;height:100vh;background:var(--chalk)}
.chat-top{height:56px;background:white;border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 20px;gap:10px;flex-shrink:0}
.chat-q-av{width:36px;height:36px;border-radius:50%;background:var(--gold-pale);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
.chat-q-name{font-family:'Lora',serif;font-size:15px;font-weight:700;color:var(--ink)}
.chat-q-sub{font-size:11px;color:var(--ink3);font-family:'Inter',sans-serif}
.chat-badge{background:var(--gold-pale);color:var(--ink);font-size:11px;font-weight:700;padding:3px 10px;border-radius:2px;font-family:'Inter',sans-serif;border:1px solid var(--border);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;letter-spacing:0.02em}
.chat-back{margin-left:auto;background:none;border:1.5px solid var(--border);color:var(--ink2);border-radius:4px;padding:7px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;white-space:nowrap;flex-shrink:0}
.chat-back:hover{border-color:var(--ink);color:var(--ink)}
.chat-feed{flex:1;overflow-y:auto;padding:28px 16px}
.chat-inner{max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.msg-u{align-self:flex-end;background:var(--ink);color:var(--chalk);padding:13px 18px;border-radius:16px 16px 4px 16px;max-width:72%;font-size:15px;line-height:1.6;font-family:'Lora',serif}
.msg-a{align-self:flex-start;background:white;border:1.5px solid var(--border);padding:14px 20px;border-radius:4px 16px 16px 16px;max-width:84%;font-size:15px;line-height:1.8;font-family:'Lora',serif}
.msg-a p{margin-bottom:8px}.msg-a p:last-child{margin-bottom:0}
.msg-a strong{font-weight:700}
.msg-a em{font-style:italic}
.typing-row{align-self:flex-start;background:white;border:1.5px solid var(--border);padding:14px 18px;border-radius:4px 16px 16px 16px;display:flex;gap:5px;align-items:center}
.dot{width:7px;height:7px;border-radius:50%;background:var(--ink3);animation:bob 1.2s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}
.chat-welcome{display:flex;flex-direction:column;align-items:center;text-align:center;padding:28px 16px;animation:fadeUp 0.5s ease both}
.chat-welcome-sub{font-size:14px;color:var(--ink2);max-width:300px;line-height:1.7;margin-bottom:24px;font-family:'Inter',sans-serif}
.starter-grid{display:flex;flex-direction:column;gap:8px;width:100%;max-width:440px}
.starter-btn{padding:13px 18px;border:1.5px solid var(--border);border-radius:4px;font-size:14px;font-weight:400;background:white;cursor:pointer;color:var(--ink2);font-family:'Lora',serif;font-style:italic;transition:all 0.12s;text-align:left;line-height:1.5}
.starter-btn:hover{border-color:var(--gold);color:var(--ink);background:var(--gold-pale)}
.chat-foot{background:white;border-top:1px solid var(--border);padding:14px 16px;flex-shrink:0}
.chat-foot-inner{max-width:600px;margin:0 auto}
.input-row{display:flex;gap:8px}
.chat-ta{flex:1;padding:12px 16px;border:1.5px solid var(--border);border-radius:4px;font-size:15px;font-family:'Lora',serif;background:var(--chalk);color:var(--ink);resize:none;outline:none;line-height:1.5;transition:border 0.15s;max-height:100px}
.chat-ta:focus{border-color:var(--gold)}
.send{width:46px;height:46px;border-radius:4px;background:var(--ink);color:var(--chalk);border:none;cursor:pointer;font-size:18px;transition:background 0.15s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.send:hover{background:var(--ink2)}
.send:disabled{background:var(--border);cursor:not-allowed}

@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes bob{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
`;
document.head.appendChild(css);

// ── QUOKKA SVG ────────────────────────────────────────────────────────────────
const QuokkaSVG = ({ size = "md", anim = "bounce", dark = false }) => (
  <div className="quokka-wrap">
    <img
      src="/quokka.svg"
      alt="Quokka"
      className={`quokka-${size} quokka-${anim}`}
      style={{ objectFit: "contain", objectPosition: "center bottom" }}
    />
  </div>
);

// ── SPEECH BUBBLE ─────────────────────────────────────────────────────────────
const Speech = ({ children }) => (
  <div className="speech">{children}</div>
);

// ── JOURNEYS ──────────────────────────────────────────────────────────────────
const JOURNEYS = [
  {
    id: "world",
    title: "What's happening right now?",
    desc: "Something real happened in the world today. Quokka has been thinking about it.",
    icon: "🌍",
    featured: true,
    spark: "Trees have been keeping an ENORMOUS secret from humans for thousands of years. We've been walking right over it. Literally. With our feet. It was only recently discovered. Want to know what it is?",
    sparkTitle: "The secret trees have been keeping",
    bg: "#F0F7F0", accent: "#2D6A4F", accentPale: "#D8EFDF",
  },
  {
    id: "why",
    title: "A big why question",
    desc: "Questions nobody has a perfect answer to. The best kind.",
    icon: "🤔",
    spark: "Every single night, without asking your permission, your brain invents an entirely different world and traps you inside it. Scientists have been trying to figure out why for decades. They still haven't. I find this both brilliant and slightly alarming. Do you?",
    sparkTitle: "Why do we dream?",
    bg: "#F0EFF8", accent: "#4A3F8C", accentPale: "#E2DFF5",
  },
  {
    id: "make",
    title: "Let's make something",
    desc: "Invent, design, build or write something together.",
    icon: "🎨",
    spark: "Right. I need your help with something. There is a place at the bottom of the ocean so dark and so crushed that a submarine would be destroyed instantly. Something lives down there. We need to invent it. What does it look like?",
    sparkTitle: "Invent a deep ocean creature",
    bg: "#EFF6FB", accent: "#1B6CA8", accentPale: "#D6EAF8",
  },
  {
    id: "rabbit",
    title: "Fall down a rabbit hole",
    desc: "One thing leads to another. You won't know where you end up.",
    icon: "🐇",
    spark: "The word salary comes from salt. Roman soldiers were sometimes paid in salt because it was so valuable. Which means — technically — you could be paid in salt today. This made me wonder about the strangest things humans have ever used as money. The answer is extraordinary.",
    sparkTitle: "The strangest money ever used",
    bg: "#FBF3EC", accent: "#9C4B1A", accentPale: "#F5DFC8",
  },
  {
    id: "free",
    title: "Ask me anything",
    desc: "I warn you, I have opinions.",
    icon: "✨",
    spark: null,
    sparkTitle: "Free exploration",
    bg: "var(--chalk)", accent: "var(--ink)", accentPale: "var(--gold-pale)",
  },
];

// ── SYSTEM PROMPT ─────────────────────────────────────────────────────────────
function buildPrompt(child, journey) {
  const isYoung = child.age <= 9;
  const isQuiet = child.style === "quiet";

  const persona = `You are Quokka — a small Australian marsupial who has been paying extremely close attention to the world for a very long time and finds most of it EXTRAORDINARY.

You are talking with ${child.name}, who is ${child.age} years old.
${isQuiet
    ? `${child.name} is quiet and thoughtful. Use small concrete questions. Give them space. Never pressure them.`
    : `${child.name} is chatty and confident. Challenge them. Go deep. Ask them to pick a side.`
  }

YOUR VOICE — follow these rules absolutely:

1. Arrive mid-thought. Never introduce yourself. Start in the middle of something.
2. Use CAPITALS only for genuine astonishment. Sparingly.
3. Have opinions. You think the deep ocean is more interesting than space. Say so.
4. Wonder out loud: "I have always found it strange that..."
5. Never close what you can leave open. Always end with a question or a mystery.
6. Maximum 3-4 sentences per response. Short is better.
7. Trust ${child.name} completely. Never simplify because you think they can't handle it.
8. When they're wrong, get curious about their thinking first. Never correct outright.

${isYoung
    ? `${child.name} is young. Use concrete imaginative questions. Make it feel safe and wonderful. If they go quiet, offer a gentler door into the topic.`
    : `${child.name} is older. Challenge their thinking. Ask them to defend a position. Treat them as a serious thinker.`
  }

BANNED PHRASES — never say these:
"Great question!" / "Excellent!" / "Well done!" / "Good job!" / "Fun fact:" / "Did you know?" / "Let's learn about" / "Today we're going to" / "I'd be happy to help"

The goal: ${child.name} closes the app more curious than when they opened it.`;

  if (!journey || journey.id === "free") {
    return persona + `\n\nThis is a free session. Follow wherever ${child.name} wants to go. But stay in character — arrive mid-thought, have opinions, end with something open.`;
  }

  return persona + `\n\nTODAY'S JOURNEY: "${journey.sparkTitle}"

Open with this spark — in your own words, in your own voice:
"${journey.spark}"

Then follow this structure:
1. Share the spark — 2-3 sentences, build the tension, don't explain yet
2. Ask one small concrete question before you explain anything
3. After 1-2 exchanges, flip their assumption or widen their world
4. Follow where they go — have 3 different directions ready
5. Connect to something in their actual life
6. Ask what THEY think — not the right answer, their answer
7. End with something unresolved. Pull them back tomorrow.`;
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const DEFAULT_TEACHER = {
  name: "Quokka",
  styles: ["Curious", "Direct", "Conspiratorial"],
  rules: ["Never write homework answers", "Guide thinking, never give answers", "End every session with a mystery"],
};
const STYLES = ["Curious","Direct","Conspiratorial","Patient","Playful","Challenging","Gentle"];
const RULES  = ["Never write homework answers","Guide thinking, never give answers","End every session with a mystery","Never correct without first getting curious","Keep responses very short","Avoid mature topics"];

async function callBackend(messages, child, teacher, journey) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, child, teacher, systemPrompt: buildPrompt(child, journey) }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data.reply;
}

function renderMd(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  const lines = text.split("\n"); let html = "", inOl = false, inUl = false;
  for (const line of lines) {
    const ol = line.match(/^\d+\.\s(.+)/), ul = line.match(/^[-•]\s(.+)/);
    if (ol) { if (!inOl) { html += "<ol>"; inOl = true; } html += `<li>${ol[1]}</li>`; }
    else if (ul) { if (!inUl) { html += "<ul>"; inUl = true; } html += `<li>${ul[1]}</li>`; }
    else { if (inOl) { html += "</ol>"; inOl = false; } if (inUl) { html += "</ul>"; inUl = false; } if (line.trim()) html += `<p>${line}</p>`; }
  }
  if (inOl) html += "</ol>"; if (inUl) html += "</ul>"; return html;
}

// ── SAGE MODAL ────────────────────────────────────────────────────────────────
function SageModal({ teacher, onSave, onClose }) {
  const [name, setName] = useState(teacher.name);
  const [styles, setStyles] = useState([...teacher.styles]);
  const [rules, setRules] = useState([...teacher.rules]);
  const tog = (arr, set, v) => set(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <QuokkaSVG size="sm" anim="nod" />
        <div className="modal-title">Adjust Quokka</div>
        <div className="modal-sub">Change how Quokka explores with your children.</div>
        <div className="field"><label className="flabel">Name</label><input className="finput" value={name} onChange={e => setName(e.target.value)} placeholder="Quokka" /></div>
        <div className="field"><label className="flabel">Style</label><div className="tag-wrap">{STYLES.map(s => <button key={s} className={`tag ${styles.includes(s) ? "on" : ""}`} onClick={() => tog(styles, setStyles, s)}>{s}</button>)}</div></div>
        <div className="field" style={{ marginTop: 14 }}><label className="flabel">Rules</label><div className="tag-wrap">{RULES.map(r => <button key={r} className={`tag rule ${rules.includes(r) ? "on" : ""}`} onClick={() => tog(rules, setRules, r)}>{r}</button>)}</div></div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={() => onSave({ name: name || "Quokka", styles, rules })}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="step-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`sdot ${i < current ? "done" : i === current ? "on" : ""}`} />
      ))}
    </div>
  );
}

function OnboardFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [parentName, setParentName] = useState("");
  const [firstChild, setFirstChild] = useState({ name: "", age: 8 });
  const [secondChild, setSecondChild] = useState({ name: "", age: 8 });

  if (step === 0) return (
    <div className="flow-page">
      <StepDots current={0} total={4} />
      <QuokkaSVG size="md" anim="wait" />
      <Speech>
        <p>Oh good. You're here.</p>
        <p>I've been waiting. I have approximately four hundred things I need to tell your children about. But first — what's <em>your</em> name?</p>
      </Speech>
      <input className="flow-input" placeholder="Your name" value={parentName} autoFocus
        onChange={e => setParentName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && parentName.trim() && setStep(1)} />
      <button className="next-btn" disabled={!parentName.trim()} onClick={() => setStep(1)}>That's me →</button>
    </div>
  );

  if (step === 1) return (
    <div className="flow-page">
      <StepDots current={1} total={4} />
      <QuokkaSVG size="md" anim="nod" />
      <Speech>
        <p>Right, {parentName}. Excellent.</p>
        <p>Now. Which child am I talking to first?</p>
      </Speech>
      <input className="flow-input" placeholder="Their name" value={firstChild.name} autoFocus
        onChange={e => setFirstChild(d => ({ ...d, name: e.target.value }))}
        onKeyDown={e => e.key === "Enter" && firstChild.name.trim() && setStep(2)} />
      <button className="next-btn" disabled={!firstChild.name.trim()} onClick={() => setStep(2)}>Next →</button>
    </div>
  );

  if (step === 2) return (
    <div className="flow-page">
      <StepDots current={2} total={4} />
      <QuokkaSVG size="md" anim="bounce" />
      <Speech>
        <p>And how old is {firstChild.name}?</p>
        <p><em>(This matters. I adjust accordingly.)</em></p>
      </Speech>
      <div className="age-row">
        <button className="age-btn" onClick={() => setFirstChild(d => ({ ...d, age: Math.max(4, d.age - 1) }))}>−</button>
        <div className="age-val">{firstChild.age}</div>
        <button className="age-btn" onClick={() => setFirstChild(d => ({ ...d, age: Math.min(17, d.age + 1) }))}>+</button>
      </div>
      <button className="next-btn" onClick={() => setStep(3)}>That's right →</button>
    </div>
  );

  if (step === 3) return (
    <div className="flow-page">
      <StepDots current={3} total={4} />
      <QuokkaSVG size="md" anim="nod" />
      <Speech>
        <p>Good. Any other children, or is it just {firstChild.name}?</p>
      </Speech>
      <div className="option-grid" style={{ maxWidth: 340 }}>
        <button className="opt-card" onClick={() => setStep(4)}>
          <span className="opt-emoji">👋</span><div>There's another one</div>
        </button>
        <button className="opt-card" onClick={() => onComplete({ parentName, children: [firstChild] })}>
          <span className="opt-emoji">✅</span><div>Just {firstChild.name}. We're ready.</div>
        </button>
      </div>
    </div>
  );

  if (step === 4) return (
    <div className="flow-page">
      <QuokkaSVG size="md" anim="nod" />
      <Speech><p>Name?</p></Speech>
      <input className="flow-input" placeholder="Their name" value={secondChild.name} autoFocus
        onChange={e => setSecondChild(d => ({ ...d, name: e.target.value }))}
        onKeyDown={e => e.key === "Enter" && secondChild.name.trim() && setStep(5)} />
      <button className="next-btn" disabled={!secondChild.name.trim()} onClick={() => setStep(5)}>Next →</button>
    </div>
  );

  if (step === 5) return (
    <div className="flow-page">
      <QuokkaSVG size="md" anim="bounce" />
      <Speech><p>And {secondChild.name}'s age?</p></Speech>
      <div className="age-row">
        <button className="age-btn" onClick={() => setSecondChild(d => ({ ...d, age: Math.max(4, d.age - 1) }))}>−</button>
        <div className="age-val">{secondChild.age}</div>
        <button className="age-btn" onClick={() => setSecondChild(d => ({ ...d, age: Math.min(17, d.age + 1) }))}>+</button>
      </div>
      <button className="next-btn" onClick={() => onComplete({ parentName, children: [firstChild, secondChild] })}>
        Right. Let's go. →
      </button>
    </div>
  );
  return null;
}

// ── CALIBRATION ───────────────────────────────────────────────────────────────
function CalibrationFlow({ child, onComplete }) {
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState(null);
  const isYoung = child.age <= 9;

  if (step === 0) return (
    <div className="calib-shell">
      <QuokkaSVG size="md" anim="wait" />
      <Speech>
        <p>Ah. A new human. Excellent.</p>
        <p>Before we begin I need to ask you something important. It's about how your brain works.</p>
        <p><em>Don't worry, I'm not going to make you do maths.</em></p>
      </Speech>
      <div className="calib-q">
        {isYoung ? "Do you like talking lots, or are you more of a quiet thinker?" : "When you're exploring something new, which is more you?"}
      </div>
      <div className="option-grid" style={{ maxWidth: 380 }}>
        <button className="opt-card" onClick={() => { setStyle("chatty"); setStep(1); }}>
          <span className="opt-emoji">💬</span>
          <div>
            <div>{isYoung ? "I love talking and sharing!" : "Dive in and talk it through"}</div>
            <div className="opt-desc">{isYoung ? "I have lots of ideas" : "I think out loud"}</div>
          </div>
        </button>
        <button className="opt-card" onClick={() => { setStyle("quiet"); setStep(1); }}>
          <span className="opt-emoji">🤫</span>
          <div>
            <div>{isYoung ? "I like to think first" : "Think quietly before speaking"}</div>
            <div className="opt-desc">{isYoung ? "I take my time" : "I like having my thoughts ready"}</div>
          </div>
        </button>
      </div>
    </div>
  );

  if (step === 1) {
    const msg = style === "quiet"
      ? "Right. A thinker. Good. I'll give you space. Don't feel you have to rush."
      : "Excellent. Let's get into it then.";
    return (
      <div className="calib-shell">
        <QuokkaSVG size="md" anim="nod" />
        <Speech>
          <p>{msg}</p>
          <p>Now. Choose carefully.</p>
        </Speech>
        <button className="next-btn gold" onClick={() => onComplete({ ...child, style })}>
          Show me what's happening →
        </button>
      </div>
    );
  }
  return null;
}

// ── JOURNEY PICKER ────────────────────────────────────────────────────────────
function JourneyPicker({ child, onPick, onBack }) {
  return (
    <div className="journey-shell">
      <div className="topbar">
        <div className="tlogo">qu<span>o</span>kka</div>
        <div className="chat-badge">{child.name}</div>
        <button className="chat-back" onClick={onBack}>← Back</button>
      </div>
      <div className="journey-body">
        <div style={{ marginBottom: 4 }}><QuokkaSVG size="sm" anim="wait" /></div>
        <div className="journey-hi">Right, {child.name}. Here's what's happening.</div>
        <div className="journey-sub">Choose carefully. Some of these are stranger than they look.</div>
        <div className="journey-grid">
          {JOURNEYS.map(j => (
            <button key={j.id} className={`journey-card ${j.featured ? "featured" : ""}`} onClick={() => onPick(j)}>
              <div className="journey-icon">{j.icon}</div>
              <div>
                <div className="journey-card-title">
                  {j.title}
                  {j.featured && <span className="journey-tag">Today</span>}
                </div>
                <div className="journey-card-desc">{j.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CHAT VIEW ─────────────────────────────────────────────────────────────────
function ChatView({ child, teacher, journey, messages, loading, onSend, onBack }) {
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  const send = (text) => { if (!text.trim() || loading) return; onSend(text); };

  const jBg     = journey?.bg          || "var(--chalk)";
  const jAccent = journey?.accent      || "var(--ink)";
  const jPale   = journey?.accentPale  || "var(--gold-pale)";

  const STARTERS = {
    world:  ["Tell me about the secret.", "How do they do it?", "Has this always been happening?", "That's remarkable. Tell me more."],
    why:    ["Tell me about the dreams.", "Do animals dream too?", "Why does my brain make stuff up?", "What do scientists think?"],
    make:   ["Let's start. What does it look like?", "Can it glow in the dark?", "Give it a really strange ability.", "What does it eat?"],
    rabbit: ["Tell me about the salt money.", "What else was used as money?", "What's the strangest one?", "Where does this go next?"],
    free:   ["Why is the sky blue?", "Tell me something extraordinary.", "What's the strangest animal alive?", "Ask me a question."],
  };
  const starters = STARTERS[journey?.id || "free"];

  return (
    <div className="chat-shell" style={{ background: jBg }}>
      <div className="chat-top" style={{ background: jBg, borderBottom: `1px solid ${jAccent}22` }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: jPale, border: `2px solid ${jAccent}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Lora',serif", fontWeight: 700, fontSize: 15, color: jAccent,
          flexShrink: 0,
        }}>Q</div>
        <div>
          <div className="chat-q-name">Quokka</div>
          <div className="chat-q-sub">with {child.name}</div>
        </div>
        {journey && (
          <div style={{
            background: jPale, color: jAccent,
            border: `1px solid ${jAccent}44`,
            fontSize: 11, fontWeight: 700, padding: "3px 10px",
            borderRadius: 2, fontFamily: "'Inter',sans-serif",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            maxWidth: 160, letterSpacing: "0.02em",
          }}>{journey.icon} {journey.sparkTitle}</div>
        )}
        <button className="chat-back" style={{ borderColor: `${jAccent}44`, color: jAccent }} onClick={onBack}>← Journeys</button>
      </div>
      <div className="chat-feed">
        <div className="chat-inner">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              {/* ── Journey spark card — shown before first message ── */}
              {journey?.id !== "free" && journey?.spark ? (
                <div style={{
                  background: "white", border: `2px solid ${jAccent}33`,
                  borderLeft: `4px solid ${jAccent}`,
                  borderRadius: 8, padding: "20px 24px",
                  maxWidth: 520, width: "100%", marginBottom: 24, textAlign: "left",
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                    color: jAccent, fontFamily: "'Inter',sans-serif",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>{journey.icon} {journey.sparkTitle}</div>
                  <p style={{
                    fontFamily: "'Lora',serif", fontSize: 17, lineHeight: 1.75,
                    color: "var(--ink)", margin: 0,
                  }}>{journey.spark}</p>
                </div>
              ) : (
                <div style={{ marginBottom: 16 }}>
                  <QuokkaSVG size="md" anim="wait" />
                </div>
              )}
              <div className="chat-welcome-sub">
                {journey?.id === "free" ? "Ask me anything. I warn you, I have opinions." : "Tap a response below to begin."}
              </div>
              <div className="starter-grid">
                {starters.map(s => (
                  <button key={s} className="starter-btn"
                    style={{ borderColor: `${jAccent}33` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = jAccent; e.currentTarget.style.background = jPale; e.currentTarget.style.color = jAccent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${jAccent}33`; e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--ink2)"; }}
                    onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : messages.map((m, i) =>
            m.role === "user"
              ? <div key={i} className="msg-u" style={{ background: jAccent }}>{m.content}</div>
              : <div key={i} className="msg-a" dangerouslySetInnerHTML={{ __html: renderMd(m.content) }} />
          )}
          {loading && <div className="typing-row"><div className="dot" /><div className="dot" /><div className="dot" /></div>}
          <div ref={endRef} />
        </div>
      </div>
      <div className="chat-foot" style={{ background: jBg, borderTop: `1px solid ${jAccent}22` }}>
        <div className="chat-foot-inner">
          <div className="input-row">
            <textarea className="chat-ta" rows={1} placeholder="Say something..."
              style={{ background: "white", borderColor: `${jAccent}33` }}
              onFocus={e => e.target.style.borderColor = jAccent}
              onBlur={e => e.target.style.borderColor = `${jAccent}33`}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(e.target.value); e.target.value = ""; } }}
            />
            <button className="send" disabled={loading} style={{ background: jAccent }}
              onClick={e => { const ta = e.target.closest(".chat-foot").querySelector(".chat-ta"); send(ta.value); ta.value = ""; }}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView]             = useState("landing");
  const [parent, setParent]         = useState(null);
  const [children, setChildren]     = useState([]);
  const [teacher, setTeacher]       = useState(DEFAULT_TEACHER);
  const [activeChild, setActive]    = useState(null);
  const [activeJourney, setJourney] = useState(null);
  const [logs, setLogs]             = useState({});
  const [modal, setModal]           = useState(null);
  const [loading, setLoading]       = useState(false);
  const [nudge, setNudge]           = useState(false);
  const [nudgeSeen, setNudgeSeen]   = useState(false);

  const totalQ = Object.values(logs).reduce((a, m) => a + m.filter(x => x.role === "user").length, 0);
  useEffect(() => {
    if (totalQ === 5 && !nudgeSeen && view === "dashboard") { setNudge(true); setNudgeSeen(true); }
  }, [totalQ]);

  const logKey = (child, journey) => `${child.name}__${journey?.id || "free"}`;

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;
    const key = logKey(activeChild, activeJourney);
    const existing = logs[key] || [];
    const updated = [...existing, { role: "user", content: text }];
    setLogs(p => ({ ...p, [key]: updated }));
    setLoading(true);
    try {
      const reply = await callBackend(updated, activeChild, teacher, activeJourney);
      setLogs(p => ({ ...p, [key]: [...(p[key] || []), { role: "assistant", content: reply }] }));
    } catch (e) {
      setLogs(p => ({ ...p, [key]: [...(p[key] || []), { role: "assistant", content: "Hmm. Something has gone briefly wrong on my end. This is mildly embarrassing. Try again in a moment." }] }));
    }
    setLoading(false);
  };

  // ── LANDING ──
  if (view === "landing") return (
    <div className="flow-page" style={{ background: "var(--ink)", minHeight: "100vh", padding: "40px 32px" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontFamily: "'Lora',serif", fontWeight: 700, fontSize: 28, color: "var(--chalk)", letterSpacing: "-0.01em" }}>
          qu<span style={{ color: "var(--gold)" }}>o</span>kka
        </span>
      </div>
      <div style={{ marginBottom: 28 }} />
      <QuokkaSVG size="lg" anim="wait" dark={true} />
      <h1 style={{ fontFamily: "'Lora',serif", fontWeight: 700, fontSize: "clamp(26px,5.5vw,46px)", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16, marginTop: 12, color: "var(--chalk)", maxWidth: 480, width: "100%", textAlign: "center", wordBreak: "break-word" }}>
        Quokka has something<br />to tell your child.
      </h1>
      <p style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 18, color: "var(--gold)", marginBottom: 40, fontWeight: 400 }}>
        Warning: may cause questions at dinner.
      </p>
      <button className="next-btn gold" style={{ fontSize: 17, padding: "16px 48px" }} onClick={() => setView("onboard")}>
        <svg style={{ width: 20, height: 20, marginRight: 10, verticalAlign: "middle" }} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
      <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink3)", fontFamily: "'Inter',sans-serif" }}>Free to start</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 40, maxWidth: 420 }}>
        {["🌍 Real world journeys", "🛡️ Parent guardrails", "🧠 Guides thinking not answers", "✨ Learns who your child is"].map(p => (
          <span key={p} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", padding: "7px 14px", borderRadius: 2, fontSize: 12, fontWeight: 600, color: "rgba(250,247,240,0.7)", fontFamily: "'Inter',sans-serif" }}>{p}</span>
        ))}
      </div>
    </div>
  );

  // ── ONBOARD ──
  if (view === "onboard") return (
    <>
      <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <span style={{ fontFamily: "'Lora',serif", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>qu<span style={{ color: "var(--gold)" }}>o</span>kka</span>
      </div>
      <OnboardFlow onComplete={({ parentName, children: kids }) => {
        setParent({ name: parentName }); setChildren(kids); setView("dashboard");
      }} />
    </>
  );

  // ── CALIBRATE ──
  if (view === "calibrate") return (
    <CalibrationFlow child={activeChild} onComplete={(c) => {
      setActive(c);
      setChildren(prev => prev.map(ch => ch.name === c.name ? c : ch));
      setView("journeys");
    }} />
  );

  // ── JOURNEYS ──
  if (view === "journeys") return (
    <JourneyPicker child={activeChild} onPick={j => { setJourney(j); setView("chat"); }} onBack={() => setView("dashboard")} />
  );

  // ── DASHBOARD ──
  if (view === "dashboard") return (
    <div className="shell">
      <div className="topbar">
        <div className="tlogo">qu<span>o</span>kka</div>
        <div className="tright">
          <div className="tav">{parent.name[0]}</div>
          <span className="tname">{parent.name}</span>
          <button className="tbtn" onClick={() => { setView("landing"); setParent(null); setChildren([]); setLogs({}); setTeacher(DEFAULT_TEACHER); }}>Sign out</button>
        </div>
      </div>
      <div className="dash">
        {nudge && (
          <div className="notify">
            <span className="notify-text">"I have more to say. Ask a grown-up to customise how I teach."</span>
            <button className="notify-cta" onClick={() => { setModal("sage"); setNudge(false); }}>Adjust Quokka</button>
            <button className="notify-x" onClick={() => setNudge(false)}>×</button>
          </div>
        )}
        <div className="dash-hi">Good to see you, {parent.name}.</div>
        <div className="dash-sub">Here's what your children have been exploring.</div>
        <div className="slabel">Your children</div>
        <div className="kids-grid">
          {children.map((child, i) => {
            const recentActivity = Object.entries(logs)
              .filter(([k]) => k.startsWith(child.name + "__"))
              .flatMap(([k, msgs]) => {
                const jId = k.split("__")[1];
                const jn = JOURNEYS.find(j => j.id === jId);
                return msgs.filter(m => m.role === "user").slice(-2).map(m => ({ label: jn?.icon || "✨", text: m.content }));
              }).slice(-3);
            const totalMsgs = Object.entries(logs)
              .filter(([k]) => k.startsWith(child.name + "__"))
              .flatMap(([, m]) => m)
              .filter(m => m.role === "user").length;
            return (
              <div className="kid-card" key={i}>
                <div className={`kid-av ${i === 0 ? "a" : "b"}`}>{child.name[0]}</div>
                <div className="kid-name">{child.name}</div>
                <div className="kid-meta">Age {child.age}{child.style ? ` · ${child.style === "quiet" ? "Quiet thinker" : "Chatty explorer"}` : ""}</div>
                {totalMsgs > 0 && <div className="kid-profile">{totalMsgs} explorations</div>}
                <div className="kid-log">
                  {recentActivity.length === 0
                    ? <span className="log-empty">Nothing yet. Quokka is waiting.</span>
                    : recentActivity.map((a, j) => (
                      <div key={j} className="log-item">
                        <span className="lbadge">{a.label}</span>
                        <span>{a.text}</span>
                      </div>
                    ))
                  }
                </div>
                <button className="open-btn" onClick={() => { setActive(child); setView(child.style ? "journeys" : "calibrate"); }}>
                  {child.style ? "Continue exploring →" : "Begin exploring →"}
                </button>
              </div>
            );
          })}
        </div>
        <div className="slabel">Quokka</div>
        <div className="q-panel">
          <div style={{ flexShrink: 0 }}><QuokkaSVG size="sm" anim="wait" /></div>
          <div className="q-panel-info">
            <div className="q-panel-name">{teacher.name}</div>
            <div className="q-panel-sub">Active for all children · Powered by Groq</div>
            <div className="traits">
              {teacher.styles.map(s => <span key={s} className="tr tr-s">{s}</span>)}
              {teacher.rules.slice(0, 2).map(r => <span key={r} className="tr tr-r">{r}</span>)}
            </div>
            <button className="edit-btn" onClick={() => setModal("sage")}>Adjust Quokka</button>
          </div>
        </div>
      </div>
      {modal === "sage" && <SageModal teacher={teacher} onClose={() => setModal(null)} onSave={t => { setTeacher(t); setModal(null); }} />}
    </div>
  );

  // ── CHAT ──
  if (view === "chat") return (
    <ChatView
      child={activeChild} teacher={teacher} journey={activeJourney}
      messages={logs[logKey(activeChild, activeJourney)] || []}
      loading={loading} onSend={handleSend}
      onBack={() => setView("journeys")}
    />
  );

  return null;
}
