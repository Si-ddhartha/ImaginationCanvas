import React from "react";
import './Loading.css';


function Loading(props){
    return (
        <div className="loader">
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
export default Loading