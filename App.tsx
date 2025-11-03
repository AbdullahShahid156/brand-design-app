import React, { useState } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import OutputDisplay from './components/OutputDisplay';
import { generateGraphicDesign } from './services/geminiService';
import { DesignFormat, DesignResult, DesignStyle, VisualType } from './types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DesignResult | null>(null);

  const handleGenerate = async (
    prompt: string,
    primaryColor: string,
    secondaryColor: string,
    format: DesignFormat,
    logo: File | null,
    visualText: string,
    style: DesignStyle,
    visualType: VisualType,
    componentStyle: string,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      let logoBase64: string | undefined;
      let logoMimeType: string | undefined;

      if (logo) {
        logoBase64 = await fileToBase64(logo);
        logoMimeType = logo.type;
      }
      
      const designResult = await generateGraphicDesign({
        prompt,
        primaryColor,
        secondaryColor,
        format: format,
        logoBase64,
        logoMimeType,
        visualText,
        style,
        visualType,
        componentStyle,
      });

      setResult(designResult);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-light flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="lg:max-h-[calc(100vh-120px)]">
            <ControlPanel isLoading={isLoading} onGenerate={handleGenerate} />
          </div>
          <div className="lg:max-h-[calc(100vh-120px)]">
            <OutputDisplay result={result} error={error} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;