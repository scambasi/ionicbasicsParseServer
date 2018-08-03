webpackJsonp([7],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipeServices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_recipe__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AuthService__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_parse__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_parse__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RecipeServices = /** @class */ (function () {
    function RecipeServices(authService, http) {
        this.authService = authService;
        this.http = http;
        this.recipes = [];
    }
    RecipeServices.prototype.addRecipe = function (title, description, difficulty, ingredients) {
        this.recipes.push(new __WEBPACK_IMPORTED_MODULE_1__modals_recipe__["a" /* Recipe */](title, description, difficulty, ingredients));
        console.log('added', this.recipes);
        var TarifList = __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Object.extend('Recipe');
        var uid = this.authService.currentUser().id;
        var tarifList = new TarifList();
        tarifList.set('title', title);
        tarifList.set('ingredients', ingredients);
        tarifList.set('difficulty', difficulty);
        tarifList.set('description', description);
        tarifList.set('kullaniciId', uid);
        return tarifList.save(null, {
            success: function (tarifList) {
                return tarifList;
            },
            error: function (tarifList, error) {
                console.log(error);
                return error;
            }
        });
    };
    RecipeServices.prototype.getRecipes = function () {
        return this.recipes.slice();
        var TarifList = __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Object.extend('Recipe');
        var uid = this.authService.currentUser().id;
        var query = new __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Query(TarifList);
        query.equalTo("kullaniciId", uid);
        query.find().then(function (tariflerim) {
            console.log(tariflerim);
        }, function (error) {
            console.log(error);
        });
    };
    RecipeServices.prototype.updateRecipe = function (index, title, description, difficulty, ingredients) {
        this.recipes[index] = new __WEBPACK_IMPORTED_MODULE_1__modals_recipe__["a" /* Recipe */](title, description, difficulty, ingredients);
        console.log('updated listesi', this.recipes);
        console.log('first recipe' + this.recipes[0].title);
        var TarifList = __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Object.extend('Recipe');
        var query = new __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Query(TarifList);
        query.equalTo("title", this.recipes[0].title);
        query.first({
            success: function (recipe) {
                if (recipe) {
                    recipe.set('title', '1321321');
                    recipe.set('difficulty', 'zor');
                    recipe.save(null, {
                        success: function (recipe) {
                            console.log('UPDATE RECİPE' + recipe.get('title'));
                        },
                        error: function (error) {
                            console.log('error' + error.message);
                        }
                    });
                }
                else {
                    console.log('error');
                }
            }
        });
    };
    RecipeServices.prototype.removeRecipe = function (index, title) {
        this.recipes.splice(index, 1);
        var TarifList = __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Object.extend('Recipe');
        var query = new __WEBPACK_IMPORTED_MODULE_5_parse___default.a.Query(TarifList);
        query.equalTo("title", title);
        query.first({
            success: function (recipe) {
                if (recipe) {
                    console.log('FIRST RECİPE: ' + recipe.get('title'));
                    recipe.destroy({
                        success: function (recipe) {
                            console.log('DELETED RECİPE' + recipe.get('title'));
                        },
                        error: function (error) {
                            console.log('error' + error.message);
                        }
                    });
                }
                else {
                    console.log('error');
                }
            }
        });
    };
    RecipeServices.prototype.storeList = function (token) {
        var userId = this.authService.getActiveUser().uid;
        return this.http.put('https://yemektariflerim-e8ca5.firebaseio.com/' + userId + '/recipes.json?auth='
            + token, this.recipes);
    };
    RecipeServices.prototype.fetchList = function (token) {
        var _this = this;
        var userId = this.authService.getActiveUser().uid;
        return this.http.get('https://yemektariflerim-e8ca5.firebaseio.com/'
            + userId + '/recipes.json?auth=' + token).
            map(function (response) {
            var recipes = response.json() ? response.json() : [];
            for (var _i = 0, recipes_1 = recipes; _i < recipes_1.length; _i++) {
                var item = recipes_1[_i];
                if (!item.hasOwnProperty('ingredients')) {
                    item.ingredients = [];
                }
            }
            return recipes;
        }).do(function (recipes) {
            if (recipes) {
                _this.recipes = recipes;
            }
            else {
                _this.recipes = [];
            }
        });
    };
    RecipeServices = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__AuthService__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__AuthService__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]) === "function" && _b || Object])
    ], RecipeServices);
    return RecipeServices;
    var _a, _b;
}());

