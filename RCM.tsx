import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

// Define types for our data
interface DenialTrend {
  month: string;
  rate: number;
}

interface FeatureImportance {
  feature: string;
  importance: number;
}

interface DenialRisk {
  encounterId: number;
  likelihood: number;
}

interface ClaimCount {
  month: string;
  count: number;
}

interface MatrixData {
  name: string;
  value: number;
}

interface ResultsData {
  area: string;
  keyData: string;
  outcome: string;
}

// Main Dashboard Component
const HealthcareDenialDashboard: React.FC = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState<string>('introduction');

  // Mock data based on PDF visualizations
  const claimCountData: ClaimCount[] = [
    { month: 'Jan 2021', count: 140 },
    { month: 'Feb 2021', count: 215 },
    { month: 'Mar 2021', count: 240 },
    { month: 'Apr 2021', count: 140 },
    { month: 'May 2021', count: 135 },
    { month: 'Jun 2021', count: 120 },
    { month: 'Jul 2021', count: 115 },
    { month: 'Aug 2021', count: 120 },
    { month: 'Sep 2021', count: 115 },
    { month: 'Oct 2021', count: 120 },
    { month: 'Nov 2021', count: 160 },
    { month: 'Dec 2021', count: 195 },
    { month: 'Jan 2022', count: 300 },
    { month: 'Feb 2022', count: 160 },
    { month: 'Mar 2022', count: 270 },
    { month: 'Apr 2022', count: 225 },
    { month: 'May 2022', count: 105 },
    { month: 'Jun 2022', count: 275 },
    { month: 'Jul 2022', count: 175 },
    { month: 'Aug 2022', count: 215 },
    { month: 'Sep 2022', count: 155 },
    { month: 'Oct 2022', count: 175 },
    { month: 'Nov 2022', count: 195 },
    { month: 'Dec 2022', count: 205 },
    { month: 'Jan 2023', count: 150 },
    { month: 'Feb 2023', count: 175 },
    { month: 'Mar 2023', count: 265 },
    { month: 'Apr 2023', count: 175 },
    { month: 'May 2023', count: 245 },
    { month: 'Jun 2023', count: 195 },
    { month: 'Jul 2023', count: 220 },
    { month: 'Aug 2023', count: 185 },
    { month: 'Sep 2023', count: 165 },
    { month: 'Oct 2023', count: 135 },
    { month: 'Nov 2023', count: 275 },
    { month: 'Dec 2023', count: 240 }
  ];

  const denialTrends: DenialTrend[] = [
    { month: 'Jan 2021', rate: 0.50 },
    { month: 'Feb 2021', rate: 0.59 },
    { month: 'Mar 2021', rate: 0.47 },
    { month: 'Apr 2021', rate: 0.56 },
    { month: 'May 2021', rate: 0.54 },
    { month: 'Jun 2021', rate: 0.45 },
    { month: 'Jul 2021', rate: 0.55 },
    { month: 'Aug 2021', rate: 0.46 },
    { month: 'Sep 2021', rate: 0.37 },
    { month: 'Oct 2021', rate: 0.51 },
    { month: 'Nov 2021', rate: 0.54 },
    { month: 'Dec 2021', rate: 0.50 },
    { month: 'Jan 2022', rate: 0.54 },
    { month: 'Feb 2022', rate: 0.52 },
    { month: 'Mar 2022', rate: 0.50 },
    { month: 'Apr 2022', rate: 0.55 },
    { month: 'May 2022', rate: 0.54 },
    { month: 'Jun 2022', rate: 0.53 },
    { month: 'Jul 2022', rate: 0.50 },
    { month: 'Aug 2022', rate: 0.50 },
    { month: 'Sep 2022', rate: 0.45 },
    { month: 'Oct 2022', rate: 0.52 },
    { month: 'Nov 2022', rate: 0.53 },
    { month: 'Dec 2022', rate: 0.51 },
    { month: 'Jan 2023', rate: 0.52 },
    { month: 'Feb 2023', rate: 0.57 },
    { month: 'Mar 2023', rate: 0.45 },
    { month: 'Apr 2023', rate: 0.49 },
    { month: 'May 2023', rate: 0.49 },
    { month: 'Jun 2023', rate: 0.52 },
    { month: 'Jul 2023', rate: 0.50 },
    { month: 'Aug 2023', rate: 0.47 },
    { month: 'Sep 2023', rate: 0.59 },
    { month: 'Oct 2023', rate: 0.45 },
    { month: 'Nov 2023', rate: 0.52 },
    { month: 'Dec 2023', rate: 0.52 }
  ];

  const featureImportanceData: FeatureImportance[] = [
    { feature: 'Payer Rule_Rule_4', importance: 0.033 },
    { feature: 'Payer Rule_Rule_6', importance: 0.029 },
    { feature: 'Payer Rule_Rule_1', importance: 0.029 },
    { feature: 'Payer Rule_Rule_2', importance: 0.028 },
    { feature: 'Payer Rule_Rule_7', importance: 0.027 },
    { feature: 'Payer Rule_Rule_5', importance: 0.027 },
    { feature: 'Payer Rule_Rule_8', importance: 0.026 },
    { feature: 'Payer Rule_Rule_9', importance: 0.025 },
    { feature: 'Payer Rule_Rule_3', importance: 0.024 }
  ];

  const denialRiskData: DenialRisk[] = [
    { encounterId: 1, likelihood: 0.63 },
    { encounterId: 2, likelihood: 0.86 },
    { encounterId: 3, likelihood: 0.75 },
    { encounterId: 4, likelihood: 1.0 },
    { encounterId: 5, likelihood: 0.44 }
  ];

  const confusionMatrix: MatrixData[] = [
    { name: 'True Negative (Paid/Accepted)', value: 970 },
    { name: 'False Negative', value: 0 },
    { name: 'False Positive', value: 0 },
    { name: 'True Positive (Denied)', value: 1714 }
  ];

  const resultsData: ResultsData[] = [
    {
      area: 'Predicted Denial Risk Distribution',
      keyData: 'Proportions of claims falling above the high-risk threshold (e.g., >70% predicted denial likelihood) and resolution rates for these claims.',
      outcome: 'Improved efficiency in resource allocation by prioritizing high-risk claims, leading to quicker resolutions and reduced financial risk.'
    },
    {
      area: 'Denial Likelihood Validation',
      keyData: 'Number of high-risk claims corrected preemptively and their corresponding resolution outcomes, including approval rates after intervention.',
      outcome: 'Increased acceptance rates for high-risk claims through effective pre-submission corrections, demonstrating the model\'s ability to drive actionable improvements.'
    },
    {
      area: 'Confusion Matrix Performance Tracking',
      keyData: 'Precision, recall, and F1-score metrics for denied and paid/accepted claims, along with the overall classification accuracy.',
      outcome: 'High values for these metrics (e.g., >90% accuracy) reflect the model\'s effectiveness in accurately distinguishing denied claims, enabling targeted intervention and reducing misclassification.'
    }
  ];

  return (
    <div className="denial-prediction-dashboard" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#14124D', color: '#FF6E31', textAlign: 'center', padding: '30px 0', marginBottom: '20px' }}>
        <img 
          src="https://via.placeholder.com/80x80.png?text=MM" 
          alt="MindMeld Logo" 
          style={{ width: '80px', height: '80px', position: 'absolute', left: '20px', top: '20px' }} 
        />
        <h1 style={{ fontSize: '40px', margin: '0 0 5px 0', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Denial Prediction<br />and Automation
        </h1>
        <h2 style={{ color: '#FF6E31', fontSize: '18px', fontWeight: 'normal' }}>
          Predictive Precision: Minimize Denials, Maximize Revenue, Optimize Outcomes
        </h2>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('introduction')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'introduction' ? '#14124D' : 'transparent',
            color: activeTab === 'introduction' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: 'bold'
          }}
        >
          Introduction
        </button>
        <button 
          onClick={() => setActiveTab('objectives')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'objectives' ? '#14124D' : 'transparent',
            color: activeTab === 'objectives' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: 'bold'
          }}
        >
          Objectives
        </button>
        <button 
          onClick={() => setActiveTab('data')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'data' ? '#14124D' : 'transparent',
            color: activeTab === 'data' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: 'bold'
          }}
        >
          Data Analysis
        </button>
        <button 
          onClick={() => setActiveTab('workflow')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'workflow' ? '#14124D' : 'transparent',
            color: activeTab === 'workflow' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: 'bold'
          }}
        >
          Workflow
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'results' ? '#14124D' : 'transparent',
            color: activeTab === 'results' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            marginRight: '5px',
            fontWeight: 'bold'
          }}
        >
          Results
        </button>
        <button 
          onClick={() => setActiveTab('conclusion')}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: activeTab === 'conclusion' ? '#14124D' : 'transparent',
            color: activeTab === 'conclusion' ? 'white' : '#14124D',
            border: 'none',
            borderRadius: '5px 5px 0 0',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Conclusion
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '5px' }}>
        {/* Introduction Tab */}
        {activeTab === 'introduction' && (
          <div>
            <h2 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>INTRODUCTION</h2>
            <div style={{ marginBottom: '30px' }}>
              <h3>Predictive Analytics for Healthcare Denial Rates</h3>
              <p>In this project, we built and validated a <strong>predictive analytics pipeline</strong> to analyze historical healthcare claims data and forecast the likelihood of claim denials for upcoming encounters. This workflow integrates historical denial trends, payer rules, and claim-specific features (such as <strong>CPT codes, ICD codes, and payer rules</strong>) to predict denial risks and help decision-makers address potential issues proactively.</p>
              
              <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                <li>We tackle a significant inefficiency in healthcare Revenue Cycle Management (RCM) by addressing the time-intensive process of managing "no response" claims, which <strong>constitute approximately 10-15%</strong> of total claims.</li>
                <li>These are claims where payers <strong>neither deny nor pay within the standard 30-day timeframe</strong>, requiring analysts to manually gather critical information from payer portals.</li>
                <li>Through the development of advanced workflows, this project streamlines the process by automating key steps such as determining claim acceptance, payment details (e.g., amount, account, check number), denial reasons, and dates, or the status of claims still in process.</li>
                <li>By automating or structuring this process, we <strong>significantly reduce manual effort</strong>, free up valuable analyst resources, and ensure that claims are seamlessly assigned to appropriate workflows for resolution.</li>
                <li>This effort not only improves operational efficiency but also positions your organization to recover revenue faster and with greater accuracy.</li>
              </ol>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>MESSAGE FROM APPLICATION CREATOR</h3>
              <blockquote style={{ borderLeft: '4px solid #14124D', paddingLeft: '15px', fontStyle: 'italic' }}>
                "The MindMeld advanced reasoning model was tuned to run several simulated outcomes. This approach can transform revenue cycle management by utilizing automation and advanced analytics. This will lead to:
                <ul style={{ marginTop: '10px' }}>
                  <li>Streamlined claim processes and minimized revenue leakage.</li>
                  <li>Faster resolution of "no response" claims through automated workflows.</li>
                  <li>Resource optimization by freeing analysts from repetitive tasks, allowing focus on high-value activities.</li>
                  <li>Improved accuracy in claim tracking with reduced human error.</li>
                  <li>Proactive denial prevention using predictive analytics to identify high-risk claims.</li>
                  <li>Accelerated payment recovery through quicker follow-ups.</li>
                  <li>Scalable management of claims to handle increased volumes without added administrative burden.</li>
                </ul>
                <p>These efficiencies enhance operations and yield significant financial benefits, including faster reimbursements and improved cash flow."</p>
                <footer>- C. Pete Connor MS- AI/ML</footer>
              </blockquote>
            </div>
          </div>
        )}

        {/* Objectives Tab */}
        {activeTab === 'objectives' && (
          <div>
            <h2 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>OBJECTIVES</h2>
            
            <div className="objective-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#14124D', color: '#FF6E31', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                  01.
                </div>
                <div style={{ padding: '15px' }}>
                  <h3>Build Matrix for Predictive Model</h3>
                  <p>Demonstrate strong classification accuracy, effectively distinguishing between denied and paid claims with minimal errors. High precision and recall indicate it predicts denials well, allowing for proactive responses.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#14124D', color: '#FF6E31', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                  02.
                </div>
                <div style={{ padding: '15px', backgroundColor: '#f0f0f0' }}>
                  <h3>Establish Denial Rate Trends</h3>
                  <p>Establish trends where denial rates/reasons vary over time, indicating patterns of high risk. Investigate months with spikes to identify systemic issues, such as policy changes or payer behavior, and implement preventive measures for similar future periods.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#14124D', color: '#FF6E31', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                  03.
                </div>
                <div style={{ padding: '15px' }}>
                  <h3>Denial Likelihood for Upcoming Encounters</h3>
                  <p>Identify encounters that have a higher likelihood of denial, making them priority cases for review. Alert RCM to review documentation, compliance with payer rules, and any missing pre-authorizations before submission.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#14124D', color: '#FF6E31', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                  04.
                </div>
                <div style={{ padding: '15px', backgroundColor: '#f0f0f0' }}>
                  <h3>Feature Importance from Predictive Model</h3>
                  <p>Certain features like payer rules, CPT codes, and ICD codes significantly impact claim denial predictions. Prioritize these high-impact factors for auditing and compliance to minimize denial risks.</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#14124D', color: '#FF6E31', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>
                  05.
                </div>
                <div style={{ padding: '15px' }}>
                  <h3>Identify Automation and Improvement</h3>
                  <p>Aid the proof of concept by determining the necessary framework.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Analysis Tab */}
        {activeTab === 'data' && (
          <div>
            <h3>Claims Dataset Overview</h3>
            <p>The synthesized dataset contains a total of <strong>6,685 claims</strong> spanning the date range from January 31, 2021, to December 31, 2023.</p>
            
            <div style={{ height: '400px', marginBottom: '30px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={claimCountData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                    interval={0}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis label={{ value: 'Count of Claims', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#14124D" activeDot={{ r: 8 }} name="Count of Claims" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <h3>Confusion Matrix for Predictive Model</h3>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid />
                      <XAxis 
                        type="category" 
                        dataKey="x" 
                        name="Predicted" 
                        allowDuplicatedCategory={false}
                        categories={['Paid/Accepted', 'Denied']}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="y" 
                        name="Actual" 
                        allowDuplicatedCategory={false}
                        categories={['Paid/Accepted', 'Denied']}
                      />
                      <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Value" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter 
                        name="Confusion Matrix" 
                        data={[
                          { x: 'Paid/Accepted', y: 'Paid/Accepted', z: 970 },
                          { x: 'Denied', y: 'Paid/Accepted', z: 0 },
                          { x: 'Paid/Accepted', y: 'Denied', z: 0 },
                          { x: 'Denied', y: 'Denied', z: 1714 }
                        ]} 
                        fill="#14124D"
                        shape="square"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <p><strong>Insight:</strong> The model demonstrates excellent classification performance, with minimal errors in distinguishing between denied and paid/accepted claims.</p>
                <p><strong>Actionable Takeaway:</strong> High precision and recall indicate the model can reliably predict denials, allowing proactive measures to address them.</p>
              </div>
              
              <div>
                <h3>Historical Denial Rate Trends</h3>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={denialTrends} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                        interval={2}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis domain={[0.35, 0.6]} label={{ value: 'Denial Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Denial Rate']} />
                      <Line type="monotone" dataKey="rate" stroke="#14124D" activeDot={{ r: 8 }} name="Denial Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p><strong>Insight:</strong> The denial rates fluctuate over time, revealing patterns or periods with high denial risks.</p>
                <p><strong>Actionable Takeaway:</strong> Focus on investigating months with spikes in denial rates to uncover systemic issues (e.g., policy changes, payer behavior) and implement preventive measures during similar periods.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <h3>Feature Importance from Predictive Model</h3>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={featureImportanceData}
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 0.035]} />
                      <YAxis dataKey="feature" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="importance" name="Feature Importance" fill="#14124D" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p><strong>Insight:</strong> Certain features, such as specific payer rules, CPT codes, and ICD codes, have a greater influence on claim denial predictions.</p>
                <p><strong>Actionable Takeaway:</strong> Prioritize these high-impact features for auditing and ensuring compliance with payer requirements to reduce denial risks.</p>
              </div>
              
              <div>
                <h3>Denial Likelihood for Upcoming Encounters</h3>
                <div style={{ height: '400px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={denialRiskData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="encounterId" label={{ value: 'Encounter ID', position: 'insideBottom', offset: -5 }} />
                      <YAxis domain={[0, 1]} label={{ value: 'Denial Likelihood', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Denial Likelihood']} />
                      <Legend />
                      <Bar dataKey="likelihood" name="Denial Likelihood" fill="#64B5F6">
                        {denialRiskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.likelihood > 0.7 ? '#FF6E31' : '#64B5F6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#FF6E31', marginRight: '5px' }}></div>
                  <span style={{ marginRight: '15px' }}>High Risk (>70%)</span>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#64B5F6', marginRight: '5px' }}></div>
                  <span>Lower Risk</span>
                </div>
                <p><strong>Insight:</strong> Specific encounters have significantly higher denial likelihoods than others, making them high-priority cases for review.</p>
                <p><strong>Actionable Takeaway:</strong> Preemptively address these high-risk encounters by verifying documentation, compliance with payer rules, and any missing pre-authorizations before submission.</p>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Tab */}
        {activeTab === 'workflow' && (
          <div>
            <h2 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>PROCESSING PATHS AND WORKFLOW AUTOMATIONS</h2>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <img 
                src="https://via.placeholder.com/800x500.png?text=Workflow+Diagram" 
                alt="Workflow Diagram" 
                style={{ maxWidth: '100%', border: '1px solid #ddd', borderRadius: '5px' }}
              />
              <p style={{ fontStyle: 'italic', marginTop: '10px' }}>Workflow automation for processing "no response" claims</p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3>Main Workflow Paths</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: '#ffcdd2', padding: '15px', borderRadius: '5px' }}>
                  <h4 style={{ color: '#c62828' }}>Denied Claims Path</h4>
                  <ol style={{ paddingLeft: '20px' }}>
                    <li>Move to Denial Management for Correction</li>
                    <li>Analyst: Identify Issues and Prepare for Resubmission</li>
                    <li>Resubmit or Appeal Denied Claims</li>
                    <li>Finalize and Close Claims</li>
                  </ol>
                </div>
                
                <div style={{ backgroundColor: '#c8e6c9', padding: '15px', borderRadius: '5px' }}>
                  <h4 style={{ color: '#2e7d32' }}>Paid Claims Path</h4>
                  <ol style={{ paddingLeft: '20px' }}>
                    <li>Mark as Resolved and Log Payment Details</li>
                    <li>Reconcile Payment Records</li>
                    <li>Finalize and Close Claims</li>
                  </ol>
                </div>
                
                <div style={{ backgroundColor: '#fff9c4', padding: '15px', borderRadius: '5px' }}>
                  <h4 style={{ color: '#f9a825' }}>In Process Claims Path</h4>
                  <ol style={{ paddingLeft: '20px' }}>
                    <li>Schedule Follow-up Based on Timelines</li>
                    <li>Analyst: Verify Payer Timelines and Follow-up</li>
                    <li>Monitor Pending Claims</li>
                    <li>Finalize and Close Claims</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>MEASURING PROGRESS</h3>
              <p>To evaluate the success of this initiative, we will leverage insights from our visual data to establish clear benchmarks and performance metrics. The confusion matrix will be employed to assess the predictive model's precision and recall, ensuring a minimal error rate in classifying denied versus paid claims. We will also monitor trends in denial rates over time to identify and address systemic issues or seasonal fluctuations, implementing targeted interventions to mitigate risks during peak periods.</p>
              
              <p>Additionally, feature importance analysis will support compliance audits by pinpointing the most significant payer rules, CPT codes, and ICD codes, thereby facilitating actionable improvements. The distribution of predicted denial risks will enable efficient resource allocation, prioritizing claims that exceed the high-risk threshold. Finally, we will validate denial likelihood predictions for upcoming encounters by tracking corrective actions taken on high-risk claims and their subsequent resolution outcomes. Collectively, these metrics will foster a data-driven approach to optimizing claims workflows, reducing revenue leakage, and enhancing operational efficiency.</p>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div>
            <h2 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>RESULTS, INSIGHTS, AND TAKEAWAYS</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#14124D', color: 'white' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', width: '20%' }}>AREA</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', width: '40%' }}>KEY DATA</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', width: '40%' }}>OUTCOME</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                      <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>{row.area}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.keyData}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{row.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>STATISTICS AND OUTCOMES FROM TESTING</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Results Summary</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                  <li><strong>Classification Accuracy:</strong> 100% (from confusion matrix)</li>
                  <li><strong>Claims Analyzed:</strong> 6,685 total claims</li>
                  <li><strong>Denial Rate Range:</strong> 37% to 59% (monthly)</li>
                  <li><strong>Key Denial Factors:</strong> Identified top payer rules affecting denials</li>
                  <li><strong>High-Risk Claims:</strong> Successfully identified for proactive management</li>
                </ul>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h3>Performance Metrics</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><strong>Precision:</strong></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>100%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><strong>Recall:</strong></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>100%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><strong>F1 Score:</strong></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>100%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><strong>High-Risk Threshold:</strong></td>
                      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>70% likelihood</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px' }}><strong>Workflow Efficiency Improvement:</strong></td>
                      <td style={{ padding: '8px' }}>Significant reduction in manual effort</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Conclusion Tab */}
        {activeTab === 'conclusion' && (
          <div>
            <h2 style={{ color: '#14124D', marginBottom: '20px', backgroundColor: '#FF6E31', padding: '10px', color: 'white' }}>CONCLUSION</h2>
            
            <p>This initiative has demonstrated the transformative potential of leveraging advanced analytics and automation to optimize healthcare Revenue Cycle Management (RCM). By addressing key inefficiencies and proactively managing high-risk claims, we have laid a strong foundation for reducing denial rates, improving resource allocation, and enhancing financial outcomes.</p>
            
            <div style={{ marginBottom: '30px' }}>
              <h3>Highlights Review</h3>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                <li><strong>Predictive Model Excellence:</strong> The confusion matrix confirmed the model's reliability in accurately distinguishing between denied and paid claims, enabling targeted corrective actions.</li>
                <li><strong>Insightful Denial Trends:</strong> Historical denial rate trends revealed actionable patterns, allowing us to mitigate seasonal spikes and systemic issues.</li>
                <li><strong>Focused Resource Allocation:</strong> Feature importance analysis identified key drivers of denials, ensuring attention is directed where it matters most.</li>
                <li><strong>Prioritization of High-Risk Claims:</strong> The distribution of predicted denial risks guided efficient resource allocation, expediting the resolution of high-risk cases.</li>
                <li><strong>Preemptive Claim Corrections:</strong> Denial likelihood predictions for upcoming encounters facilitated proactive adjustments, increasing claim acceptance rates and reducing denials.</li>
              </ul>
            </div>
            
            <div style={{ backgroundColor: '#FF6E31', color: 'white', padding: '20px', borderRadius: '5px', marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '10px' }}>ACKNOWLEDGEMENTS</h3>
              <p>We express our sincere gratitude to all individuals involved in this project for their invaluable time, contributions, and feedback.</p>
              <p>Your collaboration and insights have been pivotal in shaping this initiative and steering it toward success.</p>
              <p>From sharing expertise to offering constructive criticism, each contribution has refined our approach and ensured that the project's impact aligns with our objectives.</p>
            </div>
            
            <div style={{ backgroundColor: '#14124D', color: 'white', padding: '20px', borderRadius: '5px' }}>
              <h3 style={{ color: '#FF6E31', marginBottom: '10px' }}>CONTACT INFORMATION</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: '10px', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#FF6E31' }}>MINDMELD</div>
                <div>CPETECONNOR@GMAIL.COM</div>
                <div><a href="https://linkedin.com/in/petecconnor" style={{ color: 'white', textDecoration: 'underline' }}>linkedin.com/in/petecconnor</a></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthcareDenialDashboard;