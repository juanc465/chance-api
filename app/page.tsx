"use client"

import { useState, useEffect } from "react"
import { Calendar, Star, Sun, Dice1 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ChanceResult {
  chanceNumber: string
  zodiacSign: string
  horoscope: string
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
  const [animatingNumbers, setAnimatingNumbers] = useState<string[]>([])
  const [showAnimation, setShowAnimation] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  // Función para generar números aleatorios para la animación
  const generateAnimationNumbers = () => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString())
  }

  // Efecto para la animación de números
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (showAnimation) {
      interval = setInterval(() => {
        setAnimatingNumbers(generateAnimationNumbers())
        setAnimationStep((prev) => prev + 1)
      }, 100) // Cambiar números cada 100ms

      // Detener la animación después de 3 segundos
      setTimeout(() => {
        setShowAnimation(false)
        setAnimationStep(0)
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showAnimation])

  const handleGenerate = async () => {
    if (!birthDate) {
      setError("Por favor ingresa tu fecha de nacimiento")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setShowAnimation(true)
    setAnimatingNumbers(generateAnimationNumbers())

    try {
      // Esperar a que termine la animación antes de mostrar el resultado
      setTimeout(async () => {
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
        setLoading(false)
      }, 3200) // Esperar un poco más que la animación
    } catch (err) {
      setError("Error al generar los números. Intenta nuevamente.")
      setLoading(false)
      setShowAnimation(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Star className="text-yellow-500" />
            Prueba tu Suerte
            <Star className="text-yellow-500" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Genera tu número de la suerte basado en tu fecha de nacimiento y signo zodiacal
          </p>
        </div>

        {/* Input Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Fecha de Nacimiento
            </CardTitle>
            <CardDescription>Ingresa tu fecha de nacimiento para generar tu número personalizado</CardDescription>
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
                  Generar Número
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Animation */}
        {showAnimation && (
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700 text-center justify-center">
                <Dice1 className="w-6 h-6 animate-spin" />
                Seleccionando tu Número de la Suerte...
              </CardTitle>
              <CardDescription className="text-center">Los números están siendo elegidos para ti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-yellow-600 mb-4 font-mono tracking-wider">
                  {animatingNumbers.join("")}
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && !showAnimation && (
          <div className="space-y-6 animate-fade-in">
            {/* Main Number */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 text-center justify-center">
                  <Star className="w-6 h-6" />
                  Tu Número de la Suerte
                </CardTitle>
                <CardDescription className="text-center">Número generado para tu signo zodiacal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-600 mb-4 animate-pulse-once">
                    {result.chanceNumber}
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-lg px-4 py-2">
                    {result.zodiacSign}
                  </Badge>
                </div>
                <Separator />
              </CardContent>
            </Card>

            {/* Horoscope */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Horóscopo de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{result.horoscope}</p>
              </CardContent>
            </Card>

            {/* Birth Info */}
            <Card className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Los números son generados usando algoritmos especiales y tu información astrológica</p>
          <p className="text-xs">Recuerda jugar responsablemente</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-once {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-pulse-once {
          animation: pulse-once 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}