//# sourceMappingURL=recipes.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditRecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipes__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditRecipePage = /** @class */ (function () {
    function EditRecipePage(navCtrl, navParams, actionSheetCtrl, alertCtrl, toastCtrl, recipeServices) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.recipeServices = recipeServices;
        this.mode = 'Ekle';
        this.selectOptions = ['Kolay', 'Normal', 'Zor'];
    }
    EditRecipePage.prototype.onSubmit = function () {
        var value = this.recipeForm.value;
        var ingredients = [];
        if (value.ingredients.length > 0) {
            ingredients = value.ingredients.map(function (name) {
                return { name: name, amount: 1 };
            });
        }
        if (this.mode == 'Güncelle') {
            this.recipeServices.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
        }
        else {
            this.recipeServices.addRecipe(value.title, value.description, value.difficulty, ingredients);
        }
        this.recipeForm.reset();
        this.navCtrl.popToRoot();
    };
    EditRecipePage.prototype.ngOnInit = function () {
        this.mode = this.navParams.get('mode');
        if (this.mode == 'Güncelle') {
            this.recipe = this.navParams.get('recipe');
            this.index = this.navParams.get('index');
        }
        this.initializeForm();
    };
    EditRecipePage.prototype.onManageIngredients = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Ne Yapmak İstersin',
            buttons: [
                {
                    text: 'Malzeme Ekle',
                    handler: function () {
                        _this.createNewIngredientAlert().present();
                    }
                },
                {
                    text: 'Tüm Malzemeleri Sil?',
                    role: 'descructive',
                    handler: function () {
                        var fArray = _this.recipeForm.get('ingredients');
                        var len = fArray.length;
                        if (len > 0) {
                            for (var i = len - 1; i >= 0; i--) {
                                fArray.removeAt(i);
                            }
                            var toast = _this.toastCtrl.create({
                                message: 'Tüm Malzemeler Silindi?',
                                duration: 1000,
                                position: 'bottom'
                            });
                            toast.present();
                        }
                    }
                },
                {
                    text: 'İptal',
                    role: 'iptal'
                }
            ]
        });
        actionSheet.present();
    };
    EditRecipePage.prototype.createNewIngredientAlert = function () {
        var _this = this;
        return this.alertCtrl.create({
            title: 'Malzeme Ekle',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Malzeme'
                }
            ],
            buttons: [
                {
                    text: 'iptal',
                    role: 'cancel'
                },
                {
                    text: 'Ekle',
                    handler: function (data) {
                        if (data.name.trim() == '' || data.name == null) {
                            var toast_1 = _this.toastCtrl.create({
                                message: 'lütfen Doğru Bilgi Giriniz',
                                duration: 1000,
                                position: 'bottom'
                            });
                            toast_1.present();
                            return;
                        }
                        console.log(_this.recipeForm);
                        _this.recipeForm.get('ingredients')
                            .push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](data.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
                        var toast = _this.toastCtrl.create({
                            message: 'Yeni Malzeme Eklendi',
                            duration: 1000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }
            ]
        });
    };
    EditRecipePage.prototype.initializeForm = function () {
        var title = null;
        var description = null;
        var difficulty = 'Normal';
        var ingredients = [];
        if (this.mode == 'Güncelle') {
            title = this.recipe.title;
            description = this.recipe.description;
            difficulty = this.recipe.difficulty;
            for (var _i = 0, _a = this.recipe.ingredients; _i < _a.length; _i++) {
                var ingredient = _a[_i];
                ingredients.push(new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](ingredient.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required));
            }
        }
        this.recipeForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormGroup */]({
            'title': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](title, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'description': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](description, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'difficulty': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('Normal', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            'ingredients': new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormArray */](ingredients)
        });
    };
    EditRecipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-edit-recipe',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/edit-recipe/edit-recipe.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Tarif {{mode}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n<form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Tarif Adı</ion-label>\n      <ion-input type="text" formControlName="title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating> Açıklama</ion-label>\n      <ion-textarea formControlName="description"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Zorluk</ion-label>\n      <ion-select formControlName="difficulty">\n        <ion-option\n        *ngFor="let option of selectOptions"\n         [value]="option" >{{option}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <button type="button" clear ion-button block (click)="onManageIngredients()" >içindekiler</button>\n  <ion-list formArrayName="ingredients">\n    <ion-item *ngFor="let igControl  of recipeForm.get(\'ingredients\').controls;let i=index">\n      <ion-label floating>içindekiler</ion-label>\n      <ion-input type="text" [formControlName]="i"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button type="submit" ion-button block [disabled]="!recipeForm.valid">Tarif {{mode}}</button>\n</form>\n</ion-content>l\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/edit-recipe/edit-recipe.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__services_recipes__["a" /* RecipeServices */]])
    ], EditRecipePage);
    return EditRecipePage;
}());

