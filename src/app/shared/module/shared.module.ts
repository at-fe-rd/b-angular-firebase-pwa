import { TranslateModule } from '@ngx-translate/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HeaderModule } from '../layout/header/header.module';
import { LoadingDirective } from '../directive/loading/loading.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    TranslateModule,
    HeaderModule
  ],
  declarations: [
    LoadingDirective
  ],
  exports: [
    LoadingDirective,
    HeaderModule,
    RouterModule,
    TranslateModule,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}
