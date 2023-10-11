'use client';

import { FormEvent } from 'react';

export default function RegisterForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('http://localhost:3333/newuser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.get('name'),
        cpf: formData.get('cpf'),
        nascimento: formData.get('nascimento'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
      })
    })    
    console.log({ response });
  };
  return (    
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-xl mb-6 text-purple-500 font-bold">Informe dados para se registrar</h1>
      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="name" 
          placeholder="Digite seu nome completo" 
        />
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="cpf" 
          placeholder="Digite seu CPF" 
        />
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="nascimento" 
          placeholder="Digite seu Nascimento" 
        />
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="email" 
          placeholder="Digite seu e-mail" 
        />  
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="phone" 
          placeholder="Digite seu telefone" 
        />               
        <input 
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text" 
          name="password" 
          placeholder="Digite sua senha" 
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
