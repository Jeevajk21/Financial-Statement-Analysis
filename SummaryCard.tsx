import React from 'react';
import { KpiCardProps } from '../types';

const SummaryCard: React.FC<KpiCardProps> = ({ title, value, change, prefix = '', suffix = '', trend }) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  let trendColor = 'text-gray-500';
  if (trend === 'up') trendColor = 'text-green-600';
  if (trend === 'down') trendColor = 'text-red-600';
  
  // Custom logic: if change is present, override trend logic (Green for up, Red for down unless specified otherwise)
  if (change !== undefined) {
      trendColor = isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500';
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
      <div className="text-sm font-medium text-gray-500 mb-2">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
            {isPositive ? '↑' : isNegative ? '↓' : '-'} {Math.abs(change)}%
            <span className="ml-1 text-xs font-normal text-gray-400">vs LY</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
