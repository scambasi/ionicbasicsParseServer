
import { Injectable } from "@angular/core";

import 'rxjs/Rx';


import { Ingredient } from "../modals/ingredients";
import { AuthService } from "./AuthService";
import { Recipe } from "../modals/recipe";

import Parse from 'parse';
import { User } from "../modals/user";

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
private user:User;
  constructor(
    private authService: AuthService) {
  }

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
  public addAlisverisListesi(): Promise<any> {
    const AlisverisList = Parse.Object.extend('ShoppingList');
    var uid= this.authService.currentUser().id;
    let alisverisList = new AlisverisList();
    for(let item of this.ingredients)
    {
      var i=0;
      
      alisverisList.set('adi',item.name);
      alisverisList.set('miktari',item.amount );
      alisverisList.set('kullaniciId',uid );
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
}
public getAlisverisListesi(offset: number = 0, limit: number = 3): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const AlisverisList = Parse.Object.extend('ShoppingList');
      var uid= this.authService.currentUser().id;
      let query = new Parse.Query(AlisverisList);
    //  query.skip(offset);
     // query.limit(limit);
      query.equalTo("kullaniciId",uid);
      query.find().then((alisverisListesi) => {
        resolve(alisverisListesi);
      }, (error) => {
        reject(error);
      });
    }, 500);
  });
}
public updateDeleteAlisverisList(ingredient:Ingredient,id:string,mode:string){
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

}
 
}