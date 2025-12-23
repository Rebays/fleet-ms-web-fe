

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen">
       
        {/* Main Content Area */}
        <main className="flex-1 p-8 bg-gray-900 overflow-auto">
          {children}
        </main>
      </div>
  );
}