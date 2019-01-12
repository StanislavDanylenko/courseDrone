var UA;
var EN;
var locale;

/*function loadJSONs() {
    $.getJSON('json/en.json', function (json) {
        EN = json;
    });
    $.getJSON('json/ua.json', function (json) {
        UA = json;
    });
}*/

function checkUSER() {
    if (USER != null && USER != undefined) {
        switch (USER.localization)  {
            case "UKRAINIAN":
                $('#localizationSwitcher').val("UA");
                setL10n(UA);
                break;
            case "ENGLISH":
                $('#localizationSwitcher').val("EN");
                setL10n(EN);
                break;
            default: setL10n(EN);
        }
    } else {
        setL10n(EN);
    }
}

function setL10n(loc) {
    locale = loc;
}

function setTranslateIndex() {
    $('#contactsLink')._t("contacts");
    $('#footerContacts')._t("contacts");
    $('#loginLink')._t("login");
    $('#footerLocation')._t("location");
    $('#indexRegistrationButton')._t("registerNow");
    $('#mainDescription')._t("mainDescription");
    $('#block-1l')._t('block-1l');
    $('#description-block-1l')._t('description-block-1l');
    $('#block-1r')._t('block-1r');
    $('#description-block-1r')._t('description-block-1r');
    $('#block-2l')._t('block-2l');
    $('#description-block-2l')._t('description-block-2l');
    $('#block-2r')._t('block-2r');
    $('#description-block-2r')._t('description-block-2r');
    $('#block-3l')._t('block-3l');
    $('#description-block-3l')._t('description-block-3l');
    $('#block-3r')._t('block-3r');
    $('#description-block-3r')._t('description-block-3r');
    $('#majorFeatures')._t('majorFeatures');
    $('#list1')._t('list1');
    $('#list2')._t('list2');
    $('#list3')._t('list3');
    $('#list4')._t('list4');
    $('#list5')._t('list5');
    $('#list6')._t('list6');
    $('#list7')._t('list7');
    $('#block-4l')._t('block-4l');
    $('#description-block-4l')._t('description-block-4l');
    $('#block-4r')._t('block-4r');
    $('#description-block-4r')._t('description-block-4r');
    $('#block-5l')._t('block-5l');
    $('#description-block-5l')._t('description-block-5l');
    $('#block-5r')._t('block-5r');
    $('#description-block-5r')._t('description-block-5r');
}

function changeLocaleIndex() {
    if ($('#localizationSwitcher').val() === "EN") {
        USER.localization = "ENGLISH";
        setL10n(EN);
    } else {
        USER.localization = "UKRAINIAN";
        setL10n(UA);
    }
    saveUserLS(USER);
    $.i18n.unload();
    $.i18n.load(locale);
    setTranslateIndex();
}

///////////////

function setTranslateRegistration() {
    $(".userFirstName")._t("userFirstName");
    $(".userLastName")._t("userLastName");
    $(".userPatronymic")._t("userPatronymic");
    $(".localization")._t("localization");
    $(".userType")._t("userType");
    $(".country")._t("country");
    $(".region")._t("region");
    $(".point")._t("point");
    $(".password")._t("password");

    $(".back")._t("back");
    $(".registration")._t("registration");
    $(".registerMe")._t("registerMe");
}


//////////////////////

function setTranslateUser() {
    $(".profile")._t("profile");
    $(".logout")._t("logout");
    $("#addOrder")._t("addOrder");
    $("#getUserAllOrders")._t("getUserAllOrders");
    $("#getUserHistory")._t("getUserHistory");
    $("#getUserCanceled")._t("getUserCanceled");
    $("#userGreeting")._t("userGreeting");
}

function setTranslateLocation() {
    $(".country")._t("country");
    $(".region")._t("region");
    $(".point")._t("point");
}

function setTranslateProposalUser() {
    $("#selectLocation")._t("selectLocation");
    $(".latitude")._t("latitude");
    $(".longitude")._t("longitude");
}

