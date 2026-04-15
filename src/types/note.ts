export  interface Note {
    content: string;
    title: string;
    tag: "Todo"| "Work"| "Personal"| "Meeting"| "Shopping";
    
}
export interface NoteTag extends Note{
id: string;
}