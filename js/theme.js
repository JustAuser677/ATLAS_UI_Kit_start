/* ОСНОВНАЯ РАБОТА: реализуйте переключение темы без библиотеки.
 * "auto" означает отсутствие атрибута data-theme у <html>.
 * В таком случае тёмную тему применяет CSS media query.
 * Настройку нужно сохранять в localStorage (ключ "atlas-theme").
 */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

const themes = ['auto', 'light', 'dark'];
const densities = ['ordinary', 'compact'];

function readSetting(key, allowedValues, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowedValues.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    console.log("Что-то пошло не так...")
  }
}

function applyTheme(choice) {
  const theme = themes.includes(choice) ? choice : 'auto';

  if (theme === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = theme;
  }

  themeSelect.value = theme;
  return theme;
}

function applyDensity(choice) {
  const density = densities.includes(choice)
    ? choice
    : 'ordinary';

  if (density === 'compact') {
    root.dataset.density = density;
  } else {
    root.removeAttribute('data-density');
  }

  densitySelect.value = density;
  return density;
}

applyTheme(readSetting('atlas-theme', themes, 'auto'));
applyDensity(readSetting('atlas-density', densities, 'ordinary'));

themeSelect.addEventListener('change', () => {
  saveSetting('atlas-theme', applyTheme(themeSelect.value));
});

densitySelect.addEventListener('change', () => {
  saveSetting('atlas-density', applyDensity(densitySelect.value));
});

demoAction.addEventListener('click', () => {
  demoFeedback.textContent =
    'Выполнено!.';
});
