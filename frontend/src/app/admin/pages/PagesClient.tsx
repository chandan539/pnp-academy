"use client";

import React, { useState } from "react";
import DashboardClient from "../dashboard/DashboardClient";
import { Plus, Edit, Trash2 } from "lucide-react";
import { createPage, updatePage, deletePage } from "@/app/actions/pages";

type DynamicPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  type: string;
  status: string;
  createdAt: Date;
};

export default function PagesClient({ initialPages }: { initialPages: DynamicPage[] }) {
  const [pages, setPages] = useState(initialPages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    if (editingPage) {
      const res = await updatePage(editingPage.id, formData);
      if (res.success && res.page) {
        setPages(pages.map(p => p.id === editingPage.id ? (res.page as any) : p));
        setIsModalOpen(false);
        setEditingPage(null);
      } else {
        setError(res.error || "Failed to update page");
      }
    } else {
      const res = await createPage(formData);
      if (res.success && res.page) {
        setPages([res.page as any, ...pages]);
        setIsModalOpen(false);
      } else {
        setError(res.error || "Failed to create page");
      }
    }
    
    setIsSubmitting(false);
  };

  const handleEditClick = (page: DynamicPage) => {
    setEditingPage(page);
    setError("");
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string, slug: string) => {
    if (['home', 'onboarding', 'thank-you'].includes(slug)) return;
    
    if (confirm("Are you sure you want to delete this page?")) {
      const res = await deletePage(id);
      if (res.success) {
        setPages(pages.filter(p => p.id !== id));
      } else {
        alert(res.error || "Failed to delete page");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPage(null);
    setError("");
  };

  return (
    <DashboardClient authors={[]} overrideTitle="Pages Management" overrideSubtitle="Manage marketing and legal pages">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center bg-brand-white p-6 rounded-2xl border border-blue-500/10">
          <div>
            <h1 className="text-2xl font-semibold text-brand-white tracking-tight">Pages Management</h1>
            <p className="text-blue-200/60 mt-1">Manage marketing and legal pages</p>
          </div>
          <button
            onClick={() => { setEditingPage(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary text-brand-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Page</span>
          </button>
        </div>

        <div className="bg-brand-white rounded-2xl border border-blue-500/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-500/10 bg-brand-light-bg">
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Slug / URL</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-blue-200/50">
                      No pages found. Create your first page to get started.
                    </td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page.id} className="hover:bg-brand-light-bg/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-brand-white font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-sm text-blue-300">/{page.slug}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          page.type === 'LEGAL' 
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                            : 'bg-green-500/10 text-green-400 border border-green-500/20'
                        }`}>
                          {page.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-200/70">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(page)}
                            className="p-2 hover:bg-brand-primary/10 rounded-lg text-brand-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(page.id, page.slug)}
                            className={`p-2 rounded-lg transition-colors ${
                              ['home', 'onboarding', 'thank-you'].includes(page.slug)
                              ? 'text-gray-500 cursor-not-allowed opacity-50'
                              : 'hover:bg-red-500/10 text-red-400'
                            }`}
                            disabled={['home', 'onboarding', 'thank-you'].includes(page.slug)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-white rounded-2xl border border-brand-primary/20 w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-blue-500/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-brand-white">{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
              <button 
                onClick={closeModal}
                className="text-blue-200/50 hover:text-brand-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={editingPage?.title || ""}
                    className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-white placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="e.g. Terms of Service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">Slug (URL)</label>
                  <input
                    name="slug"
                    type="text"
                    required
                    defaultValue={editingPage?.slug || ""}
                    readOnly={editingPage ? ['home', 'onboarding', 'thank-you'].includes(editingPage.slug) : false}
                    className={`w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-white placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${editingPage && ['home', 'onboarding', 'thank-you'].includes(editingPage.slug) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="e.g. terms-of-service"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Page Type</label>
                <select
                  name="type"
                  required
                  defaultValue={editingPage?.type || "MARKETING"}
                  className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none"
                >
                  <option value="MARKETING">Marketing (Lead Gen)</option>
                  <option value="LEGAL">Legal (Footer Link)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">Content (HTML format)</label>
                <textarea
                  name="content"
                  required
                  rows={8}
                  defaultValue={editingPage?.content || ""}
                  className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-white placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono text-sm"
                  placeholder="<h1>Heading</h1><p>Your content here...</p>"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-blue-500/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-blue-200 hover:text-brand-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-primary hover:bg-brand-primary text-brand-white px-6 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-50"
                >
                  {isSubmitting ? (editingPage ? 'Updating...' : 'Creating...') : (editingPage ? 'Update Page' : 'Create Page')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardClient>
  );
}
