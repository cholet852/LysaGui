import { Component, ElementRef, HostListener, Input, OnInit } from "@angular/core";

// Services
import { DispatcherService } from "../../dispatcher.service";

@Component({
    selector: "app-viewer",
    templateUrl: "./viewer.component.html",
    styleUrls: ["./viewer.component.css"]
})
export class ViewerViewComponent implements OnInit
{
    //#region Inputs

    //#endregion

    //#region Fields

    private viewManager: ViewManager;

    //#endregion

    //#region Constructor

    public constructor(
        private element: ElementRef,
        private dispatcherService: DispatcherService
    )
    {
    }

    //#endregion

    //#region Interfaces

    public ngOnInit(): void
    {
        this.viewManager = new ViewManager(this.element.nativeElement, this.dispatcherService.eventDispatcher);

        const win: any = window;

        win.viewManager = this.viewManager;
    }

    //#endregion

    //#region Methods

    //#endregion

    //#region Private Methods

    //#endregion
}
