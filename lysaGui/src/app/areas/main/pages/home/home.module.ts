import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Views
import { ViewerViewModule } from "../../views/viewer/viewer.module";

// Components
import { HomePageComponent } from "./home.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ViewerViewModule,
    ],
    declarations: [
        HomePageComponent
    ],
    providers: [
    ]
})
export class HomePageModule
{
}
