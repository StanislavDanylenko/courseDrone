var USER = {};

function saveUserLS(user) {
    localStorage.setItem('USER', JSON.stringify(user));
}

function loadUserLS() {
    USER = JSON.parse(localStorage.getItem('USER'));
}

function updateUserLS(obj) {
    USER.defaultPopulatedPoint = obj.defaultPopulatedPoint;
    USER.localization = obj.localization;
    saveUserLS(USER);
}