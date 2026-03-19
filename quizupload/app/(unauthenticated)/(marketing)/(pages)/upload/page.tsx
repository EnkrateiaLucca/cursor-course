import { UploadForm } from "@/components/upload/upload-form"

export const metadata = {
  title: "Upload Quiz — QuizUpload"
}

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload a Quiz</h1>
        <p className="mt-2 text-muted-foreground">
          Drop a <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.json</code> or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.md</code> file to create an
          interactive quiz.
        </p>
      </div>

      <UploadForm />
    </div>
  )
}
