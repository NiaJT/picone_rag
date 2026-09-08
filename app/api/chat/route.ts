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
If the answer is not in the source, say "I don't know."

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
