import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Email, EmailRecipient, EmailSender } from "@/types/database"
import { format } from "date-fns"

type EmailActionType = 'reply' | 'replyAll' | 'forward'

interface EmailActionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: EmailActionType
  originalEmail: Email
  sender: EmailSender
  onSend: (email: {
    to: EmailRecipient[]
    subject: string
    body: string
  }) => void
}

export function EmailAction({ open, onOpenChange, type, originalEmail, sender, onSend }: EmailActionProps) {
  const getInitialData = () => {
    const subjectPrefix = type === 'forward' ? 'Fwd: ' : 'Re: '
    const subject = originalEmail.subject?.startsWith(subjectPrefix) 
      ? originalEmail.subject 
      : `${subjectPrefix}${originalEmail.subject}`

    const recipients = type === 'reply' 
      ? [originalEmail.from]
      : type === 'replyAll'
      ? [originalEmail.from, ...originalEmail.to.filter(r => r.email !== sender.email)]
      : []

    const originalDate = format(new Date(originalEmail.date), 'PPpp')
    const separator = '\n\n----------------\n\n'
    const quoted = `On ${originalDate}, ${originalEmail.from.name} wrote:\n${originalEmail.body}`
    const body = type === 'forward' ? quoted : `${separator}${quoted}`

    return { subject, recipients, body }
  }

  const { subject, recipients, body } = getInitialData()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'reply' ? 'Reply' : type === 'replyAll' ? 'Reply All' : 'Forward'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input 
              placeholder="To" 
              type="email"
              defaultValue={recipients.map(r => r.email).join(', ')}
            />
          </div>
          <div className="space-y-2">
            <Input 
              placeholder="Subject"
              defaultValue={subject}
            />
          </div>
          <Textarea
            placeholder="Write your message here..."
            className="min-h-[300px]"
            defaultValue={body}
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <div className="flex gap-2">
            <Button type="submit">Send</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}