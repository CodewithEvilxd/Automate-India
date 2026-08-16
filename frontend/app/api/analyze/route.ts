import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
      return NextResponse.json({ error: "OpenAI API Key is missing" }, { status: 500 });
    }

    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and return a JSON object with the following fields: 'title' (a short descriptive title of the material), 'description' (a brief description), 'category' (e.g., Plastic, Metal, Electronics, Wood, Glass), 'estimated_weight_kg' (an educated guess of the weight in kg as a number), 'condition' (one of: 'New', 'Good', 'Fair', 'Poor'). Only return raw JSON without markdown wrappers."
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
                detail: "low"
              }
            }
          ]
        }
      ],
      max_tokens: 300
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    let resultText = data.choices[0].message.content;
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return NextResponse.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
