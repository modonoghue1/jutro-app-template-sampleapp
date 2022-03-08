import logger from 'loglevel';
declare type LoggerConfig = {
    /**
     * Log levels: TRACE {1}, DEBUG {2}, INFO {3}, WARN {4}, SILENT {5}
     */
    level: logger.LogLevelDesc;
    /**
     * Prefix template documentation is avaiable on https://github.com/kutuluk/loglevel-plugin-prefix
     */
    prefixTemplate: string;
    /**
     * loggerName should be used when creating new instance of Logger, by default the loggerName is `jutro-logger`
     */
    loggerName: string;
};
export default class Logger {
    log: logger.Logger;
    constructor(loggerConfig?: LoggerConfig);
    /**
     * @param config
     * @param replace replace all default logger configuration, by default logger merges DEFAULT_LOOGER_CONFIG with config provided
     */
    setConfig(config: LoggerConfig, replace?: boolean): void;
    resetConfig(): void;
    trace(message: string): void;
    debug(message: string): void;
    info(message: string): void;
    warning(message: string, options?: any): void;
    error(message: string): void;
}
export declare const log: Logger;
export declare const trace: (message: string) => void;
export declare const debug: (message: string) => void;
export declare const info: (message: string) => void;
export declare const warning: (message: string, options?: any) => void;
export declare const error: (message: string) => void;
export declare const makeUniqueWarningLog: (message: string) => (message: string) => void;
export {};
