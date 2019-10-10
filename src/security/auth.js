export const isAuthenticated = () => {
    if (localStorage.getItem('token')) {
        console.log("ok")
        return true;
    }else{
        return false;
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
}