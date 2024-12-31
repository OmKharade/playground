export type Email = {
    id: string
    subject: string
    from: string
    to: string[]
    body: string
    isRead: boolean
    isStarred: boolean
    labels?: string[]
    folder: string
    attachments?: {
      name: string
      size: number
      type: string
    }[]
    date: string
  }
  
  export const emails: Email[] = [
    {
      id: "1",
      subject: "Project Update - Q4 2024 Planning",
      from: "sarah.mitchell@company.com",
      to: ["user@example.com"],
      body: `Hi team,
  
  I wanted to share some updates regarding our Q4 planning:
  
  • New feature rollout scheduled for October
  • Team capacity planning for November
  • Holiday season preparations
  
  Please review the attached documents and let me know your thoughts.
  
  Best regards,
  Sarah`,
      isRead: false,
      isStarred: true,
      labels: ["Important", "Work"],
      folder: "inbox",
      attachments: [
        {
          name: "Q4_Planning.pdf",
          size: 2400000,
          type: "application/pdf"
        }
      ],
      date: "2024-12-13T02:30:00Z"
    },
    {
      id: "2",
      subject: "Weekend Meetup Plans",
      from: "john.doe@friend.com",
      to: ["user@example.com"],
      body: "Hey! Are we still on for Saturday? I found this great new restaurant we could try.",
      isRead: true,
      isStarred: false,
      folder: "inbox",
      date: "2024-12-12T18:25:00Z"
    },
  ]