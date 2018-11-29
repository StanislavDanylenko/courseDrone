var UA;
var EN;
var locale;

$(document).ready(function() {

    loadUserLS();
    $(document).on('change', '#localizationSwitcher', changeLocale);
    loadJSONs();
    checkUSER();
    $.i18n.load(locale);
    setTranslate();

});

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
        }
    } else {
        setL10n(EN);
    }
}

function setL10n(loc) {
    locale = loc;
}

function setTranslate() {
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

function changeLocale() {
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
    setTranslate();
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
        "login": "Увійти"
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
        "login": "Log in"
    }
}

