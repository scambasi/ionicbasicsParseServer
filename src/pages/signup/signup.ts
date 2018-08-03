import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/AuthService';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService:AuthService,
    private loadingCtrl:LoadingController,
  private alertCtrl:AlertController)
  {

  }
  onSignup(form:NgForm)
  {
    const loading=this.loadingCtrl.create({
      content:'Kayıdınız Başarılı'
    });
    loading.present();
    this.authService.signup(form.value.email,form.value.password)
      .then(data=>{loading.dismiss();})
      .catch(error=>{loading.dismiss();
      const alert=this.alertCtrl.create({
          title:'Kayıt Başarısız',
          message:error.message,
          buttons:['Ok']
      });
      alert.present();
    });

  }

}
