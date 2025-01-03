import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Inbox, 
  Send, 
  ArchiveX, 
  Star, 
  Trash,
  PenSquare 
} from "lucide-react"
import { AccountSwitcher } from "./account-switcher"
import { Account } from "@/types/database"

interface MailSidebarProps{
  accounts: Account[]
  selectedFolder: string
  selectedAccount: string
  onSelectAccount: (accountId: string) => void
  onSelectFolder: (folder: string) => void
}
export function MailSidebar({accounts, selectedFolder, onSelectFolder,selectedAccount, onSelectAccount}: MailSidebarProps) {
  return (
    <div className="w-[240px] p-4">
      <AccountSwitcher
        accounts = {accounts}
        selectedAccount = {selectedAccount}
        onSelectAccount = {onSelectAccount}
      />
      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="space-y-2 mt-4">
          <Button variant="ghost" className="w-full justify-start">
            <Inbox className="mr-2" /> Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Send className="mr-2" /> Sent
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Star className="mr-2" /> Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ArchiveX className="mr-2" /> Archive
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash className="mr-2" /> Trash
          </Button>
        </div>
      </ScrollArea>
      <Button className="w-full" size="lg">
        <PenSquare className="mr-2" />
        Compose
      </Button>
    </div>
  )
}