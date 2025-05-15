import type { IUser } from '../types/user';

export const UserCard = (user: IUser) => {
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.username}</h2>
        <p>
          {user.email} - {user.role}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-error">Delete</button>
        </div>
      </div>
    </div>
  );
};
