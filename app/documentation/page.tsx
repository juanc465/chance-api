import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Target, Code, Users, Shield, Layers, Rocket, Wrench } from "lucide-react"

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Documentación del Proyecto</h1>
          <p className="text-xl text-gray-600">Generador de Chance Astrológico - Proyecto Final</p>
        </div>

        {/* 1. Problema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              1. Planteamiento del Problema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Problema:</strong> Los jugadores de chance necesitan una herramienta que les permita generar
              números personalizados basados en información astrológica, específicamente para los juegos Astro Sol y
              Astro Luna.
            </p>
            <p className="text-gray-700">
              <strong>Solución:</strong> Desarrollo de una API web que genere números de 4 cifras y signos zodiacales
              utilizando algoritmos determinísticos basados en la fecha de nacimiento del usuario.
            </p>
          </CardContent>
        </Card>

        {/* 2. Objetivos y Restricciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              2. Objetivos y Restricciones de Negocio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Objetivos:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Proporcionar números personalizados para juegos de chance</li>
                <li>Integrar elementos astrológicos para mayor engagement</li>
                <li>Ofrecer una experiencia de usuario intuitiva y atractiva</li>
                <li>Garantizar resultados consistentes para la misma fecha</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Restricciones:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Uso exclusivo de JavaScript como lenguaje de desarrollo</li>
                <li>Los números deben ser determinísticos (misma entrada = misma salida)</li>
                <li>Cumplimiento con regulaciones de juegos responsables</li>
                <li>Interfaz responsive para múltiples dispositivos</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. Restricción Tecnológica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-600" />
              3. Restricción de Tecnología
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Lenguaje: JavaScript
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Framework: Next.js 15
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Runtime: Node.js
              </Badge>
            </div>
            <p className="text-gray-700">
              El proyecto está desarrollado completamente en JavaScript, utilizando Next.js para el frontend y backend,
              con TypeScript para mayor seguridad de tipos y mejor experiencia de desarrollo.
            </p>
          </CardContent>
        </Card>

        {/* 4. Historias de Usuario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-orange-600" />
              4. Historias de Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800">Historia 1: Generación de Números</h4>
              <p className="text-gray-700 mb-2">
                <strong>Como</strong> jugador de chance, <strong>quiero</strong> ingresar mi fecha de nacimiento
                <strong> para que</strong> el sistema genere mis números personalizados de Astro Sol y Astro Luna.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Criterios de Aceptación:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>El sistema debe validar que la fecha sea válida y no futura</li>
                  <li>Debe generar exactamente 4 dígitos para cada modalidad</li>
                  <li>Debe mostrar el signo zodiacal correspondiente</li>
                  <li>Los números deben ser consistentes para la misma fecha</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-800">Historia 2: Información Astrológica</h4>
              <p className="text-gray-700 mb-2">
                <strong>Como</strong> usuario interesado en astrología, <strong>quiero</strong> ver información
                adicional sobre mi signo zodiacal <strong>para que</strong> tenga más contexto sobre mis números.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Criterios de Aceptación:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Mostrar el signo zodiacal calculado correctamente</li>
                  <li>Incluir números de la suerte adicionales</li>
                  <li>Presentar la información de forma visualmente atractiva</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-800">Historia 3: Experiencia de Usuario</h4>
              <p className="text-gray-700 mb-2">
                <strong>Como</strong> usuario móvil, <strong>quiero</strong> una interfaz responsive y fácil de usar
                <strong>para que</strong> pueda generar mis números desde cualquier dispositivo.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Criterios de Aceptación:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>La interfaz debe ser responsive en móviles y desktop</li>
                  <li>Los formularios deben tener validación en tiempo real</li>
                  <li>Debe mostrar estados de carga y error apropiados</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. ASRs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-600" />
              5. Requerimientos Arquitectónicamente Significativos (ASRs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Rendimiento</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Tiempo de respuesta {"<"} 500ms</li>
                  <li>• Generación determinística de números</li>
                  <li>• Optimización para dispositivos móviles</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Seguridad</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Validación de entrada en cliente y servidor</li>
                  <li>• Sanitización de datos</li>
                  <li>• Manejo seguro de errores</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Usabilidad</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Interfaz intuitiva y accesible</li>
                  <li>• Feedback visual inmediato</li>
                  <li>• Diseño responsive</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">Mantenibilidad</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Código modular y bien documentado</li>
                  <li>• Separación clara de responsabilidades</li>
                  <li>• Uso de TypeScript para type safety</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Arquitectura */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-600" />
              6. Arquitectura de Software
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Capa de Presentación</h4>
                <p className="text-sm text-blue-700">React Components, UI/UX, Validación de formularios</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Capa de Lógica</h4>
                <p className="text-sm text-green-700">API Routes, Algoritmos de generación, Validación de negocio</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Capa de Datos</h4>
                <p className="text-sm text-purple-700">Algoritmos determinísticos, Cálculos astrológicos</p>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Patrones Arquitectónicos:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  <strong>MVC:</strong> Separación clara entre modelo, vista y controlador
                </li>
                <li>
                  <strong>API REST:</strong> Endpoints bien definidos para la comunicación
                </li>
                <li>
                  <strong>Component-Based:</strong> Componentes reutilizables de React
                </li>
                <li>
                  <strong>Server-Side Rendering:</strong> Optimización SEO con Next.js
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 7. MVP */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-pink-600" />
              7. Producto Mínimo Viable (MVP)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">El MVP implementado incluye todas las funcionalidades core necesarias:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Funcionalidades Implementadas:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Generación de números para Astro Sol y Astro Luna</li>
                  <li>Cálculo automático de signos zodiacales</li>
                  <li>Interfaz web responsive</li>
                  <li>API REST funcional</li>
                  <li>Validación de datos</li>
                  <li>Números de la suerte adicionales</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Características Técnicas:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Algoritmos determinísticos</li>
                  <li>Manejo de errores robusto</li>
                  <li>Estados de carga y feedback</li>
                  <li>Diseño moderno con Tailwind CSS</li>
                  <li>Componentes reutilizables</li>
                  <li>TypeScript para type safety</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Tecnologías */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-6 h-6 text-gray-600" />
              8. Tecnologías, Herramientas y Conceptos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Frontend</h4>
                <div className="space-y-2">
                  <Badge variant="outline">React 18</Badge>
                  <Badge variant="outline">Next.js 15</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn/ui</Badge>
                  <Badge variant="outline">Lucide Icons</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Backend</h4>
                <div className="space-y-2">
                  <Badge variant="outline">Next.js API Routes</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">REST API</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Conceptos Aplicados</h4>
                <div className="space-y-2">
                  <Badge variant="outline">Algoritmos Determinísticos</Badge>
                  <Badge variant="outline">Generadores de Números Pseudoaleatorios</Badge>
                  <Badge variant="outline">Cálculos Astrológicos</Badge>
                  <Badge variant="outline">Validación de Datos</Badge>
                  <Badge variant="outline">Responsive Design</Badge>
                  <Badge variant="outline">Component Architecture</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Herramientas de Desarrollo</h4>
                <div className="space-y-2">
                  <Badge variant="outline">ESLint</Badge>
                  <Badge variant="outline">Prettier</Badge>
                  <Badge variant="outline">Git</Badge>
                  <Badge variant="outline">VS Code</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
