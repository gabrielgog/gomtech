import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin - Gomtech',
  description: 'Gomtech admin dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-950">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
