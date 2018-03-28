import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";

// Areas
import { MainAreaModule } from "./areas/main/main.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MainAreaModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule
{
}
