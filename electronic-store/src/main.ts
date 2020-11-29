import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// NOTE: had to add below code to force service worker to register
// and serve files from local host using http://192.168.0.16:8080/ - see https://www.chromium.org/blink/serviceworker/service-worker-faq

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('./ngsw-worker.js');
}
