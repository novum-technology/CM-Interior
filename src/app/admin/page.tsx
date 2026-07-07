"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GalleryItem } from "@/types";

const CATEGORIES = [
  "BEDROOMS",
  "LIVING ROOMS",
  "KITCHENS",
  "CEILING",
  "CURTAINS",
  "WASHBASE",
  "VILLAS",
];

const generateId = () => `g_${Date.now()}`;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newImages, setNewImages] = useState<Array<{ filename: string; base64: string }>>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [username, setUsername] = useState("");
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("BEDROOMS");
  const [formCustomCategory, setFormCustomCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formImage, setFormImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Publish Status States
  const [publishStatus, setPublishStatus] = useState<"IDLE" | "PUBLISHING" | "GIT_UPDATED" | "VERCEL_DEPLOYING" | "SUCCESS" | "ERROR">("IDLE");
  const [publishError, setPublishError] = useState<string | null>(null);
  const [vercelUrl, setVercelUrl] = useState<string | null>(null);

  const loadGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to load gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check session on mount
  useEffect(() => {
    fetch("/api/admin/check-session")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          const data = await res.json();
          setUsername(data.username || "Admin");
          loadGallery();
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Image Upload handler
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setImageError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setFormImage(data.imageUrl);
        // Save the optimized base64 for publishing commit
        setNewImages((prev) => [
          ...prev.filter((img) => img.filename !== data.filename),
          { filename: data.filename, base64: data.base64 },
        ]);
      } else {
        setImageError(data.error || "Failed to process image.");
      }
    } catch (err) {
      console.error("Image upload request error:", err);
      setImageError("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Add Item Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    if (!formImage) {
      setImageError("An image is required for the project.");
      return;
    }

    const finalCategory = formCategory === "CUSTOM" 
      ? formCustomCategory.trim().toUpperCase() 
      : formCategory;

    if (!finalCategory) {
      setImageError("Category is required.");
      return;
    }

    const newItem: GalleryItem = {
      id: generateId(),
      title: formTitle.trim(),
      category: finalCategory,
      imageUrl: formImage,
      price: formPrice.trim() || undefined,
      createdDate: new Date().toISOString(),
    };

    setItems((prev) => [newItem, ...prev]);
    resetForm();
    setIsAddModalOpen(false);
  };

  // Edit Item Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !formTitle.trim()) return;
    if (!formImage) return;

    const finalCategory = formCategory === "CUSTOM" 
      ? formCustomCategory.trim().toUpperCase() 
      : formCategory;

    if (!finalCategory) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === activeItem.id
          ? {
              ...item,
              title: formTitle.trim(),
              category: finalCategory,
              imageUrl: formImage,
              price: formPrice.trim() || undefined,
            }
          : item
      )
    );

    resetForm();
    setIsEditModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this gallery project? This action cannot be undone until you refresh without saving.")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Open Edit Modal
  const openEditModal = (item: GalleryItem) => {
    setActiveItem(item);
    setFormTitle(item.title);
    setFormPrice(item.price || "");
    setFormImage(item.imageUrl);
    
    if (CATEGORIES.includes(item.category)) {
      setFormCategory(item.category);
      setFormCustomCategory("");
    } else {
      setFormCategory("CUSTOM");
      setFormCustomCategory(item.category);
    }
    
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("BEDROOMS");
    setFormCustomCategory("");
    setFormPrice("");
    setFormImage(null);
    setActiveItem(null);
    setImageError(null);
  };

  // Launch Live Preview
  const handlePreviewChanges = () => {
    // Save current items array to localStorage
    localStorage.setItem("cms_preview_gallery", JSON.stringify(items));
    // Open gallery with preview parameter in new window
    window.open("/gallery?preview=true", "_blank");
  };

  // Publish changes to GitHub + Vercel deployment tracking
  const handlePublishChanges = async () => {
    if (items.length === 0) {
      alert("Cannot publish an empty gallery.");
      return;
    }

    setPublishStatus("PUBLISHING");
    setPublishError(null);
    setVercelUrl(null);

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          galleryItems: items,
          newImages: newImages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to sync changes with GitHub.");
      }

      // Changes are live immediately because we fetch dynamically from GitHub at runtime!
      // Start Vercel deployment tracking if commitSha is available
      if (data.commitSha) {
        setPublishStatus("GIT_UPDATED");
        pollVercelDeployment(data.commitSha);
      } else {
        setPublishStatus("SUCCESS");
        setNewImages([]);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An error occurred during publishing.";
      console.error("Publishing error:", err);
      setPublishStatus("ERROR");
      setPublishError(errMsg);
    }
  };

  // Poll Vercel deployment status
  const pollVercelDeployment = async (commitSha: string) => {
    setPublishStatus("VERCEL_DEPLOYING");
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    const interval = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setPublishStatus("ERROR");
        setPublishError("Vercel deployment tracking timed out. The deployment is likely continuing in the background.");
        return;
      }

      try {
        const res = await fetch(`/api/admin/vercel-status?commitSha=${commitSha}`);
        const data = await res.json();

        if (res.ok && data.success) {
          if (data.status === "READY") {
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            setPublishStatus("SUCCESS");
            setVercelUrl(data.url);
            setNewImages([]); // Clear uploaded image cache since they are committed
          } else if (data.status === "ERROR") {
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            setPublishStatus("ERROR");
            setPublishError("Vercel deployment failed to build. Check Vercel logs.");
          }
        }
      } catch (err) {
        console.error("Polling Vercel status error:", err);
      }
    }, 5000); // Poll every 5 seconds

    pollingIntervalRef.current = interval;
  };

  // Filters and search logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#070707] text-[#f5f5f5]">
        <span className="material-symbols-outlined text-4xl animate-spin text-[#ad9f82]">autorenew</span>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-4 opacity-50">LOADING CMS DATA...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#f5f5f5] flex flex-col font-sans relative pb-24">
      {/* Background patterns */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ad9f82]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/2 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 filter invert">
            <Image src="/images/logo_navbar.png" alt="CM Logo" fill className="object-contain" />
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-[0.3em] text-[#ad9f82]">CM INTERIOR DESIGN</div>
            <h1 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Gallery Manager</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[10px] tracking-wider text-neutral-400 font-light">
            Logged in as <strong className="text-white">{username}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 border border-white/10 hover:border-red-500 hover:text-red-400 text-neutral-400 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all rounded-none"
          >
            <span className="material-symbols-outlined text-[14px]">logout</span>
            LOGOUT
          </button>
        </div>
      </header>

      {/* Content wrapper */}
      <div className="flex-grow p-6 md:p-10 max-w-7xl w-full mx-auto z-10">
        
        {/* Banner for unsaved changes */}
        {newImages.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs py-3.5 px-4 mb-8 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-amber-500 animate-pulse">info</span>
              <span>You have uploaded new images or made draft changes. Make sure to click <strong>&quot;Publish Changes&quot;</strong> at the bottom to sync them live!</span>
            </span>
          </div>
        )}

        {/* Dashboard Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#121212] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none w-56 font-light"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#121212] border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
            >
              <option value="ALL">ALL CATEGORIES</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="bg-[#ad9f82] text-neutral-950 hover:bg-white hover:text-black font-bold text-xs tracking-wider uppercase px-5 py-3 cursor-pointer transition-all flex items-center gap-2 rounded-none"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            ADD GALLERY PROJECT
          </button>
        </div>

        {/* Projects Grid */}
        {filteredItems.length === 0 ? (
          <div className="border border-white/5 bg-[#0f0f0f]/60 text-center py-20 text-neutral-500 text-sm">
            <span className="material-symbols-outlined text-4xl block mb-3 text-neutral-600">folder_open</span>
            No projects found matching the criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#121212] border border-white/5 hover:border-white/10 transition-all flex flex-col group relative"
              >
                {/* Image Aspect ratio 4:5 */}
                <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold text-[#ad9f82] tracking-wider uppercase">
                    {item.category}
                  </div>
                  {item.price && (
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold text-white tracking-wider">
                      {item.price}
                    </div>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-4 flex-grow flex flex-col justify-between gap-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-200 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="border border-white/10 hover:border-[#ad9f82] hover:text-[#ad9f82] py-2 text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-1 bg-transparent rounded-none text-neutral-300"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="border border-white/10 hover:border-red-500 hover:text-red-400 py-2 text-[10px] font-bold tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-1 bg-transparent rounded-none text-neutral-300"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Publishing Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0d0d0d]/90 backdrop-blur-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-40">
        <div className="text-xs text-neutral-400 font-light flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ad9f82] animate-pulse" />
          <span>Local draft state contains <strong>{items.length}</strong> project items.</span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handlePreviewChanges}
            disabled={publishStatus === "PUBLISHING" || publishStatus === "VERCEL_DEPLOYING"}
            className="border border-white/10 hover:border-white hover:text-white text-neutral-300 py-3.5 px-6 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all bg-transparent rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            PREVIEW CHANGES
          </button>
          
          <button
            onClick={handlePublishChanges}
            disabled={publishStatus === "PUBLISHING" || publishStatus === "VERCEL_DEPLOYING"}
            className="bg-[#ad9f82] text-neutral-950 hover:bg-white hover:text-black py-3.5 px-8 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 w-full sm:w-auto justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">publish</span>
            PUBLISH CHANGES
          </button>
        </div>
      </footer>

      {/* PUBLISH DIALOG STATUS OVERLAY */}
      {publishStatus !== "IDLE" && (
        <div className="fixed inset-0 bg-black/80 z-[120] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/5 p-8 max-w-md w-full text-center relative shadow-2xl">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-[#ad9f82] uppercase mb-8">Publishing Status</h3>
            
            <div className="space-y-6 mb-8 text-left max-w-[280px] mx-auto">
              {/* GitHub stage */}
              <div className="flex items-center gap-4">
                {publishStatus === "PUBLISHING" ? (
                  <span className="material-symbols-outlined text-amber-500 animate-spin text-[20px]">autorenew</span>
                ) : (
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                )}
                <span className={`text-xs tracking-wider uppercase ${publishStatus === "PUBLISHING" ? "text-white font-semibold" : "text-neutral-500"}`}>
                  1. Updating GitHub Data...
                </span>
              </div>

              {/* Vercel stage */}
              <div className="flex items-center gap-4">
                {publishStatus === "PUBLISHING" ? (
                  <span className="material-symbols-outlined text-neutral-700 text-[20px]">radio_button_unchecked</span>
                ) : publishStatus === "GIT_UPDATED" || publishStatus === "VERCEL_DEPLOYING" ? (
                  <span className="material-symbols-outlined text-amber-500 animate-spin text-[20px]">autorenew</span>
                ) : publishStatus === "SUCCESS" ? (
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-neutral-700 text-[20px]">radio_button_unchecked</span>
                )}
                <span className={`text-xs tracking-wider uppercase ${publishStatus === "GIT_UPDATED" || publishStatus === "VERCEL_DEPLOYING" ? "text-white font-semibold" : "text-neutral-500"}`}>
                  2. Vercel Deploying...
                </span>
              </div>

              {/* Live Webpage stage */}
              <div className="flex items-center gap-4">
                {publishStatus === "SUCCESS" ? (
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                ) : (
                  <span className="material-symbols-outlined text-neutral-700 text-[20px]">radio_button_unchecked</span>
                )}
                <span className={`text-xs tracking-wider uppercase ${publishStatus === "SUCCESS" ? "text-green-400 font-bold" : "text-neutral-500"}`}>
                  3. Live Site Updated!
                </span>
              </div>
            </div>

            {(publishStatus === "VERCEL_DEPLOYING" || publishStatus === "GIT_UPDATED") && (
              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    if (pollingIntervalRef.current) {
                      clearInterval(pollingIntervalRef.current);
                      pollingIntervalRef.current = null;
                    }
                    setPublishStatus("IDLE");
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 text-neutral-300 py-3 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors border border-white/10 rounded-none mb-2"
                >
                  Run in Background
                </button>
                <p className="text-[10px] text-neutral-500 mt-2">
                  Changes are saved to GitHub. You can safely close this overlay or continue editing while Vercel builds.
                </p>
              </div>
            )}

            {publishStatus === "SUCCESS" && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-400">
                  Your changes have been fully deployed and are now live on the website!
                </p>
                {vercelUrl && (
                  <a
                    href={vercelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs text-[#ad9f82] underline hover:text-white"
                  >
                    Open Live Site
                  </a>
                )}
                <button
                  onClick={() => setPublishStatus("IDLE")}
                  className="w-full bg-[#ad9f82] text-neutral-950 hover:bg-white hover:text-black py-3 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors border-none mt-4 rounded-none"
                >
                  DISMISS
                </button>
              </div>
            )}

            {publishStatus === "ERROR" && (
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 text-left">
                  {publishError || "An unexpected deployment error occurred."}
                </div>
                <button
                  onClick={() => setPublishStatus("IDLE")}
                  className="w-full bg-red-500 text-white hover:bg-red-600 py-3 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors border-none mt-4 rounded-none"
                >
                  CLOSE & REMEDIATE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD DIALOG MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#121212] border border-white/5 p-6 md:p-8 max-w-lg w-full relative shadow-2xl my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <h3 className="text-sm font-semibold tracking-[0.15em] text-[#ad9f82] uppercase mb-6 border-b border-white/5 pb-4">
              Add New Project Item
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-5">
              <div>
                <label className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Project Image</label>
                
                {formImage ? (
                  <div className="relative aspect-[4/3] bg-neutral-950 border border-white/10 group mb-3">
                    <Image src={formImage} alt="Uploaded" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-[#ad9f82] text-neutral-950 text-[10px] font-bold tracking-wider uppercase px-4 py-2 hover:bg-white hover:text-black transition-all cursor-pointer">
                        CHANGE IMAGE
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[#1c1c1c] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6 mb-3">
                    <span className="material-symbols-outlined text-3xl text-neutral-500 mb-2">add_photo_alternate</span>
                    <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">SUPPORTED FORMATS: JPG, PNG, WEBP</span>
                    <label className="mt-4 bg-[#ad9f82] text-neutral-950 text-[10px] font-bold tracking-wider uppercase px-4 py-2 hover:bg-white hover:text-black transition-all cursor-pointer">
                      {uploadingImage ? "PROCESSING..." : "CHOOSE IMAGE"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploadingImage} />
                    </label>
                  </div>
                )}
                
                {imageError && (
                  <p className="text-red-400 text-[10px] font-semibold mt-1">{imageError}</p>
                )}
              </div>

              <div>
                <label htmlFor="add-title" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Project Name</label>
                <input
                  id="add-title"
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Luxury Living Room Setup"
                  className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="add-category" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Category</label>
                  <select
                    id="add-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">CUSTOM CATEGORY...</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="add-price" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Price (Optional)</label>
                  <input
                    id="add-price"
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. ₹3.5 Lakhs"
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  />
                </div>
              </div>

              {formCategory === "CUSTOM" && (
                <div>
                  <label htmlFor="add-custom-cat" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Custom Category Name</label>
                  <input
                    id="add-custom-cat"
                    type="text"
                    required
                    value={formCustomCategory}
                    onChange={(e) => setFormCustomCategory(e.target.value)}
                    placeholder="e.g. BATHROOMS"
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={uploadingImage}
                className="w-full bg-[#ad9f82] text-neutral-950 hover:bg-white hover:text-black py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 rounded-none"
              >
                ADD PROJECT TO GALLERY
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DIALOG MODAL */}
      {isEditModalOpen && activeItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#121212] border border-white/5 p-6 md:p-8 max-w-lg w-full relative shadow-2xl my-8">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <h3 className="text-sm font-semibold tracking-[0.15em] text-[#ad9f82] uppercase mb-6 border-b border-white/5 pb-4">
              Edit Project Details
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div>
                <label className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Project Image</label>
                
                {formImage && (
                  <div className="relative aspect-[4/3] bg-neutral-950 border border-white/10 group mb-3">
                    <Image src={formImage} alt="Uploaded" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-[#ad9f82] text-neutral-950 text-[10px] font-bold tracking-wider uppercase px-4 py-2 hover:bg-white hover:text-black transition-all cursor-pointer">
                        {uploadingImage ? "PROCESSING..." : "CHANGE IMAGE"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={uploadingImage} />
                      </label>
                    </div>
                  </div>
                )}
                
                {imageError && (
                  <p className="text-red-400 text-[10px] font-semibold mt-1">{imageError}</p>
                )}
              </div>

              <div>
                <label htmlFor="edit-title" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Project Name</label>
                <input
                  id="edit-title"
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Luxury Living Room Setup"
                  className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-category" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Category</label>
                  <select
                    id="edit-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">CUSTOM CATEGORY...</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-price" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Price (Optional)</label>
                  <input
                    id="edit-price"
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. ₹3.5 Lakhs"
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] placeholder:text-neutral-600 focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  />
                </div>
              </div>

              {formCategory === "CUSTOM" && (
                <div>
                  <label htmlFor="edit-custom-cat" className="block text-[9px] font-bold tracking-wider text-neutral-400 uppercase mb-2">Custom Category Name</label>
                  <input
                    id="edit-custom-cat"
                    type="text"
                    required
                    value={formCustomCategory}
                    onChange={(e) => setFormCustomCategory(e.target.value)}
                    placeholder="e.g. BATHROOMS"
                    className="w-full bg-[#1c1c1c] border border-white/10 py-3 px-4 text-xs text-[#f5f5f5] focus:outline-none focus:border-[#ad9f82] transition-colors rounded-none font-light"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={uploadingImage}
                className="w-full bg-[#ad9f82] text-neutral-950 hover:bg-white hover:text-black py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 rounded-none"
              >
                SAVE PROJECT CHANGES
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
