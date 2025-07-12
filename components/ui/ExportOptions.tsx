import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ExportOptionsProps {
  cardElement: HTMLElement | null
  cardName: string
  className?: string
}

interface ExportFormat {
  id: string
  name: string
  icon: string
  description: string
  formats: string[]
}

const exportFormats: ExportFormat[] = [
  {
    id: 'image',
    name: 'Image Export',
    icon: '🖼️',
    description: 'Export as high-quality images',
    formats: ['PNG', 'JPG', 'WebP']
  },
  {
    id: 'pdf',
    name: 'PDF Export',
    icon: '📄',
    description: 'Export as printable PDF document',
    formats: ['PDF']
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: '📱',
    description: 'Optimized for social platforms',
    formats: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook']
  }
]

export default function ExportOptions({ 
  cardElement, 
  cardName,
  className = '' 
}: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>(exportFormats[0])
  const [selectedType, setSelectedType] = useState<string>('PNG')
  const [exportQuality, setExportQuality] = useState<'high' | 'medium' | 'low'>('high')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const exportAsImage = async (format: string) => {
    if (!cardElement) return

    setIsExporting(true)
    try {
      const canvas = await html2canvas(cardElement, {
        scale: exportQuality === 'high' ? 2 : exportQuality === 'medium' ? 1.5 : 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      })

      const link = document.createElement('a')
      link.download = `nzaocard-${cardName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${format.toLowerCase()}`
      
      if (format === 'PNG') {
        link.href = canvas.toDataURL('image/png')
      } else if (format === 'JPG') {
        link.href = canvas.toDataURL('image/jpeg', 0.9)
      } else if (format === 'WebP') {
        link.href = canvas.toDataURL('image/webp', 0.9)
      }
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting image:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsPDF = async () => {
    if (!cardElement) return

    setIsExporting(true)
    try {
      const canvas = await html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`nzaocard-${cardName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportForSocial = async (platform: string) => {
    if (!cardElement) return

    setIsExporting(true)
    try {
      // Define platform-specific dimensions
      const dimensions: { [key: string]: { width: number; height: number } } = {
        'Instagram': { width: 1080, height: 1080 },
        'Twitter': { width: 1200, height: 675 },
        'LinkedIn': { width: 1200, height: 627 },
        'Facebook': { width: 1200, height: 630 }
      }

      const dim = dimensions[platform] || { width: 1080, height: 1080 }

      const canvas = await html2canvas(cardElement, {
        scale: 2,
        width: dim.width,
        height: dim.height,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const link = document.createElement('a')
      link.download = `nzaocard-${platform.toLowerCase()}-${cardName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting for social:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExport = async () => {
    if (selectedFormat.id === 'image') {
      await exportAsImage(selectedType)
    } else if (selectedFormat.id === 'pdf') {
      await exportAsPDF()
    } else if (selectedFormat.id === 'social') {
      await exportForSocial(selectedType)
    }
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Export Your Card
      </h3>

      {/* Export Format Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Export Format
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {exportFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => {
                setSelectedFormat(format)
                setSelectedType(format.formats[0])
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedFormat.id === format.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{format.icon}</div>
              <div className="font-semibold text-gray-900">{format.name}</div>
              <div className="text-sm text-gray-600">{format.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Format Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {selectedFormat.name} Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {selectedFormat.formats.map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </select>
      </div>

      {/* Quality Selection (for images) */}
      {selectedFormat.id === 'image' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'high', label: 'High', desc: 'Best quality' },
              { value: 'medium', label: 'Medium', desc: 'Balanced' },
              { value: 'low', label: 'Low', desc: 'Smaller file' }
            ].map((quality) => (
              <button
                key={quality.value}
                onClick={() => setExportQuality(quality.value as any)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  exportQuality === quality.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{quality.label}</div>
                <div className="text-xs text-gray-600">{quality.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview
        </label>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <div className="text-gray-600 text-sm">
            {selectedFormat.id === 'image' && (
              <>
                Exporting as <strong>{selectedType}</strong> with{' '}
                <strong>{exportQuality}</strong> quality
              </>
            )}
            {selectedFormat.id === 'pdf' && (
              <>Exporting as <strong>PDF</strong> document</>
            )}
            {selectedFormat.id === 'social' && (
              <>
                Optimized for <strong>{selectedType}</strong>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting || !cardElement}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Exporting...
          </div>
        ) : (
          `Export as ${selectedType}`
        )}
      </button>

      {/* Tips */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          💡 Tip: For best results, ensure your card is fully loaded before exporting
        </p>
      </div>

      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
} 