import { useMemo } from "react";

/**
 * Custom hook for filtering data.
 *
 * @param {Array} data - The dataset to filter.
 * @param {string} filterText - The text to filter by.
 * @param {Array} filterKeys - The list of keys to apply the filter on.
 * @returns {Array} - The filtered dataset.
 */

const useFilter = (data, filterText, filterKeys) => {
	const filteredData = useMemo(() => {
		// If no filter text is provided, return the original data.
		if (!filterText) return data;
		// Filter the data by checking if any of the filterKeys match the filterText.
		return data.filter((item) =>
			filterKeys.some((key) => {
				const value = item[key];
				return (
					value &&
					value.toString().toLowerCase().includes(filterText.toLowerCase())
				);
			})
		);
		// Dependencies: recalculate when data, filterText, or filterKeys changes.
	}, [data, filterText, filterKeys]);

	return filteredData;
};

export default useFilter;
