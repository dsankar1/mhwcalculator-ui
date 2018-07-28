import * as errorActions from "./errors";
import * as pendingActions from "./pending";
import * as calcActions from "./calculator";

export default {
    ...errorActions,
    ...pendingActions,
    ...calcActions
}