//# sourceMappingURL=edit-recipe.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shopping_list_shopping_list__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipes_recipes__ = __webpack_require__(230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slPage = __WEBPACK_IMPORTED_MODULE_2__shopping_list_shopping_list__["a" /* ShoppingListPage */];
        this.recipesPage = __WEBPACK_IMPORTED_MODULE_3__recipes_recipes__["a" /* RecipesPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/tabs/tabs.html"*/'<ion-tabs>\n<ion-tab [root]="slPage" tabIcon="list-box" tabTitle="Alışveriş Listesi"></ion-tab>\n<ion-tab [root]="recipesPage" tabIcon="book" tabTitle="Tariflerim"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_ingredients__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AuthService__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_parse__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_parse__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ShoppingListService = /** @class */ (function () {
    function ShoppingListService(authService) {
        this.authService = authService;
        this.ingredients = [];
    }
    ShoppingListService.prototype.addItem = function (name, amount) {
        this.ingredients.push(new __WEBPACK_IMPORTED_MODULE_2__modals_ingredients__["a" /* Ingredient */](name, amount));
        console.log(this.ingredients);
    };
    ShoppingListService.prototype.addItems = function (items) {
        (_a = this.ingredients).push.apply(_a, items);
        var _a;
    };
    ShoppingListService.prototype.getItems = function () {
        return this.ingredients.slice();
    };
    ShoppingListService.prototype.removeItem = function (index) {
        this.ingredients.splice(index, 1);
    };
    ShoppingListService.prototype.addAlisverisListesi = function () {
        var AlisverisList = __WEBPACK_IMPORTED_MODULE_4_parse___default.a.Object.extend('ShoppingList');
        var uid = this.authService.currentUser().id;
        var alisverisList = new AlisverisList();
        for (var _i = 0, _a = this.ingredients; _i < _a.length; _i++) {
            var item = _a[_i];
            var i = 0;
            alisverisList.set('adi', item.name);
            alisverisList.set('miktari', item.amount);
            alisverisList.set('kullaniciId', uid);
            i++;
        }
        return alisverisList.save(null, {
            success: function (alisverisList) {
                return alisverisList;
            },
            error: function (alisverisList, error) {
                console.log(error);
                return error;
            }
        });
    };
    ShoppingListService.prototype.getAlisverisListesi = function (offset, limit) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 3; }
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var AlisverisList = __WEBPACK_IMPORTED_MODULE_4_parse___default.a.Object.extend('ShoppingList');
                var uid = _this.authService.currentUser().id;
                var query = new __WEBPACK_IMPORTED_MODULE_4_parse___default.a.Query(AlisverisList);
                //  query.skip(offset);
                // query.limit(limit);
                query.equalTo("kullaniciId", uid);
                query.find().then(function (alisverisListesi) {
                    resolve(alisverisListesi);
                }, function (error) {
                    reject(error);
                });
            }, 500);
        });
    };
    ShoppingListService.prototype.updateDeleteAlisverisList = function (ingredient, id, mode) {
        // //alısverisList Objesi oluştur.
        // const AlisverisList = Parse.Object.extend('ShoppingList');
        // let query = new Parse.Query(AlisverisList);
        // query.equalTo("kullaniciId",id);
        // query.find().then((alisverisListesi) => {
        //   success: function(item) {
        //     if(mode=='Güncelle')
        //     {
        //       item.set('isComplete',true);
        //       item.save();
        //     }else if(mode=='Sil')
        //     {
        //       item.remove(id);
        //     }
        // } (error) => {
        //   return error;
        // });
    };
    ShoppingListService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__AuthService__["a" /* AuthService */]])
    ], ShoppingListService);
    return ShoppingListService;
}());

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseOptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatabaseOptionsPage = /** @class */ (function () {
    function DatabaseOptionsPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    DatabaseOptionsPage.prototype.onAction = function (action) {
        console.log(action);
        this.viewCtrl.dismiss({ action: action });
    };
    DatabaseOptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-sl-options',
            template: "\n    <ion-grid text-center>\n      <ion-row>\n        <ion-col>\n          <h3>Depola ve Y\u00FCkle</h3>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button ion-button outline (click)=\"onAction('load')\">Kaydedilenler</button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button ion-button outline (click)=\"onAction('store')\">Kaydet</button>  \n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], DatabaseOptionsPage);
    return DatabaseOptionsPage;
}());

