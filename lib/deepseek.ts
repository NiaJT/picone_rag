interface message {
  role: "system" | "user" | "assistant";
  content: string;
}
export async function deepseekChat(messages: message[]) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
    }),
  });

  const data = await response.json();

  return data.choices[0].message.content;
}
