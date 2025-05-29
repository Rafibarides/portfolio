// Utility to check which images are accessible
export const checkImageAvailability = async (urls) => {
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    try {
      const response = await fetch(urls[i], { method: 'HEAD' });
      results.push({
        url: urls[i],
        index: i,
        status: response.status,
        accessible: response.ok
      });
    } catch (error) {
      results.push({
        url: urls[i],
        index: i,
        status: 'ERROR',
        accessible: false,
        error: error.message
      });
    }
  }
  
  return results;
}; 