import * as React from 'react';

let logOutTime : ReturnType<typeof setTimeout>;

interface contextProps{
  token : string | undefined | null,
  isLogin : boolean,
  login : (arg : string) => void,
  logout : () => void
}

export const AuthenticationContext = React.createContext<contextProps>({
  token : '',
  isLogin : false,
  login : (arg : string) => {},
  logout : () => {}
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    return {
      token: storedToken,
    };
  };
interface autheChildren{
  children : any
}
export const AuthenticationContextProvider = (props : autheChildren) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
      initialToken = tokenData.token;
    }
    const [token,setToken] = React.useState(initialToken);
    const userIsLoggedIn = !(!token);
    const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
      }
    const loginHandler = (token : string) => {
        setToken(token);
        localStorage.setItem('token', token);
      };

    const contextValue : contextProps = {
        token: token,
        isLogin: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
       <AuthenticationContext.Provider value={contextValue}>
         {props.children}
       </AuthenticationContext.Provider>
      );
}