import { Injectable } from "@angular/core";

@Injectable()
export class DispatcherService
{
    public eventDispatcher: THREE.EventDispatcher;
    public isListenedKeyUp: boolean = true;

    public constructor()
    {
        this.eventDispatcher = new THREE.EventDispatcher();
    }
}