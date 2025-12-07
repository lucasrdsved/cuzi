export default function Offline() {
  return (
    <div className="min-h-screen bg-brutal-white flex items-center justify-center p-6">
      <div className="border-brutal-thick border-brutal-black bg-brutal-white p-8 max-w-md shadow-brutal">
        <h1 className="font-brutal text-4xl mb-4 font-black">SEM CONEXÃO</h1>
        <p className="text-xl font-bold mb-6">Você está offline. Algumas funcionalidades estão limitadas.</p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-brutal-black text-brutal-white font-brutal text-lg py-4 px-6 border-brutal-sm border-brutal-black hover:bg-brutal-white hover:text-brutal-black transition-all active:translate-y-1 active:shadow-none"
        >
          TENTAR NOVAMENTE
        </button>
      </div>
    </div>
  );
}
