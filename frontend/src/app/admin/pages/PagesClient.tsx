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

  const defaultTemplate = `<div class="max-w-4xl mx-auto">
  <div class="mb-10 text-center">
    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Your Page Title Here</h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Write an engaging introduction here. Capture the reader's attention with a clear and concise opening statement.
    </p>
  </div>
  
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 mb-10">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Key Information Section</h2>
    
    <div class="space-y-6 text-gray-700 leading-relaxed">
      <p>
        Use paragraphs like this to provide detailed information. You can use standard HTML tags to format your text, such as <strong>bold</strong> or <em>italics</em>.
      </p>
      
      <div class="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">Important Features</h3>
        <ul class="list-disc pl-6 space-y-2 text-blue-800/80">
          <li>First important point with clear benefits</li>
          <li>Second important point highlighting value</li>
          <li>Third important point for maximum impact</li>
        </ul>
      </div>
      
      <p>
        Wrap up your section with a concluding thought or transition to the next topic.
      </p>
    </div>
  </div>
</div>`;

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
        <div className="flex justify-between items-center bg-brand-white p-6 rounded-2xl border border-brand-primary/10">
          <div>
            <h1 className="text-2xl font-semibold text-brand-text tracking-tight">Pages Management</h1>
            <p className="text-brand-text/60 mt-1">Manage marketing and legal pages</p>
          </div>
          <button
            onClick={() => { setEditingPage(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary text-brand-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Page</span>
          </button>
        </div>

        <div className="bg-brand-white rounded-2xl border border-brand-primary/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-primary/10 bg-brand-light-bg">
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Slug / URL</th>
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-xs font-semibold text-brand-text/70 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-brand-text/50">
                      No pages found. Create your first page to get started.
                    </td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr key={page.id} className="hover:bg-brand-light-bg/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-brand-text font-medium">{page.title}</td>
                      <td className="px-6 py-4 text-sm text-brand-text/80">/{page.slug}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          page.type === 'LEGAL' 
                            ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                            : 'bg-green-100 text-green-800 border border-green-300'
                        }`}>
                          {page.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800 border border-blue-300">
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-brand-text/70/70">
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
                              : 'hover:bg-red-500/10 text-red-600'
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
            <div className="p-6 border-b border-brand-primary/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-brand-text">{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
              <button 
                onClick={closeModal}
                className="text-brand-text/50 hover:text-brand-text transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-600 border border-red-600/30 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-text/70 mb-1">Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={editingPage?.title || ""}
                    className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-text placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    placeholder="e.g. Terms of Service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text/70 mb-1">Slug (URL)</label>
                  <input
                    name="slug"
                    type="text"
                    required
                    defaultValue={editingPage?.slug || ""}
                    readOnly={editingPage ? ['home', 'onboarding', 'thank-you'].includes(editingPage.slug) : false}
                    className={`w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-text placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${editingPage && ['home', 'onboarding', 'thank-you'].includes(editingPage.slug) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="e.g. terms-of-service"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text/70 mb-1">Page Type</label>
                <select
                  name="type"
                  required
                  defaultValue={editingPage?.type || "MARKETING"}
                  className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none"
                >
                  <option value="MARKETING">Marketing (Lead Gen)</option>
                  <option value="LEGAL">Legal (Footer Link)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text/70 mb-1">Content (HTML format)</label>
                <textarea
                  name="content"
                  required
                  rows={15}
                  defaultValue={editingPage ? editingPage.content : defaultTemplate}
                  className="w-full bg-brand-light-bg border border-brand-primary/20 rounded-lg px-4 py-2 text-brand-text placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono text-sm"
                  placeholder="<h1>Heading</h1><p>Your content here...</p>"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-brand-primary/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-brand-text/70 hover:text-brand-text transition-colors"
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
