import { useState, useEffect } from 'react'
import { Account } from '@/types/database'
import { accountApi } from '@/lib/api/accounts'

export function useAccountState() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>()

  useEffect(() => {
    async function loadAccounts() {
      try {
        const accounts = await accountApi.getAccounts()
        setAccounts(accounts)
        if (accounts.length > 0) {
          setSelectedAccount(accounts[0].id)
        }
      } catch (error) {
        console.error('Failed to load accounts:', error)
      }
    }
    loadAccounts()
  }, [])

  return {
    accounts,
    selectedAccount,
    setSelectedAccount
  }
}