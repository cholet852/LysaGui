type ICallable = (...args: any[]) => any;

declare module THREE
{
    class EventDispatcher
    {
        public dispatchEvent(event: any): void;

        public addEventListener(name: string, handler: ICallable): void;
    }
}

declare class ViewManager
{
    public constructor(domElement3D: any, eventDispatcher: THREE.EventDispatcher);
}