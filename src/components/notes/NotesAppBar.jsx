import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadImage } from "../../actions/notes";

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.notes.active);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileSelector = (e) => {
    const file = e.target.files[0];
    if ( file ) {
      dispatch(startUploadImage(file))
    }else{
      console.log('No file');
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 feb</span>

      <input
        type="file"
        name=""
        style={{ display: "none" }}
        onChange={handleFileSelector}
        id="fileSelector"
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
