const validateForm = function() {
    //объект для хранения текстовых инпутов
    let inpList = {
        firstNameInp: {
            el: $('#firstNameID'),
            block: $('.firstNameBlock'),
            error: $('#firstNameError')
        },
        lastNameInp: {
            el: $('#lastNameID'),
            block: $('.lastNameBlock'),
            error: $('#lastNameError')
        },
        emailInp: {
            el: $('#emailID'),
            block: $('.emailBlock'),
            error: $('#emailError')
        },
        passInp: {
            el: $('#passwordID'),
            block: $('.passBlock'),
            error: $('#passError')
        },
        confirmInp: {
            el: $('#confirmdID'),
            block: $('.confpassBlock'),
            error: $('#confirmPassError')
        }
    };

    //массив ошибок
    let errorList = {
        email: 'Неверный формат email',
        empty: 'Поле не может быть пустым',
        name: 'Неверный формат(только буквы)',
        pass: 'Неверный формат пароля',
        passNotCompare: 'Пароли не совпадают'
    };

    //валидация email
    function validateEmail(email) {
        let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = { 
            flag: false, 
            error: '' 
        };

        result.flag = pattern .test(email);

        if(result.flag === false) { 
            if(email.split(' ').join('') == '') { 
                result.error = errorList.empty; 
            } else {
                result.error = errorList.email; 
            }
        }

        return result;
    }
    //валидация пароля
    function validatePass(pass) {
        let pattern  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let result = { 
            flag: false, 
            error: '' 
        };

        result.flag = pattern .test(pass);

        if(result.flag === false) { 
            if(pass.split(' ').join('') == '') { 
                result.error = errorList.empty; 
            } else {
                result.error = errorList.pass; 
            }
        }

        return result;
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
        let result = { 
            flag: false, 
            error: '' 
        };

        if( pass1 !== pass2 ) {
            result.error = errorList.passNotCompare;
        } else {
            result.error = '';
        }

        return result;
    }
    //функция очистки полей
    function clearInputs() {
        let clearElementsArr = [];
        let successReg = $('.form-success');

        clearElementsArr.push($('#MainForm .form-right .info-top .top-wrapper'));
        clearElementsArr.push($('#MainForm .form-right .form-right__title'));
        clearElementsArr.push($('#MainForm .form-right .form-right__desc'));
        
        for(let i = 0; i < clearElementsArr.length; i++) {
            clearElementsArr[i].css('display', 'none');
        }

        successReg.addClass('active');
    }

    function validateData() {
        /*
        * Проверяю изменение или сабмит формы,
        * если событие изменения,определяю какой именно
        * инпут изменился, и с помощью switch делаю определенную 
        * валидацию для соответствующего инпута.
        * Если соытие сабмита,вызываю аналогичный цикл перебора объекта 
        * инпутов и валидирую каждый из них,если ошибок после этой операции нету
        * т.е все данные валидные,отправляю результат на файл server.json,
        */
        $('#MainForm').on('change submit', function(e) {
            let submButton = $('.bottom-right');

            if(e.type == 'change') {
                let currentInput = $(e.target);

                for(let item in inpList) {
                    let current;

                    //сравниваю по id элемент объекта и измененный инпут
                    if(inpList[item].el.attr('id') == currentInput.attr('id')) {
                        current = inpList[item];

                        //функция добавления/удаления класса ошибки
                        function toggleError(currentVal) {
                            let errorValue = currentVal.text();
                            errorValue = errorValue.split(' ').join('');

                            if(errorValue !== '') {
                                (current.block).addClass('error');
                            } else { 
                                (current.block).removeClass('error'); 

                            }
                        }

                        switch(item) {
                            case 'firstNameInp': {
                                let name = $(current.el).val();
                                let result = validateName(name);

                                //добавление ошибки
                                let currentVal = current.error;
                                currentVal.text(result.error);
            
                                toggleError(currentVal);
                            } break;
                            case 'lastNameInp': {
                                let name = $(current.el).val();
                                let result = validateName(name);

                                //добавление ошибки
                                let currentVal = current.error;
                                currentVal.text(result.error);
            
                                toggleError(currentVal);
                            } break;
                            case 'emailInp': {
                                let email = $(current.el).val();
                                let result = validateEmail(email);

                                //добавление ошибки
                                let currentVal = current.error;
                                //если валидно,добавляю галочку
                                (result.flag) ? (current.block).addClass('validMail') : (current.block).removeClass('validMail');
                                currentVal.text(result.error);
            
                                toggleError(currentVal);
                            } break;
                            case 'passInp': {
                                let pass = $(current.el).val();
                                let result = validatePass(pass);

                                //добавление ошибки
                                let currentVal = current.error;
                                currentVal.text(result.error);
            
                                toggleError(currentVal);
                            } break;
                            case 'confirmInp': {
                                let passMain = inpList.passInp.el;
                                let passCurrent = $(current.el).val();
            
                                let result = comparePass(passMain.val(), passCurrent);

                                //добавление ошибки
                                let currentVal = current.error;
                                currentVal.text(result.error);
            
                                toggleError(currentVal);
                            } break;
                        }
                    }
                }
            }

            if(e.type == 'submit') {
                e.preventDefault();

                function notValidEffect() {
                    submButton.addClass('submmit-error');
                    setTimeout(function() {
                        submButton.removeClass('submmit-error');
                    }, 500);
                }

                for(let item in inpList) {
                    let current = inpList[item];

                    //функция добавления/удаления класса ошибки
                    function toggleError(currentVal) {
                        let errorValue = currentVal.text();
                        errorValue = errorValue.split(' ').join('');

                        if(errorValue !== '') {
                            (current.block).addClass('error');
                        } else { 
                            (current.block).removeClass('error'); 

                        }
                    }

                    switch(item) {
                        case 'firstNameInp': {
                            let name = $(current.el).val();
                            let result = validateName(name);

                            //добавление ошибки
                            let currentVal = current.error;
                            currentVal.text(result.error);
        
                            toggleError(currentVal);
                        } break;
                        case 'lastNameInp': {
                            let name = $(current.el).val();
                            let result = validateName(name);

                            //добавление ошибки
                            let currentVal = current.error;
                            currentVal.text(result.error);
        
                            toggleError(currentVal);
                        } break;
                        case 'emailInp': {
                            let email = $(current.el).val();
                            let result = validateEmail(email);

                            //добавление ошибки
                            let currentVal = current.error;
                            //если валидно,добавляю галочку
                            (result.flag) ? (current.block).addClass('validMail') : (current.block).removeClass('validMail');
                            currentVal.text(result.error);
        
                            toggleError(currentVal);
                        } break;
                        case 'passInp': {
                            let pass = $(current.el).val();
                            let result = validatePass(pass);
                            
                            //добавление ошибки
                            let currentVal = current.error;
                            currentVal.text(result.error);
        
                            toggleError(currentVal);
                        } break;
                        case 'confirmInp': {
                            let passMain = inpList.passInp.el;
                            let passCurrent = $(current.el).val();
        
                            let result = comparePass(passMain.val(), passCurrent);

                            //добавление ошибки
                            let currentVal = current.error;
                            currentVal.text(result.error);
        
                            toggleError(currentVal);
                        } break;
                    }
                    
                }

                function errorCount() {
                    let sum = 0;

                    for(item in inpList) {
                        sum = sum + inpList[item].error.text();
                    }
                
                    let result = sum.split(' ').join('');

                    return result.length;
                }

                let resultError = errorCount() - 1;

                if(resultError == 0) {
                    $.ajax({
                        method: "GET",
                        url: "../server.json",
                        success: function(data) {
                            clearInputs();
                            alert('Данные отправлены');
                        },
                        error: function(data) {
                            notValidEffect();
                        }
                    })
                } else {
                    notValidEffect();
                }
            }
        })

    }
    validateData();
    

}
validateForm();


