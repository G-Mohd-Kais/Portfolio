const typedEl = document.getElementById("typed");

if (typedEl) {
  const words = [
    "data intelligence",
    "analytics solutions",
    "attractive dashboards",
    "effortless automation"
  ];

  let i = 0, j = 0, del = false;

  (function type() {
    const word = words[i];
    typedEl.textContent = del
      ? word.substring(0, --j)
      : word.substring(0, ++j);

    if (!del && j === word.length) setTimeout(() => del = true, 1000);
    if (del && j === 0) {
      del = false;
      i = (i + 1) % words.length;
    }

    setTimeout(type, del ? 50 : 80);
  })();
}