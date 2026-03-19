"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFileAccepted: (file: File) => void
  disabled?: boolean
}

export function FileDropzone({ onFileAccepted, disabled }: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0])
      }
    },
    [onFileAccepted]
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "application/json": [".json"],
        "text/markdown": [".md", ".markdown"]
      },
      maxFiles: 1,
      maxSize: 1024 * 1024, // 1MB
      disabled
    })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all",
        isDragActive && !isDragReject && "border-blue-500 bg-blue-50",
        isDragReject && "border-red-500 bg-red-50",
        !isDragActive && !isDragReject && "border-gray-300 hover:border-gray-400",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-3">
        {isDragReject ? (
          <>
            <AlertCircle className="h-12 w-12 text-red-400" />
            <p className="text-lg font-medium text-red-600">
              Only .json and .md files
            </p>
          </>
        ) : isDragActive ? (
          <>
            <FileText className="h-12 w-12 text-blue-400" />
            <p className="text-lg font-medium text-blue-600">
              Drop your quiz file here
            </p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium">
              Drop a quiz file here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports .json and .md files (max 1MB)
            </p>
          </>
        )}
      </div>
    </div>
  )
}
