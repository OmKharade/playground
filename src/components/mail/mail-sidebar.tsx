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
import { ModeToggle } from "../theme-toggle"
import { SidebarSkeleton } from "./mail-skeleton"

interface MailSidebarProps{
  accounts: Account[]
  selectedFolder: string
  selectedAccount: string
  onSelectAccount: (accountId: string) => void
  onSelectFolder: (folder: string) => void
  folderCount: Record<string, number>
  isFolderCountLoading: boolean
}
export function MailSidebar({accounts, selectedFolder, onSelectFolder,selectedAccount, onSelectAccount, folderCount, isFolderCountLoading}: MailSidebarProps) {
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: <Inbox className="mr-2 h-4 w-4" /> },
    { id: 'sent', label: 'Sent', icon: <Send className="mr-2 h-4 w-4" /> },
    { id: 'starred', label: 'Starred', icon: <Star className="mr-2 h-4 w-4" /> },
    { id: 'archived', label: 'Archived', icon: <ArchiveX className="mr-2 h-4 w-4" /> },
    { id: 'trash', label: 'Trash', icon: <Trash className="mr-2 h-4 w-4" /> },
  ]
  return (
    <div className="w-[240px] p-4">
      <AccountSwitcher
        accounts = {accounts}
        selectedAccount = {selectedAccount}
        onSelectAccount = {onSelectAccount}
      />
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2 mt-4">
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant={selectedFolder === folder.id ? 'secondary' : 'ghost'}
              className="w-full justify-between items-center"
              onClick={() => onSelectFolder(folder.id)}
            >
              <div className="flex items-center">
                {folder.icon}
                {folder.label}
              </div>
              {folderCount[folder.id] > 0 && (
              <div className="bg-primary text-primary-foreground px-2 py-0.5 text-xs rounded-sm font-medium">
                {isFolderCountLoading ? "..." : folderCount[folder.id]}
                </div>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ModeToggle/>
      <Button className="mt-4 w-full" size="lg">
        <PenSquare className="mr-2" />
        Compose
      </Button>
    </div>
  )
}