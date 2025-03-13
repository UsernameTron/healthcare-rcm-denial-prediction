/**
 * Healthcare Claims Dataset Generator
 * 
 * This script generates a comprehensive claims dataset that matches the requirements
 * from the healthcare denial prediction case study. It produces 6,685 claims spanning
 * from January 31, 2022 to December 31, 2024, with appropriate denial patterns
 * and feature distributions.
 */

// Configuration settings
const CONFIG = {
  // Date range for the dataset
  startDate: new Date(2022, 0, 31),  // January 31, 2022
  endDate: new Date(2024, 11, 31),   // December 31, 2024
  totalClaims: 6685,                 // Total claims to generate
  
  // Target metrics for validation
  targetDenialRate: {
    min: 0.37,  // 37%
    max: 0.59   // 59%
  },
  targetNoResponseRate: 0.125,  // 12.5% of claims
  
  // Model performance targets
  modelAccuracy: 0.92,    // 92% overall accuracy
  modelPrecision: 0.94,   // 94% precision
  modelRecall: 0.94       // 94% recall
};

// Core payer rules that influence denials
const PAYER_RULES = [
  { id: 1, name: "Missing pre-authorization", weight: 0.15 },
  { id: 2, name: "Service not covered", weight: 0.10 },
  { id: 3, name: "Provider network status issues", weight: 0.10 },
  { id: 4, name: "Coding mismatches", weight: 0.20 },
  { id: 5, name: "Medical necessity documentation", weight: 0.18 },
  { id: 6, name: "Timely filing violation", weight: 0.17 },
  { id: 7, name: "Patient eligibility issues", weight: 0.12 },
  { id: 8, name: "Duplicate claim detection", weight: 0.09 },
  { id: 9, name: "Bundling/unbundling errors", weight: 0.08 }
];

// CPT code ranges by category
const CPT_CODE_RANGES = [
  { min: 10000, max: 19999, category: "Anesthesia", weight: 0.05 },
  { min: 20000, max: 29999, category: "Surgery", weight: 0.15 },
  { min: 30000, max: 39999, category: "Surgery", weight: 0.10 },
  { min: 40000, max: 49999, category: "Surgery", weight: 0.10 },
  { min: 50000, max: 59999, category: "Surgery", weight: 0.10 },
  { min: 60000, max: 69999, category: "Surgery", weight: 0.10 },
  { min: 70000, max: 79999, category: "Radiology", weight: 0.15 },
  { min: 80000, max: 89999, category: "Pathology/Laboratory", weight: 0.10 },
  { min: 90000, max: 99999, category: "E/M and Medicine", weight: 0.15 }
];

// ICD-10 code prefixes by category
const ICD10_PREFIXES = [
  { prefix: "A", category: "Infectious and parasitic diseases", weight: 0.05 },
  { prefix: "C", category: "Neoplasms", weight: 0.10 },
  { prefix: "E", category: "Endocrine, nutritional and metabolic diseases", weight: 0.10 },
  { prefix: "F", category: "Mental and behavioral disorders", weight: 0.15 },
  { prefix: "G", category: "Diseases of the nervous system", weight: 0.10 },
  { prefix: "I", category: "Diseases of the circulatory system", weight: 0.15 },
  { prefix: "J", category: "Diseases of the respiratory system", weight: 0.15 },
  { prefix: "K", category: "Diseases of the digestive system", weight: 0.05 },
  { prefix: "M", category: "Diseases of the musculoskeletal system", weight: 0.10 },
  { prefix: "R", category: "Symptoms, signs and abnormal clinical findings", weight: 0.05 }
];

// Insurance payers with denial probability weights
const PAYERS = [
  { name: "Medicare", weight: 0.55 },
  { name: "Medicaid", weight: 0.60 },
  { name: "Blue Cross", weight: 0.45 },
  { name: "UnitedHealthcare", weight: 0.50 },
  { name: "Aetna", weight: 0.40 },
  { name: "Cigna", weight: 0.57 },
  { name: "Humana", weight: 0.48 },
  { name: "Anthem", weight: 0.42 }
];

