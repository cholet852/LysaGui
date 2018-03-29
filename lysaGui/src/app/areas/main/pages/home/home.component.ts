import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component( {
    templateUrl: "./home.component.html"
} )
export class HomePageComponent implements OnInit
{
    //#region Fields

    //#endregion

    //#region View Fields

    //#endregion

    //#region Constructor

    public constructor(
        private route: ActivatedRoute,
        private router: Router
    )
    {
    }

    //#endregion

    //#region Interfaces

    public ngOnInit(): void
    {
        this.route.params.subscribe(( params: Params ) =>
        {
            
        });
    }

    //#endregion

    //#region Methods

    //#endregion
}
