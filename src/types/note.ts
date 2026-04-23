export  interface Note {
    content: string;
    title: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
    id: string;
    createdAt: string;
    updatedAt: string;
    
}
