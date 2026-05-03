/**
 * PerformanceManager Utility
 * Handles preloading and resource prioritization
 */

export const PerformanceManager = {
  /**
   * Preload critical images to improve LCP
   * @param {string[]} urls - List of image URLs to preload
   */
  preloadImages: (urls) => {
    urls.forEach(url => {
      if (!url) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  },

  /**
   * Intersection Observer for lazy execution
   * @param {Element} element - Element to observe
   * @param {Function} callback - Function to run when visible
   */
  onVisible: (element, callback) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  }
};
