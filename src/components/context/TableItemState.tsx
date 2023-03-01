import React, { createContext, PropsWithChildren, useState } from "react";
import { ITasks } from "../TableTasks";

interface ITableItemContext {
  tasks: ITasks[];
  addTasks: (tasks: ITasks) => void;
}

export const TableItemContext = createContext<ITableItemContext>({
  tasks: [],
  addTasks: (tasks: ITasks) => {},
} as ITableItemContext);

const TableItemState: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<ITasks[]>([]);

  const addTasks = (tasks: ITasks) => {
    setTasks((prevTasks) => {
      return [...prevTasks, tasks];
    });
  };

  const context = {
    tasks,
    addTasks,
  };

  return (
    <TableItemContext.Provider value={context}>
      {children}
    </TableItemContext.Provider>
  );
};

export default TableItemState;
