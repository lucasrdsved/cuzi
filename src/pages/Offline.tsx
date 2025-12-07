export default function Offline() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="border-[8px] border-black bg-white p-8 max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="font-black text-4xl mb-4">SEM CONEXÃO</h1>
        <p className="text-xl font-bold mb-6">Você está offline. Algumas funcionalidades estão limitadas.</p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-black text-white font-black py-4 px-6 border-[4px] border-black hover:bg-white hover:text-black transition-all active:translate-y-1 active:shadow-none"
        >
          TENTAR NOVAMENTE
        </button>
      </div>
    </div>
  );
}
