import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import Card from '../../components/UI/Card/Card';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { category: 'Booking', question: 'How do I book a trip?', answer: 'You can book a trip by clicking the "Book Now" button on any trip page. Fill in your details and make the payment to confirm your booking.' },
        { category: 'Booking', question: 'What is the cancellation policy?', answer: 'Cancellation 15 days prior: 70% refund. Cancellation 7 days prior: 50% refund. No refund for cancellations within 7 days.' },
        { category: 'Safety', question: 'Are the treks safe?', answer: 'Yes, all our treks are led by experienced guides with proper safety equipment and emergency support.' },
        { category: 'Safety', question: 'What if I have a medical emergency?', answer: 'All our trips include first aid kits and our guides are trained in basic first aid. We also have emergency evacuation arrangements.' },
        { category: 'Travel Tips', question: 'What should I pack?', answer: 'Each trip page has a detailed packing list. Generally, you\'ll need trekking shoes, warm clothes, water bottle, and personal items.' },
        { category: 'Travel Tips', question: 'Do I need to be fit?', answer: 'Fitness requirements vary by trip. Check the difficulty level and fitness requirements on each trip page.' },
    ];

    return (
        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
            <div className="container-narrow" style={{ padding: '4rem 0' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => (
                        <Card key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)} hoverable>
                            <div style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase' }}>{faq.category}</span>
                                        <h3 style={{ margin: '0.5rem 0 0', fontSize: '1.125rem' }}>{faq.question}</h3>
                                    </div>
                                    {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                </div>
                                {openIndex === index && (
                                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>{faq.answer}</p>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FAQ;
