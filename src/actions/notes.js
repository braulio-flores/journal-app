import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () =>{
    return async (dispatch, getState) => {
        const { uuid } = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uuid}/journal/notes`).add(newNote)
        
        // console.log(doc);      
        
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNewEntry(doc.id, newNote));

        

    }
}

export const activeNote = ( id, note ) =>{
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    };
}

export const addNewEntry = ( id, note ) =>{
    return {
        type: types.notesAddNew,
        payload: {
            id,
            ...note
        }
    };
}

export const startSetNotes = ( id ) =>{
    return async (dispatch)=>{
        const allNotesOfUser = await loadNotes(id);
        dispatch(setNotes(allNotesOfUser))
    }
}


export const setNotes = ( notes ) =>{
    return {
        type: types.notesLoad,
        payload: notes
    };
}

// LAS SIGUIENTES DE ABAJO SON PARA CUANDO SE PRESIONA EL BOTON SAVE

export const startSaveNote = ( note ) =>{
    return async (dispatch, getState)=>{
        const { uuid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id; //BORRAR ELEMENTO DE UN OBJETO

        await db.doc(`${uuid}/journal/notes/${note.id}`).update( noteToFirestore );


        dispatch(refreshNote(note.id, noteToFirestore))

        Swal.fire({
            icon: 'success',
            title: 'Changes Saved',
            text: 'The note has been saved successfully',
          })
    }
}


export const refreshNote = ( id, note ) =>{
    return {
        type: types.notesUpdate,
        payload: {
            id, 
            note: {
                id,
                ...note
            }
        }
    };
}


export const startUploadImage = ( file ) =>{
    return async (dispatch, getState) => {
        const activeNote = getState().notes.active;


        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowEscapeKey: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            
            onBeforeOpen: () =>{
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch( startSaveNote(activeNote) )

        Swal.close();
    };
}

// LAS SIGUIENTES ACCIONES SE ENCARGAN DE GESTIONAR LA LOGISTICA DEL DELETE
export const startDelete = () =>{
    return async (dispatch, getState) => {
        const {id} = getState().notes.active;
        const {uuid} = getState().auth;

        try {
            await db.doc(`${uuid}/journal/notes/${id}`).delete();

            Swal.fire({
                icon: 'error',
                title: 'Deleted',
                text:'The note has been deleted successfully'
            })

            dispatch( deleteNote(id) )

        } catch (error) {
            throw error;
        }

    };
}

export const deleteNote = (id) =>{
    return {
        type: types.notesDelete,
        payload: id
    }
}

// LA SIGUIENTE ACCION LIMPIA LAS NOTAS DEL ESTADO CUADO SE HACE LOGOUT
export const clearNotesLogOut = () =>{
    return {
        type: types.notesLogOutCleaning,
    }
}