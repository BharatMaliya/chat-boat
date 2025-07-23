import { KEYS } from "../common/keys";

export interface WidgetConfig {
    cxId?: string;
    shouldAutoMount?: boolean;
}

export const getWidgetConfig = (): WidgetConfig | null => {
    const WIDGET_SCRIPT_TAG = document.getElementById(KEYS.CLINT_SCRIPT_TAG_ID);

    if (!WIDGET_SCRIPT_TAG) {
        throw new Error(`[ChatboatWidget] Widget script tag not found. Please ensure the script tag has the ID ${KEYS.CLINT_SCRIPT_TAG_ID}`);
    }

    const cxId = WIDGET_SCRIPT_TAG.getAttribute(KEYS.CLINT_SCRIPT_TAG_CX_ID) ?? undefined;

    if (!cxId) {
        throw new Error(`[ChatboatWidget] Customer ID not found. Please ensure the script tag has the attribute ${KEYS.CLINT_SCRIPT_TAG_CX_ID}`);
    }

    const autoMountAttr = WIDGET_SCRIPT_TAG.getAttribute(KEYS.CHAT_BOAT_AUTO_MOUNT);
    const shouldAutoMount = autoMountAttr === 'true';

    //TODO:add api calling for cx varification  config and return the config if cx not found then throw error
    const config = {
        cxId,
        shouldAutoMount,
    };

    return config;
};
