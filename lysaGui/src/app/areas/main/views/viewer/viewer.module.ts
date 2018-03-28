import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Views
import { ViewerViewComponent } from "./viewer.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ViewerViewComponent
    ],
    exports: [
        ViewerViewComponent
    ]
})
export class ViewerViewModule
{
}