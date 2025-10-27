import 'zone.js';
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, {
    providers: [
      importProvidersFrom(BrowserModule, HttpClientModule)
    ]
  }, context);

export default bootstrap;
