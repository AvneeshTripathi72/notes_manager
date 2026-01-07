import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this note.'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content for this note.'],
      maxlength: [5000, 'Content cannot be more than 5000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
