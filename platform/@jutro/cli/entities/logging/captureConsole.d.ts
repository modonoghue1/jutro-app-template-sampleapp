export function captureConsole(): {
    hasStarted: () => boolean;
    startCapture: () => void;
    stopCapture: () => void;
    startIntercept: () => void;
    stopIntercept: () => void;
    saveLog: (fileName: any, basePath: any) => Promise<any>;
};
