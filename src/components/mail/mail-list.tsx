// components/mail/mail-list.tsx
import { Email } from "@/lib/data/mail-data"
import { formatDistanceToNow } from "date-fns"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface MailListProps {
  emails: Email[]
  selectedEmail?: string
  onSelectEmail: (emailId: string) => void
}

export function MailList({ emails, selectedEmail, onSelectEmail }: MailListProps) {
  return (
    <div className="w-[400px]">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">Inbox</h2>
      </div>
      <div className="overflow-auto h-[calc(100vh-120px)]">
        {emails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "flex flex-col gap-1 p-4 border-b cursor-pointer hover:bg-accent/50",
              selectedEmail === email.id && "bg-accent",
              !email.isRead && "font-semibold"
            )}
            onClick={() => onSelectEmail(email.id)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{email.from}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(email.date), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm truncate">{email.subject}</span>
              {email.isStarred && (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{email.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}