//# sourceMappingURL=database-options.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_recipes__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RecipePage = /** @class */ (function () {
    function RecipePage(navCtrl, navParams, slService, recipeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.slService = slService;
        this.recipeService = recipeService;
    }
    RecipePage.prototype.ngOnInit = function () {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
        console.log(this.recipe);
    };
    RecipePage.prototype.onEditRecipe = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'Güncelle', recipe: this.recipe, index: this.index });
    };
    RecipePage.prototype.onAddIngredients = function () {
        this.slService.addItems(this.recipe.ingredients);
    };
    RecipePage.prototype.onDeleteRecipe = function () {
        this.recipeService.removeRecipe(this.index, this.recipe.title);
        this.navCtrl.popToRoot();
    };
    RecipePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recipe',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/recipe/recipe.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{recipe.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-grid>\n  <ion-row>\n    <ion-col>\n      <h2>{{recipe.title}}</h2>\n      <div class="subTitle"> {{recipe.difficulty}} </div>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <p>{{recipe.description}}</p>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-list>\n        <ion-item *ngFor="let ingredient of recipe.ingredients">\n          {{\n            ingredient.name\n          }}\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n  <ion-row *ngIf="recipe.ingredients.length>0">\n    <ion-col>\n      <button ion-button clear (click)="onAddIngredients()" >Malzemeleri Alışveriş listesine Ekle</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <button ion-button outline block (click)="onEditRecipe()">Tarifi Güncelle</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n      <ion-col>\n        <button ion-button outline block (click)="onDeleteRecipe()" color="danger">Tarifi Sil</button>\n      </ion-col>\n    </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/recipe/recipe.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__["a" /* ShoppingListService */],
            __WEBPACK_IMPORTED_MODULE_4__services_recipes__["a" /* RecipeServices */]])
    ], RecipePage);
    return RecipePage;
}());

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecipesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_recipes__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe_recipe__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_options_database_options__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_AuthService__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RecipesPage = /** @class */ (function () {
    function RecipesPage(navCtrl, recipeService, popoverCtrl, alertCtrl, loadingCtrl, authService) {
        this.navCtrl = navCtrl;
        this.recipeService = recipeService;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
    }
    RecipesPage.prototype.ionViewWillEnter = function () {
        this.recipes = this.recipeService.getRecipes();
    };
    RecipesPage.prototype.onNewRecipe = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_recipe_edit_recipe__["a" /* EditRecipePage */], { mode: 'Ekle' });
    };
    RecipesPage.prototype.onLoadRecipe = function (recipe, index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__recipe_recipe__["a" /* RecipePage */], { recipe: recipe, index: index });
    };
    RecipesPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Lütfen Bekleyiniz...'
        });
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__database_options_database_options__["a" /* DatabaseOptionsPage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            if (data.action == 'load') {
                loading.present();
                _this.authService.getActiveUser().getIdToken()
                    .then(function (token) {
                    _this.recipeService.fetchList(token)
                        .subscribe(function (list) {
                        loading.dismiss();
                        if (list) {
                            _this.recipes = list;
                        }
                        else {
                            _this.recipes = [];
                        }
                    }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
            else if (data.action == 'store') {
                loading.present();
                _this.authService.getActiveUser().getIdToken()
                    .then(function (token) {
                    _this.recipeService.storeList(token)
                        .subscribe(function () { return loading.dismiss(); }, function (error) {
                        loading.dismiss();
                        _this.handleError(error.message);
                    });
                });
            }
        });
    };
    RecipesPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'Hata !',
            message: errorMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    RecipesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recipes',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/recipes/recipes.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n        <button ion-button icon-only menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n      </ion-buttons>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="onNewRecipe()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="onShowOptions($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Tariflerim</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<ion-list>\n  <button ion-item *ngFor="let recipe of recipes;let i=index" (click)="onLoadRecipe(recipe,index)">\n    <h2>{{recipe.title}}</h2>\n<ion-note>{{recipe.difficulty}}</ion-note>\n  </button>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/recipes/recipes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_recipes__["a" /* RecipeServices */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__services_AuthService__["a" /* AuthService */]])
    ], RecipesPage);
    return RecipesPage;
}());

