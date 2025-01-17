import { HeroSection } from '@components/shared/hero-section';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <section className="h-16 bg-black"></section>
    </>
  );
}
