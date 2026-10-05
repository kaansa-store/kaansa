import 'server-only';
import { getCollectionMeta } from '@/lib/shopify';
import Image from 'next/image';

interface Props {
  handle: string;
}

export default async function LiveCollectionMeta({ handle }: Props) {
  const collection = await getCollectionMeta(handle);

  if (!collection) return null;

  return (
    <>
      {collection.image && (
        <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
          <Image
            src={collection.image.url}
            alt={collection.image.altText ?? collection.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      {collection.description && (
        <p className="font-body text-muted text-base mt-4 max-w-2xl">
          {collection.description}
        </p>
      )}
    </>
  );
}
