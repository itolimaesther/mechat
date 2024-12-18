import React from "react";
import DataTable from "./components/DataTable";

const App = () => {
	const data = Array.from({ length: 10000 }, (_, index) => ({
		id: index + 1,
		name: `Item ${index + 1}`,
		value: Math.floor(Math.random() * 100),
	}));

	const columns = [
		{ key: "id", header: "ID" },
		{ key: "name", header: "Name" },
		{ key: "value", header: "Value" },
	];

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold mb-4">Data Table</h1>
			<DataTable
				data={data}
				columns={columns}
				rowsPerPageOptions={[10, 25, 50]}
			/>
		</div>
	);
};

export default App;