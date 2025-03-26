'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Rocket,
  Wallet2,
  KeyRound,
  ShieldCheck,
  Link,
  Settings,
  Box,
  FileCode2,
  Shield,
  Link2
} from 'lucide-react'

const quickstartLinks = [
  {
    title: "Get Started with OnchainKit",
    href: "/builderkits/onchainkit/getting-started",
    section: "Development Kits"
  },
  {
    title: "Integrate Smart Wallet",
    href: "/docs/identity/smart-wallet/guides/create-app/using-onchain-app-template",
    section: "Identity"
  },
  {
    title: "Set Up Basenames",
    href: "/docs/identity/basenames/basenames-onchainkit-tutorial",
    section: "Identity"
  }
] as const

type QuickstartLink = typeof quickstartLinks[number]

function QuickStartCard() {
  return (
    <div className=" max-overview-hero:hidden overview-hero:sticky overview-hero:top-8 overview-hero:flex overview-hero:justify-center">
      <div className="w-[320px]">
        <div className="relative">
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[rgb(0,82,255)]/20 to-[rgb(77,136,255)]/20 blur-xl" />
          <div className="relative bg-white dark:bg-black shadow-lg border border-zinc-200 dark:border-zinc-800 rounded-md p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(0, 82,255)' }} />
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Quickstart
              </h3>
            </div>
            <div className="space-y-1">
              {quickstartLinks.map((link: QuickstartLink) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block group"
                >
                  <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-[rgb(0,82,255)] line-clamp-1 font-normal">
                      {link.title}
                    </span>
                    <ArrowRight className="h-3 w-3 text-zinc-400 group-hover:text-[rgb(0,82,255)] flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const tools = [
  {
    title: "OnchainKit",
    description: "Ready-to-use React components and TypeScript utilities for building onchain apps.",
    icon: Code2,
    href: "/builderkits/onchainkit/getting-started"
  },
  {
    title: "Smart Wallet",
    description: "A modern, secure wallet with incredible UX and advanced features.",
    icon: Wallet2,
    href: "/docs/identity/smart-wallet/why-smart-wallet"
  },
  {
    title: "AgentKit",
    description: "Build AI agents that can transact and create onchain experiences.",
    icon: Box,
    href: "https://docs.cdp.coinbase.com/agentkit/docs/welcome"
  },
  {
    title: "Verifications",
    description: "Identity and ownership verification with onchain attestations.",
    icon: ShieldCheck,
    href: "/docs/identity/verifications/quickstart"
  },
  {
    title: "Basenames",
    description: "Human-readable onchain identifiers for Base accounts.",
    icon: Link,
    href: "/docs/identity/basenames/basenames-wagmi-tutorial"
  }
] as const

type Tool = typeof tools[number]

const useCases = [
  {
    title: "Ship with OnchainKit",
    description: "Leverage pre-built components and utilities to ship your app faster.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(0,82,255);stop-opacity:0.2' /%3E%3Cstop offset='100%25' style='stop-color:rgb(77,136,255);stop-opacity:0.1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad1)' /%3E%3C/svg%3E",
    href: "/builderkits/onchainkit/getting-started"
  },
  {
    title: "Integrate Smart Wallet",
    description: "Improve user experience with features only available with Smart Wallet.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='100%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(0,82,255);stop-opacity:0.15' /%3E%3Cstop offset='100%25' style='stop-color:rgb(77,136,255);stop-opacity:0.05' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad2)' /%3E%3C/svg%3E",
    href: "/docs/identity/smart-wallet/guides/create-app/using-onchain-app-template"
  },
  {
    title: "Build with Identity",
    description: "Leverage Basenames and Verifications to create onchain identities.",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(0,82,255);stop-opacity:0.1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(77,136,255);stop-opacity:0.2' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad3)' /%3E%3C/svg%3E",
    href: "/docs/identity/basenames/basenames-wagmi-tutorial"
  }
] as const

type UseCase = typeof useCases[number]

const guides = [
  {
    title: "Smart Contract Development",
    description: "Learn to write and deploy secure smart contracts",
    icon: FileCode2,
    href: "/guides/general-development/smart-contract-development/foundry/deploy-with-foundry"
  },
  {
    title: "NFTs",
    description: "Create and manage NFT collections",
    icon: Code2,
    href: "/guides/general-development/nfts/simple-onchain-nfts"
  },
  {
    title: "Account Abstraction",
    description: "Implement smart accounts and meta-transactions",
    icon: Shield,
    href: "/guides/general-development/account-abstraction/account-abstraction-on-base-using-biconomy"
  },
  {
    title: "Cross-Chain Development",
    description: "Build applications that work across chains",
    icon: Link2,
    href: "//guides/general-development/cross-chain/bridge-tokens-with-layerzero"
  }
] as const

type Guide = typeof guides[number]

export function DevToolsOverview() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 xl:grid-cols-[480px,1fr] mb-12">
          {/* Left Column */}
          <div className="max-w-[480px]">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Tools for Onchain Apps</h1>
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
              Devtools that help you build full-stack apps onchain.
            </p>
            
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Whether you're integrating an existing app or building from scratch, we provide the building blocks you need to create exceptional user experiences.
            </p>
            
            {/* CTAs */}
            <div className="mt-6 flex flex-row items-center gap-4 flex-wrap">
              <a
                href="/builderkits/onchainkit/getting-started"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[rgb(0,82,255)] text-white font-medium hover:bg-[rgb(0,82,255)]/90 transition-colors"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Build an Onchain App
              </a>
              <a
                href="/guides/general-development/client-side-development"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Examples
              </a>
            </div>
          </div>

          <QuickStartCard />
        </div>

        {/* Meet the Tools */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Meet the tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool: Tool) => {
              const Icon = tool.icon
              return (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="block group h-full"
                >
                  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-[rgb(0,82,255)] transition-colors h-full flex flex-col shadow-zinc-200/50 dark:shadow-none">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-5 w-5 text-[rgb(0,82,255)]" />
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)]">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 flex-grow">
                      {tool.description}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Start Building */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Start building</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase: UseCase) => (
              <a
                key={useCase.href}
                href={useCase.href}
                className="block group"
              >
                <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-zinc-200/50 dark:shadow-none hover:border-[rgb(0,82,255)] transition-colors">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={useCase.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)]">
                      {useCase.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Explore our guides */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Explore our guides</h2>
            <a href="/guides" className="text-sm text-[rgb(0,82,255)] hover:opacity-80 flex items-center">
              View all guides
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((guide: Guide) => {
              const Icon = guide.icon
              return (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="block group h-full"
                >
                  <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:border-[rgb(0,82,255)] transition-colors h-full flex flex-col shadow-zinc-200/50 dark:shadow-none">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-5 w-5 text-[rgb(0,82,255)]" />
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[rgb(0,82,255)]">
                        {guide.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 flex-grow">
                      {guide.description}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
} 