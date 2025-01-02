"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState } from "react";
import { MailList } from "./mail-list";
import { accounts, emails } from "@/lib/data/mail-data"
import { MailView } from "./mail-view";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { Database } from "@/types/database";

const supabase = createClientComponentClient<Database>()

export function Mail(){
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
    const [selectedAccount, setSelectedAccount] = useState(accounts[0].id)

    const filteredEmails = emails.filter((email) => email.accountId === selectedAccount)
    const currentEmail = filteredEmails.find((email) => email.id === selectedEmail)

    // Check db connection
    const [testData, setTestData] = useState<{ emails: any[]; accounts: any[] } | null>(null)

    useEffect(() => {
        async function fetchTest() {
        console.log('Supabase client:', !!supabase)
        
        const { data: tableTest, error: tableError } = await supabase
            .from('emails')
            .select('count')
        console.log('Table test:', tableTest, tableError)

        const { data: emails, error: emailsError } = await supabase
            .from('emails')
            .select('*')
        
        if (emailsError) {
            console.error('Emails error:', emailsError)
            return
        }
        console.log('Raw emails response:', emails)

        const { data: accounts, error: accountsError } = await supabase
            .from('accounts')
            .select('*')
        
        if (accountsError) {
            console.error('Accounts error:', accountsError)
            return
        }
        console.log('Raw accounts response:', accounts)

        setTestData({ emails: emails || [], accounts: accounts || [] })
        }

        fetchTest()
    }, [])

  return (
    <>
        <div className="flex h-screen">
            <MailSidebar
                selectedAccount = {selectedAccount}
                onSelectAccount = {setSelectedAccount}
            />
            <Separator orientation="vertical"/>
            <MailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
        />
        <Separator orientation="vertical" />
        <MailView email={currentEmail} />
        </div>
    </>
    )
}