// Provider specialties with denial probability weights
const SPECIALTIES = [
  { name: "Family Medicine", weight: 0.40 },
  { name: "Internal Medicine", weight: 0.45 },
  { name: "Cardiology", weight: 0.55 },
  { name: "Orthopedics", weight: 0.50 },
  { name: "Neurology", weight: 0.56 },
  { name: "Oncology", weight: 0.52 },
  { name: "Radiology", weight: 0.48 },
  { name: "Pathology", weight: 0.42 },
  { name: "Emergency Medicine", weight: 0.58 },
  { name: "Surgery", weight: 0.60 }
];

// Utility functions
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item;
    }
  }
  
  return items[items.length - 1]; // Fallback
}

function randomCPTCode() {
  const range = weightedRandom(CPT_CODE_RANGES);
  return randomInt(range.min, range.max);
}

function randomICD10Code() {
  const prefix = weightedRandom(ICD10_PREFIXES);
  return `${prefix.prefix}${randomInt(10, 99)}.${randomInt(0, 9)}`;
}

/**
 * Calculates the probability of claim denial based on various weighted factors
 */
function calculateDenialProbability(claim, baseRate) {
  let denialScore = 0;
  
  // Factor 1: Payer
  const payer = PAYERS.find(p => p.name === claim.payer);
  denialScore += (payer.weight - 0.45) * 0.5; // Normalize payer impact
  
  // Factor 2: CPT Code category
  const cptNum = parseInt(claim.cptCode);
  const cptCategory = CPT_CODE_RANGES.find(range => 
    cptNum >= range.min && cptNum <= range.max
  );
  if (cptCategory) {
    denialScore += (cptCategory.weight - 0.10) * 0.3;
  }
  
  // Factor 3: ICD-10 code prefix
  const icdPrefix = claim.icd10Code.charAt(0);
  const icdCategory = ICD10_PREFIXES.find(item => item.prefix === icdPrefix);
  if (icdCategory) {
    denialScore += (icdCategory.weight - 0.10) * 0.3;
  }
  
  // Factor 4: Payer rules (highest impact)
  if (claim.payerRulesViolated.length > 0) {
    claim.payerRulesViolated.forEach(ruleId => {
      const rule = PAYER_RULES.find(r => r.id === ruleId);
      denialScore += rule.weight * 0.8; // Strong impact from payer rules
    });
  }
  
  // Factor 5: Specialty
  const specialty = SPECIALTIES.find(s => s.name === claim.specialty);
  denialScore += (specialty.weight - 0.45) * 0.2;
  
  // Factor 6: Seasonal variation
  const month = claim.submissionDate.getMonth();
  if (month === 11 || month === 0) { // December or January
    denialScore += 0.06; // Higher denials during winter months
  } else if (month === 6 || month === 7) { // July or August
    denialScore += 0.04; // Higher denials during summer months
  }
  
  // Final denial probability calculation
  const denialProbability = Math.min(0.95, Math.max(0.05, baseRate + denialScore));
  return denialProbability;
}

/**
 * Generates monthly base denial rates with seasonal patterns
 * to ensure rates fall between 37% and 59% as specified
 */
