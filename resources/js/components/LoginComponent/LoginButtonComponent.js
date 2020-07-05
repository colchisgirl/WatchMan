import React, { Component } from 'react';

export default class LoginButtonComponent extends React.Component {
    render() {
        const isLoggedIn = this.state.isLoggedIn;

        console.log('here');
      
        return (
          <div>
            {
              isLoggedIn 
                ? (
                    <div className="authentication">
                      <button>Logout</button>
                    </div>
                  )
                : ( 
                    <a href='http://watchman.test:8081/login'>
                      <button>Login</button>
                     
                    </a>
                  )
            }
          </div>
        );
      }
}