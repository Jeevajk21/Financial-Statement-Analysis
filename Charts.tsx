import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from 'recharts';
import { FinancialYear } from '../types';

interface ChartProps {
  data: FinancialYear[];
}

export const RevenueProfitChart: React.FC<ChartProps> = ({ data }) => {
  const [hiddenDataKeys, setHiddenDataKeys] = useState<string[]>([]);

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    if (hiddenDataKeys.includes(dataKey)) {
      setHiddenDataKeys(hiddenDataKeys.filter(key => key !== dataKey));
    } else {
      setHiddenDataKeys([...hiddenDataKeys, dataKey]);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(value) => `£${value/1000}B`} />
        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          formatter={(value: number, name: string) => [name === 'Gross Margin' ? `${value}%` : `£${value.toLocaleString()}M`, name]}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '10px', cursor: 'pointer' }} 
          onClick={handleLegendClick}
        />
        <Bar 
          yAxisId="left" 
          dataKey="revenue" 
          name="Revenue" 
          fill="#0ea5e9" 
          radius={[4, 4, 0, 0]} 
          barSize={40} 
          hide={hiddenDataKeys.includes('revenue')}
        />
        <Bar 
          yAxisId="left" 
          dataKey="netIncome" 
          name="Net Income" 
          fill="#0c4a6e" 
          radius={[4, 4, 0, 0]} 
          barSize={40} 
          hide={hiddenDataKeys.includes('netIncome')}
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="grossMargin" 
          name="Gross Margin" 
          stroke="#f59e0b" 
          strokeWidth={3} 
          dot={{ r: 4, strokeWidth: 2 }} 
          hide={hiddenDataKeys.includes('grossMargin')}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const BalanceSheetComposition: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(value) => `£${value/1000}B`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          formatter={(value: number) => [`£${value.toLocaleString()}M`]}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Bar dataKey="totalLiabilities" name="Liabilities" stackId="a" fill="#94a3b8" />
        <Bar dataKey="totalEquity" name="Equity" stackId="a" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const CashFlowTrend: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(value) => `£${value/1000}B`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          formatter={(value: number) => [`£${value.toLocaleString()}M`]}
        />
        <Legend wrapperStyle={{ paddingTop: '10px' }} />
        <Line type="monotone" dataKey="operatingCashFlow" name="Operating CF" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="freeCashFlow" name="Free CF" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="netIncome" name="Net Income" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ValuationMetrics: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
         <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} />
         <YAxis yAxisId="left" axisLine={false} tickLine={false} label={{ value: 'Multiples', angle: -90, position: 'insideLeft' }} />
         <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} label={{ value: 'Yield', angle: 90, position: 'insideRight' }} />
         <Tooltip />
         <Legend />
         <Line yAxisId="left" type="monotone" dataKey="peRatio" name="P/E Ratio" stroke="#8b5cf6" strokeWidth={2} />
         <Line yAxisId="left" type="monotone" dataKey="evToEbitda" name="EV/EBITDA" stroke="#ec4899" strokeWidth={2} />
         <Area yAxisId="right" type="monotone" dataKey="dividendYield" name="Div Yield %" fill="#d1fae5" stroke="#10b981" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
