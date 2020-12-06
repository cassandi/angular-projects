import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// https://console.firebase.google.com/u/0/project/apartment-audit-d5a03/settings/general/web:OWEzN2FmNmEtYTdkYi00NDQ0LTliMmYtN2FlMTdkZmViNzQw

const config = {
  apiKey: "AIzaSyBxettZNQ1YkF8tHSAqigYIaugEPOHYZqk",
  authDomain: "apartment-audit-d5a03.firebaseapp.com",
  databaseURL: "https://apartment-audit-d5a03.firebaseio.com",
  projectId: "apartment-audit-d5a03",
  storageBucket: "apartment-audit-d5a03.appspot.com",
  messagingSenderId: "969388615077",
  appId: "1:969388615077:web:d1ba0fafd7aac920f8b44c",
  measurementId: "G-DLFF9M3NTG"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

