import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../axios'; 

interface ClienteFormData {
  dni_cif: string;
  nombre_completo: string;
  email_contacto: string;
  telefono_contacto: string;
}

const NuevoCliente = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ClienteFormData>({
    dni_cif: '',
    nombre_completo: '',
    email_contacto: '',
    telefono_contacto: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Preparamos el paquete "limpio" para Symfony
    const dataToSend = {
        ...formData,
        // Eliminamos cualquier espacio en blanco para cumplir con el Regex del backend
        telefono_contacto: formData.telefono_contacto.replace(/\s/g, '') 
    };

    try {
      await api.post('/clientes', dataToSend);
      navigate('/clientes');
    } catch (err: any) {
      setError('Error al crear el cliente. Revisa los datos o tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Botón Volver */}
        <Link to="/clientes" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-6 transition-colors">
          ← Volver a la lista
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuevo Cliente</h1>
          <p className="text-gray-500 mb-8">Introduce los datos para dar de alta a un nuevo cliente en el sistema.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo / Razón Social</label>
              <input 
                type="text" name="nombre_completo" required
                value={formData.nombre_completo} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="Ej: Juan Pérez o Empresa S.L."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">DNI / CIF</label>
              <input 
                type="text" name="dni_cif" required
                value={formData.dni_cif} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="12345678X"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
              <input 
                type="tel" name="telefono_contacto" required
                value={formData.telefono_contacto} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="600 000 000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email de contacto</label>
              <input 
                type="email" name="email_contacto" required
                value={formData.email_contacto} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="cliente@email.com"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:bg-gray-400"
              >
                {loading ? 'Guardando...' : 'Registrar Cliente'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoCliente;