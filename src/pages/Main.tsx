import React, { useContext, useState } from "react";
import AddButton from "../components/AddButton";
import TableItemState, {
  TableItemContext,
} from "../components/context/TableItemState";
import ModalWindow from "../components/ModalWindow";
import Navbar from "../components/Navbar";
import TableTasks from "../components/TableTasks";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <TableItemState>
      <Navbar />
      <AddButton openModal={handleOpenModal} />
      <ModalWindow openModal={isOpen} closeModal={closeModal} />
      <TableTasks />
    </TableItemState>
  );
};

export default Main;
