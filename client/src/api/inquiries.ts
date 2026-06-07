// src/api/inquiries.ts
const getInquiries = async () => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`);

	if (!res.ok) {
		throw new Error('Failed to fetch inquiries');
	}

	return res.json();
};

export default getInquiries;
