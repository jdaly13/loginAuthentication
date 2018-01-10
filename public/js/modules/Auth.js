const Auth = {
    
      authenticateUser(token) {
        if (token) {
          localStorage.setItem('token', token);
          return true
        }
        return false

        
      },
    

      isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
      },
    

      deauthenticateUser() {
        localStorage.removeItem('token');
      },
    
    
      getToken() {
        return localStorage.getItem('token');
      }
    
    }
    
    export default Auth;
    