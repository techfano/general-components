define(['app'], function (app) {

    app.constant('expression',{

        'letters': /^[a-zA-Z\ñ\s\&]*$/,
        'integer': /^\-?\d+$/,
        'mail': /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/,
        'alphanumeric': /^[0-9a-zA-Z\s\'\-\/\&\(\)\.-]*$/,
        'text': /^[a-zA-Z0-9\s\'\-\.\/\&-]*$/,
        'numbers': /^[0-9]*$/,
        'zip-code': /^\d{5}(?:[-]{0,1}\d{4})?$/
    
    });

    app.constant('message',{

        'validations': {
            'maxlength': function (longitud) {
                return 'Solo esta permitido un maximo de ' + longitud + ' caracteres';
            },
            'minlength': function (longitud) {
                return 'Solo esta permitido un minimo de ' + longitud + ' caracteres';
            },
            'required': 'Este campo es requerido'
        }
    
    });

    app.directive('uiValidator', ['expression','message', function(expression,message){
        var directive = {
                scope: {
                    message: '@validatorMessage'
                },
                restrict: 'A',
                require: 'ngModel',
                link: link
            };

        return directive;

        function link($scope, $element, $attr, ctrl) {
            var regex = new RegExp(expression[$attr.validatorExpression]);
            angular.element($element).on('keyup', function (/*ev*/) {
                    var valid = regex.test(ctrl.$viewValue);
                    applyValidation(valid);
                    ctrl.$setValidity('validate', valid);
            });
            var applyValidation = function (valid) {
                if (valid) {
                    deleteMessage();
                    required();
                } else {
                    addMessage($scope.message);
                }
            };
            var required = function () {
                if (ctrl.$error.required) {
                    addMessage(message.validations.required);
                } else {
                    length();
                }
            };
            var length = function () {
                if (ctrl.$error.maxlength) {
                    addMessage(message.validations.maxlength($attr.ngMaxlength));
                } else {
                    if (ctrl.$error.minlength) {
                        addMessage(message.validations.minlength($attr.ngMinlength));
                    }else{
                        deleteMessage();                      
                    }
                }
            };
            var addMessage = function (message) {

                var error='<div id="alert_'+$attr.id+'" class="alert alert-danger"'+
                        ' role="alert" aria-live="polite">'+
                        '   <div class="alert-danger-head">'+
                        '       <span class="ci ci-error"></span>'+
                                message +
                        '   </div>'+
                        '</div>';

                        
                angular.element(document.getElementById('alert_'+$attr.id)).remove();
                angular.element($element).after(error);
               
            };
            var deleteMessage = function () {
                angular.element(document.getElementById('alert_'+$attr.id)).remove();
            };
        }
    }]);
});





