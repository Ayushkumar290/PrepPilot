import "./brand-logo.scss";

const BrandLogo = () => (
    <div className="brand-logo" aria-label="PrepPilot">
        <svg className="brand-logo-mark" aria-hidden="true" viewBox="0 0 36 36" fill="none">
            <rect x="1" y="1" width="34" height="34" rx="11" fill="currentColor" />
            <path d="M12 25V11h6.2a5 5 0 0 1 0 10H12" stroke="#fff" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m22.5 22.5 2.5 2.5 4-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>PrepPilot</span>
    </div>
);

export default BrandLogo;