function generateMonthlyBaseRates() {
  const monthlyRates = {};
  
  // Calculate number of months in date range
  const startYear = CONFIG.startDate.getFullYear();
  const startMonth = CONFIG.startDate.getMonth();
  const endYear = CONFIG.endDate.getFullYear();
  const endMonth = CONFIG.endDate.getMonth();
  
  let currentDate = new Date(startYear, startMonth, 1);
  const endDate = new Date(endYear, endMonth + 1, 0); // Last day of end month
  
  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthKey = `${year}-${month + 1}`;
    
    // Base rate with seasonal variation
    let baseRate = 0.48; // Start with average between min and max
    
    // Add seasonal component (winter and summer spikes)
    if (month === 11 || month === 0) { // December or January
      baseRate += 0.07; // Winter spike
    } else if (month === 6 || month === 7) { // July or August
      baseRate += 0.05; // Summer spike
    } else if (month === 3 || month === 4) { // April or May
      baseRate -= 0.04; // Spring dip
    } else if (month === 9 || month === 10) { // October or November
      baseRate -= 0.03; // Fall dip
    }
    
    // Add slight random variation
    baseRate += (Math.random() - 0.5) * 0.04;
    
    // Ensure within target range
    baseRate = Math.min(CONFIG.targetDenialRate.max - 0.05, 
                      Math.max(CONFIG.targetDenialRate.min + 0.05, baseRate));
                      
    monthlyRates[monthKey] = baseRate;
    
    // Move to next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return monthlyRates;
}

/**
 * Generates a single claim with appropriate attributes
 */
function generateClaim(id, monthlyBaseRates) {
  // Generate submission date
  const submissionDate = randomDate(CONFIG.startDate, CONFIG.endDate);
  
  // Get month key for base rate
  const monthKey = `${submissionDate.getFullYear()}-${submissionDate.getMonth() + 1}`;
  const baseRate = monthlyBaseRates[monthKey] || 0.48; // Fallback if month not found
  
  // Select claim attributes
  const payer = randomElement(PAYERS).name;
  const specialty = randomElement(SPECIALTIES).name;
  const cptCode = randomCPTCode();
  const icd10Code = randomICD10Code();
  
  // Determine payer rules violated (if any)
  const payerRulesViolated = [];
  PAYER_RULES.forEach(rule => {
    if (Math.random() < rule.weight * 0.7) {
      payerRulesViolated.push(rule.id);
    }
  });
  
  // Create claim object
  const claim = {
    claimId: id,
    submissionDate,
    payer,
    specialty,
    cptCode,
    icd10Code,
    payerRulesViolated,
    amountBilled: randomInt(500, 15000) + Math.random() * 100,
    patientAge: randomInt(18, 85),
    patientGender: Math.random() < 0.5 ? "M" : "F"
  };
  
  // Calculate denial probability for this claim
  const denialProbability = calculateDenialProbability(claim, baseRate);
  
  // Determine claim status based on probability
  let status;
  if (Math.random() < CONFIG.targetNoResponseRate) {
    status = "No Response";
  } else if (Math.random() < denialProbability) {
    status = "Denied";
  } else {
    status = "Paid";
  }
  
  claim.status = status;
  claim.denialProbability = denialProbability;
  
  return claim;
}

/**
 * Generate complete claims dataset with target distribution
 */
function generateClaimsDataset() {
  // Generate monthly base rates
  const monthlyBaseRates = generateMonthlyBaseRates();
  
  // Generate all claims
  const claims = [];
  for (let i = 1; i <= CONFIG.totalClaims; i++) {
    const claim = generateClaim(i, monthlyBaseRates);
    claims.push(claim);
  }
  
  return claims;
}

/**
 * Analyze the generated dataset to verify it meets requirements
 */
