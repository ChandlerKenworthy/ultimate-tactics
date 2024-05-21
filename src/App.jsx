import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { toPng } from 'html-to-image';
import MenuBar from './components/MenuBar';
import DroppableField from './components/DroppableField';
import BottomMenu from './components/BottomMenu';

function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState([]); // For undo/redo actions track all the users actions

  const droppableFieldRef = useRef(null);

  const handleUndo = () => {
    const histLength = history.length;
    if(histLength < 1) return; // Nothing left to undo

    const lastAction = history[histLength - 1];
    if(lastAction.wasAdding) { // last action was to add a new item to the field, remove it
      setItems(curr => {
        return curr.filter(item => item.id !== lastAction.id);
      })
    } else { // Moving an item on the field, put it back to its original position
      console.log(lastAction);
      setItems(curr => { // TODO: Doesn't work
        return curr.map(item => {
          if(item.id === lastAction.id) { 
            return {
              ...item,
              position: {x: lastAction.startX, y: lastAction.endX},
            }
          } else {
            return item;
          }
        });
      })
    }

    // TODO: Pop the last item from the history....no that way we can't redo...need an index to track
    setHistory(history.slice(0, -1));
  }

  const handleExport = () => {
    if (droppableFieldRef.current === null) {
      return;
    }
  
    toPng(droppableFieldRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'user-field-1.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        alert('Oops, something went wrong!', err);
      });
  };

  const updateItemZIndex = (indexChange) => {
    setItems(items.map(item => {
      if(item.id === selected) {
        console.log(item.zIndex, item.zIndex + indexChange);
        return {
          ...item,
          zIndex: item.zIndex + indexChange
        };
      } else {
        return item;
      }
    }));
  }

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

      setHistory(currHistory => {
        return [...currHistory, {
          startX: isFound.position.x,
          endX: posX,
          startY: isFound.position.y,
          endY: posY,
          wasAdding: false,
          id: modifiedItem.id,
        }];
      }); // Moved an item from somewhere to somewhere else

      setItems(currItems => {
        return currItems.map((item) =>
          item.id === active.id ? modifiedItem : item
        );
      });
    } else {
      if(over && over.id === 'field') { // Dropped inside the field
        const thisId = uuidv4();

        setHistory(currHistory => {
          return [...currHistory, {
            startX: posX,
            endX: posX,
            startY: posY,
            endY: posY,
            wasAdding: true,
            id: thisId,
          }];
        }); // Moved an item from somewhere to somewhere else

        setItems((currItems) => [
          ...currItems,
          {
            id: thisId,
            type: active.id,
            position: {x: posX, y: posY},
            zIndex: 100
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
        <div ref={droppableFieldRef}>
          <DroppableField fieldItems={items} selected={selected} setSelected={setSelected} />
        </div>
        <BottomMenu 
          selected={selected} 
          setItems={setItems} 
          updateItemZIndex={updateItemZIndex} 
          handleExport={handleExport}
          handleUndo={handleUndo}
          historyLength={history.length}
        />
      </DndContext>
      <p>Copyright &copy; (2024) - Chandler Kenworthy</p>
    </div>
  )
}

export default App
