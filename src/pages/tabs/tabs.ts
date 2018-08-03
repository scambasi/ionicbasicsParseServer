import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipePage } from '../recipe/recipe';
import { RecipesPage } from '../recipes/recipes';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  slPage=ShoppingListPage;
  recipesPage=RecipesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 

}
