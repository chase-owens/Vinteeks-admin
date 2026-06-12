export const getInquiries = async () => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries`);

	if (!res.ok) {
		throw new Error('Failed to fetch inquiries');
	}

	return res.json();
};

export const updateInquiry = async (inquiryId: string, status: string) => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/inquiries/${inquiryId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ status })
	});

	if (!res.ok) {
		throw new Error('Failed to update inquiry');
	}

	return res.json();
};
