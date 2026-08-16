export interface AIAnalysisResult {
  category: string;
  estimated_weight_kg: number;
  condition: string;
  reasoning: string;
  title: string;
  description: string;
}

export async function analyzeImage(imageBase64: string): Promise<AIAnalysisResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("OPENAI_API_KEY not found. Using fallback mock analysis.");
    return {
      category: "plastic_hdpe",
      estimated_weight_kg: 250,
      condition: "Recyclable",
      reasoning: "Industrial grade high-density polyethylene offcuts with consistent coloring.",
      title: "Recycled HDPE Granules / Flakes",
      description: "Clean industrial regrind HDPE flakes, ready for secondary pelletizing and remolding."
    };
  }

  try {
    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and return a JSON object with the following fields: 'category' (one of: aluminum, steel, plastic_pet, plastic_hdpe, paper, glass, electronic, textile, mixed), 'estimated_weight_kg' (number), 'condition' (reusable, recyclable_only, contaminated), 'reasoning' (one line string), 'title' (short industrial descriptive title), 'description' (2 sentence specification). Only return raw JSON."
            },
            {
              type: "image_url",
              image_url: { url: imageBase64, detail: "low" }
            }
          ]
        }
      ],
      max_tokens: 400
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let resultText = data.choices[0].message.content;
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(resultText);
  } catch (error: any) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
}
