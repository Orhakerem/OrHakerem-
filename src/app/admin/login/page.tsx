import { redirect } from 'next/navigation';

import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { getAdminSession } from '@/lib/admin-session';

export default function AdminLoginPage() {
  if (getAdminSession()) {
    redirect('/admin');
  }

  return <AdminLoginForm />;
}
