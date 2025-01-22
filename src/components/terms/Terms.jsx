import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import coverImg from '../../utils/cover-img.jpg';
import './terms.css';
import Loader from '../loader/Loader';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Terms = () => {
    const setting = useSelector(state => state.setting);
    const { t } = useTranslation();
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const renderAccordionItem = (title, content, section) => (
        <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
            <button
                onClick={() => toggleSection(section)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem 0',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#16a34a',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                {title}
                <span>{openSection === section ? '−' : '+'}</span>
            </button>
            {openSection === section && <div style={{ paddingBottom: '1rem' }}>{content}</div>}
        </div>
    );

    return (
        <section id='terms' className='terms'>
            {setting.setting === null ? <Loader screen='full' />
                : (
                    <>
                        <div className='cover'>
                            <img src={coverImg} className='img-fluid' alt="cover"></img>
                            <div className='title'>
                                <h3>{t("terms_and_conditions")}</h3>
                                <span> <Link to="/" className='text-light text-decoration-none'>{t("home")} /</Link> </span><span className='active'>{t("terms_and_conditions")}</span>
                            </div>
                        </div>
                        <div className='container'>
                            <div style={{ backgroundColor: 'white', color: '#1f2937', padding: '3rem 1rem' }}>
                                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#15803d', marginBottom: '2rem' }}>
                                        Refund and Return Policy
                                    </h1>
                                    
                                    <p style={{ marginBottom: '1.5rem', color: '#4b5563' ,fontSize:"1.7rem"}} className='fw-bold'>
                                        At Green Grocer, we strive to provide the best quality products and service. 
                                        We understand that sometimes you may need to return or request a refund for a product. 
                                        Please read our policy below for more information.
                                    </p>

                                    {renderAccordionItem(
                                        "Eligibility for Returns and Refunds",
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem',fontSize:"1.5rem" }} >
                                            <li>Products must be returned within 7 days of delivery.</li>
                                            <li>Items must be unused, unopened, and in their original packaging.</li>
                                            <li>Perishable goods are not eligible for return unless received damaged or spoiled.</li>
                                            <li>Proof of purchase (order number or receipt) is required for all returns.</li>
                                        </ul>,
                                        "eligibility"
                                    )}

                                    {renderAccordionItem(
                                        "Return and Refund Process",
                                        <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem',fontSize:"1.5rem" }}>
                                            <li>Contact our customer service within 7 days of receiving your order.</li>
                                            <li>Provide your order number and reason for return/refund.</li>
                                            <li>Our team will review your request and provide further instructions.</li>
                                            <li>Once approved, return the item as instructed.</li>
                                            <li>Refunds will be processed within 5-7 business days after we receive the returned item.</li>
                                        </ol>,
                                        "process"
                                    )}

                                    {renderAccordionItem(
                                        "Exceptions and Special Cases",
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem',fontSize:"1.5rem" }}>
                                            <li>Damaged or incorrect items: We offer full refunds or replacements for items damaged during shipping or if we sent the wrong item.</li>
                                            <li>Perishable goods: If received spoiled or damaged, contact us immediately with photos for a refund or replacement.</li>
                                            <li>Sale items: May be subject to special return conditions, check the product description for details.</li>
                                        </ul>,
                                        "exceptions"
                                    )}

                                    {renderAccordionItem(
                                        "Refund Methods",
                                        <React.Fragment>
                                            <p style={{fontSize:"1.5rem"}}>Refunds will be issued to the original payment method used for the purchase:</p>
                                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem',fontSize:"1.5rem" }}>
                                                <li>Credit/Debit Card: 5-7 business days for the refund to appear on your statement.</li>
                                                <li>Store Credit: Immediately available for use on your next purchase.</li>
                                                <li>Other payment methods: Processing time may vary, contact customer service for details.</li>
                                            </ul>
                                        </React.Fragment>,
                                        "refundMethods"
                                    )}

                                    <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '1.5rem', marginTop: '2rem' }}>
                                        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#15803d', marginBottom: '1rem' }}>
                                            Need to Request a Return or Refund?
                                        </h2>
                                        <p style={{ marginBottom: '1rem',fontSize:"1.7rem"  }}>
                                            Our customer service team is here to help. Please have your order number ready and contact us through one of the following methods:
                                        </p>
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem',fontSize:"1.5rem" }}>
                                            <li>Email: support@greengrocer.com</li>
                                            <li>Phone: 1-800-123-4567 (Mon-Fri, 9am-5pm EST)</li>
                                            <li>Live Chat: Available on our website during business hours</li>
                                        </ul>
                                        <button 
                                            style={{
                                                backgroundColor: '#16a34a',
                                                color: 'white',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.25rem',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                            }}
                                            onClick={() => alert('Redirecting to customer service...') }
                                        >
                                            Contact Customer Service
                                        </button>
                                    </div>

                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '2rem',fontSize:"1.4rem" }} className='text-danger'>
                                        This refund and return policy is subject to change without notice. 
                                        For the most current version, please check our website. Last updated: {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </section>
    );
};

export default Terms;
