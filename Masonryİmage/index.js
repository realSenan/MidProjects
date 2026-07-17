function debounce(func, delay = 250) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

(function () {
  function getColumnCount() {
    const width = document.documentElement.clientWidth;
    if (width < 600) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
  }

  let lastColumnCount = 0;

  function applyMasonry() {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;
    const items = gallery.querySelectorAll(".item");

    const columns = getColumnCount();
    if (columns === lastColumnCount) return;

    items.forEach((item) => {
      item.style.position = "";
      item.style.top = "";
      item.style.left = "";
      item.style.width = "";
    });

    const columnWidth = gallery.offsetWidth / columns;
    let columnHeights = new Array(columns).fill(0);

    items.forEach((item) => {
      item.style.position = "absolute";
      columns == 1
        ? (item.style.width = "100%")
        : (item.style.width = columnWidth + "px");

      const minHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.indexOf(minHeight);

      item.style.top = minHeight + "px";
      item.style.left = columnIndex * columnWidth + "px";

      columnHeights[columnIndex] += item.offsetHeight;
    });

    gallery.style.height = Math.max(...columnHeights) + "px";
  }

  window.addEventListener("load", applyMasonry);
  window.addEventListener("resize", debounce(applyMasonry, 200));
})();
