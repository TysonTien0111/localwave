import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    redirect("/auth/signin");
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      {/* Add seller-specific content here */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Manage Your Products</h2>
        <p>Here you can add, edit, or remove your products and view orders from buyers.</p>
        {/* Add product management features here in the future */}
      </div>
    </div>
  );
}
