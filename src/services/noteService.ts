import axios from 'axios';
import type {Note,NoteTag} from '../types/note';

const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
console.log(myKey);

interface FetchNotesProps{
    notes: NoteTag[];
    totalPages: number;
}

export async function fetchNotes(query:string) {
    const res = await axios.get<FetchNotesProps>(`${BASE_URL}/notes`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        },
        params: {
            search: query
        }
    })
     console.log(res.data.notes);
    return res.data.notes;
}


interface CreateNoteProps{
    note: Note;
}
export async function createNote(note:Note) {
    const res = await axios.post<CreateNoteProps>(`${BASE_URL}/notes`, note,{
        headers: {
         Authorization: `Bearer ${myKey}`  
        },
        
    })
    console.log(note);
    return res.data;
}



interface DeleteNoteProps{
    notes: NoteTag;
    totalPages: string;
}
export async function deleteNote(id:string) {
    const res = await axios.delete<DeleteNoteProps>(`${BASE_URL}/notes/${id}`,
        {
        headers: {
         Authorization: `Bearer ${myKey}`  
        },
    }
    )
    console.log(res.data.notes); 
return res.data.notes    
}