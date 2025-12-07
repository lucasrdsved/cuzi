/**
 * A full-screen loading indicator component.
 * Displays a pulsating "CARREGANDO..." text centered on the screen.
 *
 * @returns A div element containing the loading animation.
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
