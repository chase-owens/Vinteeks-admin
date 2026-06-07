// api/updateInquiry.ts

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