//# sourceMappingURL=recipes.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_ingredients__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shopping_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__database_options_database_options__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_AuthService__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ShoppingListPage = /** @class */ (function () {
    function ShoppingListPage(slService, navCtrl, navParams, popoverCtrl, authService, loadingCtrl, alertCtrl) {
        this.slService = slService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    ShoppingListPage.prototype.ionViewWillEnter = function () {
        this.loadItems();
    };
    ShoppingListPage.prototype.onAddItem = function (form) {
        this.slService.addItem(form.value.malzemeler, form.value.miktar);
        form.reset();
        this.loadItems();
    };
    ShoppingListPage.prototype.onCheckItem = function (index) {
        this.slService.removeItem(index);
        this.loadItems();
    };
    ShoppingListPage.prototype.loadItems = function () {
        this.listItems = this.slService.getItems();
    };
    ShoppingListPage.prototype.onShowOptions = function (event) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Lütfen Bekleyiniz...'
        });
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__database_options_database_options__["a" /* DatabaseOptionsPage */]);
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (!data) {
                return;
            }
            if (data.action == 'load') {
                loading.present();
                var offset = _this.listItems.length;
                var limit = 10;
                return _this.slService.getAlisverisListesi(offset, limit).then(function (result) {
                    for (var i = 0; i < result.length; i++) {
                        var object = result[i];
                        console.log('adi:' + object.get('adi'));
                        _this.listItems.push(new __WEBPACK_IMPORTED_MODULE_2__modals_ingredients__["a" /* Ingredient */](object.get('adi'), object.get('miktari')));
                    }
                    console.log(result);
                    loading.dismiss();
                }, function (error) {
                    console.log(error);
                    _this.handleError(error.message);
                });
            }
            else if (data.action == 'store') {
                loading.present();
                _this.slService.addAlisverisListesi().then(function (alisverisList) {
                    _this.listItems.push(alisverisList);
                    loading.dismiss();
                }, function (error) {
                    console.log(error);
                    _this.handleError(error.message);
                });
            }
        });
    };
    ShoppingListPage.prototype.handleError = function (errorMessage) {
        var alert = this.alertCtrl.create({
            title: 'Hata !',
            message: errorMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    ShoppingListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shopping-list',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/shopping-list/shopping-list.html"*/'<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n      <ion-buttons>\n       <button ion-button icon-only (click)="onShowOptions($event)">\n         <ion-icon name="more"></ion-icon>\n       </button>\n     </ion-buttons>\n    <ion-title>Alışveriş Listesi</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<form #f="ngForm" (ngSubmit)="onAddItem(f)">\n  <ion-list>\n    <ion-item>\n      <ion-label fixed >Malzemeler</ion-label>\n      <ion-input type="text" name="malzemeler" placeholder="süt" ngModel></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label fixed >Miktar</ion-label>\n      <ion-input type="Number" name="miktar" placeholder="2" ngModel></ion-input>\n      <!-- <ion-select name="miktarOlcu" >\n        <ion-option value="l" [selected]="true" >Litre</ion-option>\n        <ion-option value="a">Adet</ion-option>\n      </ion-select> -->\n    </ion-item>\n  </ion-list>\n  <button ion-button type="submit" block [disabled]="!f.valid" >Ekle</button>\n</form>\n<ion-list>\n  <ion-item *ngFor="let item of listItems;let i=index" (click)="onCheckItem(i)">\n    <h3>{{item.name}}({{item.amount}})</h3>\n  </ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/shopping-list/shopping-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_shopping_list__["a" /* ShoppingListService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_5__services_AuthService__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ShoppingListPage);
    return ShoppingListPage;
}());

//# sourceMappingURL=shopping-list.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AuthService__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SigninPage = /** @class */ (function () {
    function SigninPage(authService, loadingCtrl, alertCtrl, navCtrl) {
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
    }
    SigninPage.prototype.onSignin = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Giriş Başarılı'
        });
        loading.present();
        this.authService.signin(form.value.email, form.value.password)
            .then(function (data) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            loading.dismiss();
        }).catch(function (error) {
            loading.dismiss();
            var alertCtrl = _this.alertCtrl.create({
                title: 'Giriş Başarısız!',
                message: error.message,
                buttons: ['ok']
            });
            alertCtrl.present();
        });
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/signin/signin.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>Giriş Yap</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSignin(f)" >\n    <ion-list>\n      <ion-item>\n        <ion-label fixed>Mail</ion-label>\n        <ion-input type="email" ngModel name="email" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label fixed>Şifre</ion-label>\n        <ion-input type="password" ngModel name="password" required></ion-input>\n      </ion-item>\n  \n    </ion-list>\n    <button ion-button block type="submit" [disabled]="!f.valid">Giriş Yap</button>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/signin/signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_AuthService__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AuthService__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = /** @class */ (function () {
    function SignupPage(authService, loadingCtrl, alertCtrl) {
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    SignupPage.prototype.onSignup = function (form) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Kayıdınız Başarılı'
        });
        loading.present();
        this.authService.signup(form.value.email, form.value.password)
            .then(function (data) { loading.dismiss(); })
            .catch(function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Kayıt Başarısız',
                message: error.message,
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/signup/signup.html"*/'<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button icon-only menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title>Kayıt Ol</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="onSignup(f)" >\n    <ion-list>\n      <ion-item>\n        <ion-label fixed>Mail</ion-label>\n        <ion-input type="email" ngModel name="email" required></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label fixed>Şifre</ion-label>\n        <ion-input type="password" ngModel name="password" required [minlength]="6"></ion-input>\n      </ion-item>\n  \n    </ion-list>\n    <button ion-button block type="submit" [disabled]="!f.valid">Kayıt ol</button>\n    </form>\n</ion-content>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_AuthService__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 244:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 244;

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/edit-recipe/edit-recipe.module": [
		862,
		6
	],
	"../pages/recipe/recipe.module": [
		863,
		5
	],
	"../pages/recipes/recipes.module": [
		864,
		4
	],
	"../pages/shopping-list/shopping-list.module": [
		865,
		3
	],
	"../pages/signin/signin.module": [
		866,
		2
	],
	"../pages/signup/signup.module": [
		867,
		1
	],
	"../pages/tabs/tabs.module": [
		868,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 288;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ingredient; });
