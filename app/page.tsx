"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, FileText, Download, Settings, CheckCircle } from "lucide-react"

export default function WordConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [isConverting, setIsConverting] = useState(false)
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supportedFormats = [
    { value: "pdf", label: "PDF Document", extension: ".pdf" },
    { value: "txt", label: "Plain Text", extension: ".txt" },
    { value: "html", label: "HTML Document", extension: ".html" },
    { value: "rtf", label: "Rich Text Format", extension: ".rtf" },
    { value: "odt", label: "OpenDocument Text", extension: ".odt" },
    { value: "epub", label: "EPUB eBook", extension: ".epub" },
    { value: "markdown", label: "Markdown", extension: ".md" },
  ]

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setConversionComplete(false)
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, "")
    setFileName(baseName)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (
      (droppedFile && droppedFile.type.includes("word")) ||
      droppedFile.name.endsWith(".docx") ||
      droppedFile.name.endsWith(".doc")
    ) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const initiateConversion = () => {
    if (!file || !outputFormat) return
    setShowNameDialog(true)
  }

  const handleConversion = async () => {
    if (!fileName.trim()) return

    setShowNameDialog(false)
    setIsConverting(true)

    // Simulate conversion process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsConverting(false)
    setConversionComplete(true)
  }

  const downloadFile = () => {
    const selectedFormat = supportedFormats.find((f) => f.value === outputFormat)
    const fullFileName = `${fileName}${selectedFormat?.extension || ""}`

    // Create a dummy blob for demonstration
    const blob = new Blob(["Converted file content"], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fullFileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetConverter = () => {
    setFile(null)
    setOutputFormat("")
    setFileName("")
    setConversionComplete(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Document Converter</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transform your Word documents into any format with professional precision and elegant simplicity.
          </p>
        </div>

        {/* Main Converter Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Conversion Studio
            </CardTitle>
            <CardDescription className="text-base text-slate-600">
              Upload your document, select the desired format, and let our advanced converter handle the rest.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* File Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-medium text-slate-700">Source Document</Label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  file
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {file ? (
                  <div className="space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                    <div>
                      <p className="font-semibold text-slate-800">{file.name}</p>
                      <p className="text-sm text-slate-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for conversion
                      </p>
                    </div>
                    <Button variant="outline" onClick={resetConverter} className="mt-2">
                      Choose Different File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-slate-700 mb-2">Drop your Word document here</p>
                      <p className="text-slate-500 mb-4">or click to browse your files</p>
                      <Button onClick={() => fileInputRef.current?.click()} className="bg-slate-900 hover:bg-slate-800">
                        Select Document
                      </Button>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>

            <Separator className="my-8" />

            {/* Format Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-medium text-slate-700">Output Format</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Choose your desired format" />
                </SelectTrigger>
                <SelectContent>
                  {supportedFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value} className="py-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{format.label}</span>
                        <Badge variant="secondary" className="ml-2">
                          {format.extension}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-8" />

            {/* Conversion Actions */}
            <div className="space-y-6">
              {!conversionComplete ? (
                <Button
                  onClick={initiateConversion}
                  disabled={!file || !outputFormat || isConverting}
                  className="w-full h-14 text-lg font-semibold bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
                >
                  {isConverting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Converting Document...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Settings className="w-6 h-6" />
                      Begin Conversion
                    </div>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">Conversion Complete!</p>
                      <p className="text-sm text-emerald-600">Your document is ready for download.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={downloadFile} className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700">
                      <Download className="w-5 h-5 mr-2" />
                      Download File
                    </Button>
                    <Button onClick={resetConverter} variant="outline" className="h-12 px-6">
                      Convert Another
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Naming Dialog */}
        <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Name Your File</DialogTitle>
              <DialogDescription className="text-base">
                Choose a name for your converted document. The appropriate file extension will be added automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="filename" className="text-sm font-medium">
                  File Name
                </Label>
                <Input
                  id="filename"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                  className="h-11"
                />
                <p className="text-sm text-slate-500">
                  Final name: {fileName || "filename"}
                  {supportedFormats.find((f) => f.value === outputFormat)?.extension}
                </p>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowNameDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConversion}
                disabled={!fileName.trim()}
                className="bg-slate-900 hover:bg-slate-800"
              >
                Start Conversion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Multiple Formats</h3>
              <p className="text-sm text-slate-600">Convert to PDF, HTML, TXT, and more professional formats.</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">High Quality</h3>
              <p className="text-sm text-slate-600">Preserve formatting and maintain document integrity.</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Easy to Use</h3>
              <p className="text-sm text-slate-600">Simple drag-and-drop interface with instant results.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
