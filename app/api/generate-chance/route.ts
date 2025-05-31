import { type NextRequest, NextResponse } from "next/server"

// Signos zodiacales con sus fechas
const zodiacSigns = [
  { name: "Aries", start: [3, 21], end: [4, 19] },
  { name: "Tauro", start: [4, 20], end: [5, 20] },
  { name: "Géminis", start: [5, 21], end: [6, 20] },
  { name: "Cáncer", start: [6, 21], end: [7, 22] },
  { name: "Leo", start: [7, 23], end: [8, 22] },
  { name: "Virgo", start: [8, 23], end: [9, 22] },
  { name: "Libra", start: [9, 23], end: [10, 22] },
  { name: "Escorpio", start: [10, 23], end: [11, 21] },
  { name: "Sagitario", start: [11, 22], end: [12, 21] },
  { name: "Capricornio", start: [12, 22], end: [1, 19] },
  { name: "Acuario", start: [1, 20], end: [2, 18] },
  { name: "Piscis", start: [2, 19], end: [3, 20] },
]

// Función para obtener el signo zodiacal
function getZodiacSign(month: number, day: number): string {
  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start
    const [endMonth, endDay] = sign.end

    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return sign.name
      }
    } else {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name
      }
    }
  }
  return "Desconocido"
}

// Función para obtener el día del año
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// Generador de números basado en semilla
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }
}

// Función para generar números de chance
function generateChanceNumbers(
  birthDate: Date,
  type: "sol" | "luna",
): {
  numbers: string
  zodiacSign: string
  luckyNumbers: number[]
} {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const year = birthDate.getFullYear()
  const dayOfYear = getDayOfYear(birthDate)

  const zodiacSign = getZodiacSign(month, day)

  // Crear semilla única basada en la fecha y tipo
  const typeSeed = type === "sol" ? 1 : 2
  const seed = year + month * 100 + day * 10000 + dayOfYear + typeSeed * 1000000

  const rng = new SeededRandom(seed)

  // Generar 4 dígitos para el chance
  const digits = []
  for (let i = 0; i < 4; i++) {
    digits.push(rng.nextInt(0, 9))
  }

  // Generar números de la suerte adicionales
  const luckyNumbers = []
  for (let i = 0; i < 6; i++) {
    luckyNumbers.push(rng.nextInt(1, 99))
  }

  return {
    numbers: digits.join(""),
    zodiacSign,
    luckyNumbers,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { birthDate } = await request.json()

    if (!birthDate) {
      return NextResponse.json({ error: "Fecha de nacimiento requerida" }, { status: 400 })
    }

    const date = new Date(birthDate)

    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: "Fecha de nacimiento inválida" }, { status: 400 })
    }

    // Validar que la fecha no sea futura
    if (date > new Date()) {
      return NextResponse.json({ error: "La fecha de nacimiento no puede ser futura" }, { status: 400 })
    }

    const astroSol = generateChanceNumbers(date, "sol")
    const astroLuna = generateChanceNumbers(date, "luna")

    const result = {
      astroSol,
      astroLuna,
      birthInfo: {
        date: date.toLocaleDateString("es-ES"),
        zodiacSign: getZodiacSign(date.getMonth() + 1, date.getDate()),
        dayOfYear: getDayOfYear(date),
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating chance numbers:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
