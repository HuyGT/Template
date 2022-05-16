const signInBtn = document.querySelector('.signInBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');

signUpBtn.onclick = function(){
    formBx.classList.add('active');
    body.classList.add('active');
}

signInBtn.onclick = function(){
    formBx.classList.remove('active');
    body.classList.remove('active');
}

function Validator (formSelector) {
    var formRules = {};
    var validatorRules = {
        required: function (value){
            return value ? undefined : 'Không được để trống';
        },

        email: function (value){
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : 'Email không hợp lệ';
        },
        
        min: function (min){
            return function (value){
                return  value.length >= min ? undefined : 'Vui lòng nhập ít nhất ${min} ký tự';
            }
        }
    };
    var formElement = document.querySelector(formSelector);

    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');

        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|');

            for (var rule of rules){

                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if(isRuleHasValue){
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
            }

            var ruleFunc = validatorRules[rule];

            if(isRuleHasValue){
                ruleFunc = ruleFunc(ruleInfo[1]);
            }

            if(Array.isArray(formRules[input.name])){
                formRules[input.name].push(ruleFunc);
            } else{
                formRules[input.name] = [ruleFunc];
            }

            // add event
            input.onblur = handleValidate;
        }

        function handleValidate(event){
            var rules = formRules[event.target.name];
            for(var rule of rules){
                var errorMessage = rule(event.target.value);
                break;
            }
            if(errorMessage){
                document.querySelector('span').innerHTML = rule(event.target.value);
            }else{
                document.querySelector('span').innerHTML = '';
            }
        }


    }
}

Validator('#signIn');