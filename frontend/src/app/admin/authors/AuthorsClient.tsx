"use client";

import React, { useState, useRef, useEffect } from "react";
import DashboardClient from "../dashboard/DashboardClient";
import Papa from "papaparse";
import Link from "next/link";
import { importAuthors, deleteAuthor } from "@/app/actions/authors";

export default function AuthorsClient({ initialAuthors }: { initialAuthors: any[] }) {
  const [authors, setAuthors] = useState(initialAuthors);
  const [isImporting, setIsImporting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<string | null>(null);
  const [deleteCountdown, setDeleteCountdown] = useState(30);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Filter States
  const [filterCity, setFilterCity] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("ALL");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deleteModalOpen && deleteCountdown > 0) {
      timer = setInterval(() => {
        setDeleteCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [deleteModalOpen, deleteCountdown]);

  const filteredAuthors = authors.filter(author => {
    let match = true;
    if (filterCity && author.city) {
      match = match && author.city.toLowerCase().includes(filterCity.toLowerCase());
    }
    if (filterState && author.state) {
      match = match && author.state.toLowerCase().includes(filterState.toLowerCase());
    }
    if (filterDateRange === "THIS_WEEK") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      match = match && new Date(author.createdAt) >= oneWeekAgo;
    } else if (filterDateRange === "THIS_MONTH") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      match = match && new Date(author.createdAt) >= oneMonthAgo;
    }
    return match;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const response = await importAuthors(results.data);
        if (response.success) {
          alert(`Successfully imported ${response.count} authors.`);
          window.location.reload(); // Quick way to get updated data from server
        } else {
          alert("Error importing authors: " + response.error);
        }
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
      error: (error) => {
        console.error("CSV Parse Error:", error);
        alert("Failed to parse CSV file.");
        setIsImporting(false);
      }
    });
  };

  const openDeleteModal = (id: string) => {
    setAuthorToDelete(id);
    setDeleteCountdown(30);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setAuthorToDelete(null);
  };

  const confirmDelete = async () => {
    if (!authorToDelete || deleteCountdown > 0) return;
    setIsDeleting(true);
    const response = await deleteAuthor(authorToDelete);
    if (response.success) {
      setAuthors(authors.filter(a => a.id !== authorToDelete));
      closeDeleteModal();
    } else {
      alert("Failed to delete author: " + response.error);
    }
    setIsDeleting(false);
  };

  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Authors Registry" 
      overrideSubtitle="Manage all registered authors, import legacy data, and perform administrative actions."
    >
      <div className="glass-panel p-6 rounded-xl w-full mb-6">
        <h3 className="text-sm font-bold text-brand-primary mb-4 uppercase tracking-wider">Filters</h3>
        <div className="flex flex-wrap gap-4">
          <input 
            type="text" 
            placeholder="Filter by City" 
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Filter by State" 
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" 
          />
          <select 
            value={filterDateRange}
            onChange={(e) => setFilterDateRange(e.target.value)}
            className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Time</option>
            <option value="THIS_WEEK">This Week</option>
            <option value="THIS_MONTH">This Month</option>
          </select>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-brand-text">Authors ({filteredAuthors.length})</h3>
          
          <div>
            <input 
              type="file" 
              accept=".csv" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="px-4 py-2 bg-brand-light-bg text-brand-primary border border-brand-primary/20 rounded-lg text-sm font-medium hover:bg-brand-white transition-colors disabled:opacity-50"
            >
              {isImporting ? "Importing..." : "Import CSV"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-white/50">
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Author Details</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#424656]/20">
              {filteredAuthors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-brand-text/70">No authors found in the system.</td>
                </tr>
              ) : filteredAuthors.map((author) => (
                <tr key={author.id} className="hover:bg-brand-light-bg/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-brand-text font-medium">{author.fullName}</p>
                    <p className="text-[11px] text-brand-text/70">{author.bookTitle || 'No book title'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-brand-text/80">{author.emailId}</p>
                    <p className="text-[11px] text-brand-text/70">{author.mobileNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      author.status === 'SUBMITTED' ? 'bg-[#ffb59d]/10 text-brand-accent border-[#ffb59d]/20' : 
                      'bg-[#b3c5ff]/10 text-brand-primary border-[#b3c5ff]/20'
                    }`}>
                      {author.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-text/70">
                    {new Date(author.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/authors/${author.id}`}
                      className="text-brand-primary hover:text-brand-white text-xs font-medium transition-colors p-2"
                    >
                      View
                    </Link>
                    <button 
                      onClick={() => openDeleteModal(author.id)}
                      className="text-[#ffb4ab] hover:text-red-400 text-xs font-medium transition-colors p-2"
                      title="Super Admin Only"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-white border border-red-500/30 rounded-xl p-8 max-w-md w-full shadow-2xl shadow-red-900/20">
            <h3 className="text-xl font-bold text-red-400 mb-4">CRITICAL WARNING</h3>
            <p className="text-sm text-brand-text/80 mb-6 leading-relaxed">
              You are about to permanently delete this author's entire record. 
              This action <strong>cannot be undone</strong> and will cascade delete all associated activity logs, integration logs, and tasks.
            </p>
            
            <div className="flex justify-end gap-4 mt-8">
              <button 
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-brand-text/80 hover:bg-brand-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={deleteCountdown > 0 || isDeleting}
                className="px-6 py-2 rounded-lg text-sm font-bold bg-red-600 text-brand-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : (deleteCountdown > 0 ? `Wait ${deleteCountdown}s` : "Confirm Delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardClient>
  );
}
