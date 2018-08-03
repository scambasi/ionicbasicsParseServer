import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Depola ve Yükle</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onAction('load')">Kaydedilenler</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onAction('store')">Kaydet</button>  
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class DatabaseOptionsPage {
  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    console.log(action);
    this.viewCtrl.dismiss({action: action});
  }
}
