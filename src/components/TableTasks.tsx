import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext } from "react";
import { TableItemContext } from "./context/TableItemState";

export interface ITasks {
  id: string;
  nameTask: string;
  typeTask: string;
  priority: string;
  date: string;
  comments: string;
}

const TableTasks: React.FC = () => {
  const { tasks } = useContext(TableItemContext);

  const formatDate = (data: string) => {
    const newDate = new Date(data);
    return new Intl.DateTimeFormat("en-US").format(newDate);
  };

  console.log(tasks);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
      <Table
        sx={{ minWidth: 650, border: 1, color: "violet" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "darkviolet" }} align="left">
              Your Tasks
            </TableCell>
            <TableCell sx={{ color: "darkviolet" }} align="left">
              Type of task
            </TableCell>
            <TableCell sx={{ color: "darkviolet" }} align="left">
              Priority
            </TableCell>
            <TableCell sx={{ color: "darkviolet" }} align="left">
              Date
            </TableCell>
            <TableCell sx={{ color: "darkviolet" }} align="left">
              Comments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => {
            return (
              <TableRow
                key={task.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  color: "violet",
                }}
              >
                <TableCell component="th" scope="row">
                  {task.nameTask}
                </TableCell>
                <TableCell>{task.typeTask}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{formatDate(task.date)}</TableCell>
                <TableCell>{task.comments}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableTasks;
