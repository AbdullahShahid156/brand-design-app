import React, { useState } from 'react';
import { DesignResult } from '../types';
import { CopyIcon, CheckIcon, LogoIcon, DownloadIcon } from './icons';

interface OutputDisplayProps {
  result: DesignResult | null;
  error: string | null;
  isLoading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ result, error, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleDownload = () => {
    if (result?.imageUrl) {
      const link = document.createElement('a');
      link.href = result.imageUrl;
      const extension = result.imageUrl.split(';')[0].split('/')[1] || 'png';
      link.download = `brand_design_${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-secondary rounded-lg p-6">
        <div className="space-y-4 animate-pulse w-full max-w-lg">
            <div className="bg-gray-700 h-8 w-3/4 rounded-md"></div>
            <div className="bg-gray-700 h-64 w-full rounded-lg"></div>
            <div className="bg-gray-700 h-6 w-1/2 rounded-md"></div>
            <div className="space-y-2">
                <div className="bg-gray-700 h-4 w-full rounded-md"></div>
                <div className="bg-gray-700 h-4 w-full rounded-md"></div>
                <div className="bg-gray-700 h-4 w-3/4 rounded-md"></div>
            </div>
        </div>
         <p className="text-white mt-8 text-lg font-semibold">AI is crafting your high-quality design...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary rounded-lg p-6">
        <div className="text-center">
          <p className="text-xl text-red-400">An error occurred:</p>
          <p className="text-gray-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary rounded-lg p-6">
        <div className="text-center text-gray-400">
          <LogoIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-2xl font-bold text-white">Welcome to the Design Studio</h3>
          <p className="mt-2 max-w-md">Fill out the details on the left to generate a unique, AI-powered design for your brand.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-lg p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Generated Design</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-300">Visual</h3>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 text-sm bg-primary text-white font-semibold py-2 px-3 rounded-md hover:bg-primary-hover transition-colors"
              aria-label="Download image"
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </button>
          </div>
          <div className="aspect-square bg-secondary-light rounded-lg overflow-hidden border border-gray-700">
            <img src={result.imageUrl} alt="Generated design" className="w-full h-full object-contain" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Suggested Caption</h3>
          <div className="bg-secondary-light p-4 rounded-lg border border-gray-700 relative">
            <p className="text-gray-200 whitespace-pre-wrap">{result.text}</p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
              aria-label="Copy caption"
            >
              {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5 text-gray-300" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputDisplay;