function setTranslateProposalList() {
    $(".point")._t("point");
    $(".proposal")._t("proposal");
    $(".price")._t("price");
    $(".createDate")._t("createDate");
    $(".updateDate")._t("updateDate");
    $(".status")._t("status");
    $(".showReport")._t("showReport");
    $("#updateUserOrderStatusButton")._t("updateStatus");
}

function setTranslateReport() {
    $("#reportHeader")._t("reportHeader");
    $("#reportTHumidity")._t("reportTHumidity");
    $("#reportTRadiation")._t("reportTRadiation");
    $("#reportTPressure")._t("reportTPressure");
    $("#reportTAirPollution")._t("reportTAirPollution");
    $("#reportTTemperature")._t("reportTTemperature");
    $("#reportComment")._t("reportComment");
}

function setTranslateProfile() {
    $("#changePassword")._t("changePassword");
    $("#userOldPasswordLabel")._t("userOldPasswordLabel");
    $("#userNewPasswordLabel")._t("userNewPasswordLabel");
    $("#userNewPasswordRepeatLabel")._t("userNewPasswordRepeatLabel");
    $("#submitUpdatePassword")._t("update");
    $("#closeModal")._t("closeModal");

    $("#updatePassword")._t("changePassword");
    $("#updatePasswordd")._t("changePassword");
    $("#userOrdinalFirstNameLabel")._t("userFirstName");
    $("#userOrdinalLastNameLabel")._t("userLastName");
    $("#userOrdinalPatronymicLabel")._t("userPatronymic");
    $("#userOrdinalLocalizationLabel")._t("localization");
    $("#userOrdinalSubmitButton")._t("update");
}


function changeLocaleUser(user) {
    if (user.localization === "ENGLISH") {
        USER.localization = "ENGLISH";
        setL10n(EN);
    } else {
        USER.localization = "UKRAINIAN";
        setL10n(UA);
    }
    saveUserLS(USER);
    $.i18n.unload();
    $.i18n.load(locale);
    setTranslateUser();
    setTranslateAdmin();
}

/////////////////////////////

function setTranslateAdmin() {
    $(".profile")._t("profile");
    $(".logout")._t("logout");
    $("#getCountries")._t("country");
    $("#getRegions")._t("region");
    $("#getPopulatedPoints")._t("point");
    $("#getProposals")._t("proposal");
    $("#getDrones")._t("drone");
    $("#getUsers")._t("user");
    $("#getOrders")._t("order");
    $("#getUserProfile")._t("profile");
    $("#getLocalProposals")._t("localProposal");
    $("#adminGreeting")._t("adminGreeting");
}

function setTranslateCountry() {
    $(".country")._t("country");
    $(".title")._t("title");
    translateOperations();
}

function setTranslateCountryEntity() {
    $(".title")._t("title");
    $(".save")._t("save");
}


function setTranslateRegion() {
    $(".region")._t("region");
    $(".title")._t("title");
    translateOperations();
}

function setTranslateRegionEntity() {
    $(".title")._t("title");
    $(".country")._t("country");
    $(".save")._t("save");
}


function setTranslatePoint() {
    $(".point")._t("point");
    $(".title")._t("title");
    translateOperations();
}

function setTranslatePointEntity() {
    $(".title")._t("title");
    $(".region")._t("region");
    $(".save")._t("save");
}


function setTranslateProposal() {
    $(".proposal")._t("proposal");
    $(".description")._t("description");
    $(".sensors")._t("sensors");
    $(".title")._t("title");
    translateOperations();
}

function setTranslateProposalEntity() {
    $(".title")._t("title");
    $(".description")._t("description");
    $(".save")._t("save");
    setTranslateSensorType();
}


function setTranslateDrone() {
    $(".drone")._t("drone");
    $(".title")._t("title");
    $(".sensors")._t("sensors");
    $(".point")._t("point");
    $(".uuid")._t("uuid");
    $(".batteryLevel")._t("batteryLevel");
    $(".currentLocation")._t("currentLocation");
    $(".availability")._t("availability");
    translateOperations();
}

