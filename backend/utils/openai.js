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
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages,
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenRouter API Error");
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No response returned from the model.");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
};

export default getOpenRouterAPIResponse;
