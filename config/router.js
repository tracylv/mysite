/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/


var router = new geddy.RegExpRouter();

router.get('/').to('Main.index');

router.get('/users/list(.:format)').to('Users.list');
router.get('/users/show/:id(.:format)').to('Users.show');
router.get('/users/signup(.:format)').to('Users.signup');
router.post('/users/signup(.:format)').to('Users.signup_post');
router.get('/users/edit/:id(.:format)').to('Users.edit');
router.post('/users/edit/:id(.:format)').to('Users.update');
router.post('/users/delete/:id(.:format)').to('Users.remove');

router.get('/admins/category(.:format)').to('Admins.category');
router.get('/admins/list(.:format)').to('Admins.list');
router.get('/admins/show/:id(.:format)').to('Admins.show');
router.get('/admins/signup(.:format)').to('Admins.signup');
router.post('/admins/signup(.:format)').to('Admins.signup_post');
router.get('/admins/edit/:id(.:format)').to('Admins.edit');
router.post('/admins/edit/:id(.:format)').to('Admins.update');
router.post('/admins/delete/:id(.:format)').to('Admins.remove');

router.get('/lives/index(.:format)').to('Lives.index');

router.get('/games/index(.:format)').to('Games.index');

router.get('/basketballs/index(.:format)').to('Basketballs.index');

router.get('/win8/index(.:format)').to('Win8.index');

router.get('/sites/index(.:format)').to('Sites.index');

router.get('/advices/index(.:format)').to('Advices.index');

// Basic routes
// router.match('/moving/pictures/:id', 'GET').to('Moving.pictures');
//
// router.match('/farewells/:farewelltype/kings/:kingid', 'GET').to('Farewells.kings');
//
// Can also match specific HTTP methods only
// router.get('/xandadu').to('Xanadu.specialHandler');
// router.del('/xandadu/:id').to('Xanadu.killItWithFire');
//
// Resource-based routes
// router.resource('hemispheres');
//
// Nested Resource-based routes
// router.resource('hemispheres', function(){
//   this.resource('countries');
//   this.get('/print(.:format)').to('Hemispheres.print');
// });

router.resource('tests');
exports.router = router;
