import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { MainAreaComponent } from "./main.component";

// Pages
import { HomePageComponent } from "./pages/home/";

// Guards

const appRoutes: Routes = [
    {
        path: "",
        canActivate: [
        ],
        component: MainAreaComponent,
        children: [
            {
                path: "",
                component: HomePageComponent
            },
            {
                component: HomePageComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainAreaRoutingModule
{
}
