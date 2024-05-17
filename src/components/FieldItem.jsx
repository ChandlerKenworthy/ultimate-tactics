
const typeToName = {
    1: 'Offence',
    2: 'Defence',
    3: 'Disc',
    4: 'Line',
    5: 'Arrow'
}

function FieldItem({type, pos}) {
    return (
        <div style={{background: 'blue', position: 'absolute', zIndex: 100, left: pos.x, top: pos.y}}>
            <p>{typeToName[type]}</p>
        </div>
    )
}

export default FieldItem;