var Ingredient = /** @class */ (function () {
    function Ingredient(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    return Ingredient;
}());

//# sourceMappingURL=ingredients.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(460);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_edit_recipe_edit_recipe__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_recipe_recipe__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_recipes_recipes__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_shopping_list_shopping_list__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_shopping_list__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_recipes__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_AuthService__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_database_options_database_options__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_common_http__ = __webpack_require__(315);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_recipe_recipe__["a" /* RecipePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recipes_recipes__["a" /* RecipesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__["a" /* SigninPage */], __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */], __WEBPACK_IMPORTED_MODULE_16__pages_database_options_database_options__["a" /* DatabaseOptionsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/edit-recipe/edit-recipe.module#EditRecipePageModule', name: 'EditRecipePage', segment: 'edit-recipe', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recipe/recipe.module#RecipePageModule', name: 'RecipePage', segment: 'recipe', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recipes/recipes.module#RecipesPageModule', name: 'RecipesPage', segment: 'recipes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/shopping-list/shopping-list.module#ShoppingListPageModule', name: 'ShoppingListPage', segment: 'shopping-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signin/signin.module#SigninPageModule', name: 'SigninPage', segment: 'signin', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_edit_recipe_edit_recipe__["a" /* EditRecipePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_recipe_recipe__["a" /* RecipePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_recipes_recipes__["a" /* RecipesPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_shopping_list_shopping_list__["a" /* ShoppingListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */], __WEBPACK_IMPORTED_MODULE_16__pages_database_options_database_options__["a" /* DatabaseOptionsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */],
                    useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */]
                },
                __WEBPACK_IMPORTED_MODULE_11__services_shopping_list__["a" /* ShoppingListService */],
                __WEBPACK_IMPORTED_MODULE_12__services_recipes__["a" /* RecipeServices */], __WEBPACK_IMPORTED_MODULE_15__services_AuthService__["a" /* AuthService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Recipe; });
var Recipe = /** @class */ (function () {
    function Recipe(title, description, difficulty, ingredients) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.ingredients = ingredients;
    }
    return Recipe;
}());

