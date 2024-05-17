import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { TextField, Button } from '@mui/material';
import './App.css'
import { useState } from 'react'
import Column from './components/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DragItem from './components/DragItem';

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Finish writing my thesis"},
    {id: 2, title: "Make my frisbee app"}, 
    {id: 3, title: "Phone Evie"}
  ]);

  const [input, setInput] = useState("");

  const addTask = (title) => {
    setTasks([...tasks, {id: tasks.length + 1, title: title}]);
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;
    if(active.id === over.id) {
      return;
    }

    const getTaskPos = (id) => tasks.findIndex(task => task.id === id);

    setTasks(curr => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const addTaskHandler = () => {
    if(!input) {
      return;
    }
    addTask(input);
    setInput("");
  }

  return (
    <div>
      <h1>Task List</h1>
      <div
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={input} onChange={(event) => setInput(event.target.value)} />
        <Button variant="contained" onClick={addTaskHandler}>Add Task</Button>
      </div>
      <DndContext 
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <Column tasks={tasks} />
      </DndContext>
      <hr />
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <DragItem id={1} />
      </DndContext>
    </div>
  )
}

export default App
