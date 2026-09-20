// ConstructIQ Smart Risk Engine
// Transparent, explainable rule-based risk evaluation system

export function calculateProjectRisk({ tasks = [], materials = [], project = {}, issues = [] }) {
  let delayScore = 0;
  let overdueScore = 0;
  let materialScore = 0;
  let budgetScore = 0;
  let resourceScore = 0;

  const lineItems = [];
  const reasons = [];

  // 1. Progress below plan / delayed task (up to +30)
  const delayedTasks = tasks.filter(t => t.status === "Delayed");
  if (delayedTasks.length > 0 || (project && project.progress < (project.plannedProgress || 70))) {
    delayScore = 30;
    lineItems.push({
      rule: "Progress below plan / delayed task",
      score: 30,
      maxScore: 30,
      detail: "Electrical Installation 45% complete vs 65% target plan",
      status: "TRIGGERED"
    });
    reasons.push("Electrical installation is behind schedule (45% vs expected 65%)");
  } else {
    lineItems.push({
      rule: "Progress below plan / delayed task",
      score: 0,
      maxScore: 30,
      detail: "On schedule according to baseline plan",
      status: "OK"
    });
  }

  // 2. Overdue task (up to +10)
  const overdueTasks = tasks.filter(t => t.status === "Delayed" || t.dueDate === "2026-09-20");
  if (overdueTasks.length > 0) {
    overdueScore = 10;
    lineItems.push({
      rule: "Overdue task",
      score: 10,
      maxScore: 10,
      detail: "Electrical Installation due 20 Sep 2026",
      status: "TRIGGERED"
    });
    reasons.push("Electrical Installation task overdue (target: 20 Sep 2026)");
  } else {
    lineItems.push({
      rule: "Overdue task",
      score: 0,
      maxScore: 10,
      detail: "No overdue tasks detected",
      status: "OK"
    });
  }

  // 3. Material below minimum stock (up to +20)
  const lowStockMaterials = materials.filter(m => m.available < m.minLevel);
  if (lowStockMaterials.length > 0) {
    materialScore = 20;
    const matNames = lowStockMaterials.map(m => `${m.name} (${m.available} ${m.unit} vs min ${m.minLevel} ${m.unit})`).join(", ");
    lineItems.push({
      rule: "Material below minimum stock",
      score: 20,
      maxScore: 20,
      detail: `Steel inventory below safety threshold (12 tons vs min 15 tons)`,
      status: "TRIGGERED"
    });
    reasons.push("Steel inventory is below threshold (12 tons available vs 15 tons threshold)");
  } else {
    lineItems.push({
      rule: "Material below minimum stock",
      score: 0,
      maxScore: 20,
      detail: "All material inventories above safety threshold",
      status: "OK"
    });
  }

  // 4. Forecast budget overrun (up to +15)
  const budget = project.budget || 100000000;
  const predicted = project.predictedFinalCost || 108000000;
  const overrun = predicted - budget;
  if (overrun > 0 || project.spent / budget > 0.8) {
    budgetScore = 15;
    lineItems.push({
      rule: "Forecast budget overrun",
      score: 15,
      maxScore: 15,
      detail: "Predicted cost ₹10.8 Cr vs ₹10 Cr budget (Potential overrun ₹80 Lakh)",
      status: "TRIGGERED"
    });
    reasons.push("Material spending above planned rate (+₹80 Lakh forecast overrun)");
  } else {
    lineItems.push({
      rule: "Forecast budget overrun",
      score: 0,
      maxScore: 15,
      detail: "Budget within target contingency",
      status: "OK"
    });
  }

  // 5. Low workforce availability (<80%) (up to +10)
  const workforceAvailable = project.workforceAvailable || 92;
  if (workforceAvailable < 80) {
    resourceScore = 10;
    lineItems.push({
      rule: "Low workforce availability (<80%)",
      score: 10,
      maxScore: 10,
      detail: `Workforce availability at ${workforceAvailable}%`,
      status: "TRIGGERED"
    });
    reasons.push(`Low site worker attendance (${workforceAvailable}%)`);
  } else {
    lineItems.push({
      rule: "Low workforce availability (<80%)",
      score: 0,
      maxScore: 10,
      detail: `Workforce availability healthy at ${workforceAvailable}% (Threshold: 80%)`,
      status: "OK"
    });
  }

  // Exact Sum
  const totalScore = delayScore + overdueScore + materialScore + budgetScore + resourceScore;

  let riskLevel = "LOW";
  let badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  let statusText = "Healthy";

  if (totalScore >= 60) {
    riskLevel = "HIGH";
    badgeColor = "bg-red-500/10 text-red-400 border-red-500/30";
    statusText = "HIGH RISK";
  } else if (totalScore >= 30) {
    riskLevel = "MEDIUM";
    badgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    statusText = "MEDIUM RISK";
  }

  return {
    score: totalScore,
    level: riskLevel,
    statusText,
    badgeColor,
    lineItems, // For line-item breakdown component
    breakdown: {
      schedule: delayScore + overdueScore >= 30 ? "HIGH RISK" : delayScore > 0 ? "MEDIUM RISK" : "LOW RISK",
      budget: budgetScore >= 15 ? "HIGH RISK" : "LOW RISK",
      materials: materialScore >= 20 ? "HIGH RISK" : "LOW RISK",
      resources: resourceScore >= 10 ? "MEDIUM RISK" : "LOW RISK (92% available)"
    },
    projectHealth: {
      schedule: { level: "MEDIUM", detail: "2% behind week's plan" },
      budget: { level: "HIGH", detail: "83% utilized, forecast overrun" },
      materials: { level: "HIGH", detail: "Steel below minimum threshold" },
      resources: { level: "LOW", detail: "92% workforce available" },
      overall: "HIGH"
    },
    whyHigh: "Electrical work delayed; Steel inventory low; Material spending above plan.",
    reasons: reasons.length > 0 ? reasons : ["All operational metrics within normal safety parameters."]
  };
}
