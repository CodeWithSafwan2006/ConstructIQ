# ConstructIQ — 3-Minute Live Demo Script & Judge Q&A Defense

---

## 🎬 3-Minute Step-by-Step Judge Demo Guide

### **Minute 1: The Operations Command Center (`/`)**
- **Action:** Open `http://localhost:5173`. Select role **Project Manager (Rohan Mehta)**.
- **What to say:**
  > *"Judges, welcome to ConstructIQ. Notice the greeting: 'Good morning, Project Manager'. This is our central Command Center tracking 5 active projects across Gujarat.*
  > *Look at our Hero Project: **Ahmedabad Smart Residency** — ₹10 Cr budget, 68% progress, target completion 31 Mar 2027.*
  > *Notice our **Smart Risk Engine** displaying **75/100 HIGH RISK**. If you look at the line items, every row sums mathematically to 75: Progress below plan (+30), Overdue task (+10), Material below minimum (+20), Forecast budget overrun (+15), Workforce (+0). It is 100% transparent and explainable."*

---

### **Minute 2: Delay Tracking, Low-Stock Alert & 1-Click Action (`/tasks`, `/materials`)**
- **Action:** Click **Tasks** in sidebar, then click **Materials**.
- **What to say:**
  > *"Let's drill down into why the project is at risk. On the **Tasks** page, our red banner highlights **Electrical Installation 45% DELAYED** (due 20 Sep 2026).*
  > *On the **Materials** page, a prominent yellow banner alerts us: **LOW STOCK ALERT — Steel inventory is 12 tons vs minimum 15 tons**.*
  > *I click **'Create Material Request (6 Tons)'** — state updates live across the app, stock increases, and a Purchase Request #MR001 is dispatched to vendor Tata Tiscon."*

---

### **Minute 3: AI Assistant, Data Import & Printable Report (`/assistant`, `/import`, `/report`)**
- **Action:** 
  1. Click **ConstructIQ AI** (`/assistant`) -> Click chip *"Why is Ahmedabad Smart Residency delayed?"*. Show sources tag and action button inside answer.
  2. Click **Import Data** (`/import`) -> Click **"Load Sample Messy Spreadsheet"**. Show raw Excel -> auto-mapped schema -> Click Import.
  3. Click **Weekly Reports** (`/report`) -> Click **"Print / Download PDF"**.
- **What to say:**
  > *"Our **ConstructIQ AI Assistant** synthesizes site telemetry and cites exact data sources (*Tasks, Materials, Expenses*). Notice how it gives working action buttons directly inside the answer.*
  > *Our **Data Import Center** takes unstructured site spreadsheets and auto-maps them into clean task/material records in seconds.*
  > *Finally, our **Report Generator** outputs an executive weekly report for 14-20 September 2026 ready for 1-click PDF printing.*
  > *ConstructIQ turns fragmented construction data into timely, profitable decisions. Thank you!"*

---

## 🛡️ Judge Q&A Defense Script (Backup Answers)

### **Q1: "Is the AI real or hardcoded?"**
> **Answer:** *"ConstructIQ features a **dual AI engine**. By default, it operates on a deterministic, rule-based telemetry engine (`riskEngine.js`) that analyzes live task progress, material stock levels, and expense variance. This guarantees 100% offline reliability without external API dependencies. However, if a `VITE_OPENAI_API_KEY` or `VITE_ANTHROPIC_API_KEY` is provided in the environment, ConstructIQ dynamically connects to LLM endpoints with live site data passed as context. The platform never breaks without a key."*

### **Q2: "How is this different from Procore or Buildertrend?"**
> **Answer:** *"US platforms like Procore cost over $10,000/year, require months of training, and do not fit Indian construction workflows. ConstructIQ is designed specifically for Indian builders: it includes Indian currency formatting (₹ Cr / Lakh), lightweight WhatsApp/CSV import centers, local trade contractor tracking, and a transparent 0–100 risk engine starting at just ₹4,999/month."*

### **Q3: "How will you make money and scale?"**
> **Answer:** *"We operate a multi-tier B2B SaaS model: Starter at ₹4,999/mo for single-site builders, Growth at ₹14,999/mo for multi-site developers, and Enterprise custom pricing for large infrastructure firms. We also plan to add transaction-based material procurement commissions from steel and cement suppliers."*

### **Q4: "What about data security on site?"**
> **Answer:** *"ConstructIQ implements role-based access control (Admin, PM, Site Engineer, Executive). Sensitive financial ledgers and margin forecasts are restricted to PM and Executive roles, while Site Engineers only see field task lists and issue logs."*
