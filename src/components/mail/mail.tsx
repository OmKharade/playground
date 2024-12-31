"use client";

import { Separator } from "../ui/separator";
import { MailSidebar } from "./mail-sidebar";
import { useState } from "react";
import { MailList } from "./mail-list";
import { emails } from "@/lib/data/mail-data"
import { MailView } from "./mail-view";

export function Mail(){
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
     const currentEmail = emails.find((email) => email.id === selectedEmail)
    return (
        <>
        <div className="flex h-screen">
            <MailSidebar/>
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