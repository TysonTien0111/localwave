import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function BuyerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "buyer") {
    redirect("/auth/signin");
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      {/* Add buyer-specific content here */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Browse Products</h2>
        <p>Here you can browse and purchase products from local sellers.</p>
        {/* Add product listing here in the future */}
      </div>
    </div>
  );
}
