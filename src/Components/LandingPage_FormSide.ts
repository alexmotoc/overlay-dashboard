import React from "react";
import PageSwitcher from './PageSwitcher.tsx';
const Landing_FormSide: React.FC = () => {
    render() {
        return(
            <div className="App__Form">
                <PageSwitcher />

                <div className="FormTitle">
                    <a href='#' className='FormTitle__Link'>Sign In</a>
                     or
                    <a href='#' className="FormTitle__Link FormTitle__Link--Active">Sign Up</a>
                </div>

                <form className='FormFields'>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Full Name</label>
                        <input type='text' id='name' className="FormField__Input" placeholder="Enter your full name" name="name"/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">Email</label>
                        <input type='text' id='email' className="FormField__Input" placeholder="Enter your email address" name="email"/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type='text' id='password' className="FormField__Input" placeholder="Enter your password" name ="password"/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Full Name</label>
                        <input type='text' id='name' className="FormField__Input" placeholder="Enter your full name" name ="name"/>
                    </div>

                </form>
                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button>
                    <a href='#' className="FormField__Link"> I&#39;m already a member</a>
                </div>
            </div>
        );
    }
}

export default Landing_FormSide