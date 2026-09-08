import { deepseekChat } from "@/lib/deepseek";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { source, question } = await request.json();

  console.log("SOURCE:", source);
  console.log("QUESTION:", question);

  const answer = await deepseekChat([
    {
      role: "system",
      content: `Answer only using the source below.
If the answer is not in the source, answer based on your own knowledge that you can formulate from the source and make sure you perform the role properly not as a agent but what you are roleplaying or said to be. Be sarcastic and also make fun of the user asking the question with creative puns and sarcasm

Source:
${source}`,
    },
    {
      role: "user",
      content: question,
    },
  ]);

  console.log("ANSWER:", answer);

  return NextResponse.json({ answer });
}
