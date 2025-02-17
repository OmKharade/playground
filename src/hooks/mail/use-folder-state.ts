import { useState, useCallback } from 'react'
import { emailApi } from '@/lib/api/emails'

export function useFolderState(selectedAccount?: string) {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox')
  const [folderCounts, setFolderCounts] = useState<Record<string, number>>({})
  const [isFolderCountLoading, setIsFolderCountLoading] = useState(true)

  const loadFolderCounts = useCallback(async () => {
    if (!selectedAccount) return
    setIsFolderCountLoading(true)
    try {
      const counts = await emailApi.getFolderCounts(selectedAccount)
      setFolderCounts(counts)
    } catch (error) {
      console.error("Failed to load folder counts:", error)
    } finally {
      setIsFolderCountLoading(false)
    }
  }, [selectedAccount])

  return {
    selectedFolder,
    setSelectedFolder,
    folderCounts,
    isFolderCountLoading,
    loadFolderCounts
  }
}