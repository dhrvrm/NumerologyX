'use client';

import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { openWhatsApp } from '../../../../lib/whatsapp';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		openWhatsApp(
			`Hello! My name is ${formData.name} (${formData.email}).

${formData.message}`
		);
		setFormData({ name: '', email: '', message: '' });
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<Input
					type='text'
					name='name'
					placeholder='Your Name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Input
					type='email'
					name='email'
					placeholder='Your Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<Textarea
					name='message'
					placeholder='Your Message'
					value={formData.message}
					onChange={handleChange}
					required
				/>
			</div>
			<Button type='submit'>Send on WhatsApp</Button>
		</form>
	);
}
