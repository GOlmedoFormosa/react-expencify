// Higher Order Component (HOC) - es un component que renderiza otro component
// el primero es el HOC y el segundo un componente regular.
// El objetivo es: 
// -Reutilizar codigo.
// -Render hijacking
// -Prop manipulation
// -Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props} />
    </div>
  )
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isAuthenticated  ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please Login to view the info.</p>
      )}
    </div>
  );
}
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details"/>, document.getElementById('app'));