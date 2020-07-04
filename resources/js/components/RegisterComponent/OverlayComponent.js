import React from "react";

export default class OverlayComponent extends React.Component {
    render() {
        return(
            <div class="overlay_container">
            <div class="overlay">
              <div class="overlay_panel overlay_left">
                <h1>Login for users</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo impedit delectus rerum?</p>
                <button class="ghost" id="signIn">Login</button>
              </div>
              <div class="overlay_panel overlay_right">
                <h1>Login for organisation</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa adipisci fugit quam?</p>
                <button class="ghost" id="signUp">Login</button>
              </div>
            </div>
          </div>
        )
    }
}