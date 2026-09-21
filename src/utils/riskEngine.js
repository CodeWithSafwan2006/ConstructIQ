// ConstructIQ Smart Risk Engine
// Transparent, explainable rule-based risk evaluation system

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
  const isProgressBehind = project && project.progress < (project.plannedProgress || 70) && (project.plannedProgress > 0);
  if (delayedTasks.length > 0 || isProgressBehind) {
    delayScore = 30;
    const taskName = delayedTasks[0]?.name || "Activity";
    const detailMsg = delayedTasks.length > 0 
      ? `"${taskName}" task is delayed behind scheduled baseline` 
      : `Overall progress ${project.progress || 0}% vs target ${project.plannedProgress || 70}%`;
    lineItems.push({
      rule: "Progress below plan / delayed task",
      score: 30,
      maxScore: 30,
      detail: detailMsg,
      status: "TRIGGERED"
    });
    reasons.push(detailMsg);
  } else {
    lineItems.push({
      rule: "Progress below plan / delayed task",
      score: 0,
      maxScore: 30,
      detail: "Tasks progressing according to baseline plan",
      status: "OK"
    });
  }

  // 2. Overdue task (up to +10)
  const overdueTasks = tasks.filter(t => t.status === "Delayed");
  if (overdueTasks.length > 0) {
    overdueScore = 10;
    lineItems.push({
      rule: "Overdue task",
      score: 10,
      maxScore: 10,
      detail: `"${overdueTasks[0].name}" milestone is overdue`,
      status: "TRIGGERED"
    });
    reasons.push(`Overdue activity: ${overdueTasks[0].name}`);
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
    const mat = lowStockMaterials[0];
    const matMsg = `${mat.name} inventory below threshold (${mat.available} ${mat.unit} vs min ${mat.minLevel} ${mat.unit})`;
    lineItems.push({
      rule: "Material below minimum stock",
      score: 20,
      maxScore: 20,
      detail: matMsg,
      status: "TRIGGERED"
    });
    reasons.push(matMsg);
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
  const budget = project.budget || 0;
  const spent = project.spent || 0;
  const predicted = project.predictedFinalCost || budget;
  const overrun = predicted - budget;
  if ((overrun > 0 && budget > 0) || (budget > 0 && spent / budget > 0.85)) {
    budgetScore = 15;
    const bugMsg = overrun > 0 
      ? `Predicted cost ₹${(predicted/10000000).toFixed(1)} Cr exceeds budget ₹${(budget/10000000).toFixed(1)} Cr` 
      : `High budget utilization (${((spent/budget)*100).toFixed(0)}%)`;
    lineItems.push({
      rule: "Forecast budget overrun",
      score: 15,
      maxScore: 15,
      detail: bugMsg,
      status: "TRIGGERED"
    });
    reasons.push(bugMsg);
  } else {
    lineItems.push({
      rule: "Forecast budget overrun",
      score: 0,
      maxScore: 15,
      detail: "Budget allocation within target thresholds",
      status: "OK"
    });
  }

  // 5. Low workforce availability (<80%) (up to +10)
  const workforceAvailable = project.workforceAvailable !== undefined ? project.workforceAvailable : 95;
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
      detail: `Workforce availability healthy at ${workforceAvailable}%`,
      status: "OK"
    });
  }

  // Total Score Sum
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
    lineItems,
    breakdown: {
      schedule: delayScore + overdueScore >= 30 ? "HIGH RISK" : delayScore > 0 ? "MEDIUM RISK" : "LOW RISK",
      budget: budgetScore >= 15 ? "HIGH RISK" : "LOW RISK",
      materials: materialScore >= 20 ? "HIGH RISK" : "LOW RISK",
      resources: resourceScore >= 10 ? "MEDIUM RISK" : `LOW RISK (${workforceAvailable}% available)`
    },
    projectHealth: {
      schedule: { level: delayScore > 0 ? "MEDIUM" : "LOW", detail: delayScore > 0 ? "Behind plan" : "On schedule" },
      budget: { level: budgetScore > 0 ? "HIGH" : "LOW", detail: budgetScore > 0 ? `${((spent/(budget||1))*100).toFixed(0)}% utilized` : "Within budget" },
      materials: { level: materialScore > 0 ? "HIGH" : "LOW", detail: materialScore > 0 ? "Low stock detected" : "Stock healthy" },
      resources: { level: resourceScore > 0 ? "MEDIUM" : "LOW", detail: `${workforceAvailable}% workforce available` },
      overall: riskLevel
    },
    whyHigh: reasons.length > 0 ? reasons.join("; ") : "All operational metrics within normal parameters.",
    reasons: reasons.length > 0 ? reasons : ["All operational metrics within normal safety parameters."]
  };
}

