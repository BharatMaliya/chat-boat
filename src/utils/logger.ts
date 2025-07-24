const LOG_PREFIX = "[ChatboatWidget]";

export interface LogLevel {
    debug: boolean;
    info: boolean;
    warn: boolean;
    error: boolean;
}

export class Logger {
    private debugMode: boolean;
    private focusedMode: boolean;
    private focusedMessage: string | null;
    private logLevels: LogLevel;

    constructor(debugMode: boolean = true) {
        this.debugMode = debugMode;
        this.focusedMode = false;
        this.focusedMessage = null;
        this.logLevels = {
            debug: true,
            info: true,
            warn: true,
            error: true,
        };
    }

    private shouldLog(message: string): boolean {
        if (!this.debugMode) return false;

        if (this.focusedMode) {
            return this.focusedMessage === message;
        }

        return true;
    }

    private log(level: keyof LogLevel, message: string, ...args: unknown[]): void {
        if (this.logLevels[level] && this.shouldLog(message)) {
            console[level](`${LOG_PREFIX}`, message, ...args);
        }
    }

    public debug(message: string, ...args: unknown[]): void {
        this.log("debug", message, ...args);
    }

    public info(message: string, ...args: unknown[]): void {
        this.log("info", message, ...args);
    }

    public warn(message: string, ...args: unknown[]): void {
        this.log("warn", message, ...args);
    }

    public error(message: string, ...args: unknown[]): void {
        this.log("error", message, ...args);
    }

    public setDebugMode(enabled: boolean): void {
        this.debugMode = enabled;
    }

    public setLogLevels(levels: Partial<LogLevel>): void {
        this.logLevels = { ...this.logLevels, ...levels };
    }

    public enableFocusedMode(message: string): void {
        this.focusedMode = true;
        this.focusedMessage = message;
        this.info(`Focused logging enabled for: ${message}`);
    }

    public disableFocusedMode(): void {
        this.focusedMode = false;
        this.focusedMessage = null;
        this.info("Focused logging disabled");
    }

    public isFocusedMode(): boolean {
        return this.focusedMode;
    }
}

// Export singleton instances
export const logger = new Logger(true);
export const focusedLogger = new Logger(true);

/*
Usage Examples:

// Regular logging
logger.info("This will be logged normally");
logger.debug("Debug message");
logger.warn("Warning message");
logger.error("Error message");

// Focused logging - only log specific messages
focusedLogger.enableFocusedMode("Widget rendered");
focusedLogger.info("Widget rendered"); // This will be logged
focusedLogger.info("Other message"); // This will NOT be logged
focusedLogger.debug("Debug message"); // This will NOT be logged

// Disable focused mode
focusedLogger.disableFocusedMode();

// Control log levels
logger.setLogLevels({ debug: false, info: true, warn: true, error: true });

// Disable all logging
logger.setDebugMode(false);
*/ 