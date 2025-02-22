"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState, useEffect, useCallback } from "react";
import { MailList } from "./mail-list";
import { MailView } from "./mail-view";
import type { Account, Email } from "@/types/database";
import { accountApi } from "@/lib/api/accounts";
import { emailApi } from "@/lib/api/emails";
import { SidebarSkeleton, MailListSkeleton, MailViewSkeleton } from "./mail-skeleton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useMailState } from "@/hooks/mail/use-mail-state";
import { useFolderState } from "@/hooks/mail/use-folder-state";
import { useAccountState } from "@/hooks/mail/use-account-state";

interface LastAction {
  type: 'archived' | 'trash'
  emailId: string
  email: Email
  originalFolder: string
}

export function Mail(){
    const {
      accounts,
      selectedAccount,
      setSelectedAccount
    } = useAccountState()
  
    const {
      selectedFolder,
      setSelectedFolder,
      folderCounts,
      isFolderCountLoading,
      loadFolderCounts
    } = useFolderState(selectedAccount)

    const {
      emails,
      selectedEmail,
      loading,
      preventAutoRead,
      setEmails,
      setSelectedEmail,
      setPreventAutoRead,
      handleSelectEmail
    } = useMailState(selectedAccount, selectedFolder)
    
    const [lastAction, setLastAction] = useState<LastAction | null>(null)
    const { toast } = useToast()
    
    const currentEmail = emails.find((email) => email.id === selectedEmail);
        
    useEffect(() => {
        loadFolderCounts()
    }, [loadFolderCounts])

    const handleUndo = async (actionType: 'archived' | 'trash', emailId: string, originalFolder: string) => {
      try {
        await emailApi.moveToFolder(emailId, originalFolder)
        
        if (selectedFolder === originalFolder) {
          const emailToRestore = lastAction?.email
          if (emailToRestore) {
            setEmails(prev => [...prev, emailToRestore])
          }
        }
        
        setLastAction(null)
        setSelectedEmail(undefined)
        loadFolderCounts()

        const updatedEmails = await emailApi.getEmails(selectedAccount!, selectedFolder)
        setEmails(updatedEmails)
      } catch (error) {
        console.error('Failed to undo action:', error)
      }
    }
    
    const showUndoToast = (action: 'archived' | 'trash', email: Email) => {
      const originalFolder = selectedFolder
      setLastAction({ type: action, emailId: email.id, email, originalFolder })
      toast({
        description: `Email ${action === 'archived' ? 'archived' : 'moved to trash'}`,
        action: (
          <ToastAction altText="Undo" onClick={() => handleUndo(action, email.id, originalFolder)}>
          Undo
        </ToastAction>
        ),
        duration: 5000,
      })
    }

    if (!selectedAccount) {
      return (
        <div className="flex h-screen">
          <SidebarSkeleton />
          <MailListSkeleton />
          <MailViewSkeleton />
        </div>
      )
    }
    
  return (
        <div className="flex h-screen">
          <MailSidebar
            accounts = {accounts}
            selectedFolder = {selectedFolder}
            onSelectFolder = {setSelectedFolder}
            selectedAccount = {selectedAccount}
            onSelectAccount = {setSelectedAccount}
            folderCount={folderCounts}
            isFolderCountLoading={isFolderCountLoading}
          />
          <Separator orientation="vertical"/>
          <MailList
            emails={emails}
            selectedEmail={selectedEmail}
            onSelectEmail={handleSelectEmail}
            folder = {selectedFolder}
            loading = {loading}
          />
          <Separator orientation="vertical" />
          <MailView 
            email={currentEmail}
            loading={loading}
            preventAutoRead={preventAutoRead}
            onEmailAction={(action, emailId) => {
              if (action === 'archived' && selectedFolder !== 'archived') {
                const email = emails.find(e => e.id === emailId)
                if (email) {
                  setEmails(emails.filter(e => e.id !== emailId))
                  setSelectedEmail(undefined)
                  showUndoToast('archived', email)
                }
              }
              if (action === 'trash' && selectedFolder !== 'trash') {
                const email = emails.find(e => e.id === emailId)
                if (email) {
                  setEmails(emails.filter(e => e.id !== emailId))
                  setSelectedEmail(undefined)
                  showUndoToast('trash', email)
                }
              }
              if (action === 'star') {
                const email = emails.find(e => e.id === emailId)
                const newStarredState = !email?.is_starred
                
                if ((selectedFolder === 'inbox' && newStarredState) || 
                    (selectedFolder === 'starred' && !newStarredState)) {
                  setEmails(emails.filter(email => email.id !== emailId))
                  setSelectedEmail(undefined)
                } else {
                   setEmails(emails.map(email => 
                    email.id === emailId 
                      ? { ...email, is_starred: newStarredState }
                      : email
                  ))
                }
              }
              if (action === 'read') {
                const email = emails.find(e => e.id === emailId)
                const newReadState = !email?.is_read
                if (!newReadState) {
                  setPreventAutoRead(true)
                }
                setEmails(emails.map(email => 
                  email.id === emailId 
                    ? { ...email, is_read: newReadState }
                    : email
                ))
              }
              loadFolderCounts()
            }}
          />
        </div>
    )
}