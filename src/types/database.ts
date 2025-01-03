export type Account = {
    id: string
    email: string
    name: string
    avatar_url: string | null
    created_at: string
    updated_at: string
  }
  
export type EmailRecipient = {
    email: string
    name: string
}

  export type Email = {
    id: string
    account_id: string
    subject: string | null
    from: string
    to: EmailRecipient[]
    body: string
    is_read: boolean
    is_starred: boolean
    labels: string[] | null
    folder: string
    attachments?: {
        name: string
        size: number
        type: string
    }[] | null
    date: string
    created_at: string
    updated_at: string
  }
  
  export type Database = {
    public: {
      Tables: {
        accounts: {
          Row: Account
          Insert: Omit<Account, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Account, 'id'>>
        }
        emails: {
          Row: Email
          Insert: Omit<Email, 'id' | 'created_at' | 'updated_at'>
          Update: Partial<Omit<Email, 'id'>>
        }
      }
    }
  }