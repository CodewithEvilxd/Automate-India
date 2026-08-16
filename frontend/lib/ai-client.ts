export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function callOpenAI(messages: any[], model = "gpt-4o", maxTokens = 500) {
  if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  return data.choices[0].message.content;
}
