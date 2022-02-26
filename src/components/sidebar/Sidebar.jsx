import React from "react";
import { JournalEntries } from "../journal/JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { clearNotesLogOut, startNewNote } from "../../actions/notes";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector(state=>state.auth);
  let firstName = '';
  for (const leter in name) {
    firstName += name[leter];
  }
  firstName = firstName.split(' ')[0];

  const handleSubmitSingOut = (e) => {
    e.preventDefault();
    dispatch(clearNotesLogOut());
    dispatch(startLogout());
  };

  const handleNewEntry = () =>{
    dispatch(startNewNote());
  }
  // const firstName = name.split(' ')[0];

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-10">
          <i className="far fa-moon"></i>
          <span> { firstName }</span>
        </h3>
        <button className="btn" onClick={handleSubmitSingOut}>
          LogOut
        </button>
      </div>
      <div className="journal__new-entry" onClick={ handleNewEntry }>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-10">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
