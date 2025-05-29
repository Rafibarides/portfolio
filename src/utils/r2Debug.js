// Debug utility to test R2 bucket paths
export const testR2Paths = async () => {
  const baseUrl = 'https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev';
  const testPaths = [
    '/1.avif',
    '/Photography/1.avif', 
    '/portfolio/Photography/1.avif',
    '/portfolio/1.avif',
    '/images/1.avif',
    '/assets/1.avif'
  ];
  
  console.log('🔍 Testing R2 bucket paths...');
  
  for (const path of testPaths) {
    const url = baseUrl + path;
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log(`✅ FOUND: ${url}`);
        return path; // Return the working path
      } else {
        console.log(`❌ ${response.status}: ${url}`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${url} - ${error.message}`);
    }
  }
  
  console.log('❌ No working paths found');
  return null;
}; 