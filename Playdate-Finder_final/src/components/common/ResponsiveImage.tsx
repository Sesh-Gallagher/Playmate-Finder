import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw' 
}: ResponsiveImageProps) {
  // Generate responsive image URL with proper sizing will change once in production //
  const generateImageUrl = (baseUrl: string, width: number): string => {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '80');
    url.searchParams.set('auto', 'format');
    return url.toString();
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      sizes={sizes}
      srcSet={`
        ${generateImageUrl(src, 400)} 400w,
        ${generateImageUrl(src, 800)} 800w,
        ${generateImageUrl(src, 1200)} 1200w
      `}
      loading="lazy"
    />
  );
}