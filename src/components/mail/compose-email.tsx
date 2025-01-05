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
import { EmailRecipient, EmailSender } from "@/types/database"

interface ComposeEmailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sender: EmailSender
  onSend: (email: {
    to: EmailRecipient[]
    subject: string
    body: string
  }) => void
}

export function ComposeEmail({ open, onOpenChange, sender, onSend }: ComposeEmailProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input 
              placeholder="To" 
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Input 
              placeholder="Subject"
            />
          </div>
          <Textarea
            placeholder="Write your message here..."
            className="min-h-[300px]"
          />
        </div>
        <DialogFooter className="sm:justify-between">
          <div className="flex gap-2">
            <Button type="submit">
              Send
            </Button>
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