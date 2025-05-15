import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { UserCard } from '../components/UserCard';
import { Pagination } from '../components/Pagination';

export const AdminHomePage = () => {
  const { users, fetchUsers, loading, error, total, totalPages } =
    useUserStore();

  useEffect(() => {
    if (users.length === 0)
      fetchUsers({
        limit: 2,
        search: 'ar',
        sortBy: 'email',
        sortOrder: 'asc',
      });
  }, [users, fetchUsers]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="">
      <div>Viso: {total}</div>
      <section className="grid grid-cols-3 gap-3 mx-auto">
        {users.map((user) => (
          <div key={user._id}>
            <UserCard {...user} />
          </div>
        ))}
      </section>
      <section>
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          onChange={() => {}}
        />
      </section>
    </main>
  );
};
