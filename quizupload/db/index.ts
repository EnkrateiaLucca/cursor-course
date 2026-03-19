import { config } from "dotenv"
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { customers } from "./schema/customers"
import {
  quizzes,
  quizzesRelations,
  questions,
  questionsRelations,
  attempts,
  attemptsRelations,
  responses,
  responsesRelations
} from "./schema/quizzes"

config({ path: ".env.local" })

const dbSchema = {
  customers,
  quizzes,
  quizzesRelations,
  questions,
  questionsRelations,
  attempts,
  attemptsRelations,
  responses,
  responsesRelations
}

let _db: ReturnType<typeof initializeDb> | null = null

function initializeDb(url: string) {
  const client = postgres(url, { prepare: false })
  return drizzlePostgres(client, { schema: dbSchema })
}

export function getDb() {
  if (!_db) {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not set")
    }
    _db = initializeDb(databaseUrl)
  }
  return _db
}

// Lazy proxy — only throws when actually used
export const db = new Proxy({} as ReturnType<typeof initializeDb>, {
  get(_target, prop) {
    return (getDb() as Record<string | symbol, unknown>)[prop]
  }
})
