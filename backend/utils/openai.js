import "dotenv/config";

const getOpenRouterAPIResponse = async (messages) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.CLIENT_URL,
          "X-Title": "Astra AI",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter Error:", data);

      throw new Error(
        data.error?.message ||
          "Failed to get response from OpenRouter."
      );
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response returned by OpenRouter.");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
};

export default getOpenRouterAPIResponse;
