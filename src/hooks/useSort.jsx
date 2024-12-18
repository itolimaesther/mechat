import { useMemo } from "react";


/**
 * Custom hook for sorting data.
 *
 * @param {Array} data - The dataset to be sorted.
 * @param {Object} sortConfig - The configuration for sorting, including:
 *   - `key` (string): The property to sort by.
 *   - `direction` (string): The sort direction, either "ascending" or "descending".
 * @returns {Array} - The sorted dataset.
 */

const useSort = (data, sortConfig) => {
	const sortedData = useMemo(() => {
		// If no sort configuration is provided, return the original data.
		if (!sortConfig) return data;

		// Create a shallow copy of the data to avoid mutating the original array.
		const sorted = [...data].sort((a, b) => {
			const valueA = a[sortConfig.key];
			const valueB = b[sortConfig.key];

			// Compare values based on the sort direction.
			if (valueA < valueB) {
				return sortConfig.direction === "ascending" ? -1 : 1;
			}
			if (valueA > valueB) {
				return sortConfig.direction === "ascending" ? 1 : -1;
			}
			return 0;
		});

		return sorted;
		// Dependencies: recalculate only when data or sortConfig changes.
	}, [data, sortConfig]);

	return sortedData;
};

export default useSort;
