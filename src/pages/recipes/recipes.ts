import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../modals/recipe';
import { RecipeServices } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/AuthService';


@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes:Recipe[];
  constructor(private navCtrl:NavController,
    private recipeService:RecipeServices,
    private popoverCtrl:PopoverController,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private authService:AuthService) {
  }
  ionViewWillEnter()
  {
    this.recipes=this.recipeService.getRecipes();
  }
  onNewRecipe()
  {
    this.navCtrl.push(EditRecipePage,{mode:'Ekle'});
  }
  onLoadRecipe(recipe:Recipe,index:number)
  {
    this.navCtrl.push(RecipePage,{recipe:recipe,index:index});
  } 
  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Lütfen Bekleyiniz...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipeService.fetchList(token)
                  .subscribe(
                    (list: any) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.message);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getIdToken()
            .then(
              (token: string) => {
                this.recipeService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.message);
                    }
                  );
              }
            );
        }
      }
    );
  }
  private handleError(errorMessage:string)
  {
    const alert=this.alertCtrl.create(
      {
        title:'Hata !',
        message:errorMessage,
        buttons:['OK']
      }
    );
    alert.present();
  }

}
