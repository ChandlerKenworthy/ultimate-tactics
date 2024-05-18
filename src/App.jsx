import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import MenuBar from './components/MenuBar';
import DroppableField from './components/DroppableField';
import BottomMenu from './components/BottomMenu';

function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if(!over || over.id !== 'field')
      return;

    const posX = active.rect.current.translated.left - over.rect.rect.left;
    const posY = active.rect.current.translated.top - over.rect.rect.top;

    // If the item being dragged is already on the field (id in items), don't do any of this
    const isFound = items.find((item) => item.id === active.id);
    if(isFound) {
      const modifiedItem = {
        ...isFound,
        position: {x: posX, y: posY}
      };

      setItems(currItems => {
        return currItems.map((item) =>
          item.id === active.id ? modifiedItem : item
        );
      });
    } else {
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
        <DroppableField fieldItems={items} selected={selected} setSelected={setSelected} />
        <BottomMenu setItems={setItems} />
      </DndContext>
    </div>
  )
}

export default App
