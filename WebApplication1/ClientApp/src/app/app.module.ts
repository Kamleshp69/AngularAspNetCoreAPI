import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
        MatIconModule, 
        MatSidenavModule, 
        MatListModule, 
        MatButtonModule, 
        MatTableModule, 
        MatTooltipModule, 
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule, 
        MatCardModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnumKeyValuePipe } from './enumKeyValue.pipe';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    PoliciesComponent,
    PolicyComponent,
    EnumKeyValuePipe
    ],
  imports: [HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
