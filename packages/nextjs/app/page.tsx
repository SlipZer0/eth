"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  GiftIcon,
  LockClosedIcon,
  PhotoIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <ClockIcon className="h-20 w-20 text-purple-400 animate-spin-slow" />
              <SparklesIcon className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Time Capsule
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white/90">Lock Your Memories in Time</h2>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create encrypted NFT time capsules with your precious memories, messages, and media. Set a future date and
            let blockchain technology preserve your moments until the perfect time to reveal them.
          </p>

          {connectedAddress && (
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 inline-block">
              <p className="text-white/70 mb-2">Connected as:</p>
              <Address address={connectedAddress} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/create"
              className="btn btn-primary btn-lg text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <GiftIcon className="h-6 w-6 mr-2" />
              Create Capsule
            </Link>
            <Link
              href="/gallery"
              className="btn btn-outline btn-lg text-lg px-8 py-4 text-white border-white/30 hover:bg-white hover:text-purple-900 transform hover:scale-105 transition-all duration-300"
            >
              <SparklesIcon className="h-6 w-6 mr-2" />
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-base-200 to-base-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-center text-base-content/70 mb-16 max-w-3xl mx-auto">
            Three simple steps to create your digital time capsule and preserve your memories on the blockchain
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <LockClosedIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-900">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-base-content">Create & Encrypt</h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                Upload your messages, photos, or videos. Choose your unlock date and encrypt everything securely on the
                blockchain.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CalendarIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-900">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-base-content">Set Time Lock</h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                Choose any future date - days, months, or years ahead. Your capsule remains sealed until that moment
                arrives.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <GiftIcon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-yellow-900">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-base-content">Reveal & Cherish</h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                When the time arrives, unlock your capsule and rediscover your memories, preserved perfectly in time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Types Section */}
      <div className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            What Can You Store?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 dark:border-purple-800">
              <DocumentTextIcon className="h-16 w-16 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-base-content">Personal Messages</h3>
              <p className="text-base-content/70 text-lg">
                Love letters, future goals, advice to your future self, or messages for loved ones.
              </p>
            </div>

            <div className="bg-white dark:bg-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100 dark:border-blue-800">
              <PhotoIcon className="h-16 w-16 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-base-content">Precious Photos</h3>
              <p className="text-base-content/70 text-lg">
                Family memories, milestone moments, or artistic captures to be revealed at the perfect time.
              </p>
            </div>

            <div className="bg-white dark:bg-base-300 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-green-100 dark:border-green-800">
              <VideoCameraIcon className="h-16 w-16 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-base-content">Video Messages</h3>
              <p className="text-base-content/70 text-lg">
                Record yourself today and meet your future self, or create videos for special occasions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Create your first time capsule today and experience the magic of preserving moments for the future
          </p>
          <Link
            href="/create"
            className="btn btn-lg bg-gradient-to-r from-yellow-400 to-orange-500 border-0 text-yellow-900 font-bold text-xl px-12 py-4 hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <SparklesIcon className="h-6 w-6 mr-2" />
            Create My First Capsule
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
