(() => {
  const AUTH_PARAM = "authenticated=true";

  $(document).ready(() => {
    loadComponent();
    setUserAuthenticationStatus();
  });

  function getQueryParam(param) {
    var rx = new RegExp("[?&]" + param + "=([^&]+).*$");
    var returnVal = window.location.search.match(rx);
    return returnVal === null
      ? ""
      : decodeURIComponent(returnVal[1].replace(/\+/g, " "));
  }

  function setUserAuthenticationStatus() {
    const authenticated = getQueryParam("authenticated");

    if (authenticated === "true") {
      const user = {
        authenticated: true,
      };

      localStorage.setItem("user", JSON.stringify(user));
      location.href = "/MeusArtigos.html";
    } else if (authenticated === "false") {
      localStorage.removeItem("user");
      location.href = "/index.html";
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

  const onFileReady = {
    "components/nav-bar.html": () => {
      const unauthenticatedElements = $(".unauthenticated");
      const authenticatedElements = $(".authenticated");

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
    },
  };

  function loadComponent() {
    const elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const file = element.getAttribute("component");

      if (file) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              element.innerHTML = this.responseText;

              if (typeof onFileReady[file] === "function") {
                onFileReady[file]();
              }
            }
            if (this.status == 404) {
              element.innerHTML = "Page not found.";
            }
            element.removeAttribute("component");
            loadComponent();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();

        return;
      }
    }
  }
})();
