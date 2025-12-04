import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

/**
 * Función para generar colores únicos para las categorías.
 */
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']; 

/**
 * Componente para mostrar una gráfica de pastel de distribución de categorías.
 * @param {Array<Object>} data - Datos para la gráfica.
 * @param {string} data[].name - Nombre de la categoría.
 * @param {number} data[].value - Valor (ej: cantidad de productos).
 */
const CategoryDistributionChart = ({ data }) => {

  // Renderiza la etiqueta dentro del gráfico de pastel
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Distribución de Productos por Categoría</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 0, right: 5, left: 5, bottom: 5 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%" // Centro X
            cy="50%" // Centro Y
            outerRadius={100} // Radio exterior
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel} // Usa etiquetas personalizadas para los porcentajes
            isAnimationActive={true}
          >
            {/* Asigna un color a cada porción basado en el índice */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [value, name]}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDistributionChart;