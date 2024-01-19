const debounce = (func, delay) => {
  delay = delay || 0;
  let debounceTimerId;

  if (debounceTimerId) {
    clearTimeout(debounceTimerId);
    //   debounceTimerId = null;
  }
  debounceTimerId = setTimeout(() => {
    func();
    console.log("DA CHAY HAM ");
  }, delay);
};

export default debounce;
