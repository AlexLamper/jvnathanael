import Hero from '../components/home/Hero';
import CTA from '../components/home/CTA';
import Space from '@/components/common/Spacing';
import Activiteiten from '@/components/activiteiten/Activiteiten';

export default async function Index() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <Hero />
        <CTA />
        <Activiteiten />
        <Space height="50px" />
      </div>
    </>
  );
}
