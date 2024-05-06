import React, { useState, useRef } from 'react';

const CursoForm = () => {
    const [curso, setCurso] = useState({
    nombre: '',
    categoria: '',
    descripcion: '',
    imagen: '',
    recurso: null,
    });

    const imagenRef = useRef(null);
    const recursoRef = useRef(null);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
    };

    const handleImagenChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setCurso({ ...curso, imagen: reader.result });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
    };

    const handleRecursoChange = (e) => {
    const file = e.target.files[0];
    setCurso({ ...curso, recurso: file });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario a tu backend o hacer lo que necesites con los datos del curso
    console.log(curso);
    };

    return (
    <form onSubmit={handleSubmit} className='md:flex md:flex-col  md:justify-center md:shadow-md  md:w-96 absolute md:right-32 md:top-10 bg-gradient-to-r from-violet-500 to-fuchsia-400 md:py-4 rounded-xl'>
        <h1 className='md:text-4xl md:font-black md:text-center'>Create Course</h1>
    <label className='md:mt-6 md:text-base md:font-medium md:ml-5'>
        Nombre: <br/>
        <input className='md:text-sm  md:border-black md:border md:rounded-md md:mt-2 md:font-normal md:py-1' type="text" name="nombre" value={curso.nombre} onChange={handleChange} />
    </label>
    <label className='md:mt-4 md:text-base md:font-medium md:ml-5 '>
        Categoria: <br/>
        <input className='md:mt-2 md:font-normal md:border md:border-black md:rounded-md md:text-sm md:py-1' type="text" name="categoria" value={curso.categoria} onChange={handleChange} />
    </label>
    <label className='md:mt-4 md:text-base md:font-medium md:ml-5'>
        Descripcion: <br/>
        <textarea className='md:mt-2 md:font-normal md:border md:border-black md:rounded-md md:text-sm w-56' name="descripcion" value={curso.descripcion} onChange={handleChange} />
    </label>
    <label className='md:mt-4 md:text-base md:font-medium md:ml-5'>
        Imagen: <br/>
        <input className='md:mt-4 md:font-normal italic ' type="file" accept="image/*" ref={imagenRef} onChange={handleImagenChange} />
        {curso.imagen && <img src={curso.imagen} alt="Vista previa de la imagen" className='md:ml-2 md:h-44 md:mt-4 md:rounded-lg'/>}
    </label>
    <label className='md:mt-4 md:text-base md:font-medium md:ml-5'>
        Recurso:<br/>
        <input className='md:mt-4 italic font-normal' type="file" ref={recursoRef} onChange={handleRecursoChange} />
    </label>
    <button className='md:mt-6 md:py-4 bg-gray-200' type="submit">Crear Curso</button>
    </form>
    );
};

export default CursoForm;
