// Support.tsx
import React, { useState } from 'react';
import { sendEmail } from '../../services/fetch/fetchSupport';


export const Support = ({close}:{close:()=>void}) => {
	const [bugTitle, setBugTitle] = useState('');
	const [bugDescription, setBugDescription] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		sendEmail(bugTitle, bugDescription);
		setBugTitle('');
		setBugDescription('');
		close()
	}

	return (
		<div className="container mx-auto p-6">
			<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
				<div className="bg-white p-6 rounded-lg w-full max-w-lg">
					<h3 className="text-xl font-semibold mb-4">Submit a Bug or Request</h3>
					<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="bug-title" className="block text-sm font-medium text-gray-700">Bug Title</label>
						<input
							id="bug-title"
							type="text"
							value={bugTitle}
							onChange={(e) => setBugTitle(e.target.value)}
							className="w-full mt-1 px-4 py-2 border rounded-md"
							placeholder="Enter bug title"
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="bug-description" className="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							id="bug-description"
							value={bugDescription}
							onChange={(e) => setBugDescription(e.target.value)}
							className="w-full mt-1 px-4 py-2 border rounded-md"
							placeholder="Describe the bug or issue"
							required
							rows={4}
						/>
					</div>

					<div className="flex justify-end space-x-4">
						<button 
							type="button" 
							onClick={close}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
						>
							Cancel
						</button>
						<button 
							type="submit" 
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						>
							Submit
						</button>
					</div>
					</form>
				</div>
			</div>
		</div>
	);
};
