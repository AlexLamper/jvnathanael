type TableRow = {
    role: string;
    name: string;
  };
  
  type Props = {
    rows: TableRow[];
  };
  
  const BestuurTable = ({ rows }: Props) => {
    return (
      <section id="relume" className="px-4 py-16 md:py-24 lg:py-28">
        <div className="container mx-auto">
          <h2 className="text-center text-4xl font-bold mb-8 text-[#3A3C71]">Bestuur</h2>
  
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-[#3A3C71] rounded-lg shadow-md">
              <thead className="bg-[#3A3C71] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Role</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Name</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {rows.map((row, index) => (
                  <tr key={index} className="border-b border-[#3A3C71]">
                    <td className="px-6 py-4">{row.role}</td>
                    <td className="px-6 py-4">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  };
  
  export default BestuurTable;
  
  export const tableData: TableRow[] = [
    { role: '1e Voorzitter', name: 'Wim Huijser' },
    { role: '2e Voorzitter', name: 'Erwin de Waard' },
    { role: 'Penningmeester', name: 'Britt Muller' },
    { role: 'Secretaris', name: 'Pieter-Willem Huijser' },
    { role: 'Algemeen lid', name: 'Deborah van Wezel' },
  ];
  