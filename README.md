# Junior JS Developer task specification

## Goal

The goal of the task is to check Developer's skills in the field of providing a JavaScript-based solution to the specific requirements. The task is to create a logic that operates on brower's local storage and cookies using provided configuration and external SDK API. Configuration and SDK API mock is provided along with the requirements.

## Requirements

1. Create an `index.js` file that will serve as an entrypoint of the logic and will define `config` and `testApi` described in section below.
2. Create a `alert.js` file that will serve as an external script for post-save logic.
3. Create an HTML file named `index.html` that will store script tag with the snippet above and will also call the `index.js` script from itself.
4. Files naming and structure apart from the ones from the points 1, 2 and 3 are arbitrary.
5. Validate all of the config entries.
6. Use `console.log` for any information logging.
7. Use only native browser interfaces, i.e. `window.localStorage`. No external libraries should be used.
8. Use `git` version control for managing the solution.
9. Upload the solution to a hosting service like `GitHub`, `GitLab` or `BitBucket`.
10. All of the possible exceptions should be handled by stopping the flow and logging the issue that caused it.

## Input

Configuration object from the snippet below along with API mock serves function of the input. Both of them should be used as described and not be modified.

```
var config = {
    isReady: true,
    localStorageKey: 'testKey',
    cookieName: 'testName',
    ttl: 30,
    user: 'user3',
    loggingLevel: 'error'
};

window.testApi = {
    getAllowedUsers: function() {
        return ['user1', 'user3', 'superuser']
    },
    getValues: function() {
        return {
            testKey: 'testFirstValue',
            testName: 'testSecondValue'
        }
    },
    handleAlert: function(input) {
        if(input) {
            console.log('Acquired alert with message: ', input.message);
            console.log('Message source: ', input.user);
        }
    }
};
```

## Use case

The logic should be covering the following use case:

1. Check if the browser is ready for operation by checking `isReady` configuration field
   - if `true`: proceed with the steps below
   - if not: stop the execution and log the cause for config's logging level `error` or `verbose`, but not `warning` nor `info`
2. Check if the user is allowed to use the logic by comparing configuration's `user` value against array of users got from API's `getAllowedUsers` function
   - if yes: proceed with the steps below
   - if no: stop the execution and log the cause for config's logging level `error` or `verbose`, but not `warning` nor `info`
3. After all checks are passed, script should set one local storage entry and one cookie in a following manner:
   - Local storage entry should be added with config's `localStorageKey` value as a local storage key and value got from API's `getValues` function response. It should look for value under key based on config's `localStorageKey` value.
   - Cookie entry should be added with config's `cookieName` value as a cookie name and value got from API's `getValues` function response. It should look for value under key based on config's `cookieName` value. Cookie should have `SameSite=None` and `Secure` options enabled and expiration time set to specific number of days, which should be read from configuration's `ttl` entry.
4. After all of the data is saved, `index.js` script should call an external `alert.js` script. `alert.js` should call API's `handleAlert` function with an input object containing `message` that the data has been saved and `user` sourced from config's `user` entry value. It should also utilise JavaScript `confirm` function to notify user that the data has been saved with the same message as the one provided for the API call and additional question: `Would you like to see a random cat fact?`. There are 2 options:
   - if user clicks ok: fetch data from `https://catfact.ninja/fact` API endpoint and show the cat fact to the user with an `alert`
   - if user clicks cancel: show the `alert` with information `That's a shame`
# Teavaro-Task
# Teavaro-Task
