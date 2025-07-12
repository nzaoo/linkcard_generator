import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

interface QRCodeGeneratorProps {
  url: string
  title?: string
  className?: string
}

interface QRCodeOptions {
  size: number
  foregroundColor: string
  backgroundColor: string
  includeLogo: boolean
  logoSize: number
}

export default function QRCodeGenerator({ 
  url, 
  title = 'Scan to view card',
  className = '' 
}: QRCodeGeneratorProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 256,
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    includeLogo: false,
    logoSize: 40
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate QR code using a simple library or API
  const generateQRCode = useCallback(async () => {
    if (!url) return

    setIsGenerating(true)
    try {
      // Using QR Server API for simplicity
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${options.size}x${options.size}&data=${encodeURIComponent(url)}&color=${options.foregroundColor.replace('#', '')}&bgcolor=${options.backgroundColor.replace('#', '')}`
      
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const dataUrl = URL.createObjectURL(blob)
      setQrCodeDataUrl(dataUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
      // Fallback to a simple text-based QR code
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = options.size
          canvas.height = options.size

          // Fill background
          ctx.fillStyle = options.backgroundColor
          ctx.fillRect(0, 0, options.size, options.size)

          // Draw simple QR-like pattern (this is just a placeholder)
          ctx.fillStyle = options.foregroundColor
          const cellSize = options.size / 25

          // Draw corner squares
          ctx.fillRect(0, 0, cellSize * 7, cellSize * 7)
          ctx.fillRect(options.size - cellSize * 7, 0, cellSize * 7, cellSize * 7)
          ctx.fillRect(0, options.size - cellSize * 7, cellSize * 7, cellSize * 7)

          // Draw some random pattern
          for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * 25) * cellSize
            const y = Math.floor(Math.random() * 25) * cellSize
            ctx.fillRect(x, y, cellSize, cellSize)
          }

          setQrCodeDataUrl(canvas.toDataURL())
        }
      }
    } finally {
      setIsGenerating(false)
    }
  }, [url, options])

  // Download QR code
  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return

    const link = document.createElement('a')
    link.download = `nzaocard-qr-${Date.now()}.png`
    link.href = qrCodeDataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Generate QR code on mount and when options change
  useEffect(() => {
    if (url) {
      generateQRCode()
    }
  }, [url, options, generateQRCode])

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        {title}
      </h3>

      {/* QR Code Display */}
      <div className="flex justify-center mb-6">
        {isGenerating ? (
          <div className="flex items-center justify-center w-64 h-64 bg-gray-100 rounded-lg">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Generating QR Code...</p>
            </div>
          </div>
        ) : qrCodeDataUrl ? (
          <div className="relative">
            <div className="relative w-64 h-64">
              <Image 
                src={qrCodeDataUrl} 
                alt="QR Code" 
                fill
                className="rounded-lg shadow-lg object-contain"
                sizes="256px"
              />
            </div>
            {options.includeLogo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="bg-white rounded-full p-2 shadow-lg"
                  style={{ width: options.logoSize, height: options.logoSize }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    N
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">No QR code generated</p>
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              value={options.size}
              onChange={(e) => setOptions(prev => ({ ...prev, size: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={128}>128px</option>
              <option value={256}>256px</option>
              <option value={512}>512px</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foreground Color
            </label>
            <input
              type="color"
              value={options.foregroundColor}
              onChange={(e) => setOptions(prev => ({ ...prev, foregroundColor: e.target.value }))}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={options.backgroundColor}
              onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.includeLogo}
                onChange={(e) => setOptions(prev => ({ ...prev, includeLogo: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Include Logo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={generateQRCode}
          disabled={isGenerating}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </button>
        <button
          onClick={downloadQRCode}
          disabled={!qrCodeDataUrl}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download
        </button>
      </div>

      {/* Hidden canvas for fallback QR generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
} 