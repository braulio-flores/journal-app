import React from "react";
import { useSelector } from "react-redux";
import NoteScreen from "../notes/NoteScreen";
import Sidebar from "../sidebar/Sidebar";
import NoJornalSelected from "./NoJornalSelected";
// import NoJornalSelected from "./NoJornalSelected";

const JournalScreen = () => {

  const { active } = useSelector(state=>state.notes);

  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>
        {/* <NoJornalSelected /> */}
        {/* EL COMPONENTE DE ARRIBA SE MUESTRA CUANDO NO TIENE NADA SELECCIONADO
        PERO CUANDO HAYA FUNCIONALIDAD */}
        

        {
          !active 
            ? <NoJornalSelected />
            : <NoteScreen />
        }



      </main>
    </div>
  );
};

export default JournalScreen;
