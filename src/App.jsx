import "./App.css";
import FilterForm from "./components/FilterForm";
import DataTable from "./components/DataTable";
import { useMemo, useState } from "react";
import FilterProvider from "./providers/FilterProvider";

function App() {
  const [mockData, setMockData] = useState([]);
  const currentPage = useMemo(() => mockData?.length / 10, [mockData]);

  return (
    <FilterProvider>
      <FilterForm
        setMockData={setMockData}
        mockData={mockData}
        page={currentPage}
      />
      <DataTable
        setMockData={setMockData}
        mockData={mockData}
        page={currentPage}
      />
    </FilterProvider>
  );
}

export default App;
