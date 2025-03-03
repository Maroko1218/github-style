function switchTheme() {
  const currentStyle = currentTheme()
  if (currentStyle === 'light') {
    setTheme('dark')
    setIconTheme('dark')
  }
  else {
    setTheme('light')
    setIconTheme('light')
  }
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  localStorage.setItem('data-color-mode', style);
  localStorage.setItem('prefers-color-scheme', style)
  setGiscusTheme()
}

function setIconTheme(theme) {
  const twitterIconElement = document.getElementById('twitter-icon')
  const githubIconElement = document.getElementById('github-icon')
  if (twitterIconElement) {
    if (theme === 'light') {
      twitterIconElement.setAttribute("fill", "black")
    } else if (theme === 'dark') {
      twitterIconElement.setAttribute("fill", "white")
    }
  }

  if (githubIconElement) {
    if (theme === 'light') {
      githubIconElement.removeAttribute('color')
      githubIconElement.removeAttribute('class')
    } else if (theme === 'dark') {
      githubIconElement.setAttribute('class', 'octicon')
      githubIconElement.setAttribute('color', '#f0f6fc')
    }
  }
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

function getGiscusTheme() {
	const themeStatus = localStorage.getItem("data-color-mode")
	let
		dataThemeAuto = "preferred_color_scheme",
		dataThemeLight = "light",
		dataThemeDark = "dark",
		giscusTheme = dataThemeAuto
	if (themeStatus === undefined || themeStatus === "auto") {
		giscusTheme = dataThemeAuto
	} else if (themeStatus === "light") {
		giscusTheme = dataThemeLight
	} else if (themeStatus === "dark") {
		giscusTheme = dataThemeDark
	}
	return giscusTheme
}

function setGiscusTheme() {
	function sendMessage(message) {
		const iframe = document.querySelector('iframe.giscus-frame')
		if (!iframe) return
		iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
	}
	sendMessage({
		setConfig: {
			theme: getGiscusTheme(),
		},
	})
}

(() => {
  setTheme(currentTheme());
})();
