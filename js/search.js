(() => {
  const STORAGE_KEY = "filtersCount";
  const filterField = $(".filter-field");
  const closeSearch = $(".close-search");

  $(document).ready(() => {
    init();
  });

  function init() {
    setFilterValue();

    setFiltersCount();
    setCloseListener();
  }

  function getFiltersCount() {
    return localStorage.getItem(STORAGE_KEY) || 0;
  }

  function setFiltersCount() {
    const timesBack = +getFiltersCount() + 1;
    localStorage.setItem(STORAGE_KEY, timesBack);
  }

  function setCloseListener() {
    closeSearch.click((event) => {
      event.preventDefault();

      const timesBack = getFiltersCount();

      localStorage.removeItem(STORAGE_KEY);
      setFilterValue("");

      history.go(-timesBack);
    });
  }

  function setFilterValue(value = getQueryParam("filtro")) {
    filterField.val(value);
  }

  function getQueryParam(param) {
    var rx = new RegExp("[?&]" + param + "=([^&]+).*$");
    var returnVal = window.location.search.match(rx);
    return returnVal === null
      ? ""
      : decodeURIComponent(returnVal[1].replace(/\+/g, " "));
  }
})();
