// Number in international format without "+" or spaces.
export const WHATSAPP_NUMBER = '919625183125';

export const getWhatsAppLink = (message) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message) => {
	window.open(getWhatsAppLink(message), '_blank', 'noopener,noreferrer');
};
