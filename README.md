# Quokka — AI Tutor for Kids

A lean v1 AI tutoring app. Parents bring their own LLM API key. Sage applies the guardrails.

## Getting started

```bash
npm install
npm start
```

## Stack
- React 18
- Bring-your-own LLM (Anthropic, OpenAI, Google, Groq)
- No backend — API calls go directly from the browser to the LLM provider

## Features
- Google SSO (simulated in prototype)
- Add up to 2 children with age + learning level
- Default "Sage" teacher persona with sensible guardrails
- Customisable teacher name, style, and rules
- Parent dashboard with chat history per child
- BYO API key — connect Anthropic, OpenAI, Google or Groq
