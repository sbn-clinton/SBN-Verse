import { Skeleton } from "@/components/ui/skeleton"

export function LoadingMovieDetails() {
  return (
    <div className="space-y-8">
      <div className="relative h-[50vh] w-full rounded-xl overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="aspect-[2/3] rounded-lg" />

        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-10 w-3/4" />

          <div className="flex flex-wrap gap-2">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
          </div>

          <div className="flex items-center gap-6">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-5 w-16" />
              ))}
          </div>

          <div className="space-y-2">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
