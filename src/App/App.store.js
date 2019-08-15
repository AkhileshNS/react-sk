// External Modules
import {decorate, observable, action} from 'mobx';
import { create, persist } from 'mobx-persist';
import localForage from 'localforage';
import {isUObject} from 'elegant-standard';

// Global Functions
import {log} from 'global/functions';

class AppStore {
  config = {
    trigger: false,
    currRoute: "Home"
  }

  setRoute = route => {
    this.config.currRoute = route;
  }

  setConfig = config => {
    if (isUObject(config)) {
      for (let key in config) {
        if (key in this.config) {
          this.config[key] = config[key];
        }
      }
    }
  }
}

decorate(AppStore, {
  config: [persist("object"), observable],

  setRoute: action,
  setConfig: action
});

const hydrate = create({storage: localForage});
const appStore = new AppStore();
export default appStore;
hydrate("appStore", appStore, () => log("[AppStore] [Hydration] Successfully hydrated the store"))
