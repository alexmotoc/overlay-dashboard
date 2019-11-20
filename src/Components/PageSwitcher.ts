import React from "react";

class PageSwitcher extends React.Component{
    render(){
        return (
            <div className="PageSwitcher">
                <a href="#" className="PageSwitcher__Item"> Sign in</a>
                <a href="#" className="PageSwitcher__Item PageSwitcher__Item--Active"> Sign Up </a>
            </div>
        );
    }
}

export default PageSwitcher