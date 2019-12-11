
export const login = (email,password)=>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfbvfp6THi50AIoXRLU3MrHzLSy0vkc8E',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true
            })
          }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          const resData = await response.json();
          console.log(resData)
          dispatch({ type: "login", email:resData.email});
        };
    }


export const signup = (email,password)=>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfbvfp6THi50AIoXRLU3MrHzLSy0vkc8E',
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true
            })
          }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
          }
      
          const resData = await response.json();
          
          dispatch({ type: "signup",email:email});
        };
}