var Admin = function () {

    this.defineProperties({
        username: {type: 'string', required: true, message: '用户名是必要项。'},
        password: {type: 'string', required: true, message: '密码是必要项。'},
        confirmpassword: {type: 'string', required: true, message: '密码是必要项。'},
        nickname: {type: 'string', required: false}
    });

    this.validatesLength('username', {min: 6, max: 30, message: '用户名不能小于 6 个或大于 30 个字符长度。'});
    this.validatesLength('password', {min: 6, max: 30, message: '密码不能小于 6 个或大于 30 个字符长度。'});
    this.validatesConfirmed('confirmpassword', 'password', { message: '两次新密码必须一致。'});
    this.validatesWithFunction('nickname', { message: '昵称不能大于20个字符长度。'}, function(nickname){
        return nickname.length <= 20;
    });

    /*
     this.property('login', 'string', {required: true});
     this.property('password', 'string', {required: true});
     this.property('lastName', 'string');
     this.property('firstName', 'string');

     this.validatesPresent('login');
     this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
     this.validatesLength('login', {min: 3});
     // Use with the name of the other parameter to compare with
     this.validatesConfirmed('password', 'confirmPassword');
     // Use with any function that returns a Boolean
     this.validatesWithFunction('password', function (s) {
     return s.length > 0;
     });

     // Can define methods for instances like this
     this.someMethod = function () {
     // Do some stuff
     };
     */

};

/*
 // Can also define them on the prototype
 Test.prototype.someOtherMethod = function () {
 // Do some other stuff
 };
 // Can also define static methods and properties
 Test.someStaticMethod = function () {
 // Do some other stuff
 };
 Test.someStaticProperty = 'YYZ';
 */

Admin = geddy.model.register('Admin', Admin);
