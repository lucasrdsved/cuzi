/**
 * A full-screen loading component.
 * Displays a pulsing "CARREGANDO..." text.
 * Used during route transitions or initial app load.
 *
 * @returns A full-screen div with loading text.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-4xl font-black animate-pulse">
        CARREGANDO...
      </div>
    </div>
  );
}
