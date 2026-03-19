"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsSummaryProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  skippedCount: number;
  incorrectCount: number;
}

export function ResultsSummary({
  score,
  totalQuestions,
  percentage,
  skippedCount,
  incorrectCount,
}: ResultsSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardContent className="py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Your Score
            </p>
            <div className="text-5xl font-bold tracking-tight">
              {score} / {totalQuestions}
            </div>
            <div className="mt-2 text-2xl font-semibold text-muted-foreground">
              {percentage}%
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Badge variant="outline" className="text-green-600 border-green-300">
              {score} correct
            </Badge>
            {incorrectCount > 0 && (
              <Badge variant="outline" className="text-red-600 border-red-300">
                {incorrectCount} incorrect
              </Badge>
            )}
            {skippedCount > 0 && (
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                {skippedCount} skipped
              </Badge>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
