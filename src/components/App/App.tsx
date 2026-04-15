import { useState } from 'react';
import { createNote, deleteNote, fetchNotes } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce'
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css'
import { keepPreviousData, useQuery} from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import type { Note} from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export default function App() {
    const queryClient = useQueryClient();

   const deleteMutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['note'] });
  },
   });
       const createMutation = useMutation({
  mutationFn: createNote,

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['note'] });
  },
});
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const [search, setSearch] = useState('')
    const {data,isError,isLoading,} = useQuery({
        queryKey: ['note', search],
        queryFn: () => fetchNotes(search),
        placeholderData:keepPreviousData,
    })
    const handleSearch = useDebouncedCallback(setSearch, 300);

    const [searchNote, setSearchNote] = useState<Note | null>(null)
    
    const handleDelete = ( id: string) => {
        deleteMutation.mutate(id);
        console.log('Delete note');
        
    }
 
    return (<div className={css.app}>
        <header className={css.toolbar}>
         <SearchBox text={search} onSearch={handleSearch}/>
            {/* Пагінація */}
         <button onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>
         {isModalOpen && (
                <Modal onClose={() => {
                    setIsModalOpen(false); 
                }}>
                    <NoteForm onClose={(note: Note) => {
                        setIsModalOpen(false); 
                        createMutation.mutate(
                            note);  
                        console.log(searchNote);
                        
                    }}/>
        </Modal>
      )}
        </header>
        {isLoading && <div>Loarding...</div>}
        {isError && <div>alert("Error!");
        </div>}
        {data && <NoteList notes={data} onDelete={handleDelete} onSelect={(note)=>setSearchNote(note)} />}
    </div>)
}