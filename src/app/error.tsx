'use client'
 
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4" role="alert" aria-live="polite">
      <div className="mb-3 flex items-center gap-2 text-destructive">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        <h2 className="text-lg font-semibold">Something went wrong</h2>
      </div>

      {error?.digest ? (
        <p className="mb-3 text-xs text-muted-foreground">Error ID: {error.digest}</p>
      ) : null}

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => reset()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}