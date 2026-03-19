import { ResultsPageClient } from "./results-page-client"

export const metadata = {
  title: "Results — QuizUpload"
}

export default async function ResultsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ResultsPageClient slug={slug} />
}
