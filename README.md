# ConstructIQ — Construction Data Intelligence Platform

> **Tagline:** "From Construction Data to Better Decisions."  
> **Category:** AI-powered Construction Data Intelligence Platform  
> **Challenge:** LJ University B.Tech Hackathon 2026 — Task 07 (Smart Construction Data Management)

---

## 🚀 Quick Run Instructions

1. **Install Dependencies (if not already installed):**
   ```bash
   npm install
   ```

2. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```
   Open browser at `http://localhost:5173`.

3. **Production Build Verification:**
   ```bash
   npm run build
   ```

---

## 🔐 Demo Login & Roles

ConstructIQ includes zero-friction role switching (selectable on `/login` or via the top-left sidebar role dropdown):

- **Project Manager (Rohan Mehta) [DEFAULT DEMO ROLE]:** Full operational overview, Smart Risk Engine analysis, material procurement approvals, automated weekly reporting.
- **System Admin:** Platform control, compliance settings, system resets.
- **Site Engineer (Vikram Patel):** Field task updates, daily site logs, issue reporting.
- **Executive Management:** Portfolio-level financial health, ROI analytics.

---

## 🎯 3-Minute Judge Demo Flow

1. **Login & Dashboard Overview (`/`):**
   - See **Ahmedabad Smart Residency** (Hero Project) with 68% physical progress, ₹8.3 Cr spent (out of ₹10 Cr), completion date 31 Mar 2027.
   - Observe **Smart Risk Engine** calculating **75/100 HIGH RISK** with line-item breakdown (30+10+20+15+0 = 75).
   - See **Project Health Card** (Schedule: Medium, Budget: High, Materials: High, Resources: Low).

2. **Task & Delay Inspection (`/tasks`):**
   - Click **Tasks** in sidebar. Highlighted red row shows **Electrical Installation 45% DELAYED** (due 20 Sep 2026).

3. **Material Inventory Alert & 1-Click Procurement (`/materials`):**
   - See **LOW STOCK ALERT**: Steel inventory is 12 tons vs minimum threshold 15 tons.
   - Click **"Create Material Request (6 Tons)"** -> Generates request, updates stock state, adds purchase order to log.

4. **ConstructIQ AI Assistant (`/assistant`):**
   - Ask suggested prompt: *"Why is Ahmedabad Smart Residency delayed?"* or *"Which material needs immediate procurement?"*.
   - AI returns exact breakdown with **"Sources used: Tasks, Materials, Expenses"** and **1-click action buttons** inside the response.

5. **Data Import Center (`/import`):**
   - Click **"Load Sample Messy Spreadsheet"**. Watch unstructured Excel rows auto-map to clean system schema. Click import to update live state.

6. **Automated Weekly Report & PDF Print (`/report`):**
   - Click **"Generate Report"**. View formatted executive weekly report for 14-20 September 2026. Click **"Print / Download PDF"**.

7. **Task 07 Compliance Matrix (`/settings`):**
   - View complete coverage of all 7 Task 07 criteria (Data Management, Data Organization, Data Accessibility, Coordination, Reporting, Tracking, Decision-making).

---

## 📄 Product Documentation Index

- [`docs/DEVELOPMENT_DOCUMENTATION.md`](file:///c:/Users/qures/OneDrive/Desktop/new%20hack/docs/DEVELOPMENT_DOCUMENTATION.md) — Comprehensive technical architecture & design documentation.
- [`docs/SALES_PITCH.md`](file:///c:/Users/qures/OneDrive/Desktop/new%20hack/docs/SALES_PITCH.md) — Commercial business case, SaaS pricing & market analysis.
- [`docs/DEMO_SCRIPT.md`](file:///c:/Users/qures/OneDrive/Desktop/new%20hack/docs/DEMO_SCRIPT.md) — Step-by-step judge presentation script & Q&A defense.
- [`docs/MARKETING_IDEAS.md`](file:///c:/Users/qures/OneDrive/Desktop/new%20hack/docs/MARKETING_IDEAS.md) — Social media posts, ad taglines, video storyboard & poster copy.
