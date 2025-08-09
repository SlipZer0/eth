"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  LockClosedIcon,
  PhotoIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const CreateCapsule: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [step, setStep] = useState(1);
  const [capsuleData, setCapsuleData] = useState({
    title: "",
    message: "",
    unlockDate: "",
    contentType: "message",
    files: [] as File[],
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCapsuleData(prev => ({
        ...prev,
        files: Array.from(event.target.files!),
      }));
    }
  };

  const contentTypes = [
    {
      id: "message",
      label: "Personal Message",
      icon: DocumentTextIcon,
      desc: "Write a heartfelt message for the future",
    },
    { id: "photo", label: "Photo Memory", icon: PhotoIcon, desc: "Upload precious photos to preserve" },
    { id: "video", label: "Video Message", icon: VideoCameraIcon, desc: "Record a video for your future self" },
  ];

  if (!connectedAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center text-white p-8">
          <LockClosedIcon className="h-24 w-24 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-xl text-white/80">Please connect your wallet to create a time capsule</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-base-300/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="btn btn-ghost btn-circle">
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Create Time Capsule
                </h1>
                <p className="text-base-content/70">Step {step} of 3</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-purple-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step 1: Content Type Selection */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <SparklesIcon className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                What would you like to preserve?
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Choose the type of content you want to store in your time capsule
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contentTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setCapsuleData(prev => ({ ...prev, contentType: type.id }))}
                  className={`p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    capsuleData.contentType === type.id
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-base-300 hover:border-purple-300"
                  }`}
                >
                  <type.icon
                    className={`h-12 w-12 mb-4 ${capsuleData.contentType === type.id ? "text-purple-500" : "text-gray-400"}`}
                  />
                  <h3 className="text-xl font-bold mb-2 text-base-content">{type.label}</h3>
                  <p className="text-base-content/70">{type.desc}</p>
                  {capsuleData.contentType === type.id && <CheckCircleIcon className="h-6 w-6 text-purple-500 mt-4" />}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                disabled={!capsuleData.contentType}
                className="btn btn-primary btn-lg bg-gradient-to-r from-purple-500 to-pink-500 border-0 px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Content Creation */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <ClockIcon className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Create Your Content
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Add your content and give your time capsule a meaningful title
              </p>
            </div>

            <div className="bg-white dark:bg-base-300 p-8 rounded-3xl shadow-xl space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-base-content">Capsule Title</label>
                <input
                  type="text"
                  placeholder="e.g., 'Letter to my future self' or 'Our wedding memories'"
                  value={capsuleData.title}
                  onChange={e => setCapsuleData(prev => ({ ...prev, title: e.target.value }))}
                  className="input input-bordered w-full input-lg text-lg"
                />
              </div>

              {/* Content Based on Type */}
              {capsuleData.contentType === "message" && (
                <div>
                  <label className="block text-lg font-semibold mb-3 text-base-content">Your Message</label>
                  <textarea
                    placeholder="Write your message here... What would you like to tell your future self or loved ones?"
                    value={capsuleData.message}
                    onChange={e => setCapsuleData(prev => ({ ...prev, message: e.target.value }))}
                    className="textarea textarea-bordered w-full h-48 text-lg resize-none"
                  />
                </div>
              )}

              {(capsuleData.contentType === "photo" || capsuleData.contentType === "video") && (
                <div>
                  <label className="block text-lg font-semibold mb-3 text-base-content">
                    Upload {capsuleData.contentType === "photo" ? "Photos" : "Video"}
                  </label>
                  <div className="border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-2xl p-12 text-center hover:border-purple-500 transition-colors">
                    <CloudArrowUpIcon className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-lg text-base-content/70 mb-4">
                      Drag and drop your {capsuleData.contentType === "photo" ? "photos" : "video"} here, or click to
                      browse
                    </p>
                    <input
                      type="file"
                      multiple={capsuleData.contentType === "photo"}
                      accept={capsuleData.contentType === "photo" ? "image/*" : "video/*"}
                      onChange={handleFileUpload}
                      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    />
                    {capsuleData.files.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-base-content/70">{capsuleData.files.length} file(s) selected</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Optional Message for File Types */}
              {(capsuleData.contentType === "photo" || capsuleData.contentType === "video") && (
                <div>
                  <label className="block text-lg font-semibold mb-3 text-base-content">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    placeholder="Add a personal message to accompany your media..."
                    value={capsuleData.message}
                    onChange={e => setCapsuleData(prev => ({ ...prev, message: e.target.value }))}
                    className="textarea textarea-bordered w-full h-32 text-lg resize-none"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn btn-outline btn-lg px-8">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={
                  !capsuleData.title ||
                  (capsuleData.contentType === "message" && !capsuleData.message) ||
                  ((capsuleData.contentType === "photo" || capsuleData.contentType === "video") &&
                    capsuleData.files.length === 0)
                }
                className="btn btn-primary btn-lg bg-gradient-to-r from-purple-500 to-pink-500 border-0 px-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Time Lock Setup */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <CalendarIcon className="h-16 w-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Set Your Time Lock
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Choose when your time capsule should be unlocked
              </p>
            </div>

            <div className="bg-white dark:bg-base-300 p-8 rounded-3xl shadow-xl space-y-6">
              {/* Quick Time Options */}
              <div>
                <label className="block text-lg font-semibold mb-4 text-base-content">Quick Options</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "1 Week", days: 7 },
                    { label: "1 Month", days: 30 },
                    { label: "6 Months", days: 180 },
                    { label: "1 Year", days: 365 },
                  ].map(option => (
                    <button
                      key={option.days}
                      onClick={() => {
                        const futureDate = new Date();
                        futureDate.setDate(futureDate.getDate() + option.days);
                        setCapsuleData(prev => ({
                          ...prev,
                          unlockDate: futureDate.toISOString().split("T")[0],
                        }));
                      }}
                      className="btn btn-outline btn-lg h-20 flex-col text-sm hover:bg-purple-50 hover:border-purple-300"
                    >
                      <span className="font-bold">{option.label}</span>
                      <span className="text-xs opacity-70">from today</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Date */}
              <div className="divider">OR</div>

              <div>
                <label className="block text-lg font-semibold mb-3 text-base-content">Choose Custom Date</label>
                <input
                  type="date"
                  value={capsuleData.unlockDate}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // Tomorrow
                  onChange={e => setCapsuleData(prev => ({ ...prev, unlockDate: e.target.value }))}
                  className="input input-bordered input-lg text-lg w-full max-w-md"
                />
                {capsuleData.unlockDate && (
                  <p className="mt-3 text-base-content/70">
                    Your capsule will unlock on{" "}
                    {new Date(capsuleData.unlockDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Preview Card */}
            {capsuleData.unlockDate && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-3xl">
                <div className="bg-white dark:bg-base-300 p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold mb-4 text-base-content">Capsule Preview</h3>
                  <div className="space-y-3">
                    <p>
                      <span className="font-semibold">Title:</span> {capsuleData.title}
                    </p>
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {contentTypes.find(t => t.id === capsuleData.contentType)?.label}
                    </p>
                    <p>
                      <span className="font-semibold">Unlock Date:</span>{" "}
                      {new Date(capsuleData.unlockDate).toLocaleDateString()}
                    </p>
                    {capsuleData.message && (
                      <p>
                        <span className="font-semibold">Has Message:</span> Yes
                      </p>
                    )}
                    {capsuleData.files.length > 0 && (
                      <p>
                        <span className="font-semibold">Files:</span> {capsuleData.files.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="btn btn-outline btn-lg px-8">
                Back
              </button>
              <button
                disabled={!capsuleData.unlockDate}
                className="btn btn-primary btn-lg bg-gradient-to-r from-green-500 to-emerald-500 border-0 px-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Create Time Capsule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCapsule;
