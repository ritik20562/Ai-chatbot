const API_KEY = VITE_OPENROUTER_API_KEY=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
gfcfghfgdgdgdhgddhdghd;

export async function askAI(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    console.log("AI response:", data);

    if (data.error) {
      return data.error.message;
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "Something went wrong.";
  }
}