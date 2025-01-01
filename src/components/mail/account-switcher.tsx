import { accounts } from "@/lib/data/mail-data";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AccountSwitcherProps{
    selectedAccount: string
    onSelectAccount: (accountId: string) => void
}

export function AccountSwitcher({selectedAccount, onSelectAccount}: AccountSwitcherProps){
    return(
        <Select value={selectedAccount} onValueChange={onSelectAccount}>
      <SelectTrigger className="w-full flex items-center gap-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
      {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{account.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
        <SelectItem value="add-account">
          <span className="text-muted-foreground">Add another account</span>
        </SelectItem>
      </SelectContent>
    </Select>
    )
}