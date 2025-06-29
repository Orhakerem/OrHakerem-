import Image from 'next/image';

interface ServerImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export default function ServerImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 75,
  sizes,
}: ServerImageProps) {
  const imageProps = {
    src,
    alt,
    className,
    priority,
    quality,
    ...(sizes && { sizes }),
    ...(fill ? { fill: true } : { width, height }),
  };

  return <Image {...imageProps} />;
}