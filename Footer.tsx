import React from 'react';
import { UnileverLogo } from './UnileverLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-corporate-900 text-white py-12 mt-auto border-t border-corporate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white rounded p-0.5">
                <UnileverLogo className="h-6 w-6 text-blue-900" />
              </div>
              <span className="text-lg font-bold">Unilever Analysis</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing comprehensive financial insights and visualization for Unilever PLC investors and analysts.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white transition-colors">Dashboard</button></li>
              <li><button className="hover:text-white transition-colors">Financial Reports</button></li>
              <li><button className="hover:text-white transition-colors">Valuation Models</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white transition-colors">Documentation</button></li>
              <li><button className="hover:text-white transition-colors">API Access</button></li>
              <li><button className="hover:text-white transition-colors">Methodology</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-white transition-colors">Disclaimer</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-corporate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Financial Analysis Project. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Data sourced from Unilever PLC Annual Reports (2020-2024). This is a demonstration project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
