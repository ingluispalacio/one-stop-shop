import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

/**
 * Componente para mostrar una gráfica de línea de ingresos mensuales.
 * @param {Array<Object>} data - Datos para la gráfica.
 * @param {string} data[].month - El mes (ej: 'Ene', 'Feb').
 * @param {number} data[].revenue - El valor de ingresos.
 */
const MonthlyRevenueChart = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Ingresos Mensuales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          {/* Muestra los meses en el eje X */}
          <XAxis dataKey="month" stroke="#333" padding={{ left: 10, right: 10 }} />
          {/* Eje Y para los valores de ingresos */}
          <YAxis stroke="#333" tickFormatter={(value) => `$${value}k`} /> 
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}k`, 'Ingresos']}
            labelFormatter={(label) => `Mes: ${label}`}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          {/* Línea principal con un color vibrante */}
          <Line 
            type="monotone" 
            dataKey="revenue" 
            name="Ingresos (Miles)" 
            stroke="#3b82f6" // Azul vibrante
            strokeWidth={3} 
            dot={{ r: 5 }} 
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;