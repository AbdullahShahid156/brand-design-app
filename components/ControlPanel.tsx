import React, { useState } from 'react';
import { DesignFormat, DesignStyle, VisualType } from '../types';
import { GenerateIcon, UploadIcon, XCircleIcon } from './icons';

interface ControlPanelProps {
  isLoading: boolean;
  onGenerate: (
    prompt: string,
    primaryColor: string,
    secondaryColor: string,
    format: DesignFormat,
    logo: File | null,
    visualText: string,
    style: DesignStyle,
    visualType: VisualType,
    componentStyle: string,
  ) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isLoading, onGenerate }) => {
  const [prompt, setPrompt] = useState('A promotional post for a new line of eco-friendly coffee beans.');
  const [visualText, setVisualText] = useState('Fresh Brews, Greener Tomorrow!');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [format, setFormat] = useState<DesignFormat>(DesignFormat.INSTAGRAM_POST);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [style, setStyle] = useState<DesignStyle>(DesignStyle.REALISTIC);
  const [visualType, setVisualType] = useState<VisualType>(VisualType.SOCIAL_MEDIA_AD);
  const [componentStyle, setComponentStyle] = useState('photorealistic lighting, detailed textures');


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  
  const removeLogo = () => {
    setLogo(null);
    setLogoPreview(null);
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt, primaryColor, secondaryColor, format, logo, visualText, style, visualType, componentStyle);
  };

  const selectClassName = "w-full bg-secondary-light border border-gray-600 rounded-md p-3 text-white focus:ring-primary focus:border-primary transition";

  return (
    <div className="p-6 bg-secondary rounded-lg h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Create Your Design</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Design Prompt
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full bg-secondary-light border border-gray-600 rounded-md p-3 text-white focus:ring-primary focus:border-primary transition"
            placeholder="e.g., A banner for a summer sale on sunglasses"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            disabled={isLoading}
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="visual-type" className="block text-sm font-medium text-gray-300 mb-2">
                    Visual Type
                </label>
                <select id="visual-type" value={visualType} onChange={(e) => setVisualType(e.target.value as VisualType)} disabled={isLoading} className={selectClassName}>
                    {Object.values(VisualType).map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
                    Overall Style
                </label>
                <select id="style" value={style} onChange={(e) => setStyle(e.target.value as DesignStyle)} disabled={isLoading} className={selectClassName}>
                    {Object.values(DesignStyle).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
        </div>

        <div>
            <label htmlFor="component-style" className="block text-sm font-medium text-gray-300 mb-2">
                Component Style Details (Optional)
            </label>
            <textarea
                id="component-style"
                rows={2}
                className="w-full bg-secondary-light border border-gray-600 rounded-md p-3 text-white focus:ring-primary focus:border-primary transition"
                placeholder="e.g., a glass effect on the text, a wooden background"
                value={componentStyle}
                onChange={(e) => setComponentStyle(e.target.value)}
                disabled={isLoading}
            ></textarea>
        </div>

        <div>
            <label htmlFor="visual-text" className="block text-sm font-medium text-gray-300 mb-2">
                Text for Visual (Optional)
            </label>
            <textarea
                id="visual-text"
                rows={2}
                className="w-full bg-secondary-light border border-gray-600 rounded-md p-3 text-white focus:ring-primary focus:border-primary transition"
                placeholder="e.g., Summer Sale 50% Off"
                value={visualText}
                onChange={(e) => setVisualText(e.target.value)}
                disabled={isLoading}
            ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
            <div className="flex items-center gap-2 bg-secondary-light border border-gray-600 rounded-md p-2">
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} disabled={isLoading} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"/>
              <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} disabled={isLoading} className="w-full bg-transparent text-white focus:outline-none"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
            <div className="flex items-center gap-2 bg-secondary-light border border-gray-600 rounded-md p-2">
              <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} disabled={isLoading} className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"/>
              <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} disabled={isLoading} className="w-full bg-transparent text-white focus:outline-none"/>
            </div>
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                Format
            </label>
            <div className="grid grid-cols-2 gap-3">
                {Object.values(DesignFormat).map((f) => (
                <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    disabled={isLoading}
                    className={`p-3 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary ${
                    format === f
                        ? 'bg-primary text-white font-semibold'
                        : 'bg-secondary-light text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {f.split('(')[0]}
                    <span className="block text-xs opacity-80">{f.match(/\(.*\)/)}</span>
                </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                Brand Logo (Optional)
            </label>
            {logoPreview ? (
                <div className="relative group p-2 border-2 border-dashed border-gray-600 rounded-lg">
                    <img src={logoPreview} alt="Logo Preview" className="max-h-24 mx-auto rounded-md" />
                    <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <XCircleIcon className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-secondary-light hover:bg-gray-700 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-8 h-8 mb-3 text-gray-400"/>
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-400">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input id="logo-upload" type="file" className="hidden" onChange={handleLogoChange} accept="image/png, image/jpeg" disabled={isLoading}/>
                </label>
            )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <GenerateIcon className="w-5 h-5" />
              Generate Design
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ControlPanel;