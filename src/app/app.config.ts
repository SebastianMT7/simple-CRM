import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-9dad5","appId":"1:449497711513:web:6a3a1ab06d4026c44ec908","storageBucket":"simple-crm-9dad5.appspot.com","apiKey":"AIzaSyBhsv5pPLXvdeZ84pPPotkbcH4UoqwamKQ","authDomain":"simple-crm-9dad5.firebaseapp.com","messagingSenderId":"449497711513"})), 
    provideFirestore(() => getFirestore())]
};
