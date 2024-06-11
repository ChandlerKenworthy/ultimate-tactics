import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, rectIntersection, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { toPng } from 'html-to-image';
import { red, blue, grey } from '@mui/material/colors';
import MenuBar from './components/MenuBar';
import DroppableField from './components/DroppableField';
import BottomMenu from './components/BottomMenu';
import ObjectMenu from './components/ObjectMenu';

const defaultColor = {
  1: red[600],
  2: blue[500],
  3: grey[100],
  4: '#000000',
};

function App() {
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [selected, setSelected] = useState(null);
  const droppableFieldRef = useRef(null);

  const handleUndo = () => {
    console.log("implement undo")
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
        return {
          ...item,
          zIndex: item.zIndex + indexChange
        };
      } else {
        return item;
      }
    }));
    setLines(lines.map(line => {
      if(line.id === selected) {
        return {
          ...line,
          zIndex: line.zIndex + indexChange
        };
      } else {
        return line;
      }
    }));
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if(!over || over.id !== 'field')
      return;

    const posX = active.rect.current.translated.left - over.rect.rect.left;
    const posY = active.rect.current.translated.top - over.rect.rect.top;

    // If the item being dragged is already on the field (id in items/lines), don't do any of this
    const isItemFound = items.find((item) => item.id === active.id);
    const isLineFound = lines.find((line) => line.id === active.id);
    const isLeftHandle = lines.find((line) => line.handleLID === active.id);
    const isRightHandle = lines.find((line) => line.handleRID === active.id);

    if(isItemFound) {
      const modifiedItem = {
        ...isItemFound,
        position: {x: posX, y: posY}
      };

      setItems(currItems => {
        return currItems.map((item) =>
          item.id === active.id ? modifiedItem : item
        );
      });
    } else if(isLineFound) {
      // Do something

      console.log("Drag the line")


    } else if(isLeftHandle) {
      const modifiedLine = {
        ...isLeftHandle,
        posHandleL: {x: posX, y: posY}
      };

      setLines(currLines => {
        return currLines.map((line) =>
          line.handleLID === active.id ? modifiedLine : line
        );
      });
    } else if(isRightHandle) {
      const modifiedLine = {
        ...isRightHandle,
        posHandleR: {x: posX, y: posY}
      };

      setLines(currLines => {
        return currLines.map((line) =>
          line.handleRID === active.id ? modifiedLine : line
        );
      });
    } else {
      if(over && over.id === 'field') { // Dropped inside the field
        const thisId = uuidv4();
        if(active.id === 1 || active.id === 2 || active.id === 3) {
          setItems((currItems) => [
            ...currItems,
            {
              id: thisId,
              type: active.id,
              position: {x: posX, y: posY},
              zIndex: 100,
              color: defaultColor[active.id]
            },
          ]);
        } else { // Dragged a line onto the pitch
          // Line is a composite object built of handle and an actual line between them
          setLines((currLines) => [
            ...currLines,
            {
              id: thisId,
              type: active.id,
              posHandleL: {x: posX - 25, y: posY - 25}, // Centre of initial left handle
              posHandleR: {x: posX + 25, y: posY + 25}, // Centre of initial right handle
              handleLID: uuidv4(),
              handleRID: uuidv4(),
              zIndex: 100,
              color: defaultColor[active.id]
            }
          ]);
        }
        // Set the line we just dragged onto the pitch as the active item (to display handles)
        setSelected(thisId);
      }
    }
  };

  const updateSelectedHandler = (newItem) => {
    if(newItem.type < 4) {
      setItems(currItems => currItems.map(
        item => {
          if(item.id === newItem.id) {
            return newItem;
          } else {
            return item;
          }
        }
      ));
    } else {
      setLines(currLines => currLines.map(
        line => {
          if(line.id === newItem.id) {
            return newItem;
          } else {
            return line;
          }
        }
      ));
    }
  };

  const GetSelectedItem = () => {
    if(!selected)
      return null;

    const selItem = items.find(item => item.id === selected);
    if(selItem)
      return selItem;

    return lines.find(line => line.id === selected);
  };

  const deleteElementHandler = () => {
    if(!selected)
        return;
    setItems(currItems => currItems.filter(
      item => {
        return item.id !== selected
      }
    ));
    setLines(currLines => currLines.filter(
      line => {
        return line.id !== selected
      }
    ));
    setSelected(null);
  }

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
        <div 
          ref={droppableFieldRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
          }}  
        >
          <DroppableField 
            fieldItems={items} 
            lineItems={lines} 
            selected={selected} 
            setSelected={setSelected}
          />
          <ObjectMenu 
            selectedId={selected}
            selectedItem={GetSelectedItem()}
            updateSelectedItem={updateSelectedHandler}
            deleteElementHandler={deleteElementHandler}
            updateItemZIndex={updateItemZIndex} 
          />
        </div>
        <BottomMenu 
          selected={selected} 
          setItems={setItems} 
          setLines={setLines}
          handleExport={handleExport}
          handleUndo={handleUndo}
          historyLength={history.length}
        />
      </DndContext>
      <p>Version 1.0 (Source <a href="https://github.com/ChandlerKenworthy/ultimate-tactics" target="_blank">GitHub</a>) | Copyright &copy; (2024) Chandler Kenworthy</p>
    </div>
  )
}

export default App
