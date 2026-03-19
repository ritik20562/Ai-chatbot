const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

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