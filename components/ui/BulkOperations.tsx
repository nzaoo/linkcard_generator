import React, { useState, useRef } from 'react'

interface BulkOperationsProps {
  onImport: (data: any[]) => void
  onExport: (format: string) => void
  cards: any[]
  className?: string
}

interface ImportFormat {
  id: string
  name: string
  icon: string
  description: string
  extensions: string[]
}

const importFormats: ImportFormat[] = [
  {
    id: 'json',
    name: 'JSON',
    icon: '📄',
    description: 'Import from JSON file',
    extensions: ['.json']
  },
  {
    id: 'csv',
    name: 'CSV',
    icon: '📊',
    description: 'Import from CSV file',
    extensions: ['.csv']
  },
  {
    id: 'vcf',
    name: 'vCard',
    icon: '📇',
    description: 'Import from vCard file',
    extensions: ['.vcf']
  }
]

const exportFormats = [
  { id: 'json', name: 'JSON', icon: '📄' },
  { id: 'csv', name: 'CSV', icon: '📊' },
  { id: 'vcf', name: 'vCard', icon: '📇' },
  { id: 'pdf', name: 'PDF Bundle', icon: '📋' }
]

export default function BulkOperations({ 
  onImport, 
  onExport, 
  cards,
  className = '' 
}: BulkOperationsProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedImportFormat, setSelectedImportFormat] = useState<ImportFormat>(importFormats[0])
  const [importProgress, setImportProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setImportProgress(0)

    try {
      const text = await file.text()
      let data: any[] = []

      switch (selectedImportFormat.id) {
        case 'json':
          data = JSON.parse(text)
          break
        case 'csv':
          data = parseCSV(text)
          break
        case 'vcf':
          data = parseVCF(text)
          break
        default:
          throw new Error('Unsupported format')
      }

      // Validate data structure
      const validatedData = data.filter(item => 
        item.name && item.bio && Array.isArray(item.links)
      )

      if (validatedData.length === 0) {
        throw new Error('No valid cards found in file')
      }

      setImportProgress(100)
      onImport(validatedData)
    } catch (error) {
      console.error('Import error:', error)
      alert(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
      setImportProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n')
    const headers = lines[0].split(',').map(h => h.trim())
    const cards = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue
      
      const values = lines[i].split(',').map(v => v.trim())
      const card: any = {}
      
      headers.forEach((header, index) => {
        card[header] = values[index] || ''
      })

      // Parse links if they exist
      if (card.links) {
        try {
          card.links = JSON.parse(card.links)
        } catch {
          card.links = []
        }
      } else {
        card.links = []
      }

      cards.push(card)
    }

    return cards
  }

  const parseVCF = (vcfText: string): any[] => {
    const cards = []
    const vcards = vcfText.split('BEGIN:VCARD')
    
    for (const vcard of vcards) {
      if (!vcard.trim()) continue
      
      const card: any = {
        name: '',
        bio: '',
        links: []
      }

      const lines = vcard.split('\n')
      for (const line of lines) {
        if (line.startsWith('FN:')) {
          card.name = line.substring(3)
        } else if (line.startsWith('NOTE:')) {
          card.bio = line.substring(5)
        } else if (line.startsWith('URL:')) {
          card.links.push({
            platform: 'website',
            url: line.substring(4)
          })
        } else if (line.startsWith('EMAIL:')) {
          card.links.push({
            platform: 'email',
            url: `mailto:${line.substring(6)}`
          })
        }
      }

      if (card.name) {
        cards.push(card)
      }
    }

    return cards
  }

  const handleExport = async (format: string) => {
    setIsProcessing(true)
    
    try {
      switch (format) {
        case 'json':
          exportAsJSON()
          break
        case 'csv':
          exportAsCSV()
          break
        case 'vcf':
          exportAsVCF()
          break
        case 'pdf':
          exportAsPDF()
          break
        default:
          throw new Error('Unsupported export format')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(cards, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nzaocards-export-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportAsCSV = () => {
    const headers = ['name', 'bio', 'avatar', 'slug', 'createdAt', 'links']
    const csvContent = [
      headers.join(','),
      ...cards.map(card => [
        `"${card.name}"`,
        `"${card.bio}"`,
        `"${card.avatar || ''}"`,
        `"${card.slug}"`,
        `"${card.createdAt}"`,
        `"${JSON.stringify(card.links)}"`
      ].join(','))
    ].join('\n')

    const dataBlob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nzaocards-export-${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportAsVCF = () => {
    const vcfContent = cards.map(card => {
      let vcf = 'BEGIN:VCARD\nVERSION:3.0\n'
      vcf += `FN:${card.name}\n`
      if (card.bio) vcf += `NOTE:${card.bio}\n`
      
      card.links.forEach((link: any) => {
        if (link.platform === 'email') {
          vcf += `EMAIL:${link.url.replace('mailto:', '')}\n`
        } else {
          vcf += `URL:${link.url}\n`
        }
      })
      
      vcf += 'END:VCARD\n'
      return vcf
    }).join('\n')

    const dataBlob = new Blob([vcfContent], { type: 'text/vcard' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `nzaocards-export-${Date.now()}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportAsPDF = () => {
    // This would require a more complex PDF generation library
    // For now, we'll show a message
    alert('PDF export feature coming soon!')
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-xl ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Bulk Operations
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Import Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Import Cards</h4>
          
          {/* Import Format Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Import Format
            </label>
            <div className="grid grid-cols-1 gap-2">
              {importFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedImportFormat(format)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedImportFormat.id === format.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{format.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{format.name}</div>
                      <div className="text-sm text-gray-600">{format.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={selectedImportFormat.extensions.join(',')}
              onChange={handleFileImport}
              disabled={isProcessing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          {/* Import Progress */}
          {isProcessing && importProgress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Importing...</span>
                <span>{importProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Export Cards</h4>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              Export {cards.length} card{cards.length !== 1 ? 's' : ''} in your preferred format
            </p>
          </div>

          {/* Export Format Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => handleExport(format.id)}
                disabled={isProcessing || cards.length === 0}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl">{format.icon}</span>
                <span className="font-medium text-gray-900">{format.name}</span>
              </button>
            ))}
          </div>

          {/* Export Status */}
          {isProcessing && (
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">💡 Tips:</p>
          <ul className="space-y-1">
            <li>• Supported import formats: JSON, CSV, vCard</li>
            <li>• CSV files should have columns: name, bio, avatar, slug, createdAt, links</li>
            <li>• Links should be in JSON format for CSV imports</li>
            <li>• Export formats include JSON, CSV, vCard, and PDF (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 