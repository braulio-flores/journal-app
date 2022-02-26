import React from "react";
import JournalEntry from "./JournalEntry";
import { useSelector } from "react-redux";

export const JournalEntries = () => {
  // const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const notes = useSelector((state) => state.notes.notes);
  // console.log(notes);

  return (
    <div className="journal__entries">
      {notes.map((note) => {
        return <JournalEntry key={note.id} {...note} />;
      })}
    </div>
  );
};
