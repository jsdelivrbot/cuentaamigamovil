angular.module('starter')
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, USER_ROLES, $http, $ionicPopup) {

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        //$ionicModal.fromTemplateUrl('templates/login.html', {
        //      scope: $scope
        //   }).then(function (modal) {
        //      $scope.modal = modal;
        //  });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function(user, password) {
            url = "http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios/getlogin?nickname="+user+"&password="+password;
            $http({
                method: 'GET',
                url: url,
            }).then(function successCallback(response) {
                USER_ROLES.id = response.data.id.id;
                USER_ROLES.name = response.data.id.nombre;
                USER_ROLES.authorized = true;                
            }, function errorCallback(response) {
                console.log(response);
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'No es possible logar. Data: ' + response.data + '. Status Text: ' + response.statusText
                });
            });

        };

        $scope.logout = function() {
            console.log("Salindo");
            USER_ROLES.authorized = false;
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    });