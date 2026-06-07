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
      messages
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getOpenRouterAPIResponse;