import "../style/LoginForm.css";


const HButton = (props) => {
    
    return (
        <button onClick={props.nav} className="button"
        style={{
            padding: 10,
            margin: 5,
            background: `${props.color}`
        }}>
            {props.text}
        </button>
    )
}

export default HButton;