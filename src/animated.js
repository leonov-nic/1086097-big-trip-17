(() => {
  // Состояние завершенности анимации
  const ANIMATION_FINISH_STATE = 1;

  /**
   * Анимированное обновление числа.
   */
  window.AnimatedNumber = class AnimatedNumber {
    /**
     * @constructor
     * @param {node} element — текстовый узел для отрисовки
     * @param {number} startValue — исходное значение
     * @param {number} requiredValue — конечное значение
     * @param {number} animationDuration — время анимации
     */
    constructor(element, startValue, requiredValue, animationDuration = 500) {
      this._element = element;

      this._startValue = startValue;
      this._requiredValue = requiredValue;

      this._animationDuration = animationDuration;
      this._animationStartTime = performance.now();
      this._animation = requestAnimationFrame(this._render.bind(this));
    }

    /**
     * Анимированная отрисовка числа.
     *
     * @param {number} currentTime — текущее время в мс (определяется автоматически).
     */
    _render(currentTime) {
      // Если исходное и конечное значения числа идентичны — рендер отменяется.
      if (this._requiredValue === this._startValue) {
        cancelAnimationFrame(this._animation);
        this._setElementValue(this._requiredValue);
        return;
      }

      // Время, прошедшее с начала анимации.
      let animationElaspedTime = currentTime - this._animationStartTime;

      // Корректировка времени с учетом вероятных искажений.
      if (animationElaspedTime > this._animationDuration) {
        animationElaspedTime = this._animationDuration;
      }

      // Состояние анимации (от 0 до 1, от start до finish).
      const animationState = (animationElaspedTime < this._animationDuration) ?
        animationElaspedTime / this._animationDuration :
        ANIMATION_FINISH_STATE;

      // Определение целого значения числа на текущем шаге анимации.
      const currentValueToRender = Math.trunc(this._startValue - (this._startValue - this._requiredValue) * animationState);

      // Отрисовка числа.
      this._setElementValue(currentValueToRender);

      // Если анимация не завершена — запрос нового кадра.
      if (animationElaspedTime < this._animationDuration) {
        this._animation = requestAnimationFrame(this._render.bind(this));
      } else {
        // Подравнивание финального значения числа с учетом вероятных погрешностей.
        if (this._currentValueBuffer < this._requiredValue || this._currentValueBuffer > this._requiredValue) {
          this._setElementValue(this._requiredValue);
        }
      }
    }

    /**
     * Обновление значения элемента.
     *
     * @method _setElementValue
     * @param {number} value — новое значение элемента
     */
    _setElementValue(value) {
      this._element.textContent = value.toLocaleString('ru-RU');
    }
  };
})();
