export const getToken = () => {

    const digitalflake = JSON.parse(localStorage.getItem("digitalFlake"));

    return digitalflake?.token;
}