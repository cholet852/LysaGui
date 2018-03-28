import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import { MainAreaComponent } from "./main.component";

// Modules
import { MainAreaRoutingModule } from "./main.routing.module";

// Pages
import { HomePageModule } from "./pages/home";

// Services
import { DispatcherService } from "./dispatcher.service";

@NgModule({
    imports: [
        CommonModule,
        HomePageModule,
        MainAreaRoutingModule
    ],
    providers: [
        DispatcherService
    ],
    declarations: [
        MainAreaComponent
    ]
})
export class MainAreaModule
{
}
