import axios from 'axios';
import type { Note } from '../types/note';
import type { NoteFormValues } from '../components/NoteForm/NoteForm';

const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;


interface FetchNotesProps{
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(query:string, page:number) {
    const res = await axios.get<FetchNotesProps>(`${BASE_URL}/notes`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        },
        params: {
            search: query,
            page,
        }
    })
    return res.data;
}



export async function createNote(note:NoteFormValues) {
    const res = await axios.post<NoteFormValues>(`${BASE_URL}/notes`, note,{
        headers: {
         Authorization: `Bearer ${myKey}`  
        },
        
    })

    return res.data;
}



interface DeleteNoteProps{
    notes: Note;
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

return res.data   
}