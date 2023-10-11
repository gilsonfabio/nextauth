'use client';

export default function ForgotForm() {
  
    return (    
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl mb-6 text-purple-500 font-bold">Informe email de recuperação de senha</h1>
            <form className="w-[400px] flex flex-col gap-6" onSubmit={() => {}}>
                <input 
                    className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                    type="text" 
                    name="email" 
                    placeholder="Digite seu e-mail" 
                />  
                <button
                    type="submit"
                    className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400">
                    Confirme
                </button>                 
            </form>
        </div>    
    );
}
