import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from '@/lib/security/auth';
import { getSubmissions } from '@/lib/db/repositories';
import { SubmissionsClientTable } from './SubmissionsClientTable';
import { Inbox } from 'lucide-react';

interface Props {
  searchParams: Promise<{ site?: string }>;
}

export default async function SubmissionsPage(props: Props) {
  const searchParams = await props.searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get('mavvix_admin_session')?.value;
  const admin = token ? verifySessionToken(token) : null;

  if (!admin) {
    redirect('/admin/login');
  }

  const submissions = getSubmissions(searchParams.site);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-amber-400" />
            <span>Simulated Submissions Queue</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review demonstrative visitor requests stored in SQLite (7-day retention). No real third parties are contacted.
          </p>
        </div>
      </div>

      <SubmissionsClientTable initialSubmissions={submissions} currentSite={searchParams.site} />
    </div>
  );
}

