import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {


  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const { valuesForm, handleInputChange, reset } = useForm(note);

  const { title, body } = valuesForm;

  const activeId = useRef(note.id)

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);  
      activeId.current = note.id;
    }      
  }, [reset, note])

  useEffect(() => {
    dispatch(activeNote(activeId, {...valuesForm}));
  }, [valuesForm, dispatch])

  const handleDelete = () =>{
    dispatch(startDelete());
  }  
  

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="notes__input"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          cols="30"
          rows="10"
          placeholder="What note?"
          className="notes__text-area"
          value={body}
          onChange={handleInputChange}
        ></textarea>
      </div>
      {note.url && (
        <div className="notes__images">
          <img
            src={ note.url }
            alt="Note Iustration"
          />
        </div>
      )}


      <button className="btn btn-danger " onClick={ handleDelete } >
        Delete
      </button>

    </div>
  );
};

export default NoteScreen;
