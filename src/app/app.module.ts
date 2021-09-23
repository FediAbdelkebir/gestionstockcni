import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthHttpInterceptorServiceService} from './auth-http-interceptor-service.service'
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import { AccountComponent } from './account/account.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { MagasinComponent } from './magasin/magasin.component';
import { MagasinListComponent } from './magasin-list/magasin-list.component';
import { ArticleListComponent } from './article-list/article-list.component';
import {ArticleComponent} from './article/article.component';
import { StructureComponent } from './structure/structure.component';
import { StructureListComponent } from './structure-list/structure-list.component';
import { CommandeComponent } from './commande/commande.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { GestionBCEComponent } from './gestion-bce/gestion-bce.component';
import { CommandebceComponent } from './commandebce/commandebce.component';
import { StatisticsComponent } from './statistics/statistics.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SousStructureComponent } from './sous-structure/sous-structure.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    AcceuilComponent,
    CustomerListComponent,
    AccountComponent,
    FournisseurComponent,
    DashboardComponent,
    FournisseurListComponent,
    MagasinComponent,
    MagasinListComponent,
    ArticleListComponent,
    ArticleComponent,
    StructureComponent,
    StructureListComponent,
    CommandeComponent,
    CommandeListComponent,
    GestionBCEComponent,
    CommandebceComponent,
    StatisticsComponent,
    SousStructureComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    SnotifyModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'customerlist',
        component:CustomerListComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'navbar',
        component:NavbarComponent
      }
      ,
      {
        path:'account',
        component:AccountComponent
      }
      ,
      {
        path:'Acceuil',
        component:AcceuilComponent
      },
      {
        path:'fournisseur',
        component:FournisseurComponent
      }
      ,
      {
        path:'dashboard',
        component:DashboardComponent
      }
      ,
      {
        path:'listfournisseurs',
        component:FournisseurListComponent
      }
      ,
      {
        path:'Commande',
        component:CommandeComponent
      }
      ,
      {
        path:'Commmandebce',
        component:CommandebceComponent
      }
    ]),
  ],
  providers: [
    {  
      provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptorServiceService, multi:true 
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService

    ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
