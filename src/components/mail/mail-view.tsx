import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Email } from "@/types/database"
import { 
  Reply, 
  Star, 
  Trash, 
  Forward, 
  ArchiveX, 
  ReplyAll, 
  MoreVertical,
  Tag,
  Mail 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MailViewProps {
  email?: Email
}

export function MailView({ email }: MailViewProps) {
  if (!email) return null

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b">
        <div className="p-3 border-b flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Reply className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ReplyAll className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Forward className="h-5 w-5" />
            </Button>
          </div>

          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <ArchiveX className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Star className={`h-5 w-5 ${email.is_starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </Button>
          </div>

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Tag className="mr-2 h-5 w-5" /> Add label
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-5 w-5" /> Mark as unread
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Email Header */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold">{email.subject}</h2>
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
              {email.to.map((to) => to.name).join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6">
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