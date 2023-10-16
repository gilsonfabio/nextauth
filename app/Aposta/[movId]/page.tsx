"use client"
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import api from '../../../components/Services/api';

interface EquipesProps {
  equId: number;
  equDescricao: string;
}

type MovimProps = {
  "movId": number; 
  "movEveId": number; 
  "movData": string;  
  "movHora": string;  
  "movEqu01": number;  
  "movPayout01": number;  
  "movVlrPay01": number;  
  "movEqu02": number;  
  "movPayout02": number;  
  "movVlrPay02": number;  
  "movEqu03": number;  
  "movPayout03": number;  
  "movVlrPay03": number;  
  "movVlrTotal": number;  
  "movVlrBet": number;  
  "movResult": number; 
  "timeA_desc": string;
  "timeA_cor": string;
  "timeB_desc": string;
  "timeB_cor": string;
  "timeC_desc": string;
  "timeC_cor": string;
  "eveDesc": string;
}

const Aposta = ({params}: any) => {
    const [movimentos, setMovimentos] = useState<Array<MovimProps>>([]); 
    const [dadEquipe, setDadEquipe] = useState<Array<EquipesProps>>([]); 
    const [usrId, setUsrId] = useState(''); 
    const [equId, setEquId] = useState('');
    const [vlrAposta, setVlrAposta] = useState('');
    const [atualiza, setAtualiza] = useState(0);
    
    const [equipe01, setEquipe01] = useState(0);
    const [equDesc01, setEquDesc01] = useState('');
    const [equipe02, setEquipe02] = useState(0);
    const [equDesc02, setEquDesc02] = useState('');
    const [equipe03, setEquipe03] = useState(0);
    const [equDesc03, setEquDesc03] = useState('');    

    const equipes = [
      {'equId': 1, 'equDescricao': 'Equipe Nº 1'}
    ];

    useEffect(() => {  
      const idMov = params.movId;
      api({
        method: 'get',    
        url: `busMovim/${idMov}`,             
      }).then(function(response) {
        setMovimentos(response.data);
        setEquipe01(response.data.movEqu01); 
        setEquDesc01(response.data.timeA_desc); 
        setEquipe02(response.data.movEqu02); 
        setEquDesc02(response.data.timeB_desc); 
        setEquipe03(response.data.movEqu03);
        setEquDesc03(response.data.timeC_desc); 
        equipes.shift();
        equipes.push({equId: response.data.movEqu01, equDescricao: response.data.timeA_desc});
        equipes.push({equId: response.data.movEqu02, equDescricao: response.data.timeB_desc});
        equipes.push({equId: response.data.movEqu03, equDescricao: response.data.timeC_desc});
                
        setDadEquipe(equipes);

      }).catch(function(error) {  
        alert('Erro no movimento!')                 
      })     
    }, [])

    async function handleCadastra(e:any){      
        e.preventDefault();

        api({
          method: 'post',    
          url: `newbet`,
          data: {
            lanUsrId: usrId,  
            lanMovId: params.movId,
            lanEquId: equId,
            lanValor: vlrAposta,                      
          },
        }).then(function(response) {
            alert('Novo  cadastrado com sucesso!')
        }).catch(function(error) {
          alert('Erro no cadastro!')
        })
    }

    return (
    <section className='h-screen gradient-form bg-gray-200 md:h-screen'>
      <div className='container py-12 px-6 h-full'>
        <div className=' flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
          <div className=''>
            <div className='block bg-white shadow-lg rounded-lg'>
              <div className='lg:flex lg:flex-wrap g-0'>
                <div className='px-4 md:px-0'>
                  <div className='md:p-12 md:mx-6'>
                    <div className='text-center'>
                      <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                        Formulário Cadastro de Eventos {params.movId}
                      </h4>
                    </div>
                    <form>                       
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Código de Usuário'
                          name='usrId'
                          value={usrId} 
                          onChange={(e) => {setUsrId(e.target.value)}} 
                        />
                      </div>                              
                      <div className='mb-4'> 
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" 
                          value={equId}
                          onChange={(e) => {setEquId(e.target.value)}} 
                        >
                          <option selected>Selecione a Equipe desejada</option>
                          {dadEquipe.map((row:any) => (
                            <option key={row.equId} value={row.equId}>{row.equDescricao}</option>
                          ))}                          
                        </select>             
                      </div>
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          placeholder='Informe Valor desejado'
                          name='vlrAposta'
                          value={vlrAposta} 
                          onChange={(e) => {setVlrAposta(e.target.value)}} 
                        />
                      </div> 
                      <div className='text-center pt-1 mb-12 pb-1'>
                        <button
                          className='bg-green inline-block px-6 py-2.5 text-black hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                          type='button'
                          onClick={handleCadastra}
                        >
                          Cadastrar
                        </button>
                      </div>                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Aposta;