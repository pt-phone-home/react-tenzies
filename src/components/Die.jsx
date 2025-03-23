export default function Die(props) {

   
    return (
        <>
            <button 
            id={props.id}
            onClick={() => {props.toggleHeld(props.id)}}
            className={props.isHeld ? 'die held' : 'die'}>{props.value}</button>
        </>
    )
}