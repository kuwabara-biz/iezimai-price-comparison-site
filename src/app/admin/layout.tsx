import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import { getSupabaseServer } from "@/lib/supabase-server";

export const metadata: Metadata = {
    title: "管理画面",
    robots: "noindex, nofollow",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase.auth.getUser();
    const userEmail = data.user?.email ?? null;

    return (
        <>
            {userEmail && <AdminHeader email={userEmail} />}
            {children}
        </>
    );
}
