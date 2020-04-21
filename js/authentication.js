(() => {
  const AUTH_PARAM = "authenticated=true";

  const unauthenticatedElements = $(".unauthenticated");
  const authenticatedElements = $(".authenticated");

  $(document).ready(() => {
    toggleAuthenticationStatus();

    isAuthenticated()
      .then(() => {
        console.log("Usuário está autenticado.");

        authenticatedElements.removeClass("d-none");
        unauthenticatedElements.remove();
      })
      .catch(() => {
        console.log("Usuário não está autenticado.");

        authenticatedElements.remove();
      });
  });

  function getQueryParam(param) {
    var rx = new RegExp("[?&]" + param + "=([^&]+).*$");
    var returnVal = window.location.search.match(rx);
    return returnVal === null
      ? ""
      : decodeURIComponent(returnVal[1].replace(/\+/g, " "));
  }

  function toggleAuthenticationStatus() {
    const authenticated = getQueryParam("authenticated");

    if (authenticated === "true") {
      const user = {
        authenticated: true,
      };

      localStorage.setItem("user", JSON.stringify(user));
    } else if (authenticated === "false") {
      localStorage.removeItem("user");
    }
  }

  function isAuthenticated() {
    return new Promise((resolve, reject) => {
      try {
        const { authenticated } = JSON.parse(localStorage.getItem("user"));
        resolve(authenticated);
      } catch {
        reject();
      }
    });
  }
})();
