$(document).ready(function() {

    loadUserLS();
    $(document).on('change', '#localizationSwitcher', changeLocaleIndex);
    loadJSONs();
    checkUSER();
    $.i18n.load(locale);
    setTranslateIndex();

});