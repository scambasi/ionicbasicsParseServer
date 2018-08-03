import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import Parse from 'parse';
import { AuthService } from '../services/AuthService';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage=SigninPage;
  signupPage=SignupPage;
  isAuthenticated=false;
  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, 
    statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl:MenuController,
    private authSrvCtrl:AuthService) {
      console.log('APP.COMPONENT')
  // firabase.initializeApp(
  //   {
      
  //     apiKey: "AIzaSyAmXqbbPnFytefF7yuzMV7gkR9ZgaByxIo",
  //     authDomain: "yemektariflerim-e8ca5.firebaseapp.com"
    
  //   }
  // );
  Parse.serverURL = 'https://parseapi.back4app.com/';
  Parse.initialize("1PDfxOZaIcldS56Ue0tagvjq98GGyaRK7ptOtbZN", "4sRePMpTCmRs2cxOPf1WsOeIyHUVsXBzF7RdnQNu");
   if(authSrvCtrl.onAuthStateChanged())
   {
      console.log('BAŞARILI');
      this.isAuthenticated=true;
      this.rootPage=TabsPage;
       
   }
   else
   {
        console.log('BAŞARISIZ');
        this.isAuthenticated=false; 
        this.rootPage=SigninPage;
       
    
   }
    platform.ready().then(() =>
    {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  onLoad(page:any)
  {
   this.nav.setRoot(page);
   this.menuCtrl.close();
  }
  onLogout()
  {
    this.authSrvCtrl.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);

  }
}

