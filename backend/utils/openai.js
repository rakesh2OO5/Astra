import "dotenv/config";

const getOpenRouterAPIResponse = async (messages) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages,
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:");
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenRouter request failed");
    }

    if (!data.choices || data.choices.length === 0) {
      throw new Error("No choices returned from OpenRouter.");
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getOpenRouterAPIResponse;
