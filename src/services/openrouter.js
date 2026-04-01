export async function askAI(prompt) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    return data.reply;

  } catch (error) {
    console.error(error);
    return "Something went wrong.";
  }
}