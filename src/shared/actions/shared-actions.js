/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/

import { createActions } from 'redux-actions';
import identity from 'lodash/identity';

export default createActions({
  EVENTS: {
    FROM_RUNNER: {
      TO_SERVER: {
        CLIENT: {
          HELLO: identity,
        },
        APP: {
          ACTIVATED: identity,
          WINDOW: {
            CREATED: identity,
            CLOSED: identity,
            DEVTOOLS: {
              OPENED: identity,
              CLOSED: identity,
            },
            KEY_SHORTCUTS: {
              PRESSED: identity,
            },
          },
        },
      },
    },
    FROM_SERVER: {
      TO_FRONTEND: {
        APP: {
          WINDOW: {
            KEY_SHORTCUTS: {
              PRESSED: identity,
            },
          },
        },
      },
    },
    FROM_FRONTEND: {
      TO_SERVER: {
        CLIENT: {
          HELLO: identity,
        },
        APP: {
          WINDOW: {
            REQUESTED_MINIMIZE: identity,
            REQUESTED_MAXIMIZE: identity,
            REQUESTED_CLOSE: identity,
            REQUESTED_QUIT: identity,
          },
        },
      },
    },
  },
  COMMANDS: {
    FROM_SERVER: {
      TO_RUNNER: {
        APP: {
          WINDOW: {
            CREATE: identity,
            MINIMIZE: identity,
            MAXIMIZE: identity,
            CLOSE: identity,
            DEVTOOLS: {
              OPEN: identity,
            },
            KEY_SHORTCUTS: {
              REGISTER: identity,
            },
          },
        },
        PLATFORM: {
          QUIT: identity,
        },
      },
    },
    FROM_FRONTEND: {
      TO_SERVER: {
        APP: {
          WINDOW: {
            KEY_SHORTCUTS: {
              REGISTER: identity,
            },
          },
        },
      },
    },
  },
});
