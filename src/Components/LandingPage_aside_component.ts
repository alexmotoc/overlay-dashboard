import React from "react";
import Landing_FormSide from'./LandingPage_FormSide.ts';

class Landing_Aside extends React.Component{
    render() {
        return (
            <div className="App__Aside">
                <div className="HomeWelcomeWrapper">
                    <div className="WelcomeTitle">
                        <h1>Creek</h1>
                    </div>
                    <div className="WelcomeSubtitle">
                        <p>Providing a quality, flowing streaming experience for all</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing_Aside