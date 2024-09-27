'use client';

import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { useToast } from '../../../../components/ui/use-toast';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (data.success) {
				toast({
					title: 'Message sent',
					description: `We've received your message (ID: ${data.enquiryId}) and will get back to you soon.`,
				});
				setFormData({ name: '', email: '', message: '' });
			} else {
				throw new Error(data.message || 'Failed to send message');
			}
		} catch (error) {
			toast({
				title: 'Error',
				description:
					error.message ||
					'There was a problem sending your message. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
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
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? 'Sending...' : 'Send Message'}
			</Button>
		</form>
	);
}
