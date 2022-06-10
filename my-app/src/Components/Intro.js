export default function Intro(props){

    return(
        <div className="intro">
            <h1>Valdeks daily quiz</h1>
            <img src="Valdek_web.gif"></img>
            <h2>Daily quiz to keep Valdeks  brain in shape</h2>
            <button onClick={props.startGameOnClick} className="startQuizButton">Start quiz</button>
        </div>
    )
}