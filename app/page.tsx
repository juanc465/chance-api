"use client"

import { useState } from "react"
import { Calendar, Star, Sun, Moon, Dice1 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ChanceResult {
  astroSol: {
    numbers: string
    zodiacSign: string
    luckyNumbers: number[]
  }
  astroLuna: {
    numbers: string
    zodiacSign: string
    luckyNumbers: number[]
  }
  birthInfo: {
    date: string
    zodiacSign: string
    dayOfYear: number
  }
}

export default function ChanceGenerator() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<ChanceResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!birthDate) {
      setError("Por favor ingresa tu fecha de nacimiento")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-chance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ birthDate }),
      })

      if (!response.ok) {
        throw new Error("Error al generar los números")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Error al generar los números. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Star className="text-yellow-500" />
            Generador de Chance Astrológico
            <Star className="text-yellow-500" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Genera tus números de la suerte para Astro Sol y Astro Luna basados en tu fecha de nacimiento y signo
            zodiacal
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Fecha de Nacimiento
            </CardTitle>
            <CardDescription>Ingresa tu fecha de nacimiento para generar tus números personalizados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Dice1 className="w-4 h-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  Generar Números
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Astro Sol */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Sun className="w-6 h-6" />
                  Astro Sol
                </CardTitle>
                <CardDescription>Números generados para el sorteo solar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{result.astroSol.numbers}</div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    {result.astroSol.zodiacSign}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Números de la suerte:</p>
                  <div className="flex gap-2 flex-wrap">
                    {result.astroSol.luckyNumbers.map((num, index) => (
                      <Badge key={index} variant="outline" className="border-orange-300">
                        {num}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Astro Luna */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Moon className="w-6 h-6" />
                  Astro Luna
                </CardTitle>
                <CardDescription>Números generados para el sorteo lunar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{result.astroLuna.numbers}</div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {result.astroLuna.zodiacSign}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Números de la suerte:</p>
                  <div className="flex gap-2 flex-wrap">
                    {result.astroLuna.luckyNumbers.map((num, index) => (
                      <Badge key={index} variant="outline" className="border-blue-300">
                        {num}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Birth Info */}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Información Astrológica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                  <p className="font-semibold">{result.birthInfo.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Signo Zodiacal</p>
                  <p className="font-semibold">{result.birthInfo.zodiacSign}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Día del Año</p>
                  <p className="font-semibold">{result.birthInfo.dayOfYear}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Los números son generados usando algoritmos basados en tu información astrológica</p>
          <p className="text-xs">Recuerda jugar responsablemente</p>
        </div>
      </div>
    </div>
  )
}
