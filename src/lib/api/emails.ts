import { supabase } from "../supabase/client";
import { Email } from "@/types/database";

export const emailApi = {
    getEmails: async (accountId: string, folder: string) => {
        const {data, error} = await supabase
            .from('emails')
            .select('*')
            .eq('account_id', accountId)
            .eq('folder', folder)
            .order('created_at', {ascending: false})
        if (error) throw error
        return data
    },
    getEmail: async (id: string) => {
        const {data, error} = await supabase
            .from('emails')
            .select('*')
            .eq('id', id)
        if (error) throw error
        return data
    },
    updateEmail: async (id:string, updates: Partial<Email>) => {
        const {data, error} = await supabase
            .from('emails')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },
    moveToFolder: async (id: string, folder: string) => {
        return emailApi.updateEmail(id, {folder})
    },
    toggleStar: async (id: string, isStarred: boolean) => {
        return emailApi.updateEmail(id, {is_starred: isStarred})
    },
    toggleRead: async (id: string, isRead: boolean) => {
        return emailApi.updateEmail(id, {is_read: isRead})
    }
}
