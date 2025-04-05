import StreamClientProvider from "@/components/providers/StreamClientProvider";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}
export default AdminLayout;