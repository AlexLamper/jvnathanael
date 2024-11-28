'use client';

import { usePathname, useRouter } from 'next/navigation';

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-6">
      <form
        className="flex flex-col md:flex-row items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get('search') as string;
          router.push(pathname + '?search=' + queryTerm);
        }}
      >
        <div className="w-full md:w-auto">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Zoek naar gebruikers
          </label>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Vul een naam of e-mailadres in"
            className="w-full md:w-80 px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
          <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition ml-4"
        >
          Zoeken
        </button>
        </div>
      </form>
    </div>
  );
};
