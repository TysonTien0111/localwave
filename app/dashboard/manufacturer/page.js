import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function ManufacturerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "manufacturer") {
    redirect("/auth/signin");
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manufacturer Dashboard</h1>
      <p>Welcome, {session.user.email}!</p>
      {/* Add manufacturer-specific content here */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">View Requests</h2>
        <p>Here you can view and respond to requests from sellers looking for manufacturing partners.</p>
        {/* Add request management features here in the future */}
      </div>
    </div>
  );
}
