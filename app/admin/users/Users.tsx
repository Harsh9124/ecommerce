
"use client";

import {User} from "@/lib/models/UserModel";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading("Deleting user...");
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("User deleted successfully", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );
  if (error) return "An error has occurred.";
  if (!users) return "Loading...";

  return (
    <div className="container mx-auto px-4 py-8 my-5 bg-primary rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-primary text-white bg-blue">
              <th className="px-4 py-2 rounded-s-lg">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2 rounded-e-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td>
                  <div className="text-center">{formatId(user._id)}</div>
                </td>
                <td>
                  <div className="text-center">{user.name}</div>
                </td>
                <td>
                  <div className="text-center">{user.email}</div>
                </td>
                <td>
                  <div className="text-center">
                    {user.isAdmin ? "YES" : "NO"}
                  </div>
                </td>

                <td className="px-4 py-2">
                  <div className="text-center">
                    <Link href={`/admin/users/${user._id}`} passHref className="btn text-green-500">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser({ userId: user._id })}
                      className="btn btn-error btn-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
