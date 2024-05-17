import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function DragItem({id}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id
    });

    const style = {
        transform: CSS.Translate.toString(transform)
    };

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <h3>Drag me</h3>
        </div>
    )
}

export default DragItem;