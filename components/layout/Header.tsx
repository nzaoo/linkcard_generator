import React, { useState } from 'react'
import Link from 'next/link'
import { HeaderProps } from '@/types'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-gray-900 font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                N
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-200"></div>
            </div>
            <span className="text-xl font-bold gold-gradient-text">NZaoCard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Features
            </Link>
            <Link
              href="#examples"
              className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Examples
            </Link>
            <a
              href="https://github.com/nzaoo/linkcard_generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              GitHub
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Create Card
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#examples"
                className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </Link>
              <a
                href="https://github.com/nzaoo/linkcard_generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-yellow-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
              <Link
                href="/"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Card
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
