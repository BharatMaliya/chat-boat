import { KEYS } from "../common/keys";
import { httpService } from "../services/http";
import { logger } from "../utils/logger";

export interface WidgetConfig {
    cxId: string;
    shouldAutoMount?: boolean;
}

export const getWidgetConfig = async (): Promise<WidgetConfig | null> => {
    const WIDGET_SCRIPT_TAG = document.getElementById(KEYS.CLINT_SCRIPT_TAG_ID);
    logger.debug("Script tag found:", KEYS.CLINT_SCRIPT_TAG_ID, WIDGET_SCRIPT_TAG);

    if (!WIDGET_SCRIPT_TAG) {
        throw new Error(`[ChatboatWidget] Widget script tag not found. Please ensure the script tag has the ID ${KEYS.CLINT_SCRIPT_TAG_ID}`);
    }

    const cxId = WIDGET_SCRIPT_TAG.getAttribute(KEYS.CLINT_SCRIPT_TAG_CX_ID) ?? undefined;

    if (!cxId) {
        throw new Error(`[ChatboatWidget] Customer ID not found. Please ensure the script tag has the attribute ${KEYS.CLINT_SCRIPT_TAG_CX_ID}`);
    }


    const autoMountAttr = WIDGET_SCRIPT_TAG.getAttribute(KEYS.CHAT_BOAT_AUTO_MOUNT);
    const shouldAutoMount = autoMountAttr === 'true';

    try {
        const remoteConfig = await httpService.getClientConfig(cxId);
        return {
            ...remoteConfig,
            cxId,
            shouldAutoMount,
        };
    } catch (error) {
        logger.error("[ChatboatWidget] Error fetching remote config:", error);
        return null;
    }
};
