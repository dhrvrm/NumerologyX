// app/api/send-order-email/[id]/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getOrderByMerchantTransactionId } from '../../../../../lib/appwrite/ecomDatabase';
import OrderEmailTemplate from '../OrderEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request, { params }) {
	try {
		const { id: merchantTransactionId } = params;

		// Fetch the order using merchantTransactionId
		const order = await getOrderByMerchantTransactionId(merchantTransactionId);

		if (!order) {
			return NextResponse.json({ error: 'Order not found' }, { status: 404 });
		}

		const { data, error } = await resend.emails.send({
			from: 'AdeptNumero <orders@updates.vaayudigital.in>',
			to: order.email,
			bcc: 'adeptnumero@gmail.com',
			subject: `Your Order #${order.$id} - AdeptNumero`,
			react: OrderEmailTemplate({ order }),
		});

		if (error) {
			console.error('Error sending email:', error);
			return NextResponse.json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ message: 'Email sent successfully', data });
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