//# sourceMappingURL=recipe.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_parse__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_parse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modals_user__ = __webpack_require__(559);


var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.signup = function (email, password) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.signUp(email, password).then(function (resp) {
            _this.addAdminRole();
            console.log('Signed up successfully', resp);
            _this.isSigningup = false;
        }, function (err) {
            _this.isSigningup = true;
        });
        //return firebase.auth().createUserWithEmailAndPassword(email,password);
    };
    AuthService.prototype.signin = function (email, password) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.logIn(email, password).then(function (resp) {
            console.log('Signed İn successfully', resp);
            _this.isSigningup = true;
        }, function (err) {
            _this.isSigningup = false;
        });
        //  return firebase.auth().signInWithEmailAndPassword(email,password);
    };
    AuthService.prototype.logout = function () {
        __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.logOut();
    };
    AuthService.prototype.currentUser = function () {
        var u = __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.current();
        if (u) {
            var user = new __WEBPACK_IMPORTED_MODULE_1__modals_user__["a" /* User */](u.id, u.get('username'), u.get('email'));
            console.log(user);
            return user;
        }
    };
    AuthService.prototype.getActiveUser = function () {
        return __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.current.id;
    };
    AuthService.prototype.onAuthStateChanged = function () {
        return this.isSigningup;
    };
    AuthService.prototype.addRoleForUser = function () {
        var user = __WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.current;
        var role = new __WEBPACK_IMPORTED_MODULE_0_parse___default.a.ACL(__WEBPACK_IMPORTED_MODULE_0_parse___default.a.User.current);
        role.setRoleReadAccess("admin", true);
        role.setRoleWriteAccess("admin", true);
        user.setACL(role);
        user.save(null, { useMasterKey: true });
    };
    AuthService.prototype.addAdminRole = function () {
        //create admin role
        var adminRoleACL = new __WEBPACK_IMPORTED_MODULE_0_parse___default.a.ACL();
        adminRoleACL.setPublicReadAccess(false);
        adminRoleACL.setPublicWriteAccess(false);
        adminRoleACL.set;
        var adminRole = new __WEBPACK_IMPORTED_MODULE_0_parse___default.a.Role("admin", adminRoleACL);
        adminRole.save();
    };
    AuthService.prototype.updateUser = function (user) {
    };
    AuthService.prototype.addUserRole = function () {
        //create admin role
        var adminRoleACL = new __WEBPACK_IMPORTED_MODULE_0_parse___default.a.ACL();
        adminRoleACL.setPublicReadAccess(false);
        adminRoleACL.setPublicWriteAccess(false);
        var adminRole = new __WEBPACK_IMPORTED_MODULE_0_parse___default.a.Role("user", adminRoleACL);
        adminRole.save();
    };
    return AuthService;
}());

