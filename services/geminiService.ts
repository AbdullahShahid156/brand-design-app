import { GoogleGenAI, Modality } from "@google/genai";
import { DesignGenerationParams, DesignResult } from '../types';

export const generateGraphicDesign = async (params: DesignGenerationParams): Promise<DesignResult> => {
  if (!process.env.API_KEY || process.env.API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("API key not found. Please create an `env.js` file in your project's root folder and add your Gemini API key to it.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Extract aspect ratio from format string like "Instagram Post (1:1)" -> "1:1"
  const aspectRatio = params.format.match(/\(([^)]+)\)/)?.[1] || '1:1';

  // 1. Generate Image
  const imageModel = 'gemini-2.5-flash-image';
  const imagePromptParts: (
    | { text: string }
    | { inlineData: { data: string; mimeType: string } }
  )[] = [];
  
  const imageTextPrompt = `
    Generate a visually stunning and ultra-high quality graphic. The final output must be extremely polished and professional.
    
    **Design Brief:**
    - **Visual Type:** A professional "${params.visualType}".
    - **Topic:** "${params.prompt}"
    - **Key Text on Visual:** ${params.visualText ? `"${params.visualText}". This is the most important element. Ensure it is legible, well-placed, and creatively integrated with the design.` : "None specified. Focus on a strong visual that leaves space for text to be added later."}
    - **Overall Style:** "${params.style}". The design must strictly embody this aesthetic. If the style is 'Hyper-Realistic', the image should look like a real photograph, with photorealistic lighting, textures, and details.
    - **Component Style Details:** ${params.componentStyle ? `Apply these specific styles to elements within the visual: "${params.componentStyle}".` : "None specified."}
    - **Aspect Ratio:** ${aspectRatio}. Adhere to this strictly.
    - **Brand Colors:** Use "${params.primaryColor}" as the dominant color and "${params.secondaryColor}" as an accent color. The color scheme should be harmonious and integrated naturally into the chosen style.
    ${params.logoBase64 ? "- **Brand Logo:** Incorporate the provided logo naturally and elegantly. Do not distort, recolor, or obstruct the logo. Place it where it makes sense (e.g., a corner)." : "- **Branding:** The design is for a professional brand, so it must reflect superior quality and aesthetics."}
    - **Quality Requirement:** The output MUST be of the highest possible quality. Think 4K, ultra-high resolution, with sharp focus, crisp lines and professional-grade composition. Avoid cartoonish or overly simplistic styles unless explicitly requested.
  `;
  imagePromptParts.push({ text: imageTextPrompt });

  if (params.logoBase64 && params.logoMimeType) {
    imagePromptParts.push({
      inlineData: {
        data: params.logoBase64,
        mimeType: params.logoMimeType,
      },
    });
  }

  const imagePromise = ai.models.generateContent({
    model: imageModel,
    contents: { parts: imagePromptParts },
    config: { responseModalities: [Modality.IMAGE] },
  });

  // 2. Generate Text
  const textModel = 'gemini-2.5-flash';
  const textPrompt = `
    Generate a short and catchy social media caption for a "${params.visualType}" about: "${params.prompt}".
    The visual style is "${params.style}".
    The tone should be professional yet engaging. Include 3-4 relevant hashtags.
    Keep the caption under 60 words.
  `;

  const textPromise = ai.models.generateContent({
    model: textModel,
    contents: textPrompt,
  });

  // 3. Await both and process
  const [imageResponse, textResponse] = await Promise.all([imagePromise, textPromise]);

  // Process image response
  let imageUrl = '';
  const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
  if (imagePart && imagePart.inlineData) {
    imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
  } else {
    throw new Error('Image generation failed. The model did not return image data. Please try a different prompt.');
  }

  // Process text response
  const text = textResponse.text.trim();

  return { imageUrl, text };
};