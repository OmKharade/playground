// components/mail/mail-list.tsx
import { formatDistanceToNow } from "date-fns"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Email } from "@/types/database"
import { MailListSkeleton } from "./mail-skeleton"

interface MailListProps {
  emails: Email[]
  folder: string
  selectedEmail?: string
  onSelectEmail: (emailId: string) => void
  loading?: boolean
}

export function MailList({ emails, selectedEmail, onSelectEmail, folder, loading }: MailListProps) {
  if(loading) return <MailListSkeleton />
  return (
    <div className="w-[400px]">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-semibold capitalize">{folder}</h2>
      </div>
      <div className="overflow-auto h-[calc(100vh-120px)] p-2 space-y-2">
        {emails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "flex flex-col gap-2 p-4 rounded-lg border cursor-pointer hover:bg-accent/50",
              selectedEmail === email.id && "bg-accent"
            )}
            onClick={() => onSelectEmail(email.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{email.from.name}</span>
              {!email.is_read && (
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
              )}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(email.date), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm truncate">{email.subject}</span>
              {email.is_starred && (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{email.body}</p>
            {email.labels && email.labels.length > 0 && (
              <div className="flex gap-2 mt-1">
                {email.labels.map((label)=> (
                  <Badge key={label} variant="secondary" className="text-xs">
                    {label}</Badge>
                ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}