//# sourceMappingURL=AuthService.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_parse__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_parse___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_parse__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_AuthService__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, authSrvCtrl) {
        this.menuCtrl = menuCtrl;
        this.authSrvCtrl = authSrvCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.signinPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        this.signupPage = __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */];
        this.isAuthenticated = false;
        console.log('APP.COMPONENT');
        // firabase.initializeApp(
        //   {
        //     apiKey: "AIzaSyAmXqbbPnFytefF7yuzMV7gkR9ZgaByxIo",
        //     authDomain: "yemektariflerim-e8ca5.firebaseapp.com"
        //   }
        // );
        __WEBPACK_IMPORTED_MODULE_7_parse___default.a.serverURL = 'https://parseapi.back4app.com/';
        __WEBPACK_IMPORTED_MODULE_7_parse___default.a.initialize("1PDfxOZaIcldS56Ue0tagvjq98GGyaRK7ptOtbZN", "4sRePMpTCmRs2cxOPf1WsOeIyHUVsXBzF7RdnQNu");
        if (authSrvCtrl.onAuthStateChanged()) {
            console.log('BAŞARILI');
            this.isAuthenticated = true;
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        }
        else {
            console.log('BAŞARISIZ');
            this.isAuthenticated = false;
            this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        }
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.onLoad = function (page) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    };
    MyApp.prototype.onLogout = function () {
        this.authSrvCtrl.logout();
        this.menuCtrl.close();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/app/app.html"*/'<ion-menu [content]="nav">\n    <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        \n        </ion-toolbar>\n    </ion-header>\n    <ion-content>\n        <ion-list>\n            <button ion-item icon-left (click)="onLoad(rootPage)" *ngIf="isAuthenticated" >\n                <ion-icon name="book"></ion-icon> Tarif Defterim</button>\n            <button ion-item icon-left (click)="onLoad(signinPage)" *ngIf="!isAuthenticated" >\n                <ion-icon name="log-in"></ion-icon>Giriş Yap</button>\n            <button ion-item icon-left (click)="onLoad(signupPage)" *ngIf="!isAuthenticated" >\n                        <ion-icon name="person"></ion-icon>Kayıt Ol</button>     \n            <button ion-item icon-left (click)="onLogout()" *ngIf="isAuthenticated">\n                        <ion-icon name="log-out"></ion-icon>Çıkış</button>\n        </ion-list>\n    </ion-content>\n</ion-menu>\n<ion-nav [root]="rootPage" #nav></ion-nav>\n'/*ion-inline-end:"/home/seref/devseref/ionicworkspace/recipes/ionic-basics-back4filedb/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8__services_AuthService__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[455]);
//# sourceMappingURL=main.js.map