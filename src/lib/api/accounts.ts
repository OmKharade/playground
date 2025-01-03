import { supabase } from "../supabase/client"

export const accountApi = {
    getAccounts: async () => {
        const {data, error} = await supabase.from('accounts').select('*')
        if (error) throw error
        return data
    }
}