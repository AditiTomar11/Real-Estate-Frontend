import './FloatingContact.css';

export default function FloatingContact() {
    const whatsappNumber = '919720717166';

    return (
        <div className="floating-contact">

            {/* WhatsApp */}
            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-contact__btn floating-contact__btn--whatsapp"
                aria-label="Chat on WhatsApp"
                title="WhatsApp"
            >
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .13 5.35.13 11.91c0 2.1.55 4.15 1.6 5.96L.03 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.91-5.35 11.91-11.91 0-3.18-1.24-6.16-3.43-8.42ZM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.84 9.84 0 0 1-1.51-5.27C2.17 6.99 6.6 2.2 12.04 2.2a9.69 9.69 0 0 1 6.91 2.87 9.73 9.73 0 0 1 2.86 6.92c0 5.44-4.43 9.81-9.77 9.81Zm5.39-7.36c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.89 4.33.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.12.55-.08 1.71-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z"
                        fill="currentColor"
                    />
                </svg>
            </a>


            {/* Email */}
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=tomaraditi037@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-contact__btn floating-contact__btn--email"
                aria-label="Send email"
                title="Email"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                        fill="currentColor"
                    />
                </svg>
            </a>

        </div>
    );
}