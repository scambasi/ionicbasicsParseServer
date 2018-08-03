import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../modals/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeServices } from '../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe:Recipe;
  index:number;

  constructor
  (public navCtrl: NavController, public navParams: NavParams,
    private slService:ShoppingListService,
    private recipeService:RecipeServices) {
  }
  ngOnInit()
  {
   this.recipe=this.navParams.get('recipe');
   this.index=this.navParams.get('index'); 
   console.log(this.recipe);
  }
  onEditRecipe()
  {
    this.navCtrl.push(EditRecipePage,{mode:'Güncelle',recipe:this.recipe,index:this.index}); 
    
  }
  onAddIngredients()
  {
    this.slService.addItems(this.recipe.ingredients);

  }
  onDeleteRecipe()
  {
    this.recipeService.removeRecipe(this.index,this.recipe.title);
    this.navCtrl.popToRoot();
  }
}
