import { redirect } from 'next/navigation';
import { checkRole } from '@/utils/roles';
import { SearchUsers } from './SearchUsers';
import { clerkClient } from '@clerk/nextjs/server';
import { removeRole, setRole } from './_actions';

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole('admin')) {
    redirect('/');
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <section className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Admin Pagina
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Dit is de beveiligde admin pagina dat beperkt is tot gebruikers met de rol <span className="font-semibold">admin</span>.
      </p>

      <div className="mb-8">
        <SearchUsers />
      </div>

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Rol: <span className="font-medium">{user.publicMetadata.role as string}</span>
                </p>
              </div>

              <div className="space-y-2">
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  >
                    Maak Admin
                  </button>
                </form>

                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                  >
                    Maak Moderator
                  </button>
                </form>

                <form action={removeRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  >
                    Verwijder Rol
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Geen gebruikers gevonden. Gebruik de zoekbalk om gebruikers te vinden.</p>
      )}
    </section>
  );
}
