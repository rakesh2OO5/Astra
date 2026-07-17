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
        },
        body: JSON.stringify({
          model: "openrouter/free",
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

    return data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getOpenRouterAPIResponse;
