
import React from 'react';
import { LogoIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-secondary-light/10 border-b border-secondary-light">
      <div className="container mx-auto flex items-center gap-3">
        <LogoIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold text-white">Brand Design Studio AI</h1>
          <p className="text-sm text-gray-400">AI-Powered Graphic Design Generation</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
