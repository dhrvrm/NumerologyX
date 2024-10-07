import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './accordion';

export function ProductDescriptionAccordion({
	features,
	benefits,
	careInstructions,
}) {
	return (
		<Accordion type='multiple' collapsible={true} className='w-full'>
			{features?.length > 0 && (
				<AccordionItem value='features'>
					<AccordionTrigger>Features</AccordionTrigger>
					<AccordionContent>
						<ListItems items={features} />
					</AccordionContent>
				</AccordionItem>
			)}

			{benefits?.length > 0 && (
				<AccordionItem value='benefits'>
					<AccordionTrigger>Benefits</AccordionTrigger>
					<AccordionContent>
						<ListItems items={benefits} />
					</AccordionContent>
				</AccordionItem>
			)}

			{careInstructions?.length > 0 && (
				<AccordionItem value='careInstructions'>
					<AccordionTrigger>Care Instructions</AccordionTrigger>
					<AccordionContent>
						<ListItems items={careInstructions} />
					</AccordionContent>
				</AccordionItem>
			)}
		</Accordion>
	);
}

const ListItems = ({ items }) => {
	return (
		<ul className='mb-2'>
			{items?.map((item, index) => (
				<li key={index} className='mt-1 first-word:font-bold'>
					{item}
				</li>
			))}
		</ul>
	);
};
