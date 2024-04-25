import logo from '../../assets/img/hola.png';

const CodeConfirmation = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 min-h-screen flex">
        <div className="md:z-50  mx-auto my-3 max-w-full bg-gradient-to-r from-violet-600  to-rose-500 p-3 rounded-xl shadow-xl shadow-zinc-950">
            <h1 className=" font-black text-4xl p-1  text-slate-100 rounded-xl w-6/12 mx-24 text-center">Check your email</h1>
            <p className="italic font-semibold text-center text-2xl text-slate-300 my-8">Ingresa tu correo y te enviaremos un codigo para que la recuperes</p>
        <div className="my-0 w- flex flex-col items-center">
            <img src={logo} alt="Logo" className="h-40" />
        </div>

            <form action="" className="my-3">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-zinc-200 pb-2 w-full sm:w-full md:w-96 mx-auto">Correo Electronico</p>
                        <input id="email" name="email" type="email" className="block w-full sm:w-full md:w-96 mx-auto py-4 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Ingresa correo registrado" />
                    </label>
                    
                
                    <button className="w-full sm:w-full md:w-96 mx-auto py-4 font-medium text-white bg-gradient-to-r from-cyan-300 to-cyan-800 rounded-lg inline-flex space-x-4 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>
                        
                        <span>Enviar codigo de recuperacion</span>
                    </button>
                    <p className="text-center text-slate-100 font-medium">No te has registrado aun? <a href="#" className="text-black hover:bg-gradient-to-r from-teal-200 to-cyan-400 shadow-lg shadow-red-300 font-medium inline-flex space-x-1 items-center"><span>Registrate ahora</span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg></span></a></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default CodeConfirmation; 