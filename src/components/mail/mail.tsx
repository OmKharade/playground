"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState } from "react";
import { MailList } from "./mail-list";
import { accounts, emails } from "@/lib/data/mail-data"
import { MailView } from "./mail-view";

export function Mail(){
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
    const [selectedAccount, setSelectedAccount] = useState(accounts[0].id)

    const filteredEmails = emails.filter((email) => email.accountId === selectedAccount)
    const currentEmail = filteredEmails.find((email) => email.id === selectedEmail)
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