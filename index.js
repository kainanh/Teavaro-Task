const config = {
  isReady: true,
  localStorageKey: "testKey",
  cookieName: "testName",
  ttl: 30,
  user: "user3",
  loggingLevel: "error",
};

window.testApi = {
  getAllowedUsers: function () {
    return ["user1", "user3", "superuser"];
  },
  getValues: function () {
    return {
      testKey: "testFirstValue",
      testName: "testSecondValue",
    };
  },
  handleAlert: function (input) {
    if (input) {
      console.log("Acquired alert with message: ", input.message);
      console.log("Message source: ", input.user);
    }
  },
};

function configurationChecks() {
  let isBrowserReady;
  if (browserCheck()) {
    isBrowserReady = true;
  } else {
    return false;
  }
  if (isBrowserReady && userVerification()) {
    return true;
  } else {
    return false;
  }
}

window.onload = async () => {
  if (!configChecks()) return;

  try {
    await localStorageEntry();
  } catch (error) {
    console.log({ error: "Local storage could not be created" });
    return;
  }

  try {
    await setCookie();
  } catch (error) {
    console.log({ error: "Cookie could not be created" });
    return;
  }
  displayAlerts("`Data saved", config.user);
  return;
};

async function localStorageEntry() {
  const localStorageValue = window.testApi.getValues()[config.localStorageKey];
  window.localStorage.setItem(config.localStorageKey, localStorageValue);

  return;
}

async function setCookie() {
  const cookieName = config.cookieName;
  const cookieValue = window.testApi.getValues()[cookieName];
  const maxAge = config.ttl * 86400;
  const newCookie = `${cookieName}=${cookieValue}; max-age=${maxAge}; SameSite=None; Secure`;

  document.cookie = newCookie;
  return;
}

function browserCheck() {
  if (
    Object.values(config).includes(null) ||
    Object.values(config).includes("")
  ) {
    console.log({ error: "Configs are not all present" });
    return false;
  }
  if (config.isReady) {
    return true;
  } else {
    console.log({ error: "Browser is not ready" });
    return false;
  }
}

function userVerification() {
  if (window.testApi.getAllowedUsers().includes(config.user)) {
    return true;
  } else {
    console.log({ error: "User does not have access" });
    return false;
  }
}