function analyzeDataset(claims) {
  // Calculate overall status distribution
  const statusCounts = {
    "Paid": 0,
    "Denied": 0,
    "No Response": 0
  };
  
  // Track monthly denials
  const monthlyDenials = {};
  
  // Track payer rule violations
  const ruleViolations = {};
  
  // Initialize confusion matrix for model validation
  const confusionMatrix = {
    truePositives: 0,   // Predicted denial, actual denial
    falsePositives: 0,  // Predicted denial, actual paid
    trueNegatives: 0,   // Predicted paid, actual paid
    falseNegatives: 0,  // Predicted paid, actual denial
    precision: 0,
    recall: 0,
    f1Score: 0
  };
  
  // Analyze each claim
  claims.forEach(claim => {
    // Update status counts
    statusCounts[claim.status]++;
    
    // Update monthly statistics
    const monthKey = `${claim.submissionDate.getFullYear()}-${claim.submissionDate.getMonth() + 1}`;
    if (!monthlyDenials[monthKey]) {
      monthlyDenials[monthKey] = { total: 0, denied: 0 };
    }
    monthlyDenials[monthKey].total++;
    if (claim.status === "Denied") {
      monthlyDenials[monthKey].denied++;
    }
    
    // Track rule violations
    claim.payerRulesViolated.forEach(ruleId => {
      if (!ruleViolations[ruleId]) {
        ruleViolations[ruleId] = 0;
      }
      ruleViolations[ruleId]++;
    });
    
    // Simulate model prediction (using denial probability as prediction)
    const predictedDenial = claim.denialProbability > 0.5;
    const actualDenial = claim.status === "Denied";
    
    // Update confusion matrix
    if (predictedDenial && actualDenial) {
      confusionMatrix.truePositives++;
    } else if (predictedDenial && !actualDenial) {
      confusionMatrix.falsePositives++;
    } else if (!predictedDenial && !actualDenial) {
      confusionMatrix.trueNegatives++;
    } else if (!predictedDenial && actualDenial) {
      confusionMatrix.falseNegatives++;
    }
  });
  
  // Calculate model performance metrics
  confusionMatrix.precision = confusionMatrix.truePositives / 
    (confusionMatrix.truePositives + confusionMatrix.falsePositives);
  
  confusionMatrix.recall = confusionMatrix.truePositives / 
    (confusionMatrix.truePositives + confusionMatrix.falseNegatives);
  
  confusionMatrix.f1Score = 2 * (confusionMatrix.precision * confusionMatrix.recall) / 
    (confusionMatrix.precision + confusionMatrix.recall);
  
  return { 
    statusCounts, 
    monthlyDenials, 
    ruleViolations,
    confusionMatrix
  };
}

// Generate and analyze the dataset
const claims = generateClaimsDataset();
const analysis = analyzeDataset(claims);

console.log("Healthcare Claims Dataset Generator");
console.log("=================================");
console.log(`Total Claims: ${claims.length}`);
console.log(`Date Range: ${CONFIG.startDate.toISOString().split('T')[0]} to ${CONFIG.endDate.toISOString().split('T')[0]}`);
console.log("\nStatus Breakdown:");
console.log(`- Paid: ${analysis.statusCounts["Paid"]} (${((analysis.statusCounts["Paid"] / claims.length) * 100).toFixed(1)}%)`);
console.log(`- Denied: ${analysis.statusCounts["Denied"]} (${((analysis.statusCounts["Denied"] / claims.length) * 100).toFixed(1)}%)`);
console.log(`- No Response: ${analysis.statusCounts["No Response"]} (${((analysis.statusCounts["No Response"] / claims.length) * 100).toFixed(1)}%)`);

// Output model performance metrics
console.log("\nSimulated Model Performance:");
console.log(`- Accuracy: ${(((analysis.confusionMatrix.truePositives + analysis.confusionMatrix.trueNegatives) / claims.length) * 100).toFixed(1)}%`);
console.log(`- Precision: ${(analysis.confusionMatrix.precision * 100).toFixed(1)}%`);
console.log(`- Recall: ${(analysis.confusionMatrix.recall * 100).toFixed(1)}%`);
console.log(`- F1 Score: ${(analysis.confusionMatrix.f1Score * 100).toFixed(1)}%`);

// Make everything available globally
module.exports = {
  claims,
  analysis,
  CONFIG,
  PAYER_RULES,
  CPT_CODE_RANGES,
  ICD10_PREFIXES,
  PAYERS,
  SPECIALTIES,
  generateClaimsDataset,
  analyzeDataset
};