if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Add a timestamp to CSS URLs to prevent caching
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.rel === 'stylesheet') {
      const url = link.href.split('?')[0];
      link.href = `${url}?v=${Date.now()}`;
    }
  }
}
