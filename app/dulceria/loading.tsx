import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DulceriaLoading() {
  return (
    <div className="container py-12 mx-auto px-4 md:px-0 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <section>
            <Skeleton className="h-10 w-48 mb-2" />
            <div className="h-1 w-20 bg-zinc-200 rounded mb-6" />
          </section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border-none shadow-sm animate-pulse"
              >
                <Skeleton className="h-56 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <aside className="w-full lg:w-[400px]">
          <div className="sticky top-28 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden border border-zinc-100 p-8">
            <Skeleton className="h-9 w-32 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
            <div className="mt-8 p-6 bg-zinc-100 rounded-2xl space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
