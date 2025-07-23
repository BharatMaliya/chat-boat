const LOG_PREFIX = "[ChatboatWidget]";

// For now, we can control the verbosity of logs here.
// In a real-world scenario, this might be controlled by a script attribute.
const DEBUG_MODE = true;

const log = (method: "log" | "warn" | "error" | "info", ...args: any[]) => {
    if (DEBUG_MODE) {
        console[method](`${LOG_PREFIX}`, ...args);
    }
};

export const logger = {
    debug: (...args: any[]) => log("log", ...args),
    info: (...args: any[]) => log("info", ...args),
    warn: (...args: any[]) => log("warn", ...args),
    error: (...args: any[]) => log("error", ...args),
}; 