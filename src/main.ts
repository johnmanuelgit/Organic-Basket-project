import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { AuthInterceptor } from './app/auth.interceptor'; // ✅ import your interceptor

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // required for HttpClient
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ),
    appConfig.providers
  ]
}).catch((err) => console.error(err));
