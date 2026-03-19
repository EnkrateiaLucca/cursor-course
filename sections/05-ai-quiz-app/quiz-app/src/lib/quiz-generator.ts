import Anthropic from "@anthropic-ai/sdk";
import { quizQuestionsSchema } from "@/lib/validators";
import type { Question } from "@/types/quiz";

const anthropic = new Anthropic();

const GENERATION_PROMPT = `You are an expert quiz creator. Given the following content, generate exactly {count} quiz questions.

Create a mix of multiple-choice and open-ended questions that test understanding of the key concepts.

For multiple-choice questions:
- Provide 4 options
- One correct answer (as a 0-based index)
- A brief explanation of why the answer is correct

For open-ended questions:
- Provide 1-3 accepted answers (short, factual)
- A brief explanation

Content to generate questions from:
---
{content}
---

Generate {count} questions as a JSON array. Each question must follow one of these formats:

Multiple-choice:
{
  "type": "multiple-choice",
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "..."
}

Open-ended:
{
  "type": "open-ended",
  "question": "...",
  "acceptedAnswers": ["answer1"],
  "explanation": "..."
}

Return ONLY the JSON array, no surrounding text or markdown.`;

export async function generateQuizQuestions(
  content: string,
  questionCount: number
): Promise<Question[]> {
  const prompt = GENERATION_PROMPT.replace(/\{count\}/g, String(questionCount)).replace(
    "{content}",
    content
  );

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI model");
  }

  let rawJson = textBlock.text.trim();

  const fenceMatch = rawJson.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    rawJson = fenceMatch[1].trim();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }

  const validated = quizQuestionsSchema.safeParse(parsed);
  if (!validated.success) {
    throw new Error(
      `AI output failed validation: ${validated.error.issues.map((i) => i.message).join(", ")}`
    );
  }

  return validated.data as Question[];
}
