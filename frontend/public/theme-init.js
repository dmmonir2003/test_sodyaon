try {
  let theme = localStorage.getItem('preferred-theme') || 'ocean-explorer';
  document.documentElement.setAttribute('data-theme', theme);
  
  let bgTheme = localStorage.getItem('bg-theme');
  if (!bgTheme) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    bgTheme = isDark ? 'dark' : 'light';
  }
  
  document.documentElement.setAttribute('data-bg', bgTheme);
  
  if (['dark', 'dim', 'midnight'].includes(bgTheme)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} catch (e) {}
