import { Button } from "@/components/ui/button"
import { Email } from "@/lib/data/mail-data"
import { format } from "date-fns"
import { Reply, Star, Trash, Forward } from "lucide-react"

interface MailViewProps {
  email?: Email
}

export function MailView({ email }: MailViewProps) {
  if (!email) {
    return 
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{email.subject}</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Star className={email.isStarred ? "fill-yellow-400" : ""} />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash />
            </Button>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-semibold">From: </span>
              {email.from}
            </div>
            <div className="text-muted-foreground">
              {format(new Date(email.date), "PPpp")}
            </div>
          </div>
          <div className="text-sm">
            <span className="font-semibold">To: </span>
            {email.to.join(", ")}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <Button>
            <Reply className="mr-2 h-4 w-4" /> Reply
          </Button>
          <Button variant="outline">
            <Forward className="mr-2 h-4 w-4" /> Forward
          </Button>
        </div>
        <div className="whitespace-pre-wrap">{email.body}</div>
        {email.attachments && email.attachments.length > 0 && (
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Attachments</h3>
            {email.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer"
              >
                {attachment.name} ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}