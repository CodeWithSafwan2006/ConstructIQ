// ConstructIQ Centralized Mock Data & State Management

export const initialProjects = [
  {
    id: "p001",
    name: "Ahmedabad Smart Residency",
    client: "ABC Developers",
    location: "Ahmedabad, Gujarat",
    budget: 100000000, // ₹10 Cr
    spent: 83000000,   // ₹8.3 Cr
    predictedFinalCost: 108000000, // ₹10.8 Cr
    forecastOverrun: 8000000,     // ₹80 Lakh
    progress: 68,
    plannedProgress: 70,
    status: "At Risk",
    riskLevel: "HIGH",
    riskScore: 75,
    startDate: "2026-01-15",
    targetDate: "2027-03-31", // Completion: 31 Mar 2027
    manager: "Rohan Mehta",
    siteEngineer: "Vikram Patel",
    category: "Residential High-Rise",
    workforceAvailable: 92,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p002",
    name: "Gandhinagar Tech Park",
    client: "Zenith Infra",
    location: "Gandhinagar, Gujarat",
    budget: 240000000, // ₹24 Cr
    spent: 98000000,   // ₹9.8 Cr
    predictedFinalCost: 240000000,
    forecastOverrun: 0,
    progress: 41,
    plannedProgress: 42,
    status: "On Track",
    riskLevel: "LOW",
    riskScore: 18,
    startDate: "2025-10-01",
    targetDate: "2027-10-15",
    manager: "Ananya Roy",
    siteEngineer: "Suresh Mehta",
    category: "Commercial IT Park",
    workforceAvailable: 96,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p003",
    name: "Surat Riverfront Mall",
    client: "Lotus Realty",
    location: "Surat, Gujarat",
    budget: 380000000, // ₹38 Cr
    spent: 209000000,  // ₹20.9 Cr
    predictedFinalCost: 385000000,
    forecastOverrun: 5000000,
    progress: 55,
    plannedProgress: 58,
    status: "Watch",
    riskLevel: "MEDIUM",
    riskScore: 42,
    startDate: "2025-08-15",
    targetDate: "2027-11-30",
    manager: "Karan Johar",
    siteEngineer: "Pooja Desai",
    category: "Retail Shopping Mall",
    workforceAvailable: 89,
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p004",
    name: "Vadodara Green Villas",
    client: "EcoNest Homes",
    location: "Vadodara, Gujarat",
    budget: 60000000, // ₹6 Cr
    spent: 49000000,  // ₹4.9 Cr
    predictedFinalCost: 60000000,
    forecastOverrun: 0,
    progress: 82,
    plannedProgress: 80,
    status: "On Track",
    riskLevel: "LOW",
    riskScore: 12,
    startDate: "2026-02-01",
    targetDate: "2027-05-15",
    manager: "Amit Shah",
    siteEngineer: "Manish Joshi",
    category: "Luxury Residential Gated",
    workforceAvailable: 95,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "p005",
    name: "Rajkot Commercial Hub",
    client: "Shree Developers",
    location: "Rajkot, Gujarat",
    budget: 150000000, // ₹15 Cr
    spent: 34500000,   // ₹3.45 Cr
    predictedFinalCost: 162000000,
    forecastOverrun: 12000000,
    progress: 23,
    plannedProgress: 35,
    status: "Delayed",
    riskLevel: "HIGH",
    riskScore: 68,
    startDate: "2026-03-10",
    targetDate: "2028-02-28",
    manager: "Rajesh Varma",
    siteEngineer: "Hiren Patel",
    category: "Commercial Complex",
    workforceAvailable: 74,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialTasks = [
  // HERO Project: Ahmedabad Smart Residency (p001) - exact required tasks
  {
    id: "t001",
    name: "Foundation Work",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Ramesh Concrete Ltd",
    progress: 100,
    dueDate: "2026-04-15",
    priority: "High",
    status: "Completed",
    category: "Civil"
  },
  {
    id: "t002",
    name: "Structural Work (RRC Frame)",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Apex Structures",
    progress: 82,
    dueDate: "2026-09-30",
    priority: "High",
    status: "In Progress",
    category: "Structural"
  },
  {
    id: "t003",
    name: "Electrical Installation",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "PowerGrid Contractors",
    progress: 45,
    dueDate: "2026-09-20", // Overdue / Delayed date
    priority: "High",
    status: "Delayed",
    category: "MEP"
  },
  {
    id: "t004",
    name: "Plumbing & Piping",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "FlowTech Plumbing",
    progress: 38,
    dueDate: "2026-10-15",
    priority: "Medium",
    status: "In Progress",
    category: "MEP"
  },
  {
    id: "t005",
    name: "Flooring & Tiling",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Ceramic Studio",
    progress: 15,
    dueDate: "2026-11-05",
    priority: "Medium",
    status: "Pending",
    category: "Finishing"
  },
  {
    id: "t006",
    name: "Exterior Painting",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Asian Coatings",
    progress: 0,
    dueDate: "2026-11-20",
    priority: "Low",
    status: "Pending",
    category: "Finishing"
  },
  {
    id: "t007",
    name: "Final Safety & Quality Inspection",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Bureau Veritas Audit",
    progress: 0,
    dueDate: "2027-03-25",
    priority: "High",
    status: "Pending",
    category: "Quality"
  },
  {
    id: "t008",
    name: "Site Preparation & Excavation",
    projectId: "p001",
    projectName: "Ahmedabad Smart Residency",
    assignedTo: "Ramesh Concrete Ltd",
    progress: 100,
    dueDate: "2026-02-10",
    priority: "High",
    status: "Completed",
    category: "Civil"
  },

  // Project 2: Gandhinagar Tech Park
  { id: "t009", name: "Piling & Excavation", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "Zenith Earthworks", progress: 100, dueDate: "2026-01-30", priority: "High", status: "Completed", category: "Civil" },
  { id: "t010", name: "Basement RRC Slab", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "Zenith Earthworks", progress: 100, dueDate: "2026-04-20", priority: "High", status: "Completed", category: "Structural" },
  { id: "t011", name: "Steel Superstructure Block A", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "Tata Steel Infra", progress: 65, dueDate: "2026-10-30", priority: "High", status: "In Progress", category: "Structural" },
  { id: "t012", name: "Curtain Wall Glass Glazing", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "GlassTech Corp", progress: 20, dueDate: "2026-12-15", priority: "Medium", status: "In Progress", category: "Finishing" },
  { id: "t013", name: "HVAC Central Plant Piping", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "Voltas Climate", progress: 10, dueDate: "2027-02-28", priority: "High", status: "Pending", category: "MEP" },
  { id: "t014", name: "Data Center Flooring", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "NetInfra Systems", progress: 0, dueDate: "2027-04-15", priority: "Medium", status: "Pending", category: "Finishing" },
  { id: "t015", name: "Fire Suppression System", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "SafeGuard Fire", progress: 5, dueDate: "2027-05-30", priority: "High", status: "In Progress", category: "MEP" },
  { id: "t016", name: "Solar Panel Grid Assembly", projectId: "p002", projectName: "Gandhinagar Tech Park", assignedTo: "GreenPower Energy", progress: 0, dueDate: "2027-08-15", priority: "Low", status: "Pending", category: "Electrical" },

  // Project 3: Surat Riverfront Mall
  { id: "t017", name: "Diaphragm Wall Excavation", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Gujarat GeoTech", progress: 100, dueDate: "2025-11-30", priority: "High", status: "Completed", category: "Civil" },
  { id: "t018", name: "Podium Level 1-4 RRC Concrete", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Riverfront Builders", progress: 90, dueDate: "2026-06-30", priority: "High", status: "In Progress", category: "Structural" },
  { id: "t019", name: "Escalator & Elevator Shafts", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Otis Elevators", progress: 40, dueDate: "2026-11-15", priority: "High", status: "In Progress", category: "MEP" },
  { id: "t020", name: "Central Atrium Skylight Installation", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Architectural Glass", progress: 15, dueDate: "2026-12-20", priority: "Medium", status: "Blocked", category: "Structural" },
  { id: "t021", name: "Food Court MEP Ducting", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Surat Climate Controls", progress: 30, dueDate: "2027-01-25", priority: "Medium", status: "In Progress", category: "MEP" },
  { id: "t022", name: "Anchor Store Fitout Phase 1", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Retail Space Crafters", progress: 0, dueDate: "2027-04-30", priority: "High", status: "Pending", category: "Finishing" },
  { id: "t023", name: "Basement Parking Epoxy Coating", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "FloorShield Coatings", progress: 0, dueDate: "2027-06-15", priority: "Low", status: "Pending", category: "Finishing" },
  { id: "t024", name: "Exterior LED Facade Lighting", projectId: "p003", projectName: "Surat Riverfront Mall", assignedTo: "Philips Lighting India", progress: 0, dueDate: "2027-08-30", priority: "Low", status: "Pending", category: "Electrical" },

  // Project 4: Vadodara Green Villas
  { id: "t025", name: "Land Layout & Road Infrastructure", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "EcoNest Civil", progress: 100, dueDate: "2026-03-15", priority: "High", status: "Completed", category: "Civil" },
  { id: "t026", name: "Villa Structure Casting (Villas 1-12)", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "EcoNest Civil", progress: 100, dueDate: "2026-07-30", priority: "High", status: "Completed", category: "Structural" },
  { id: "t027", name: "Roof Waterproofing & Insulation", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "WaterShield Pro", progress: 95, dueDate: "2026-09-15", priority: "High", status: "In Progress", category: "Civil" },
  { id: "t028", name: "Interior Italian Marble Laying", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "Royal Marble House", progress: 70, dueDate: "2026-10-30", priority: "Medium", status: "In Progress", category: "Finishing" },
  { id: "t029", name: "Smart Home Automation Wiring", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "Schneider Electric", progress: 60, dueDate: "2026-11-30", priority: "Medium", status: "In Progress", category: "Electrical" },
  { id: "t030", name: "Private Pool Filtration Assembly", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "Aquatic Living Ltd", progress: 40, dueDate: "2026-12-15", priority: "Low", status: "In Progress", category: "MEP" },
  { id: "t031", name: "Landscaping & Tree Plantation", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "GreenThumb Landscaping", progress: 25, dueDate: "2027-02-28", priority: "Low", status: "Pending", category: "Finishing" },
  { id: "t032", name: "Clubhouse Interior Fitouts", projectId: "p004", projectName: "Vadodara Green Villas", assignedTo: "Interiors By Design", progress: 10, dueDate: "2027-03-31", priority: "Medium", status: "Pending", category: "Finishing" },

  // Project 5: Rajkot Commercial Hub
  { id: "t033", name: "Site Clearance & Demolition", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Shree Excavations", progress: 100, dueDate: "2026-04-15", priority: "High", status: "Completed", category: "Civil" },
  { id: "t034", name: "Deep Foundation Piling", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Shree Excavations", progress: 40, dueDate: "2026-08-30", priority: "High", status: "Delayed", category: "Civil" },
  { id: "t035", name: "Retaining Wall Construction", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Rajkot Civil Engineering", progress: 20, dueDate: "2026-10-15", priority: "High", status: "Delayed", category: "Structural" },
  { id: "t036", name: "Steel Reinforcement Procurement", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Saurashtra Steel", progress: 15, dueDate: "2026-11-01", priority: "High", status: "In Progress", category: "Procurement" },
  { id: "t037", name: "Ground Floor Slab Casting", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Rajkot Civil Engineering", progress: 0, dueDate: "2027-01-31", priority: "High", status: "Pending", category: "Structural" },
  { id: "t038", name: "Drainage & Sewerage Grid", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Urban Infra Pipes", progress: 0, dueDate: "2027-04-30", priority: "Medium", status: "Pending", category: "MEP" },
  { id: "t039", name: "Substation Transformer Installation", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "PGVCL Grid Services", progress: 0, dueDate: "2027-07-31", priority: "High", status: "Pending", category: "Electrical" },
  { id: "t040", name: "Multi-level Parking Ramps", projectId: "p005", projectName: "Rajkot Commercial Hub", assignedTo: "Rajkot Civil Engineering", progress: 0, dueDate: "2027-10-31", priority: "Medium", status: "Pending", category: "Structural" }
];

export const initialMaterials = [
  {
    id: "m001",
    name: "Cement (OPC 53 Grade)",
    category: "Civil",
    available: 820,
    unit: "bags",
    minLevel: 300,
    unitPrice: 380,
    supplier: "UltraTech Cement",
    status: "OK",
    consumptionRate: "45 bags/day",
    projectId: "p001"
  },
  {
    id: "m002",
    name: "TMT Steel Bars (16mm)",
    category: "Structural",
    available: 12,
    unit: "tons",
    minLevel: 15,
    unitPrice: 62000,
    supplier: "Tata Tiscon",
    status: "LOW STOCK",
    recommendedProcurement: 6,
    consumptionRate: "1.5 tons/day",
    projectId: "p001"
  },
  {
    id: "m003",
    name: "Red Clay Bricks",
    category: "Civil",
    available: 42000,
    unit: "units",
    minLevel: 20000,
    unitPrice: 9,
    supplier: "Local Kiln Ass. Gujarat",
    status: "OK",
    consumptionRate: "2,500 units/day",
    projectId: "p001"
  },
  {
    id: "m004",
    name: "Coarse River Sand",
    category: "Civil",
    available: 180,
    unit: "cu.m",
    minLevel: 100,
    unitPrice: 1400,
    supplier: "Sabarmati Sands Ltd",
    status: "OK",
    consumptionRate: "15 cu.m/day",
    projectId: "p001"
  },
  {
    id: "m005",
    name: "Vitrified Tiles (60x60cm)",
    category: "Finishing",
    available: 1200,
    unit: "sq.m",
    minLevel: 800,
    unitPrice: 650,
    supplier: "Kajaria Ceramics",
    status: "OK",
    consumptionRate: "80 sq.m/day",
    projectId: "p001"
  },
  {
    id: "m006",
    name: "Weatherproof Emulsion Paint",
    category: "Finishing",
    available: 450,
    unit: "liters",
    minLevel: 300,
    unitPrice: 320,
    supplier: "Asian Paints",
    status: "OK",
    consumptionRate: "25 liters/day",
    projectId: "p001"
  },
  {
    id: "m007",
    name: "Structural Steel Beams (ISMB 300)",
    category: "Structural",
    available: 45,
    unit: "tons",
    minLevel: 30,
    unitPrice: 68000,
    supplier: "JSP Steel Ltd",
    status: "OK",
    consumptionRate: "3 tons/day",
    projectId: "p002"
  },
  {
    id: "m008",
    name: "PPC Ready-Mix Concrete M35",
    category: "Civil",
    available: 350,
    unit: "cu.m",
    minLevel: 200,
    unitPrice: 4800,
    supplier: "ACC Concrete",
    status: "OK",
    consumptionRate: "50 cu.m/day",
    projectId: "p002"
  },
  {
    id: "m009",
    name: "Glass Curtain Wall Panes",
    category: "Finishing",
    available: 18,
    unit: "units",
    minLevel: 30,
    unitPrice: 12000,
    supplier: "GlassTech Corp",
    status: "LOW STOCK",
    recommendedProcurement: 15,
    consumptionRate: "4 units/day",
    projectId: "p002"
  },
  {
    id: "m010",
    name: "HVAC Galvanized Iron Ducts",
    category: "MEP",
    available: 600,
    unit: "meters",
    minLevel: 200,
    unitPrice: 1800,
    supplier: "Voltas Climate",
    status: "OK",
    consumptionRate: "30 meters/day",
    projectId: "p002"
  },

  // Project 3: Surat Riverfront Mall (p003)
  {
    id: "m011",
    name: "Diaphragm Wall Casing Pipes",
    category: "Civil",
    available: 120,
    unit: "units",
    minLevel: 50,
    unitPrice: 8500,
    supplier: "Gujarat GeoTech",
    status: "OK",
    consumptionRate: "10 units/day",
    projectId: "p003"
  },
  {
    id: "m012",
    name: "Escalator Motor Assemblies",
    category: "MEP",
    available: 2,
    unit: "units",
    minLevel: 4,
    unitPrice: 350000,
    supplier: "Otis Elevators",
    status: "LOW STOCK",
    recommendedProcurement: 3,
    consumptionRate: "1 unit/week",
    projectId: "p003"
  },
  {
    id: "m013",
    name: "Skylight Tempered Glass",
    category: "Structural",
    available: 450,
    unit: "sq.m",
    minLevel: 200,
    unitPrice: 4200,
    supplier: "Architectural Glass Ltd",
    status: "OK",
    consumptionRate: "25 sq.m/day",
    projectId: "p003"
  },

  // Project 4: Vadodara Green Villas (p004)
  {
    id: "m014",
    name: "Italian Marble Slabs (20mm)",
    category: "Finishing",
    available: 1500,
    unit: "sq.m",
    minLevel: 800,
    unitPrice: 3800,
    supplier: "Royal Marble House",
    status: "OK",
    consumptionRate: "60 sq.m/day",
    projectId: "p004"
  },
  {
    id: "m015",
    name: "Polymer Waterproofing Membrane",
    category: "Civil",
    available: 5,
    unit: "rolls",
    minLevel: 15,
    unitPrice: 18000,
    supplier: "WaterShield Pro",
    status: "LOW STOCK",
    recommendedProcurement: 10,
    consumptionRate: "2 rolls/day",
    projectId: "p004"
  },
  {
    id: "m016",
    name: "Smart Automation Controllers",
    category: "Electrical",
    available: 40,
    unit: "units",
    minLevel: 20,
    unitPrice: 25000,
    supplier: "Schneider Electric",
    status: "OK",
    consumptionRate: "3 units/day",
    projectId: "p004"
  },

  // Project 5: Rajkot Commercial Hub (p005)
  {
    id: "m017",
    name: "Pre-cast Concrete Wall Slabs",
    category: "Structural",
    available: 250,
    unit: "units",
    minLevel: 100,
    unitPrice: 15000,
    supplier: "Rajkot Precast Ltd",
    status: "OK",
    consumptionRate: "15 units/day",
    projectId: "p005"
  },
  {
    id: "m018",
    name: "Heavy Steel Reinforcement (32mm)",
    category: "Structural",
    available: 8,
    unit: "tons",
    minLevel: 25,
    unitPrice: 65000,
    supplier: "Saurashtra Steel",
    status: "LOW STOCK",
    recommendedProcurement: 20,
    consumptionRate: "4 tons/day",
    projectId: "p005"
  },
  {
    id: "m019",
    name: "High-Density Sewerage Pipes",
    category: "MEP",
    available: 300,
    unit: "meters",
    minLevel: 150,
    unitPrice: 2200,
    supplier: "Urban Infra Pipes",
    status: "OK",
    consumptionRate: "20 meters/day",
    projectId: "p005"
  }
];

export const initialMaterialRequests = [
  {
    id: "mr001",
    materialId: "m002",
    materialName: "TMT Steel Bars (16mm)",
    quantity: 6,
    unit: "tons",
    requestedBy: "Project Manager (Rohan Mehta)",
    date: "2026-09-20",
    status: "Pending Approval",
    priority: "URGENT",
    reason: "Inventory below minimum safety threshold of 15 tons. Required for structural slab casting."
  }
];

export const expenseBreakdown = [
  {
    category: "Materials",
    planned: 40000000, // ₹4.0 Cr
    actual: 42000000,  // ₹4.2 Cr (+₹20 L overrun)
    variance: 2000000,
    color: "#f59e0b"
  },
  {
    category: "Labour",
    planned: 20000000, // ₹2.0 Cr
    actual: 18000000,  // ₹1.8 Cr (-₹20 L saved)
    variance: -2000000,
    color: "#3b82f6"
  },
  {
    category: "Equipment",
    planned: 10000000, // ₹1.0 Cr
    actual: 8000000,   // ₹0.8 Cr (-₹20 L saved)
    variance: -2000000,
    color: "#10b981"
  },
  {
    category: "Contractor",
    planned: 20000000, // ₹2.0 Cr
    actual: 15000000,  // ₹1.5 Cr (-₹50 L saved)
    variance: -5000000,
    color: "#8b5cf6"
  }
];

export const recentTransactions = [
  {
    id: "tx101",
    date: "2026-09-18",
    description: "Steel Shipment Batch 4 Payment (16mm TMT)",
    category: "Materials",
    vendor: "Tata Tiscon",
    amount: 3720000,
    status: "Paid"
  },
  {
    id: "tx102",
    date: "2026-09-16",
    description: "Weekly Electrical Worker Wages",
    category: "Labour",
    vendor: "PowerGrid Subcontractor",
    amount: 1450000,
    status: "Paid"
  },
  {
    id: "tx103",
    date: "2026-09-14",
    description: "Tower Crane Rental (Month 4)",
    category: "Equipment",
    vendor: "Gujarat Heavy Lift Corp",
    amount: 850000,
    status: "Paid"
  },
  {
    id: "tx104",
    date: "2026-09-10",
    description: "Concrete Batching Milestone Invoice",
    category: "Materials",
    vendor: "UltraTech ReadyMix",
    amount: 5200000,
    status: "Pending Approval"
  },
  {
    id: "tx105",
    date: "2026-09-05",
    description: "Plumbing Materials Bulk Order",
    category: "Materials",
    vendor: "Supreme Pipes Ltd",
    amount: 1850000,
    status: "Paid"
  }
];

// Exactly 7 Open Issues across the portfolio
export const initialIssues = [
  {
    id: "iss001",
    title: "Steel delivery delayed",
    projectName: "Ahmedabad Smart Residency",
    projectId: "p001",
    priority: "High",
    assignedTo: "Procurement Manager",
    status: "Open",
    createdAt: "2026-09-17",
    description: "Logistics delay at regional steel depot causing structural work standstill on Floor 12."
  },
  {
    id: "iss002",
    title: "Electrical contractor behind schedule",
    projectName: "Ahmedabad Smart Residency",
    projectId: "p001",
    priority: "High",
    assignedTo: "Electrical Lead",
    status: "In Progress",
    createdAt: "2026-09-15",
    description: "Subcontractor team understaffed by 8 technicians. Conduit installation is 5 days delayed."
  },
  {
    id: "iss003",
    title: "Concrete quality cube test report pending",
    projectName: "Ahmedabad Smart Residency",
    projectId: "p001",
    priority: "Medium",
    assignedTo: "Quality Engineer",
    status: "Open",
    createdAt: "2026-09-19",
    description: "7-day cube testing report for Block B foundation pending third-party laboratory verification."
  },
  {
    id: "iss004",
    title: "Transformer grid connection approval delayed",
    projectName: "Gandhinagar Tech Park",
    projectId: "p002",
    priority: "High",
    assignedTo: "Project Manager",
    status: "Open",
    createdAt: "2026-09-14",
    description: "State electricity board clearance pending for 33kV high-tension transformer line."
  },
  {
    id: "iss005",
    title: "HVAC ducting alignment clash on 3rd floor",
    projectName: "Surat Riverfront Mall",
    projectId: "p003",
    priority: "Medium",
    assignedTo: "MEP Coordinator",
    status: "In Progress",
    createdAt: "2026-09-16",
    description: "BIM clash between sprinkler pipe grid and main HVAC ducting branch."
  },
  {
    id: "iss006",
    title: "Pre-cast slab transport logistics block",
    projectName: "Rajkot Commercial Hub",
    projectId: "p005",
    priority: "High",
    assignedTo: "Logistics Lead",
    status: "Open",
    createdAt: "2026-09-18",
    description: "Heavy trailer transport restricted on highway due to municipal bridge repair work."
  },
  {
    id: "iss007",
    title: "Waterproofing membrane sample inspection",
    projectName: "Vadodara Green Villas",
    projectId: "p004",
    priority: "Low",
    assignedTo: "Site Engineer",
    status: "Open",
    createdAt: "2026-09-12",
    description: "Terrace waterproofing chemical composition sample awaiting site engineer approval."
  },

  // Historical resolved issue
  {
    id: "iss008",
    title: "Perimeter safety net replacement at Block B",
    projectName: "Ahmedabad Smart Residency",
    projectId: "p001",
    priority: "Low",
    assignedTo: "Site Safety Engineer",
    status: "Resolved",
    createdAt: "2026-09-08",
    description: "Damaged perimeter safety netting replaced on 8th floor balcony edge."
  }
];

export const plannedVsActualProgressData = [
  { week: "Week 1", planned: 10, actual: 9 },
  { week: "Week 2", planned: 20, actual: 18 },
  { week: "Week 3", planned: 32, actual: 28 },
  { week: "Week 4", planned: 45, actual: 39 },
  { week: "Week 5", planned: 58, actual: 52 },
  { week: "Week 6", planned: 70, actual: 68 }
];

export const teamMembers = [
  // p001: Ahmedabad Smart Residency
  { id: "tm001", name: "Rohan Mehta", role: "Project Manager", project: "Ahmedabad Smart Residency", projectId: "p001", status: "Active", phone: "+91 98765 43210", email: "rohan.mehta@constructiq.io", tasksAssigned: 8, performance: "98%" },
  { id: "tm002", name: "Vikram Patel", role: "Site Engineer", project: "Ahmedabad Smart Residency", projectId: "p001", status: "On Site", phone: "+91 98234 56789", email: "vikram.patel@constructiq.io", tasksAssigned: 5, performance: "94%" },
  { id: "tm003", name: "Rajesh Sharma", role: "Procurement Manager", project: "Ahmedabad Smart Residency", projectId: "p001", status: "Active", phone: "+91 98111 22334", email: "rajesh.s@constructiq.io", tasksAssigned: 4, performance: "92%" },
  { id: "tm004", name: "PowerGrid Electricals", role: "Electrical Subcontractor", project: "Ahmedabad Smart Residency", projectId: "p001", status: "Understaffed", phone: "+91 97222 33445", email: "contact@powergrid.in", tasksAssigned: 2, performance: "78%" },
  { id: "tm005", name: "Apex Structures Ltd", role: "Structural RRC Contractor", project: "Ahmedabad Smart Residency", projectId: "p001", status: "On Site", phone: "+91 96333 44556", email: "info@apexstruct.com", tasksAssigned: 3, performance: "95%" },
  { id: "tm006", name: "FlowTech Plumbing", role: "Plumbing Subcontractor", project: "Ahmedabad Smart Residency", projectId: "p001", status: "On Site", phone: "+91 95444 55667", email: "service@flowtech.co.in", tasksAssigned: 2, performance: "88%" },

  // p002: Gandhinagar Tech Park
  { id: "tm007", name: "Ananya Roy", role: "Project Manager", project: "Gandhinagar Tech Park", projectId: "p002", status: "Active", phone: "+91 98765 11111", email: "ananya.r@constructiq.io", tasksAssigned: 8, performance: "96%" },
  { id: "tm008", name: "Suresh Mehta", role: "Site Engineer Lead", project: "Gandhinagar Tech Park", projectId: "p002", status: "On Site", phone: "+91 98234 22222", email: "suresh.m@constructiq.io", tasksAssigned: 6, performance: "95%" },
  { id: "tm009", name: "Zenith Earthworks", role: "Civil Subcontractor", project: "Gandhinagar Tech Park", projectId: "p002", status: "Active", phone: "+91 98111 33333", email: "info@zenithearth.com", tasksAssigned: 2, performance: "92%" },
  { id: "tm010", name: "GlassTech Corp", role: "Glazing Subcontractor", project: "Gandhinagar Tech Park", projectId: "p002", status: "Understaffed", phone: "+91 97222 44444", email: "contact@glasstech.in", tasksAssigned: 1, performance: "80%" },

  // p003: Surat Riverfront Mall
  { id: "tm011", name: "Karan Johar", role: "Project Manager", project: "Surat Riverfront Mall", projectId: "p003", status: "Active", phone: "+91 98765 55555", email: "karan.j@constructiq.io", tasksAssigned: 8, performance: "90%" },
  { id: "tm012", name: "Pooja Desai", role: "Site Engineer", project: "Surat Riverfront Mall", projectId: "p003", status: "On Site", phone: "+91 98234 66666", email: "pooja.d@constructiq.io", tasksAssigned: 5, performance: "91%" },
  { id: "tm013", name: "Otis Elevators", role: "MEP Subcontractor", project: "Surat Riverfront Mall", projectId: "p003", status: "On Site", phone: "+91 98111 77777", email: "support@otis.in", tasksAssigned: 3, performance: "89%" },

  // p004: Vadodara Green Villas
  { id: "tm014", name: "Amit Shah", role: "Project Manager", project: "Vadodara Green Villas", projectId: "p004", status: "Active", phone: "+91 98765 88888", email: "amit.s@constructiq.io", tasksAssigned: 8, performance: "99%" },
  { id: "tm015", name: "Manish Joshi", role: "Site Engineer", project: "Vadodara Green Villas", projectId: "p004", status: "On Site", phone: "+91 98234 99999", email: "manish.j@constructiq.io", tasksAssigned: 4, performance: "96%" },
  { id: "tm016", name: "Royal Marble House", role: "Finishing Contractor", project: "Vadodara Green Villas", projectId: "p004", status: "Active", phone: "+91 98111 00000", email: "sales@royalmarble.com", tasksAssigned: 2, performance: "94%" },

  // p005: Rajkot Commercial Hub
  { id: "tm017", name: "Rajesh Varma", role: "Project Manager", project: "Rajkot Commercial Hub", projectId: "p005", status: "Active", phone: "+91 98765 12345", email: "rajesh.v@constructiq.io", tasksAssigned: 8, performance: "85%" },
  { id: "tm018", name: "Hiren Patel", role: "Site Engineer", project: "Rajkot Commercial Hub", projectId: "p005", status: "On Site", phone: "+91 98234 23456", email: "hiren.p@constructiq.io", tasksAssigned: 6, performance: "83%" },
  { id: "tm019", name: "Shree Excavations", role: "Demolition Subcontractor", project: "Rajkot Commercial Hub", projectId: "p005", status: "Active", phone: "+91 98111 34567", email: "shree@excavations.in", tasksAssigned: 3, performance: "88%" }
];

export const initialDocuments = [
  // p001
  { id: "doc001", title: "Bill of Quantities (BOQ) - Block A & B", category: "BOQ", fileSize: "4.2 MB", uploadedBy: "Chief Estimator", date: "2026-01-20", status: "Verified", format: "PDF", projectId: "p001" },
  { id: "doc002", title: "Structural Engineering Approval Certificate", category: "Approvals", fileSize: "1.8 MB", uploadedBy: "Municipal Corp Gujarat", date: "2026-02-14", status: "Approved", format: "PDF", projectId: "p001" },
  { id: "doc003", title: "UltraTech Steel & Cement Test Certificate", category: "Material Certificates", fileSize: "850 KB", uploadedBy: "Site Engineer (Vikram)", date: "2026-09-05", status: "Verified", format: "PDF", projectId: "p001" },
  { id: "doc004", title: "PowerGrid MEP Contract Agreement", category: "Contracts", fileSize: "3.1 MB", uploadedBy: "Legal & Procurement", date: "2026-03-01", status: "Active", format: "PDF", projectId: "p001" },

  // p002
  { id: "doc005", title: "Gandhinagar Tech Park Master BOQ Sheet", category: "BOQ", fileSize: "5.1 MB", uploadedBy: "Ananya Roy (PM)", date: "2025-10-10", status: "Verified", format: "XLSX", projectId: "p002" },
  { id: "doc006", title: "Curtain Wall Structural Safety Certificate", category: "Approvals", fileSize: "2.3 MB", uploadedBy: "GlassTech Corp", date: "2026-04-12", status: "Approved", format: "PDF", projectId: "p002" },

  // p003
  { id: "doc007", title: "Surat Mall Retail Architecture BOQ", category: "BOQ", fileSize: "6.4 MB", uploadedBy: "Karan Johar (PM)", date: "2025-08-20", status: "Verified", format: "PDF", projectId: "p003" },
  { id: "doc008", title: "Otis Elevator Safety Inspection Audit", category: "Site Reports", fileSize: "1.5 MB", uploadedBy: "Otis Elevators Lead", date: "2026-06-18", status: "Approved", format: "PDF", projectId: "p003" },

  // p004
  { id: "doc009", title: "Vadodara Villas Landscape & Italian Marble BOQ", category: "BOQ", fileSize: "3.8 MB", uploadedBy: "Amit Shah (PM)", date: "2026-02-05", status: "Verified", format: "PDF", projectId: "p004" },
  { id: "doc010", title: "Smart Home Schneider Electrical Approval", category: "Approvals", fileSize: "1.9 MB", uploadedBy: "Manish Joshi (Site Eng)", date: "2026-05-22", status: "Approved", format: "PDF", projectId: "p004" },

  // p005
  { id: "doc011", title: "Rajkot Hub Deep Foundation Piling Report", category: "Site Reports", fileSize: "2.9 MB", uploadedBy: "Rajesh Varma (PM)", date: "2026-03-15", status: "Verified", format: "PDF", projectId: "p005" },
  { id: "doc012", title: "Saurashtra Steel Supply Invoice #INV-552", category: "Invoices", fileSize: "1.1 MB", uploadedBy: "Saurashtra Steel", date: "2026-07-01", status: "Approved", format: "PDF", projectId: "p005" }
];

export const aiPredefinedResponses = [
  {
    question: "Which projects are currently at risk?",
    answer: `**Ahmedabad Smart Residency is currently at HIGH RISK.**

**Main factors:**
• **Electrical installation** is behind schedule (45% vs expected 65%).
• **Steel inventory** is below minimum threshold (12 tons available vs 15 tons threshold).
• **Material spending** is above planned rate (+₹20 Lakh overrun).

**Recommended action:**
Prioritize electrical work, assign additional workers, and initiate steel procurement immediately.`
  },
  {
    question: "Why is Ahmedabad Smart Residency delayed?",
    answer: `The project is currently behind schedule in key activities.

**Primary factors:**
1. **Electrical installation delay** (Subcontractor understaffed by 8 technicians).
2. **Steel procurement shortage** (Delivery delayed at regional logistics hub).
3. **Lower workforce availability** in MEP department.

**Priority:**
Resolve the steel shortage by approving Material Request #MR001 and assign additional workers to electrical conduit work.`
  },
  {
    question: "What should I focus on today?",
    answer: `**Today's top operational priorities:**

1. **Approve Steel Procurement Request** (6 tons TMT Steel required).
2. **Review Electrical Contractor Schedule** with PowerGrid Lead.
3. **Assign 6 additional workers** to electrical conduit installation.
4. **Monitor budget utilization** for materials (currently at +5% variance).
5. **Review high-priority issues** #ISS001 (Steel delay) and #ISS002 (Electrical delay).`
  },
  {
    question: "Which material needs immediate procurement?",
    answer: `**Steel requires immediate attention.**

• **Current Available:** 12 tons
• **Minimum Threshold:** 15 tons
• **Recommended Procurement:** 6 tons

**Reason:**
Upcoming structural slab casting on Floor 12 requires additional TMT steel inventory within 48 hours to avoid total project delay.`
  },
  {
    question: "Will this project exceed its budget?",
    answer: `**The project currently has HIGH budget risk.**

• **Original Budget:** ₹10 Cr
• **Current Spending:** ₹8.3 Cr
• **Predicted Final Cost:** ₹10.8 Cr
• **Potential Overrun:** ₹80 Lakh

**Primary Driver:** Material cost inflation and extra rush orders.
**Recommended Action:** Review material procurement and contractor costs.`
  }
];