function setTranslateDroneEntity() {
    $(".title")._t("title");
    $(".batteryLevel")._t("batteryLevel");
    $(".latitude")._t("latitude");
    $(".longitude")._t("longitude");
    $(".save")._t("save");
    $(".droneAvailable")._t("droneAvailable");
    $(".droneUnavailable")._t("droneUnavailable");
    $(".sensorType")._t("sensorType");
    $(".sensors")._t("sensors");
    $(".addSensor")._t("addSensor");
    setTranslateSensorType();
}

function setTranslateUserAdmin() {
    $(".user")._t("user");
    $(".roles")._t("roles");
    $(".isActive")._t("isActive");
    $(".defaultPP")._t("defaultPP");
    $(".regDate")._t("regDate");
    $(".changeDate")._t("changeDate");
    $(".userFirstName")._t("userFirstName");
    $(".userLastName")._t("userLastName");
    $(".userPatronymic")._t("userPatronymic");
    $(".localization")._t("localization");
    $(".userType")._t("userType");
    translateOperations();
}

function setTranslateUserAdminEntity() {
    $(".isActive")._t("isActive");
    $(".userFirstName")._t("userFirstName");
    $(".userLastName")._t("userLastName");
    $(".userPatronymic")._t("userPatronymic");
    $(".localization")._t("localization");
    $(".userType")._t("userType");
    $(".password")._t("password");
    $(".save")._t("save");
    $(".userAvailable")._t("userAvailable");
    $(".userUnavailable")._t("userUnavailable");
}


function setTranslateLocalProposal() {
    $(".isActive")._t("isActive");
    $(".price")._t("price");
    $(".proposalID")._t("proposalID");
    $(".pointID")._t("pointID");
    $(".localProposal")._t("localProposal");
    $(".changeStatus")._t("changeStatus");
    translateOperations();
}

function setTranslateLocalProposalEntity() {
    $(".price")._t("price");
    $(".proposal")._t("proposal");
    $(".save")._t("save");
    $(".localProposalAvailable")._t("localProposalAvailable");
    $(".localProposalUnavailable")._t("localProposalUnavailable");
}


function setTranslateLocalProposalUser() {
    $(".price")._t("price");
    $(".status")._t("status");
    $(".uuid")._t("uuid");
    $(".droneID")._t("droneID");
    $(".userEmailID")._t("userEmailID");
    $(".tCoord")._t("tCoord");
    $(".order")._t("order");

    translateOperations();
}


function setTranslateSensorType() {
    $(".HUMIDITY")._t("HUMIDITY");
    $(".RADIATION")._t("RADIATION");
    $(".PRESSURE")._t("PRESSURE");
    $(".AIR_POLLUTION")._t("AIR_POLLUTION");
    $(".CAMERA")._t("CAMERA");
    $(".TEMPERATURE")._t("TEMPERATURE");
}

function translateOperations() {
    $(".add")._t("add");
    $(".edit")._t("edit");
    $(".delete")._t("delete");
}

