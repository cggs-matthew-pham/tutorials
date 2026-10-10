// Practice actions for the Machine Learning blocks (micro:bit CreateAI's MakeCode extension), defined the way
// CreateAI's own projects define the actions you train. The simulator's ML panel lets students pick an action, so
// lessons can run "on ML ... start" code without a model. On a real micro:bit, use the project CreateAI makes instead.
namespace ml {
    export namespace event {
        //% fixedInstance block="still"
        export const Still = new MlEvent(2, "still");
        //% fixedInstance block="walking"
        export const Walking = new MlEvent(3, "walking");
        //% fixedInstance block="running"
        export const Running = new MlEvent(4, "running");
        //% fixedInstance block="jumping"
        export const Jumping = new MlEvent(5, "jumping");
        //% fixedInstance block="waving"
        export const Waving = new MlEvent(6, "waving");
        //% fixedInstance block="clapping"
        export const Clapping = new MlEvent(7, "clapping");
    }
    events = [event.Unknown, event.Still, event.Walking, event.Running, event.Jumping, event.Waving, event.Clapping];
}
