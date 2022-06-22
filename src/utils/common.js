const isEscKeyDown = (evt, callback) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    callback();
  }
};

export { isEscKeyDown };
