import { useState } from 'react';
import { Package } from 'lucide-react';

import { Frame, Image } from './ProductImage.styles';

export function ProductImage({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const [image, setImage] = useState<{ src: string; failed: boolean } | null>(null);
  const loaded = image?.src === src && !image.failed;
  const failed = image?.src === src && image.failed;

  return (
    <Frame role={failed ? 'img' : undefined} aria-label={failed ? alt : undefined}>
      {!loaded && <Package size={28} aria-hidden="true" />}
      {!failed && (
        <Image
          src={src}
          alt={alt}
          $loaded={loaded}
          loading={eager ? 'eager' : 'lazy'}
          onLoad={() => setImage({ src, failed: false })}
          onError={() => setImage({ src, failed: true })}
        />
      )}
    </Frame>
  );
}
