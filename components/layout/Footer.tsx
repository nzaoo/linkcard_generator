import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-gray-900 font-bold text-lg">
                N
              </div>
              <span className="text-xl font-bold gold-gradient-text">NZaoCard</span>
            </div>
            <p className="text-white/70 mb-4 max-w-md">
              Create beautiful personal introduction cards with stunning animations and professional
              design. Share your digital presence with the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/nzaoo/linkcard_generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="mailto:nzao1327@gmail.com"
                className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Create Card
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#examples"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Examples
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/nzaoo/linkcard_generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/nzaoo/linkcard_generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Report Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nzaoo/linkcard_generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="mailto:nzao1327@gmail.com"
                  className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} NZaoCard. Made with ❤️ by{' '}
            <a
              href="https://github.com/nzaoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
            >
              Nzaoo
            </a>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
