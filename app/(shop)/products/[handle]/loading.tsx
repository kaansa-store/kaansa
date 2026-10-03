import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 px-6 py-24 max-w-7xl mx-auto">
      <Skeleton style={{ aspectRatio: '3/4' }} />
      <div className="flex flex-col gap-4">
        <Skeleton style={{ height: '2rem', width: '60%' }} />
        <Skeleton style={{ height: '1.5rem', width: '30%' }} />
        <Skeleton style={{ height: '8rem' }} />
      </div>
    </div>
  );
}
