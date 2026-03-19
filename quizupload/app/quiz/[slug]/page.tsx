import { QuizPageClient } from "./quiz-page-client"

export const metadata = {
  title: "Quiz — QuizUpload"
}

export default async function QuizPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <QuizPageClient slug={slug} />
}
