export default function Die(props){
    const background = props.isHeld ? "#59E391" : "white"
    const style={
        backgroundColor: background
    }
    return(
        <div>
            <div className="container--item" style={style} onClick={() => props.holdDice(props.id)}>
                <img src={`.//images/${props.value}.jpeg`} width="100%" height="100%"></img>
            </div>
            {/* src = {`./images/${props.isFilled ? "star-filled.png" : "star-empty.png"}`} */}
        </div>
        
    )
    
}