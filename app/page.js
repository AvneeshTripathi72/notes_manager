'use client';

import { useState, useEffect, useCallback } from 'react';
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/notes');
      const data = await res.json();
      
      if (data.success) {
        setNotes(data.data);
      } else {
        setError(data.error || 'Failed to fetch notes');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching notes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSubmit = async (noteData) => {
    try {
      setError(null);
      
      if (editingNote) {
        const res = await fetch(`/api/notes/${editingNote._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
        const data = await res.json();
        
        if (data.success) {
          setNotes(notes.map((n) => (n._id === editingNote._id ? data.data : n)));
          setEditingNote(null);
        } else {
          setError(data.error || 'Failed to update note');
        }
      } else {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
        const data = await res.json();
        
        if (data.success) {
          setNotes([data.data, ...notes]);
        } else {
          setError(data.error || 'Failed to create note');
        }
      }
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      setError(null);
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.success) {
        setNotes(notes.filter((n) => n._id !== id));
        if (editingNote?._id === id) {
          setEditingNote(null);
        }
      } else {
        setError(data.error || 'Failed to delete note');
      }
    } catch (err) {
      setError('Failed to delete note');
      console.error('Error deleting note:', err);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Notes App
              </h1>
              <p className="text-xs text-gray-500">Capture your thoughts</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <NoteForm
          onSubmit={handleSubmit}
          editingNote={editingNote}
          onCancelEdit={handleCancelEdit}
        />

        <NoteList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <footer className="py-6 text-center text-sm text-gray-400">
        <p>Built with Next.js, MongoDB & Tailwind CSS</p>
      </footer>
    </main>
  );
}
