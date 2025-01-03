"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState, useEffect } from "react";
import { MailList } from "./mail-list";
import { accounts, emails } from "@/lib/data/mail-data"
import { MailView } from "./mail-view";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database";
import type { Account, Email } from "@/types/database";
import { accountApi } from "@/lib/api/accounts";
import { emailApi } from "@/lib/api/emails";

const supabase = createClientComponentClient<Database>()

export function Mail(){
    const [accounts, setAccounts] = useState<Account[]>([])
    const [emails, setEmails] = useState<Email[]>([])
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
    const [selectedAccount, setSelectedAccount] = useState<string>()
    const [selectedFolder, setSelectedFolder] = useState<string>('inbox')
    const [loading, setLoading] = useState(true)

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
        if (!selectedAccount) return
        
        try {
          setLoading(true)
          const emails = await emailApi.getEmails(selectedAccount, "inbox")
          setEmails(emails)
        } catch (error) {
          console.error("Failed to load emails:", error)
        } finally {
          setLoading(false)
        }
      }
      loadEmails()
    }, [selectedAccount])

    const currentEmail = emails.find((email) => email.id === selectedEmail);

    if (!selectedAccount) {
      return <div>Loading...</div>;
    }
    
  return (
    <>
        <div className="flex h-screen">
            <MailSidebar
                accounts = {accounts}
                selectedFolder = {selectedFolder}
                onSelectFolder = {setSelectedFolder}
                selectedAccount = {selectedAccount}
                onSelectAccount = {setSelectedAccount}
            />
            <Separator orientation="vertical"/>
            <MailList
          emails={emails}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
        />
        <Separator orientation="vertical" />
        <MailView email={currentEmail} />
        </div>
    </>
    )
}