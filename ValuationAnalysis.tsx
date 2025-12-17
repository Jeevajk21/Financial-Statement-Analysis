import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { FinancialYear } from '../types';

interface ValuationAnalysisProps {
  data: FinancialYear[];
}

const ValuationAnalysis: React.FC<ValuationAnalysisProps> = ({ data }) => {
  // --- State for DCF Calculator ---
  const [growthRate, setGrowthRate] = useState(3.5); // 3.5% default
  const [discountRate, setDiscountRate] = useState(8.0); // 8% default
  const [terminalGrowth, setTerminalGrowth] = useState(2.0); // 2% default

  // --- Data Processing for Enterprise Value ---
  const evData = useMemo(() => {
    return data.map(year => {
      // Market Cap = Net Income * P/E Ratio
      const marketCap = year.netIncome * year.peRatio;
      const netDebt = year.totalDebt - year.cashAndEquivalents;
      const enterpriseValue = marketCap + netDebt;
      
      return {
        year: year.year,
        MarketCap: marketCap,
        NetDebt: netDebt,
        EnterpriseValue: enterpriseValue,
        // Helper for display
        displayEV: (enterpriseValue / 1000).toFixed(1),
        displayMC: (marketCap / 1000).toFixed(1),
        displayND: (netDebt / 1000).toFixed(1),
      };
    });
  }, [data]);

  // --- DCF Calculation Logic ---
  const latestYear = data[data.length - 1]; // 2024
  const currentPrice = latestYear.eps * latestYear.peRatio;
  const sharesOutstanding = latestYear.netIncome / latestYear.eps; // millions

  const dcfValuation = useMemo(() => {
    const fcf = latestYear.freeCashFlow;
    const projectionYears = 5;
    let sumPV = 0;
    
    // 1. Calculate PV of FCF for projection period
    for (let i = 1; i <= projectionYears; i++) {
      const futureFCF = fcf * Math.pow(1 + growthRate / 100, i);
      const pv = futureFCF / Math.pow(1 + discountRate / 100, i);
      sumPV += pv;
    }

    // 2. Calculate Terminal Value
    const fcfFinal = fcf * Math.pow(1 + growthRate / 100, projectionYears);
    const terminalValue = (fcfFinal * (1 + terminalGrowth / 100)) / ((discountRate - terminalGrowth) / 100);
    const pvTerminal = terminalValue / Math.pow(1 + discountRate / 100, projectionYears);

    // 3. Enterprise Value to Equity Value
    const calculatedEV = sumPV + pvTerminal;
    const netDebt = latestYear.totalDebt - latestYear.cashAndEquivalents;
    const equityValue = calculatedEV - netDebt;

    // 4. Per Share
    const intrinsicValuePerShare = equityValue / sharesOutstanding;
    
    return {
      intrinsicValue: intrinsicValuePerShare,
      upside: ((intrinsicValuePerShare - currentPrice) / currentPrice) * 100
    };
  }, [latestYear, growthRate, discountRate, terminalGrowth, sharesOutstanding, currentPrice]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section 1: Enterprise Value History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Enterprise Value Evolution</h3>
          <p className="text-sm text-gray-500 mb-6">Breakdown of Enterprise Value (Market Cap + Net Debt) over the last 5 years.</p>
          
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={evData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(val) => `£${val/1000}B`} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                formatter={(value: number) => `£${value.toLocaleString(undefined, {maximumFractionDigits: 0})} M`}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="MarketCap" name="Market Cap" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
              <Bar dataKey="NetDebt" name="Net Debt" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* EV Summary Card */}
        <div className="bg-corporate-900 text-white p-6 rounded-xl shadow-sm flex flex-col justify-center space-y-6">
          <div>
            <div className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-1">Current Enterprise Value</div>
            <div className="text-4xl font-bold">£{(evData[evData.length-1].EnterpriseValue / 1000).toFixed(1)}B</div>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-end border-b border-blue-800 pb-2">
               <span className="text-blue-200">Market Cap</span>
               <span className="font-semibold text-lg">£{(evData[evData.length-1].MarketCap / 1000).toFixed(1)}B</span>
             </div>
             <div className="flex justify-between items-end border-b border-blue-800 pb-2">
               <span className="text-blue-200">Net Debt</span>
               <span className="font-semibold text-lg">£{(evData[evData.length-1].NetDebt / 1000).toFixed(1)}B</span>
             </div>
             <div className="flex justify-between items-end pt-2">
               <span className="text-blue-200">% Debt Financing</span>
               <span className="font-semibold text-lg text-yellow-400">
                 {((evData[evData.length-1].NetDebt / evData[evData.length-1].EnterpriseValue) * 100).toFixed(1)}%
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* Section 2: Intrinsic Value Calculator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h3 className="text-lg font-bold text-gray-800">Intrinsic Value Calculator (DCF)</h3>
           <p className="text-sm text-gray-500">Estimate fair value based on future Free Cash Flow projections.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3">
           {/* Controls */}
           <div className="p-6 bg-gray-50 space-y-8 border-r border-gray-100">
              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  Growth Rate (Next 5 Years)
                  <span className="text-blue-600 font-bold">{growthRate}%</span>
                </label>
                <input 
                  type="range" min="0" max="10" step="0.5" 
                  value={growthRate}
                  onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span>10%</span></div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  Discount Rate (WACC)
                  <span className="text-blue-600 font-bold">{discountRate}%</span>
                </label>
                <input 
                  type="range" min="5" max="15" step="0.5" 
                  value={discountRate}
                  onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5%</span><span>15%</span></div>
              </div>

              <div>
                <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                  Terminal Growth Rate
                  <span className="text-blue-600 font-bold">{terminalGrowth}%</span>
                </label>
                <input 
                  type="range" min="0" max="5" step="0.5" 
                  value={terminalGrowth}
                  onChange={(e) => setTerminalGrowth(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span>5%</span></div>
              </div>
              
              <div className="pt-4 text-xs text-gray-500 italic">
                * Based on FY2024 Free Cash Flow of £{latestYear.freeCashFlow.toLocaleString()}M
              </div>
           </div>

           {/* Result Visualization */}
           <div className="col-span-2 p-8 flex flex-col justify-center items-center">
              <div className="w-full max-w-md">
                 <div className="flex justify-between items-center mb-10">
                    <div className="text-center">
                       <div className="text-sm text-gray-500 mb-1">Current Price</div>
                       <div className="text-3xl font-bold text-gray-800">£{currentPrice.toFixed(2)}</div>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-6 relative">
                       <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-xs font-bold ${dcfValuation.upside >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {dcfValuation.upside >= 0 ? 'Undervalued' : 'Overvalued'} by {Math.abs(dcfValuation.upside).toFixed(1)}%
                       </div>
                    </div>
                    <div className="text-center">
                       <div className="text-sm text-gray-500 mb-1">Intrinsic Value</div>
                       <div className={`text-3xl font-bold ${dcfValuation.upside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                         £{dcfValuation.intrinsicValue.toFixed(2)}
                       </div>
                    </div>
                 </div>

                 {/* Bar Chart Comparison */}
                 <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        layout="vertical" 
                        data={[
                          { name: 'Current Price', value: currentPrice, fill: '#64748b' },
                          { name: 'Intrinsic Value', value: dcfValuation.intrinsicValue, fill: dcfValuation.upside >= 0 ? '#10b981' : '#ef4444' }
                        ]}
                        margin={{ left: 20, right: 20 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                        <Tooltip formatter={(val: number) => `£${val.toFixed(2)}`} cursor={false} />
                        <Bar dataKey="value" barSize={32} radius={[0, 4, 4, 0]}>
                           {
                             [0, 1].map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={index === 0 ? '#64748b' : (dcfValuation.upside >= 0 ? '#10b981' : '#ef4444')} />
                             ))
                           }
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationAnalysis;
