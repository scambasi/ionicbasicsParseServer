import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { RecipeServices } from '../../services/recipes';
import { Recipe } from '../../modals/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode='Ekle';
  selectOptions=['Kolay','Normal','Zor'];
  recipeForm:FormGroup;
  recipe:Recipe;
  index:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl:ActionSheetController,private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private recipeServices:RecipeServices
  ) {
  }
  onSubmit()
  {
    const value=this.recipeForm.value;
    let ingredients=[];
    if(value.ingredients.length>0)
    {
      ingredients=value.ingredients.map(name=>{
        return {name:name,amount:1};
      })

    }
    if(this.mode=='Güncelle')
    {
      this.recipeServices.updateRecipe(this.index,value.title,value.description,
        value.difficulty,ingredients);
    }else{
    this.recipeServices.addRecipe(value.title,value.description,
      value.difficulty,ingredients);
    }
      this.recipeForm.reset();
      this.navCtrl.popToRoot();
  }
  ngOnInit()
  {
    this.mode=this.navParams.get('mode');
    if(this.mode=='Güncelle')
    {
      this.recipe=this.navParams.get('recipe');
      this.index=this.navParams.get('index');
    }

    this.initializeForm();
  }
  onManageIngredients()
  {
    const actionSheet=this.actionSheetCtrl.create({
      title:'Ne Yapmak İstersin',
      buttons:[
        {
          text:'Malzeme Ekle',
          handler:()=>{
            this.createNewIngredientAlert().present();
          }
        },
        {
            text:'Tüm Malzemeleri Sil?',
            role:'descructive',
            handler:()=>{
              const fArray:FormArray=<FormArray>this.recipeForm.get('ingredients');
              const len=fArray.length;
              if(len>0)
              {
                for(let i=len-1;i>=0;i--)
                {
                  fArray.removeAt(i);
                }
                const toast=this.toastCtrl.create({
                  message:'Tüm Malzemeler Silindi?',
                  duration:1000,
                  position:'bottom'
  
                });
                toast.present();
              }
            }
        },
        {
          text:'İptal',
          role:'iptal'

        }
      ]
    });
    actionSheet.present();
  }
  private createNewIngredientAlert()
  {
   return this.alertCtrl.create({
      title:'Malzeme Ekle',
      inputs:[
        {
          name:'name',
          placeholder:'Malzeme'
        }
      ],
      buttons:[
        {
          text:'iptal',
          role:'cancel'
        },
        {
          text:'Ekle',
          handler:data=>{
            if(data.name.trim()=='' || data.name==null)
            {
              const toast=this.toastCtrl.create({
                message:'lütfen Doğru Bilgi Giriniz',
                duration:1000,
                position:'bottom'

              });
              toast.present();
              return;
            }
            console.log(this.recipeForm);
            (<FormArray>this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name,Validators.required));
            const toast=this.toastCtrl.create({
              message:'Yeni Malzeme Eklendi',
              duration:1000,
              position:'bottom'

            });
            toast.present();
          }
          
        }
      ]
    });
  }
  private initializeForm()
  {
    let title=null;
    let description=null;
    let difficulty='Normal';
    let ingredients=[];
    if(this.mode=='Güncelle')
    {
      title=this.recipe.title;
      description=this.recipe.description;
      difficulty=this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients)
      {
        ingredients.push(new FormControl(ingredient.name,Validators.required));
      }
    } 
    this.recipeForm=new FormGroup({
      'title':new FormControl(title,Validators.required),
      'description':new FormControl(description,Validators.required),
      'difficulty':new FormControl('Normal',Validators.required),
      'ingredients':new FormArray(ingredients)
    });
  }
}
