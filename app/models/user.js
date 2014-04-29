var User = function () {

    this.defineProperties({
        username: {type: 'string', required: true, message: '用户名必须由 6 到 30 个字母、数字、下划线组成。'},
        password: {type: 'string', required: true, message: '密码不能小于 6 个或大于 30 个字符。'},
        confirmpassword: {type: 'string', required: true, message: '密码不能小于 6 个或大于 30 个字符。'},
        nickname: {type: 'string', required: true, message: '昵称是必要项。'},
        email: {type: 'string', required: true, message: '邮箱是必要项。'}
    });


    this.validatesFormat('username', /^[a-zA-Z0-9_]{6,30}$/ ,{ message: '用户名必须由6到30个字母、数字、下划线组成。'});
    this.validatesLength('password', {min: 6, max: 30, message: '密码不能小于 6 个或大于 30 个字符。'});
    this.validatesConfirmed('confirmpassword', 'password', { message: '两次新密码必须一致。'});
    this.validatesLength('nickname', {min: 1, max: 20, message: '昵称不能大于20个字符。'});
    this.validatesFormat('email', /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, {message: '邮箱无效。'});

//  this.validatesLength('username', {min: 6, max: 30, message: '用户名不能小于 6 个或大于 30 个字符长度。'});
    /*
    this.validatesWithFunction('nickname', { message: '昵称不能大于20个字符长度。'}, function(nickname){
        return nickname.length <= 20;
    });
   */
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

User = geddy.model.register('User', User);
