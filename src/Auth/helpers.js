import cookie from 'js-cookie';

//Set in Cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

//Remove from Cookie
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

//Get info from Cookie
export const getCookie = (key) => {
    if(window !== 'undefined') {
        return cookie.get(key);
    }
};

//Set in Local Storage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

//Remove from Local Storage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

//Authenticate User By Passing Data To Cookie And LocalStorage During Signin
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

//Access User Info From Local Storage
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

export const updateUser = (response, next) => {
    console.log('Update User In Local Storage');
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};