import { Injectable } from "@angular/core";

import { Recipe } from "../modals/recipe";
import { Ingredient } from "../modals/ingredients";
import { AuthService } from "./AuthService";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import Parse from 'parse';
import { updateDate } from "ionic-angular/umd/util/datetime-util";

@Injectable()
export class RecipeServices
{
    private recipes:Recipe[]=[];
        constructor(private authService:AuthService,private http: HttpClient)
        {
            
        }
    addRecipe(title:string,description:string,
        difficulty:string,
        ingredients:Ingredient[])
    {
        this.recipes.push(new Recipe(title,description,difficulty,ingredients));
        console.log('added',this.recipes);
        const TarifList = Parse.Object.extend('Recipe');
        var uid= this.authService.currentUser().id;
        let tarifList = new TarifList();
  
      
      tarifList.set('title',title);
      tarifList.set('ingredients',ingredients);
      tarifList.set('difficulty',difficulty);
      tarifList.set('description',description);
      tarifList.set('kullaniciId',uid );
    return tarifList.save(null, {
      success: function (tarifList) {
        return tarifList;
      },
      error: function (tarifList, error) {
        console.log(error);
        return error;
      }
    });
    }
    getRecipes()
    {
        return this.recipes.slice();

              const TarifList = Parse.Object.extend('Recipe');
              var uid= this.authService.currentUser().id;
              let query = new Parse.Query(TarifList);
              query.equalTo("kullaniciId",uid);
              query.find().then((tariflerim) => {
                console.log(tariflerim);
              }, (error) => {
                console.log(error);
              });
     
    }
    updateRecipe(index:number,title:string,description:string,
        difficulty:string,
        ingredients:Ingredient[])
    {
            this.recipes[index]=new Recipe(title,description,difficulty,ingredients);
            console.log('updated listesi',this.recipes);
            console.log('first recipe'+this.recipes[0].title);
            const TarifList = Parse.Object.extend('Recipe');
              let query = new Parse.Query(TarifList);
              query.equalTo("title",this.recipes[0].title);
              query.first({
                  
                success:function(recipe)
                {
                    console.log('FIRST RECİPE: '+recipe.get('title'));
                    if(recipe)
                    {
                        
                        recipe.set('title','1321321');
                        recipe.set('difficulty','zor');
                        recipe.save(null,{
                            success:function(recipe)
                            {
                                console.log('UPDATE RECİPE'+recipe.get('title'));
                            },
                            error:function(error)
                            {
                                console.log('error'+error.message);
                            }
                        });
                    
        
                    }
                    else
                    {
                        console.log('error');
                        
                    }
                }
              });
              
    }
    removeRecipe(index:number,title:string)
    {
        this.recipes.splice(index,1);

        const TarifList = Parse.Object.extend('Recipe');
        let query = new Parse.Query(TarifList);
        query.equalTo("title",title);
        query.first({
          success:function(recipe)
          {
              if(recipe)
              {
                  console.log('FIRST RECİPE: '+recipe.get('title'));
            
                  recipe.destroy({
                      success:function(recipe)
                      {
                          console.log('DELETED RECİPE'+recipe.get('title'));
                      },
                      error:function(error)
                      {
                          console.log('error'+error.message);
                      }
                  });
              
  
              }
              else
              {
                  console.log('error');
                  
              }
          }
        });
    }
    storeList(token:string)
    {
       const userId=this.authService.getActiveUser().uid;
       return this.http.put('https://yemektariflerim-e8ca5.firebaseio.com/'+userId+'/recipes.json?auth='
       +token,this.recipes); 
    }
    fetchList(token:string)
    {
        const userId=this.authService.getActiveUser().uid;
        return this.http.get('https://yemektariflerim-e8ca5.firebaseio.com/'
        +userId+'/recipes.json?auth='+token).
        map((response:Response)=>
      {
        const recipes:any=response.json()?response.json():[];
        for(let item of recipes)
        {
          if(!item.hasOwnProperty('ingredients'))
          {
            item.ingredients=[];
          }
        }
      return recipes;
      }).do((recipes:any)=>{
            if(recipes)
            {
                this.recipes=recipes;

            }else
            {
                this.recipes=[];
            }
        });
    }

}