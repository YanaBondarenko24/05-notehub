export  interface CreateNote {
    content: string;
    title: string;
    tag: "Todo"| "Work"| "Personal"| "Meeting"| "Shopping";
    
}
export interface Note extends CreateNote{
    id: string;
    createdAt: string;
    updatedAt: string;
}