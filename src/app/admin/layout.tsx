import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminProvider } from "@/contexts/AdminContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
