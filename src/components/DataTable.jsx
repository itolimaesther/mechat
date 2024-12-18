import React, { useState } from "react";
import useSort from "../hooks/useSort";
import usePagination from "../hooks/usePagination";
import useFilter from "../hooks/useFilter";
import {
	FaChevronLeft,
	FaChevronRight,
	FaSort,
	FaSortUp,
	FaSortDown,
} from "react-icons/fa";

const DataTable = ({ data, columns, rowsPerPageOptions }) => {
	const [sortConfig, setSortConfig] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [filterText, setFilterText] = useState("");

	// Filter data based on the id and name
	const filteredData = useFilter(data, filterText, ["id", "name"]);

	// Sort filtered data
	const sortedData = useSort(filteredData, sortConfig);

	// Paginate sorted data
	const paginatedData = usePagination(sortedData, currentPage, rowsPerPage);

	// Sorting data in ascending and descending order
	const requestSort = (key) => {
		let direction = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

  const handlePageChange = (page) => {
		if (page >= 1 && page <= Math.ceil(sortedData.length / rowsPerPage)) {
			setCurrentPage(page);
		}
	};

	//Add sorting icons to table header
	const getSortIcon = (key) => {
		if (!sortConfig || sortConfig.key !== key) {
			return <FaSort />;
		}
		return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
	};


	return (
		<div className="p-4">
			<div className="flex gap-2 items-center mb-4">
				<label htmlFor="">Filter:</label>
				<input
					type="text"
					placeholder={`Filter by id, name`}
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					className=" p-2 border border-gray-300 rounded"
				/>
			</div>
			<table className="min-w-full border-collapse border border-gray-200">
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								onClick={() => requestSort(column.key)}
								className="cursor-pointer p-2 border-b border-gray-200 bg-gray-100 hover:bg-gray-200"
							>
								<div className="flex items-center justify-center gap-3">
									{column.header}
									{getSortIcon(column.key)}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((item, index) => (
						<tr key={index} className="hover:bg-gray-50">
							{columns.map((column) => (
								<td
									key={column.key}
									className="p-2 border-b text-center border-gray-200"
								>
									{item[column.key]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
				<div className="flex flex-1 justify-between sm:hidden">
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Previous
					</button>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={
							currentPage === Math.ceil(sortedData.length / rowsPerPage)
						}
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Next
					</button>
				</div>
				<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
					<div>
						{/* Select rows to display per page */}
						<select
							value={rowsPerPage}
							onChange={(e) => {
								setRowsPerPage(Number(e.target.value));
								setCurrentPage(1);
							}}
							className="p-2 border border-gray-300 rounded"
						>
							{rowsPerPageOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div>
						<p className="text-sm text-gray-700">
							Showing{" "}
							<span className="font-medium">
								{Math.min(
									(currentPage - 1) * rowsPerPage + 1,
									sortedData.length
								)}
							</span>{" "}
							to{" "}
							<span className="font-medium">
								{Math.min(currentPage * rowsPerPage, sortedData.length)}
							</span>{" "}
							of <span className="font-medium">{sortedData.length}</span>{" "}
							results
						</p>
					</div>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
					>
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<FaChevronLeft aria-hidden="true" className="h-5 w-5" />
						</button>
						{Array.from(
							{ length: Math.ceil(sortedData.length / rowsPerPage) },
							(_, i) => i + 1
						)
							.slice(
								Math.max(currentPage - 3, 0),
								Math.min(
									currentPage + 2,
									Math.ceil(sortedData.length / rowsPerPage)
								)
							)
							.map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
										page === currentPage
											? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									}`}
								>
									{page}
								</button>
							))}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={
								currentPage === Math.ceil(sortedData.length / rowsPerPage)
							}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<FaChevronRight aria-hidden="true" className="h-5 w-5" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
