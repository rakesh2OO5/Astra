import "./Sidebar.css"; 
export default function Sidebar(){
    return(
    <section className="sidebar">
        <button>
            <img src="src/assets/logo.png" alt="logo" className="logo" />
            <span>
            <i className="fa-solid fa-pen-to-square "></i>
            </span>
        </button>

        <ul className="history">
            <li>history1</li>
            <li>history2</li>
            <li>history3</li>
        </ul>

        <div className="sign">
            <p>
                Developed by Rakesh D 
            </p>
        </div>
    </section>
    )
}