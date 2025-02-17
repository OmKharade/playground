import { emailApi } from "@/lib/api/emails";
import { Email } from "@/types/database";
import { useEffect, useState } from "react";

export function useMailState(selectedAccount?: string, selectedFolder?: string){
    const [emails, setEmails] = useState<Email[]>([])
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>()
    const [loading, setLoading] = useState(true)
    const [preventAutoRead, setPreventAutoRead] = useState(false)

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

    const handleSelectEmail = (emailId: string) => {
        setSelectedEmail(emailId)
        setPreventAutoRead(false)
    }

    return {
        emails,
        selectedEmail,
        loading,
        preventAutoRead,
        setEmails,
        setSelectedEmail,
        setPreventAutoRead,
        handleSelectEmail
    }
}