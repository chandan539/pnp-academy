import prisma from "@/lib/prisma";
import DashboardClient from "../../dashboard/DashboardClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AuthorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = await prisma.author.findUnique({
    where: { id }
  });

  if (!author) {
    return notFound();
  }

  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle={`Author: ${author.fullName}`}
      overrideSubtitle="View complete submitted details."
    >
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/authors" className="text-brand-secondary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Authors
        </Link>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
          author.status === 'SUBMITTED' ? 'bg-[#ffb59d]/10 text-[#ffb59d] border-[#ffb59d]/20' : 
          'bg-[#b3c5ff]/10 text-brand-secondary border-[#b3c5ff]/20'
        }`}>
          {author.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-lg font-bold text-brand-secondary mb-4 border-b border-brand-primary/30 pb-2">Personal Information</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-brand-primary/20 pb-2">
              <dt className="text-[#8c90a1]">Full Name</dt>
              <dd className="text-brand-white font-medium">{author.fullName}</dd>
            </div>
            <div className="flex justify-between border-b border-brand-primary/20 pb-2">
              <dt className="text-[#8c90a1]">Email ID</dt>
              <dd className="text-brand-white font-medium">{author.emailId}</dd>
            </div>
            <div className="flex justify-between border-b border-brand-primary/20 pb-2">
              <dt className="text-[#8c90a1]">Mobile Number</dt>
              <dd className="text-brand-white font-medium">{author.mobileNumber}</dd>
            </div>
            <div className="flex justify-between border-b border-brand-primary/20 pb-2">
              <dt className="text-[#8c90a1]">WhatsApp Number</dt>
              <dd className="text-brand-white font-medium">{author.whatsappNumber || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-brand-primary/20 pb-2">
              <dt className="text-[#8c90a1]">City / State / PIN</dt>
              <dd className="text-brand-white font-medium">{author.city}, {author.state} - {author.pinCode}</dd>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <dt className="text-[#8c90a1]">Address</dt>
              <dd className="text-brand-light-bg bg-[#102034] p-2 rounded">{author.address}</dd>
            </div>
          </dl>
        </div>

        {/* Bank & Nominee Details */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-bold text-brand-secondary mb-4 border-b border-brand-primary/30 pb-2">Bank Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Bank Name</dt>
                <dd className="text-brand-white font-medium">{author.bankName || 'N/A'}</dd>
              </div>
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Account Holder</dt>
                <dd className="text-brand-white font-medium">{author.holderName || 'N/A'}</dd>
              </div>
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Account Number</dt>
                <dd className="text-brand-white font-medium">{author.accountNumber || 'N/A'}</dd>
              </div>
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">IFSC Code</dt>
                <dd className="text-brand-white font-medium">{author.ifscCode || 'N/A'}</dd>
              </div>
            </dl>
          </div>
          
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-lg font-bold text-brand-secondary mb-4 border-b border-brand-primary/30 pb-2">Nominee Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Nominee Name</dt>
                <dd className="text-brand-white font-medium">{author.nomineeName || 'N/A'}</dd>
              </div>
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Relation</dt>
                <dd className="text-brand-white font-medium">{author.relation || 'N/A'}</dd>
              </div>
              <div className="flex justify-between border-b border-brand-primary/20 pb-2">
                <dt className="text-[#8c90a1]">Nominee Mobile</dt>
                <dd className="text-brand-white font-medium">{author.nomineeMobile || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </DashboardClient>
  );
}
