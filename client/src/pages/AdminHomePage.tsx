import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import { UserCard } from '../components/UserCard';

export const AdminHomePage = () => {
  const { users, fetchUsers, loading, error } = useUserStore();

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, [users, fetchUsers]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="">
      <section className="grid grid-cols-3 gap-3 mx-auto">
        {users.map((user) => (
          <div key={user._id}>
            <UserCard {...user} />
          </div>
        ))}
      </section>
    </main>
  );
};
