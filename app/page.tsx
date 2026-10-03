import Link from 'next/link';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import Badge from '@/components/ui/Badge';

export default function HomePage() {
  return (
    <div className="py-24 px-6 max-w-5xl mx-auto text-center">
      <Badge variant="discount" className="mb-6">
        Handcrafted Heritage
      </Badge>

      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light tracking-tight text-[var(--color-text)] mb-6">
        Made by hand. <br />
        Made to last.
      </h1>

      <p className="font-[family-name:var(--font-body)] text-base md:text-lg font-light text-[var(--color-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
        Brass and copper pieces from Indian artisans. For the home, the altar, and the table.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/collections">
          <Button variant="primary" size="md">
            Shop the collection
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" size="md">
            Our Story
          </Button>
        </Link>
      </div>

      <Divider className="my-16" />
    </div>
  );
}
