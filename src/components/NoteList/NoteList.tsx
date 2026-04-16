import type {Note} from '../../types/note'
import css from './NoteList.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import toast from 'react-hot-toast';

interface NoteListProps{
  notes: Note[];
  
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
   const deleteMutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['note'] });
      toast.success('Successfully delete!');
  },
   });
    return (<ul className={css.list}>
	{notes.map((note) => <li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{ note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button onClick={() => {
        deleteMutation.mutate(note.id);
       
      }} className={css.button}>Delete</button>
    </div>
  </li>) 
}
</ul>
)
}
