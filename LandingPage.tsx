import React from 'react';
import { UnileverLogo } from './UnileverLogo';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-corporate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
               <UnileverLogo className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Unilever Financial <br/>
              <span className="text-blue-400">Intelligence Hub</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Access deep insights into Unilever PLC's financial performance from 2020 to 2024. 
              Explore interactive charts, valuation metrics, and detailed statement analysis in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onEnter}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
              >
                Launch Dashboard
              </button>
              <button className="px-8 py-4 bg-corporate-800 hover:bg-corporate-700 text-gray-200 font-semibold rounded-lg transition-colors text-lg border border-corporate-700">
                Read Methodology
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes/decoration */}
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-y-1/3 translate-x-1/4">
          <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0ea5e9" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,31.4C59,41.3,47.1,48.2,35.2,53.8C23.3,59.4,11.4,63.7,-1.9,67C-15.2,70.3,-29.3,72.6,-40.5,66.4C-51.7,60.2,-60,45.5,-66.6,30.3C-73.2,15.1,-78.1,-0.6,-75.7,-15.1C-73.3,-29.6,-63.6,-42.9,-51.7,-51.2C-39.8,-59.5,-25.7,-62.8,-11.9,-63.9C1.9,-65,15.7,-63.9,30.5,-83.6" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Comprehensive Analysis Tools</h2>
            <p className="mt-4 text-gray-500">Everything you need to evaluate financial health.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <svg className="w-7 h-7 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Trends</h3>
              <p className="text-gray-500 leading-relaxed">Visualize revenue, net income, and margin trends over the last 5 years with interactive charts.</p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <svg className="w-7 h-7 text-emerald-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cash Flow & Valuation</h3>
              <p className="text-gray-500 leading-relaxed">Deep dive into Free Cash Flow generation, P/E ratios, and EV/EBITDA multiples.</p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <svg className="w-7 h-7 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Statements</h3>
              <p className="text-gray-500 leading-relaxed">Full access to income statements, balance sheets, and key financial ratios in tabular format.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
