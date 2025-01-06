"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState, useEffect, useCallback } from "react";
import { MailList } from "./mail-list";
import { MailView } from "./mail-view";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database";
import type { Account, Email } from "@/types/database";
import { accountApi } from "@/lib/api/accounts";
import { emailApi } from "@/lib/api/emails";
import { SidebarSkeleton, MailListSkeleton, MailViewSkeleton } from "./mail-skeleton";

export function Mail(){
    const [accounts, setAccounts] = useState<Account[]>([])
    const [emails, setEmails] = useState<Email[]>([])
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
    const [selectedAccount, setSelectedAccount] = useState<string>()
    const [selectedFolder, setSelectedFolder] = useState<string>('inbox')
    const [folderCounts, setFolderCounts] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)
    const [isFolderCountLoading, setIsFolderCountLoading] = useState(true)
    const [preventAutoRead, setPreventAutoRead] = useState(false)


    useEffect(() => {
      async function loadAccounts(){
        try{
          const accounts = await accountApi.getAccounts()
          setAccounts(accounts)
          if(accounts.length > 0){
            setSelectedAccount(accounts[0].id)
          }
        }
        catch(error){
          console.error(error)
        }
      }
      loadAccounts()
    },[])
    
    useEffect(() => {
      async function loadEmails() {
        if (!selectedAccount || !selectedFolder) return
        
        try {
          setLoading(true)
          const emails = await emailApi.getEmails(selectedAccount, selectedFolder)
          setEmails(emails)
        } catch (error) {
          console.error("Failed to load emails:", error)
        } finally {
          setLoading(false)
        }
      }
      loadEmails()
    }, [selectedAccount, selectedFolder])

    const currentEmail = emails.find((email) => email.id === selectedEmail);
    
    const loadFolderCounts = useCallback(async () => {
        if (!selectedAccount) return
        setIsFolderCountLoading(true)
        try {
            const counts = await emailApi.getFolderCounts(selectedAccount)
            setFolderCounts(counts)
        } catch (error) {
            console.error("Failed to load folder counts:", error)
        } finally {
            setIsFolderCountLoading(false)
        }
    }, [selectedAccount])
        
    useEffect(() => {
        loadFolderCounts()
    }, [loadFolderCounts])

    const handleSelectEmail = (emailId: string) => {
      setSelectedEmail(emailId)
      setPreventAutoRead(false)
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
                setEmails(emails.filter(email => email.id !== emailId))
                setSelectedEmail(undefined)
              }
              if (action === 'trash' && selectedFolder !== 'trash') {
                setEmails(emails.filter(email => email.id !== emailId))
                setSelectedEmail(undefined)
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