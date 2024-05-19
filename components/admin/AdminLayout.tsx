import { auth } from "@/lib/auth";
import Link from "next/link";

const AdminLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Unauthorized</h1>
          <p>Admin permission required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-grow ">
      <div className="w-full grid md:grid-cols-5">
        <div className="bg-white border-r border-light-grey">
          <ul className="menu p-4">
            <li>
              <Link
                className={`block py-2 px-4 rounded-md transition-colors duration-300  ${
                  activeItem === "orders"
                    ? "bg-primary text-white btn-primary"
                    : "text-dark-grey hover:bg-light-grey"
                }`}
                href="/admin/orders"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={`block py-2 px-4 rounded-md transition-colors duration-300  ${
                  activeItem === "products"
                    ? "bg-primary text-white btn-primary"
                    : "text-dark-grey hover:bg-light-grey"
                }`}
                href="/admin/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={`block py-2 px-4 rounded-md transition-colors duration-300 ${
                  activeItem === "users"
                    ? "bg-primary text-white btn-primary"
                    : "text-dark-grey hover:bg-light-grey"
                }`}
                href="/admin/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
