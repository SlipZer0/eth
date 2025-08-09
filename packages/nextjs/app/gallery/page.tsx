"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  FunnelIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  SparklesIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

interface TimeCapsule {
  id: string;
  title: string;
  creator: string;
  createdAt: Date;
  unlockDate: Date;
  contentType: "message" | "photo" | "video";
  isLocked: boolean;
  isOwner: boolean;
  previewImage?: string;
}

const Gallery: NextPage = () => {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [filter, setFilter] = useState<"all" | "locked" | "unlocked" | "mine">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with actual blockchain data
  useEffect(() => {
    const mockCapsules: TimeCapsule[] = [
      {
        id: "1",
        title: "Letter to my future self",
        creator: "0x1234...5678",
        createdAt: new Date("2024-01-15"),
        unlockDate: new Date("2025-01-15"),
        contentType: "message",
        isLocked: true,
        isOwner: true,
      },
      {
        id: "2",
        title: "Wedding memories",
        creator: "0xabcd...efgh",
        createdAt: new Date("2024-02-14"),
        unlockDate: new Date("2025-02-14"),
        contentType: "photo",
        isLocked: true,
        isOwner: false,
        previewImage: "/api/placeholder/300/200",
      },
      {
        id: "3",
        title: "Birthday wishes for mom",
        creator: "0x9876...1234",
        createdAt: new Date("2024-03-10"),
        unlockDate: new Date("2024-12-25"),
        contentType: "video",
        isLocked: false,
        isOwner: false,
      },
      {
        id: "4",
        title: "Time capsule for 2030",
        creator: "0x5678...9012",
        createdAt: new Date("2024-01-01"),
        unlockDate: new Date("2030-01-01"),
        contentType: "message",
        isLocked: true,
        isOwner: false,
      },
    ];
    setCapsules(mockCapsules);
  }, []);

  const getContentIcon = (type: string) => {
    switch (type) {
      case "message":
        return DocumentTextIcon;
      case "photo":
        return PhotoIcon;
      case "video":
        return VideoCameraIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const filteredCapsules = capsules.filter(capsule => {
    const matchesFilter =
      filter === "all" ||
      (filter === "locked" && capsule.isLocked) ||
      (filter === "unlocked" && !capsule.isLocked) ||
      (filter === "mine" && capsule.isOwner);

    const matchesSearch =
      capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capsule.creator.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getTimeRemaining = (unlockDate: Date) => {
    const now = new Date();
    const diff = unlockDate.getTime() - now.getTime();

    if (diff <= 0) return "Unlocked";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} days`;
    return `${hours} hours`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/10 dark:via-blue-900/10 dark:to-indigo-900/10">
      {/* Header */}
      <div className="bg-white/80 dark:bg-base-300/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <SparklesIcon className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Time Capsule Gallery
            </h1>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Explore time capsules from around the world. Some are still locked, waiting for their moment to be
              revealed.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search capsules..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-white dark:bg-base-200"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {[
                { id: "all", label: "All Capsules", count: capsules.length },
                { id: "locked", label: "Locked", count: capsules.filter(c => c.isLocked).length },
                { id: "unlocked", label: "Unlocked", count: capsules.filter(c => !c.isLocked).length },
                { id: "mine", label: "My Capsules", count: capsules.filter(c => c.isOwner).length },
              ].map(filterOption => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as any)}
                  className={`btn btn-sm ${
                    filter === filterOption.id
                      ? "btn-primary bg-purple-500 border-purple-500"
                      : "btn-outline hover:btn-primary"
                  }`}
                >
                  <FunnelIcon className="h-4 w-4 mr-1" />
                  {filterOption.label} ({filterOption.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Capsules Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredCapsules.length === 0 ? (
          <div className="text-center py-20">
            <ClockIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-base-content/70 mb-4">No capsules found</h3>
            <p className="text-base-content/50 mb-8">
              {searchTerm ? "Try adjusting your search terms" : "Be the first to create a time capsule!"}
            </p>
            <Link href="/create" className="btn btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-0">
              Create Your First Capsule
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCapsules.map(capsule => {
              const ContentIcon = getContentIcon(capsule.contentType);
              const timeRemaining = getTimeRemaining(capsule.unlockDate);
              const isUnlocked = timeRemaining === "Unlocked";

              return (
                <div
                  key={capsule.id}
                  className="bg-white dark:bg-base-300 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:scale-105"
                >
                  {/* Preview/Header */}
                  <div
                    className={`h-48 relative ${
                      isUnlocked
                        ? "bg-gradient-to-br from-green-400 to-emerald-500"
                        : "bg-gradient-to-br from-purple-400 to-pink-500"
                    }`}
                  >
                    {capsule.previewImage && isUnlocked ? (
                      <Image src={capsule.previewImage} alt="Capsule preview" fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {isUnlocked ? (
                          <EyeIcon className="h-16 w-16 text-white" />
                        ) : (
                          <LockClosedIcon className="h-16 w-16 text-white" />
                        )}
                      </div>
                    )}

                    {/* Status Badge */}
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        isUnlocked ? "bg-green-100 text-green-800" : "bg-white/20 text-white backdrop-blur-sm"
                      }`}
                    >
                      {isUnlocked ? "Unlocked" : timeRemaining}
                    </div>

                    {/* Owner Badge */}
                    {capsule.isOwner && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-400 text-yellow-900 text-sm font-semibold">
                        <UserIcon className="h-4 w-4 inline mr-1" />
                        Mine
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-base-content line-clamp-2 flex-1">{capsule.title}</h3>
                      <ContentIcon className="h-6 w-6 text-purple-500 ml-2 flex-shrink-0" />
                    </div>

                    <div className="space-y-2 text-sm text-base-content/70">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span className="truncate">{capsule.creator}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>Created {capsule.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>
                          {isUnlocked
                            ? `Unlocked on ${capsule.unlockDate.toLocaleDateString()}`
                            : `Unlocks ${capsule.unlockDate.toLocaleDateString()}`}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      {isUnlocked ? (
                        <button className="btn btn-primary w-full bg-gradient-to-r from-green-500 to-emerald-500 border-0 hover:from-green-600 hover:to-emerald-600">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          View Content
                        </button>
                      ) : (
                        <button disabled className="btn btn-outline w-full opacity-50 cursor-not-allowed">
                          <LockClosedIcon className="h-4 w-4 mr-2" />
                          Locked until {capsule.unlockDate.toLocaleDateString()}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        {filteredCapsules.length > 0 && (
          <div className="text-center mt-20 p-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white">
            <SparklesIcon className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Create Your Own Time Capsule</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the community and preserve your own memories for the future
            </p>
            <Link
              href="/create"
              className="btn btn-lg bg-white text-purple-600 border-0 hover:bg-gray-100 font-bold px-12 py-4"
            >
              Start Creating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
