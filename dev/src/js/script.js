const validateForm = function() {
    //объект для хранения текстовых инпутов
    let inpList = {
        firstNameInp: $('#firstNameID'),
        lastNameInp: $('#lastNameID'),
        emailInp: $('#emailID'),
        passInp: $('#passwordID'),
        confirmInp: $('#confirmdID')
    };
    //массив ошибок
    let errorList = {
        email: 'Неверный формат email',
        empty: 'Поле не может быть пустым',
        passLength: 'Пароль должен быть не менее 8 символов',
        passNotCompare: 'Пароли не совпадают',
        easyPassword: 'Неверный формат пароля(заглавные и строчные буквы, а также цифры обязательны)'
    };

    function validateEmail(email) {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern .test(email);
    }
      
    let result = validateEmail('andrey.bobr');
    console.log(result);
      
}
validateForm();


