import { Skeleton } from "@/components/ui/skeleton"

export function AccountSwitcherSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-[120px]" />
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="w-[240px] p-4 space-y-4">
      <AccountSwitcherSkeleton />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  )
}

export function MailListSkeleton() {
  return (
    <div className="w-[400px]">
      <div className="p-4">
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MailViewSkeleton() {
  return (
    <div className="flex-1 p-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}