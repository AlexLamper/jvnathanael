import Hero from '../components/home/Hero';
import CTA from '../components/home/CTA';
import HomeEvents from '../components/home/HomeEvents';
import Space from '@/components/common/Spacing';

export default async function Index() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <Hero />
        <CTA />
        <HomeEvents />
        <Space height="50px" />
      </div>
    </>
  );
}
