"use client";
import Link from "next/link";
import { Users, Radio, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "./Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-800">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Amplify Your Sound,{" "}
          <span className="text-emerald-400">Engage Your Crowd</span>
        </h1>
        <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
          Create interactive music experiences where your audience influences
          your playlist in real-time. Build deeper connections through
          collaborative listening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Start Creating
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-emerald-400 text-white hover:bg-emerald-800"
          >
            Explore Features
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-16">
          Why Musicians Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-emerald-900/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Audience Participation
            </h3>
            <p className="text-emerald-100">
              Let your listeners vote on what plays next and shape your
              performance together.
            </p>
          </div>
          <div className="bg-emerald-900/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Radio className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Seamless Broadcasting
            </h3>
            <p className="text-emerald-100">
              Stream with zero latency and perfect synchronization across all
              devices.
            </p>
          </div>
          <div className="bg-emerald-900/50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Studio-Grade Sound
            </h3>
            <p className="text-emerald-100">
              Deliver pristine audio quality that captures every nuance of your
              music.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-emerald-900/60 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Revolutionize Your Music?
          </h2>
          <p className="text-emerald-100 mb-8">
            Join BeatPoll today and start creating memorable interactive
            experiences with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-emerald-800/50 border-emerald-700 text-white placeholder:text-emerald-300"
            />
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white whitespace-nowrap">
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 border-t border-emerald-800 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-300 text-sm">
            © 2025 BeatPoll. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-emerald-300 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-emerald-300 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-emerald-300 hover:text-white text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
