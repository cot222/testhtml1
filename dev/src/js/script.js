const validateForm = function() {
    //объект для хранения текстовых инпутов
    let inpList = {
        firstNameInp: {
            el: $('#firstNameID'),
            error: []
        },
        lastNameInp: {
            el: $('#lastNameID'),
            error: []
        },
        emailInp: {
            el: $('#emailID'),
            error: []
        },
        passInp: {
            el: $('#passwordID'),
            error: []
        },
        confirmInp: {
            el: $('#confirmdID'),
            error: []
        }
    };

    //массив ошибок
    let errorList = {
        email: 'Неверный формат email',
        empty: 'Поле не может быть пустым',
        name: 'Неверный формат(только буквы)',
        passLength: 'Пароль должен быть не менее 8 символов',
        passNotCompare: 'Пароли не совпадают',
        easyPassword: 'Неверный формат пароля(заглавные и строчные буквы, а также цифры обязательны)'
    };

    //валидация email
    function validateEmail(email) {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern .test(email);
    }
    //валидация пароля
    function validatePass(pass) {
        let pattern  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return pattern .test(pass);
    }
    //валидация имени и фамилии
    function validateName(name) {
        let pattern  = /^[A-zА-яЁё]+$/i;
        let result = { 
            flag: false, 
            error: '' 
        };

        result.flag = pattern .test(name);

        if(result.flag === false) { 
            if(name.split(' ').join('') == '') { 
                result.error = errorList.empty; 
            } else {
                result.error = errorList.name; 
            }
        }

        return result;
    }
    //сравнение паролей
    function comparePass(pass1, pass2) {
        if(!pass1) { 
            console.log('Введите пароль'); 
        }
        else if(pass1 === pass2) { 
            console.log('Пароли совпали'); 
        } else {
            console.log('Пароли не совпали');
        }
    }

    for(let item in inpList) {
        let current = inpList[item];

        /*
        * Проверяю каждый инпут на изменение,
        * при этом определяю,какой именно инпут изменяется
        * в данный момент,чтобы валидировать его соответствующими 
        * функциями.
        */
        current.el.change(function(e) {
            switch(item) {
                case 'firstNameInp': {
                    let name = e.target.value;
                    let result = validateName(name);
                    current.error = result.error;
                    console.log(current.error);
                } break;
                case 'lastNameInp': {
                    console.log('lastNameInp');
                } break;
                case 'emailInp': {
                    console.log('emailInp');
                } break;
                case 'passInp': {
                    let pass = e.target.value;
                    let result = validatePass(pass);
                } break;
                case 'confirmInp': {
                    console.log('confirmInp');
                } break;
            }
        })
    }

}
validateForm();


