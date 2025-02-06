export function getOptimizedImageUrl(
  baseUrl: string,
  width: number = 800,
  quality: number = 80
): string {
  try {
    const url = new URL(baseUrl);
    
    // Add quality parameter to ensure best quality image//
    url.searchParams.set('q', quality.toString());
    
    // Add width parameter to make image responsive//
    url.searchParams.set('w', width.toString());
    
    // Force WEBP format for better compression//
    url.searchParams.set('fm', 'webp');
    
    // Enable auto formatting//
    url.searchParams.set('auto', 'format,compress');
    
    return url.toString();
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return baseUrl;
  }
}