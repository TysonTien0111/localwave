import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Seller Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Welcome, {session?.user?.email}!</p>
        {/* Add seller-specific content here */}
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">Manage Your Products</h2>
          <p className="mb-2">Here you can add, edit, or remove your products and view orders from buyers.</p>
          {/* Add product management features here in the future */}
        </div>
      </div>
    </div>
  );
}
