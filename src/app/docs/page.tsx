"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Book, Code, Terminal, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    title: "Getting Started",
    description: "Learn the basics of Algorand development",
    icon: Book,
    links: [
      { name: "Quick Start", href: "/docs/quick-start" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Basic Concepts", href: "/docs/basic-concepts" },
    ],
  },
  {
    title: "Smart Contracts",
    description: "Build and deploy smart contracts on Algorand",
    icon: Code,
    links: [
      { name: "Overview", href: "/docs/smart-contracts/overview" },
      { name: "TEAL", href: "/docs/smart-contracts/teal" },
      { name: "Algorand Virtual Machine", href: "/docs/smart-contracts/avm" },
    ],
  },
  {
    title: "SDKs & APIs",
    description: "Integrate Algorand into your applications",
    icon: Terminal,
    links: [
      { name: "Python SDK", href: "/docs/sdks-apis/python-sdk" },
      { name: "TypeScript SDK", href: "/docs/sdks-apis/typescript-sdk" },
      { name: "REST APIs", href: "/docs/sdks-apis/rest-apis" },
    ],
  },
]

export default function DocsPage() {
  const [query, setQuery] = useState("")

  const filteredSections = sections
    .map((section) => {
      const filteredLinks = section.links.filter((link) =>
        link.name.toLowerCase().includes(query.toLowerCase())
      )
      if (
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.description.toLowerCase().includes(query.toLowerCase()) ||
        filteredLinks.length > 0
      ) {
        return {
          ...section,
          links:
            section.title.toLowerCase().includes(query.toLowerCase()) ||
            section.description.toLowerCase().includes(query.toLowerCase())
              ? section.links
              : filteredLinks,
        }
      } else {
        return null
      }
    })
    .filter(Boolean)

  return (
    <main className="min-h-screen animated-gradient pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-gray-400">Everything you need to build on the Algorand blockchain</p>
        </div>
        <div className="glass-effect rounded-lg p-4 mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 bg-transparent border-white/20 text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSections.length > 0 ? (
            filteredSections.map((section) => {
              const Icon = section!.icon;
              return (
                <Card
                  key={section!.title}
                  className="glass-effect p-6 hover:border-[#6104d7]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#6104d7]/10"
                >
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{section!.title}</h3>
                    <p className="text-gray-400">{section!.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {section!.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                          >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {link.name}
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full text-center text-white opacity-60 text-lg py-16">
              No documentation found for "<span className="font-mono">{query}</span>"
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