function loadJSONs() {
    UA = {
        "contacts": "Контакти",
        "location": "Україна, Харків, вулиця XXX",
        "registerNow": "Зареєструватися",
        "mainDescription": "Нова, безальтернативна система для миттєвої реакції на надзвичайні ситуації. Швидкість, надійність, точність - наші основні якості.",
        "block-1l": "Екологія",
        "description-block-1l": "Екологічні катастрофи, стихійні лиха, пожежі, флора, фауна.",
        "block-1r": "Сільське господарство",
        "description-block-1r": "Assistance to farmers, site research, state supervision.",
        "block-2l": "Видобувнича промисловість",
        "description-block-2l": "Допомога фермерам, дослідження ділянок",
        "block-2r": "Нафто- газовидобування",
        "description-block-2r": "Контроль у складних технологічних процесах.",
        "block-3l": "Надзвичайні події",
        "description-block-3l": "Швидке реагування на всі надзвичайні ситуації.",
        "block-3r": "Фото- та відеозйомка",
        "description-block-3r": "Фото- та відеозйомка будь-яких подій",
        "majorFeatures": "Головні функції",
        "list1": "Публікація доступних послуг компанією.",
        "list2": "Реєстрація користувачів та замовлення необхідних для них послуг.",
        "list3": "Виклик дронів на місце надзвичайної події та швидке отримання інформації від них.",
        "list4": "Відсліджування місцезнаходження дронів та перегляд їх поточного стану.",
        "list5": "Передача інформації в реальному часі для пристроїв з постійним моніторингом стану об’єктів.",
        "list6": "Захищеність та безпечність для здоров’я розумних пристроїв.",
        "list7": "Повна конфіденційність та безпека інформації, що зберігається на серверах.",
        "block-4l": "Гнучкі рішення",
        "description-block-4l": "Ми надаємо не лише галузеві рішення, але й комплексні послуги для вирішення проблем наших клієнтів.",
        "block-4r": "Якість",
        "description-block-4r": "Усі послуги та рішення надаються виключно за допомогою високоякісних компонентів та матеріалів.",
        "block-5l": "Зосереджуємося на результатах",
        "description-block-5l": "Пріоритетом нашої роботи є завжди поліпшення процесів на стороні клієнта, що виражається в фінансових або інших показниках.",
        "block-5r": "Досвідчена команда",
        "description-block-5r": "Ми - фахівці з вражаючим досвідом та знаннями у відповідних галузях.",

        "profile": "Профіль",
        "logout": "Вийти",
        "addOrder": "<span><i class=\"fa fa-plus\"></i></span>  Додати замовлення",
        "getUserAllOrders": "Список замовлень",
        "getUserHistory": "Історія",
        "getUserCanceled": "Відхилені",
        "userGreeting": "Вітаємо в панелі користувача",
        "adminGreeting": "Вітаємо в панелі адміністратора",

        "changePassword": "Змінити пароль",
        "userOldPasswordLabel": "Старий пароль",
        "userNewPasswordLabel": "Новий пароль",
        "userNewPasswordRepeatLabel": "Повторіть новий пароль",
        "update": "Оновити",
        "closeModal": "Закрити",

        "userFirstName": "Ім'я",
        "userLastName": "Прізвище",
        "userPatronymic": "По батькові",
        "localization": "Локалізація",

        "country": "Країна",
        "region": "Регіон",
        "point": "Населений пункт",

        "selectLocation": "Оберіть місцезнаходження",
        "latitude": "Широта",
        "longitude": "Довгота",
        "noAvailableProposal": "<h1>Відсутні будт-які пропозиції в обраному регіоні</h1>",

        "reportHeader": "Звіт замовлення",
        "reportTHumidity": "Вологість, %",
        "reportTRadiation": "Рівень радіації, Зв",
        "reportTPressure": "Атмосферний тиск, Пa",
        "reportTAirPollution": "Забрудненість повітря, %",
        "reportTTemperature": "Температура, ℃",
        "reportComment": "Коментар:",

        "proposal": "Пропозиція",
        "price": "Ціна",
        "createDate": "Дата створення",
        "updateDate": "Дата оновлення",
        "status": "Статус",

        "finalizedOrders": "Виконані замовлення",
        "canceledOrders": "Відхилені замовлення",
        "activeOrders": "Активні замовдення",

        "updateStatus": "Оновити статус  <i class=\"fa fa-refresh\"></i></button>",
        "showReport": "Показати звіт   <i class=\"fa fa-info\"></i>",


        "drone": "Дрон",
        "user": "Користувач",
        "order": "Замовлення",
        "localProposal": "Місцева пропозиція",

        "add": "Додати <i class=\"fa fa-plus\">",
        "edit": "Редагувати <i class=\"fa fa-edit\"></i>",
        "delete": "Видалити <i class=\"fa fa-close\"></i>",
        "save": "Зберігти",

        "addCountry": "Додати країну",
        "editCountry": "Редагувати країну",

        "addRegion": "Додати регіон",
        "editRegion": "Редагувати регіон",

        "addPoint": "Додати населений пункт",
        "editPoint": "Редагувати населений пункт",

        "addProposal": "Додати пропозицію",
        "editProposal": "Редагувати пропозицію",

        "addDrone": "Додати дрона",
        "editDrone": "Редагувати дрона",

        "addUser": "Додати користувача",
        "editUser": "Редагувати користувача",

        "addLocalProposal": "Додати місцеву пропозицію",
        "editLocalProposal": "Редагувати місцеву пропозицію",

        "title": "Назва",
        "description": "Описання",
        "sensors": "Датчики",

        "uuid": "UUID Поточної операції",
        "batteryLevel": "Рівень заряду батареї",
        "currentLocation": "Поточне місце знаходження",
        "availability": "Доступність",
        "droneAvailable": "Дрон доступний",
        "droneUnavailable": "Дрон недоступний",
        "sensorType": "Тип датчика",
        "addSensor": "Додати датчик <i class=\"fa fa-plus\"></i>",

        "roles": "Ролі",
        "isActive": "Чи активний",
        "defaultPP": "Населений пунк за замовчуванням",
        "regDate": "Дата реєстрації",
        "changeDate": "Дата оновлення данних",
        "userType": "Тип користувача",
        "password": "Пароль",
        "userAvailable": "Користувач активний",
        "userUnavailable": "Користувач заблокований",

        "proposalID": "Пропозиція(ID)",
        "pointID": "Населений пункт(ID)",
        "localProposalAvailable": "Місцева пропозиція активна",
        "localProposalUnavailable": "Місцева пропозиція призупинена",
        "changeStatus": "Змінити статус <i class=\"fa fa-arrows-h\"></i>",

        "droneID": "ID дрона",
        "userEmailID": "Еmail користувача (ID)",
        "tCoord": "Цілові координати",

        "HUMIDITY": "ВОЛОГІСТЬ",
        "RADIATION": "РАДІАЦІЯ",
        "PRESSURE": "АТМОСФЕРНИЙ ТИСК",
        "AIR_POLLUTION": "ЗАБРУДНЕНІСТЬ ПОВІТРЯ",
        "CAMERA": "КАМЕРА",
        "TEMPERATURE": "ТЕМПЕРАТУРА",

        "back": "Назад",
        "registration": "Реєстрація",
        "registerMe": "Зареєструвати мене",

        "login": "Увійти",

        "requiredField": "Це поле обов'язкове до заповнення",
        "validNumber": "Введіть коректне числове значення",
        "validLength": "Некоректна довжина поля",
        "minNumber": "Введіть значення більше або рівне 0.1",

        "getProposalError": "Помилка при отриманні списку доступних пропозицій. Спробуйте пізніше.",
        "saveOrderError": "Помилка при додаванні замовлення. Спробуйте пізніше.",
        "getUserError": "Помилка при отриманні данних профіля. Спробуйте пізніше.",
        "updateUserError": "Помилка при оновленні данних профіля. Спробуйте пізніше.",
        "updatePasswordError": "Помилка при оновленні пароля. Спробуйте пізніше.",
        "getOrderListError": "Помилка при отриманні списку замовлень. Спробуйте пізніше.",

        "badCredentials": "Невірний логін/пароль",
        "emailError": "Введіть вірний email",

        "registrationError": "Помилка при реєстрації користувача. Спробуйте пізніше.",
        "registrationSuccess": "Зареєстровано успішно",

        "samePassword": "Паролі мають співпадати",

        "getCountryListError": "Помилка при отриманні списку доступних країн. Спробуйте пізніше.",
        "getCountryError": "Помилка при отриманні країни. Спробуйте пізніше.",
        "saveCountryError": "Помилка при зберіганні країни. Спробуйте пізніше.",
        "updateCountryError": "Помилка при оновленні країни. Спробуйте пізніше.",
        "deleteCountryError": "Помилка при видаленні країни. Спробуйте пізніше.",

        "getRegionListError": "Помилка при отриманні списку доступних регіонів. Спробуйте пізніше.",
        "getRegionError": "Помилка при отриманні регіону. Спробуйте пізніше.",
        "saveRegionError": "Помилка при зберіганні регіону. Спробуйте пізніше.",
        "updateRegionError": "Помилка при оновленні регіону. Спробуйте пізніше.",
        "deleteRegionError": "Помилка при видаленні регіону. Спробуйте пізніше.",

        "gePopPointListError": "Помилка при отриманні списку доступних населених пунктів. Спробуйте пізніше.",
        "getPopPointError": "Помилка при отриманні населеного пункта. Спробуйте пізніше.",
        "savePopPointError": "Помилка при зберіганні населеного пункта. Спробуйте пізніше.",
        "updatePopPointError": "Помилка при оновленні населеного пункта. Спробуйте пізніше.",
        "deletePopPointError": "Помилка при видаленні населеного пункта. Спробуйте пізніше.",

        "getProposalListError": "Помилка при отриманні списку доступних пропозицій. Спробуйте пізніше.",
        "getProposalEntityError": "Помилка при отриманні пропозиції. Спробуйте пізніше.",
        "saveProposalError": "Помилка при зберіганні пропозиції. Спробуйте пізніше.",
        "updateProposalError": "Помилка при оновленні пропозиції. Спробуйте пізніше.",
        "deleteProposalError": "Помилка при видаленні пропозиції. Спробуйте пізніше.",

        "getDroneListError": "Помилка при отриманні списку доступних дронів. Спробуйте пізніше.",
        "getDroneError": "Помилка при отриманні дрона. Спробуйте пізніше.",
        "saveDroneError": "Помилка при зберіганні дрона. Спробуйте пізніше.",
        "updateDroneError": "Помилка при оновленні дрона. Спробуйте пізніше.",
        "deleteDroneError": "Помилка при видаленні дрона. Спробуйте пізніше.",

        "getSensorListError": "Помилка при отриманні списку доступних датчиків. Спробуйте пізніше.",
        "deleteSensorError": "Помилка при видаленні датчика. Спробуйте пізніше.",

        "getUserListError": "Помилка при отриманні списку користувачів. Спробуйте пізніше.",
        "saveUserError": "Помилка при зберіганні користувача. Спробуйте пізніше.",
        "deleteUserError": "Помилка при видаленні користувача. Спробуйте пізніше.",

        "getLocalProposalListError": "Помилка при отриманні списку пропозицій. Спробуйте пізніше.",
        "getLocalProposalError": "Помилка при отриманні пропозиції. Спробуйте пізніше.",
        "saveLocalProposalError": "Помилка при зберіганні пропозиції. Спробуйте пізніше.",
        "updateLocalProposalError": "Помилка при оновленні пропозиції. Спробуйте пізніше.",
        "deleteLocalProposalError": "Помилка при видаленні пропозиції. Спробуйте пізніше.",

        "cancelOrderError": "Помилка при відміні замовлення. Спробуйте пізніше."
    };
    EN = {
        "contacts": "Contacts",
        "location": "Ukraine, Kharkiv, XXX street",
        "registerNow": "Register Now!",
        "mainDescription": "New, no alternative system for instant response to emergency situations. Speed, reliability, accuracy - our main qualities.",
        "block-1l": "Ecology",
        "description-block-1l": "Ecological disasters, natural disasters, fires, flora, fauna.",
        "block-1r": "Agriculture",
        "description-block-1r": "Assistance to farmers, site research, state supervision.",
        "block-2l": "Mining industry",
        "description-block-2l": "Control in complex technological processes, exploration.",
        "block-2r": "Oil and gas industry",
        "description-block-2r": "Control in complex technological processes.",
        "block-3l": "Emergency",
        "description-block-3l": "Quick response to all emergencies.",
        "block-3r": "Photo and video",
        "description-block-3r": "Photo video of any events.",
        "majorFeatures": "Major features",
        "list1": "Publication of available services by the company.",
        "list2": "Registration of users and ordering of necessary services for them.",
        "list3": "Call the drones to the place of the emergency and get information quickly from them",
        "list4": "Track the location of drones and view their current status",
        "list5": "Real-time information transfer for devices with continuous monitoring of the status of objects.",
        "list6": "The safety and health of smart devices.",
        "list7": "Full confidentiality and security of information stored on servers.",
        "block-4l":  "Flexible solutions",
        "description-block-4l": "We provide not only industry solutions, but also comprehensive services for solving the problems of our clients.",
        "block-4r": "Quality",
        "description-block-4r": "All services and solutions are provided exclusively using high-quality components and materials.",
        "block-5l": "Focus on results",
        "description-block-5l": "The priority of our work is always the improvement of processes on the client side, which is expressed in financial or other indicators.",
        "block-5r": "Experienced team",
        "description-block-5r": "We are specialists with impressive experience and knowledge in the relevant fields.",

        "profile": "Profile",
        "logout": "Log out",
        "addOrder": "<span><i class=\"fa fa-plus\"></i></span>  Add Order",
        "getUserAllOrders": "Orders",
        "getUserHistory": "History",
        "getUserCanceled": "Canceled",
        "userGreeting": "Hello in user panel",
        "adminGreeting": "Hello in admin panel",

        "changePassword": "Change password",
        "userOldPasswordLabel": "Old password",
        "userNewPasswordLabel": "New password",
        "userNewPasswordRepeatLabel": "Repeat new password",
        "update": "Update",
        "closeModal": "Close",

        "userFirstName": "First name",
        "userLastName": "Last name",
        "userPatronymic": "Patronymic",
        "localization": "Localization",

        "country": "Country",
        "region": "Region",
        "point": "Populated Point",

        "selectLocation": "Select Location ",
        "latitude": "Latitude",
        "longitude": "Longitude",
        "noAvailableProposal": "<h1>No available proposals in this region</h1>",

        "reportHeader": "Order report",
        "reportTHumidity": "Humidity, %",
        "reportTRadiation": "Radiation, Sv",
        "reportTPressure": "Pressure, Pa",
        "reportTAirPollution": "Air pollution, %",
        "reportTTemperature": "Temperature, ℃",
        "reportComment": "Comment:",

        "proposal": "Proposal",
        "price": "Price",
        "createDate": "Create date",
        "updateDate": "Update date",
        "status": "Status",

        "finalizedOrders": "Finalized orders",
        "canceledOrders": "Canceled orders",
        "activeOrders": "Active orders",

        "updateStatus": "Update status   <i class=\"fa fa-refresh\"></i></button>",
        "showReport": "Show report   <i class=\"fa fa-info\"></i>",


        "drone": "Drone",
        "user": "User",
        "order": "Order",
        "localProposal": "Local proposal",

        "add": "Add <i class=\"fa fa-plus\">",
        "edit": "Edit <i class=\"fa fa-edit\"></i>",
        "delete": "Delete <i class=\"fa fa-close\"></i>",
        "save": "Save",

        "addCountry": "Add country",
        "editCountry": "Edit country",

        "addRegion": "Add region",
        "editRegion": "Edit region",

        "addPoint": "Add populated point",
        "editPoint": "Edit populated point",

        "addDrone": "Add drone",
        "editDrone": "Edit drone",

        "addProposal": "Add proposal",
        "editProposal": "Edit proposal",

        "addUser": "Add user",
        "editUser": "Edit user",

        "addLocalProposal": "Add local proposal",
        "editLocalProposal": "Edit local proposal",


        "title": "Title",

        "description": "Description",
        "sensors": "Sensors",

        "uuid": "Current operation UUID",
        "batteryLevel": "Battery level",
        "currentLocation": "Current location",
        "availability": "Availability",
        "droneAvailable": "Drone available",
        "droneUnavailable": "Drone unavailable",
        "sensorType": "Sensor type",
        "addSensor": "Add sensor <i class=\"fa fa-plus\"></i>",

        "roles": "Roles",
        "isActive": "Is active",
        "defaultPP": "Default populated point",
        "regDate": "Date of registration",
        "changeDate": "Date of change",
        "userType": "Type of user",
        "password": "Password",
        "userAvailable": "User available",
        "userUnavailable": "User unavailable",

        "proposalID": "Proposal(ID)",
        "pointID": "Populated point(ID)",
        "localProposalAvailable": "Local proposal available",
        "localProposalUnavailable": "Local proposal blocked",
        "changeStatus": "Change status <i class=\"fa fa-arrows-h\"></i>",

        "droneID": "DroneID",
        "userEmailID": "User email (ID)",
        "tCoord": "Target coordinates",


        "HUMIDITY": "HUMIDITY",
        "RADIATION": "RADIATION",
        "PRESSURE": "PRESSURE",
        "AIR_POLLUTION": "AIR POLLUTION",
        "CAMERA": "CAMERA",
        "TEMPERATURE": "TEMPERATURE",

        "back": "Back",
        "registration": "Registration",
        "registerMe": "Register me",

        "login": "Log in",

        "requiredField": "This field is required",
        "validNumber": "Please enter a valid number",
        "validLength": "Incorrect field content length",
        "minNumber": "Please enter a value greater than or equal to 0.1",

        "getProposalError": "Error while getting proposal list. Try later.",
        "saveOrderError": "Error while saving order. Try later.",
        "getUserError": "Error while getting user profile. Try later.",
        "updateUserError": "Error while updating user profile. Try later.",
        "updatePasswordError": "Error while updating password. Try later.",
        "getOrderListError": "Error while getting order list. Try later.",

        "badCredentials": "Incorrect login/password",
        "emailError": "Please enter a valid email address",

        "registrationError": "Error while user registration. Try later.",
        "registrationSuccess": "Success registration",

        "samePassword": "Password must be the same",

        "getCountryListError": "Error while getting country list. Try later.",
        "getCountryError": "Error while getting country. Try later.",
        "saveCountryError": "Error while saving country. Try later.",
        "updateCountryError": "Error while updating country. Try later.",
        "deleteCountryError": "Error while deleting country. Try later.",

        "getRegionListError": "Error while getting region list. Try later.",
        "getRegionError": "Error while getting region. Try later.",
        "saveRegionError": "Error while saving region. Try later.",
        "updateRegionError": "Error while updating region. Try later.",
        "deleteRegionError": "Error while deleting region. Try later.",

        "getPopPointListError": "Error while getting populated point list. Try later.",
        "getPopPointError": "Error while getting populated point. Try later.",
        "savePopPointError": "Error while saving populated point. Try later.",
        "updatePopPointError": "Error while updating populated point. Try later.",
        "deletePopPointError": "Error while deleting populated point. Try later.",

        "getProposalListError": "Error while getting proposal list. Try later.",
        "getProposalEntityError": "Error while getting proposal. Try later.",
        "saveProposalError": "Error while saving proposal. Try later.",
        "updateProposalError": "Error while updating proposal. Try later.",
        "deleteProposalError": "Error while deleting proposal. Try later.",

        "getDroneListError": "Error while getting drone list. Try later.",
        "getDroneError": "Error while getting drone. Try later.",
        "saveDroneError": "Error while saving drone. Try later.",
        "updateDroneError": "Error while updating drone. Try later.",
        "deleteDroneError": "Error while deleting drone. Try later.",

        "getSensorListError": "Error while getting sensor list. Try later.",
        "deleteSensorError": "Error while deleting sensor. Try later.",

        "getUserListError": "Error while getting user list. Try later.",
        "saveUserError": "Error while saving user. Try later.",
        "deleteUserError": "Error while deleting user. Try later.",

        "getLocalProposalListError": "Error while getting local proposal list. Try later.",
        "getLocalProposalError": "Error while getting local proposal. Try later.",
        "saveLocalProposalError": "Error while saving local proposal. Try later.",
        "updateLocalProposalError": "Error while updating local proposal. Try later.",
        "deleteLocalProposalError": "Error while deleting local proposal. Try later.",

        "cancelOrderError": "Error while canceling order. Try later."
    }
}

