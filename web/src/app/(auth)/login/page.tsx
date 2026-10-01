"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializar el formulario
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función que se ejecuta al enviar el formulario
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      // Llamada a Auth.js (Credentials provider)
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciales inválidas. Por favor, intente de nuevo.");
      } else {
        // Redirigir al dashboard si es exitoso
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al intentar iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-xl">
        <CardHeader className="space-y-2 text-center">
          {/* Usamos el color morado (primary) para el título */}
          <CardTitle className="text-2xl font-bold text-primary">Acceso Administrativo</CardTitle>
          <CardDescription className="text-muted-foreground">
            Ingrese sus credenciales para monitorear el cuarto de servidores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@ejemplo.com" 
                        {...field} 
                        className="bg-background focus:ring-secondary" 
                        disabled={isLoading} 
                      />
                    </FormControl>
                    <FormMessage className="text-[hsl(38,92%,50%)]" /> {/* Mensajes de error en ámbar */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field} 
                        className="bg-background focus:ring-secondary" 
                        disabled={isLoading} 
                      />
                    </FormControl>
                    <FormMessage className="text-[hsl(38,92%,50%)]" />
                  </FormItem>
                )}
              />
              
              {/* Alerta de error de autenticación */}
              {error && (
                <div className="text-sm font-medium text-[hsl(38,92%,50%)] bg-[hsl(38,92%,50%)]/10 p-3 rounded-md text-center border border-[hsl(38,92%,50%)]/20">
                  {error}
                </div>
              )}

              {/* Botón en cian (secondary) */}
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}