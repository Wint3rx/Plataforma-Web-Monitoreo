import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ThemeValidationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center gap-6">
      
      {/* Morado para títulos */}
      <h1 className="text-3xl font-bold text-[hsl(270,76%,60%)] tracking-tight">
        Validación de Paleta de Colores (Paso 2)
      </h1>

      <Card className="w-full max-full max-w-md bg-card border-border shadow-xl">
        <CardHeader>
          {/* Etiquetas / Títulos en Morado */}
          <CardTitle className="text-xl text-[hsl(270,76%,60%)]">
            Control de Servidores IoT
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Comprobación visual de variables CSS
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Input estilizado */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[hsl(270,76%,60%)]">
              Usuario de Acceso
            </label>
            <Input 
              type="text" 
              placeholder="Ingrese su ID o Usuario" 
              className="bg-background text-foreground border-border focus:ring-2 focus:ring-[hsl(188,86%,53%)]"
            />
          </div>

          {/* Muestra de Colores del Tema */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium pt-2">
            {/* Ámbar para Temperatura */}
            <div className="p-2 rounded bg-[hsl(38,92%,50%)] text-slate-950 font-semibold">
              Ámbar (Temp)
            </div>
            {/* Verde para Alertas */}
            <div className="p-2 rounded bg-[hsl(142,71%,45%)] text-white font-semibold">
              Verde (Alertas)
            </div>
            {/* Cian para Acceso */}
            <div className="p-2 rounded bg-[hsl(188,86%,53%)] text-slate-950 font-semibold">
              Cian (Acceso)
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 pt-2">
          {/* Botón principal usando Cian (Acceso) */}
          <Button className="w-full bg-[hsl(188,86%,53%)] hover:bg-[hsl(188,86%,45%)] text-slate-950 font-semibold">
            Ingresar
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}