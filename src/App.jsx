import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import MenuBar from './components/MenuBar';
import DroppableField from './components/DroppableField';

function App() {
  const [items, setItems] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const height = active.rect.current.translated.height;
    const posX = active.rect.current.translated.left - over.rect.rect.left;
    const posY = active.rect.current.translated.top - over.rect.rect.top - (height / 2);

    if(over && over.id === 'field') { // Dropped inside the field
      setItems((currItems) => [
        ...currItems,
        {
          id: uuidv4(),
          type: active.id,
          position: {x: posX, y: posY}
        },
      ]);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <div>
      <DndContext 
        collisionDetection={rectIntersection}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <MenuBar />
        <DroppableField fieldItems={items} />
      </DndContext>
    </div>
  )
}

export default App
