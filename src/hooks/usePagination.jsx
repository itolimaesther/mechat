import { useMemo } from "react";

/**
 * Custom hook for paginating data.
 *
 * @param {Array} data - The complete dataset to paginate.
 * @param {number} currentPage - The current page number (1).
 * @param {number} rowsPerPage - The number of rows to display per page.
 * @returns {Array} - The subset of data for the current page.
 */

const usePagination = (data, currentPage, rowsPerPage) => {
	const paginatedData = useMemo(() => {
		// Calculate the starting index of the current page.
		const start = (currentPage - 1) * rowsPerPage;
		// Calculate the ending index of the current page.
		const end = start + rowsPerPage;
		// Extract the slice of data for the current page.
		return data.slice(start, end);
		// Dependencies: recalculate when data, currentPage, or rowsPerPage changes.
	}, [data, currentPage, rowsPerPage]);

	return paginatedData;
};

export default usePagination;
