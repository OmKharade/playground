import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Account } from "@/types/database";
import { PlusCircle } from "lucide-react";

interface AccountSwitcherProps{
    accounts: Account[]
    selectedAccount: string
    onSelectAccount: (accountId: string) => void
}

export function AccountSwitcher({accounts, selectedAccount, onSelectAccount}: AccountSwitcherProps){
  const getInitials = (name: string) => {
    const parts = name.split(' ')
    const first = parts[0]?.[0] || ''
    const last = parts[parts.length - 1]?.[0] || ''
    return (first + last).toUpperCase()
  }  
  
  return(
        <Select value={selectedAccount} onValueChange={onSelectAccount}>
      <SelectTrigger className="w-full flex items-center gap-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
      {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="font-bold">{getInitials(account.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
        <SelectItem value="add-account" className="hover:bg-transparent focus:bg-transparent">
          <div className="flex items-center justify-center gap-2 rounded-md border border-dashed p-2 hover:border-solid hover:bg-accent">
            <PlusCircle className="h-4 w-4" />
            <span>Add account</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
    )
}