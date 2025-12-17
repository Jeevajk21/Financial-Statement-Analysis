import React from 'react';
import { FinancialYear } from '../types';

interface FinancialTableProps {
  data: FinancialYear[];
}

const FinancialTable: React.FC<FinancialTableProps> = ({ data }) => {
  // Sort data descending by year for table view (latest first)
  const sortedData = [...data].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  const formatCurrency = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">Metric (GBP Millions)</th>
            {sortedData.map(d => (
              <th key={d.year} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{d.year}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {/* Income Statement */}
          <tr className="bg-gray-50 font-semibold"><td colSpan={6} className="px-6 py-2 text-gray-700">Income Statement</td></tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900 font-medium">Revenue</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.revenue)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Gross Profit</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.grossProfit)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Operating Income</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.operatingIncome)}</td>)}
          </tr>
          <tr className="bg-blue-50">
            <td className="px-6 py-3 whitespace-nowrap text-gray-900 font-medium">Net Income</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-blue-700 font-bold">{formatCurrency(d.netIncome)}</td>)}
          </tr>
           <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">EPS (Diluted)</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{d.eps.toFixed(2)}</td>)}
          </tr>

          {/* Balance Sheet */}
          <tr className="bg-gray-50 font-semibold"><td colSpan={6} className="px-6 py-2 text-gray-700">Balance Sheet</td></tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Total Assets</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.totalAssets)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Total Liabilities</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.totalLiabilities)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Total Equity</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.totalEquity)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Total Debt</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.totalDebt)}</td>)}
          </tr>

          {/* Cash Flow */}
          <tr className="bg-gray-50 font-semibold"><td colSpan={6} className="px-6 py-2 text-gray-700">Cash Flow</td></tr>
           <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Operating Cash Flow</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{formatCurrency(d.operatingCashFlow)}</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900 font-medium text-emerald-600">Free Cash Flow</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-emerald-600 font-bold">{formatCurrency(d.freeCashFlow)}</td>)}
          </tr>

           {/* Ratios */}
          <tr className="bg-gray-50 font-semibold"><td colSpan={6} className="px-6 py-2 text-gray-700">Ratios</td></tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Gross Margin %</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{d.grossMargin}%</td>)}
          </tr>
          <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">Operating Margin %</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{d.operatingMargin}%</td>)}
          </tr>
           <tr>
            <td className="px-6 py-3 whitespace-nowrap text-gray-900">ROE %</td>
            {sortedData.map(d => <td key={d.year} className="px-6 py-3 text-right text-gray-600">{d.roe}%</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
