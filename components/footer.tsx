"use client";
import Link from "next/link";
import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Wallet,
  Github,
  Twitter,
  Globe,
  Mail,
  FileText,
  Shield,
  Users,
  ExternalLink,
  Send,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter",
      });
      setEmail("");
      setIsSubscribing(false);
    }, 1000);
  };

  const footerLinks = {
    product: [
      { label: "Dashboard", href: "/dashboard", icon: Wallet },
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "API Access", href: "/api-docs", icon: FileText },
    ],
    resources: [
      {
        label: "Documentation",
        href: "https://docs.solana.com",
        icon: FileText,
        external: true,
      },
      {
        label: "Solana Explorer",
        href: "https://explorer.solana.com",
        external: true,
      },
      { label: "Phantom Wallet", href: "https://phantom.app", external: true },
      { label: "Tutorials", href: "/tutorials" },
      {
        label: "Community",
        href: "https://discord.gg/solana",
        icon: Users,
        external: true,
      },
    ],
    ecosystem: [
      {
        label: "Solana Foundation",
        href: "https://solana.org",
        external: true,
      },
      { label: "Solana Labs", href: "https://solanalabs.com", external: true },
      { label: "Magic Eden", href: "https://magiceden.io", external: true },
      { label: "Raydium", href: "https://raydium.io", external: true },
      { label: "Jupiter", href: "https://jup.ag", external: true },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy", icon: Shield },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact", icon: Mail },
      { label: "Careers", href: "/careers" },
    ],
    social: [
      { label: "GitHub", href: "https://github.com", icon: Github },
      { label: "Twitter", href: "https://twitter.com", icon: Twitter },
      { label: "Discord", href: "https://discord.gg/solana", icon: Users },
      { label: "Website", href: "https://solana.com", icon: Globe },
    ],
  };

  return (
    <footer className="border-t border-border/40 glass mt-auto">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sol3
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The most comprehensive Solana wallet dashboard with glassmorphic
              design, advanced Web3 features, and seamless integration with the
              Solana ecosystem.
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    {link.icon && (
                      <link.icon className="h-3 w-3 group-hover:text-primary transition-colors" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.icon && (
                      <link.icon className="h-3 w-3 group-hover:text-primary transition-colors" />
                    )}
                    {link.label}
                    {link.external && (
                      <ExternalLink className="h-2 w-2 opacity-50" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Ecosystem</h3>
            <ul className="space-y-3">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ExternalLink className="h-2 w-2 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    {link.icon && (
                      <link.icon className="h-3 w-3 group-hover:text-primary transition-colors" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest updates on new features, Solana ecosystem news,
                and exclusive insights delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                disabled={isSubscribing}
              />
              <Button type="submit" disabled={isSubscribing} className="px-6">
                {isSubscribing ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Sol3 Team. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/status"
              className="hover:text-foreground transition-colors"
            >
              System Status
            </Link>
            <Link
              href="/security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </Link>
            <span className="flex items-center gap-2">
              Built with ❤️ for the Solana ecosystem
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
