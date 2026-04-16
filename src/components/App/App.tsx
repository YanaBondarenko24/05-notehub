import { useEffect, useState } from 'react';
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
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
    const queryClient = useQueryClient();

   const deleteMutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success('Successfully delete!');
  },
   });
       const createMutation = useMutation({
  mutationFn: createNote,

  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success('Successfully created!');
      setIsModalOpen(false);
  },
});
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('')
    const {data,isError,isLoading,isSuccess} = useQuery({
        queryKey: ['note', search, currentPage],
        queryFn: () => fetchNotes(search,currentPage),
        placeholderData: keepPreviousData,
        
    })
      useEffect(() => {
    if (isSuccess && data?.notes.length === 0) {
      toast("No notes found for your request.",
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
    }
  }, [data, isSuccess]);
    const totalPages = data?.totalPages ?? 0;
    
    const handleSearch = useDebouncedCallback(setSearch, 300);

    const [searchNote, setSearchNote] = useState<Note | null>(null)
    
    const handleDelete = ( id: string) => {
        deleteMutation.mutate(id);
    }
 
    return (<div className={css.app}>
        
        <header className={css.toolbar}>
            <SearchBox text={search} onSearch={handleSearch} />
            <Toaster/>
         {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>}
         <button onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>
         {isModalOpen && (
        <Modal onClose={() => {
            setIsModalOpen(false); 
                }}>
            <NoteForm onSubmit={(note: Note) => {
                        createMutation.mutate(note); 
                        
                    }}  onCancel={() => setIsModalOpen(false) }/>
        </Modal>
      )}
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage/>}
        {data?.notes && <NoteList notes={data.notes} onDelete={handleDelete} onSelect={(note) => setSearchNote(note)} />}  
        
    </div>)
}