import React, { useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import BrandLogo from "../../../components/BrandLogo";
import Logout from "../../auth/pages/Logout";




const BriefcaseIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="7" width="17" height="13" rx="2" />
        <path d="M8 7V4h8v3M3.5 12h17M9 11v2m6-2v2" />
    </svg>
);

const UserIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20v-1.5a7 7 0 0 1 14 0V20" />
    </svg>
);

const UploadIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M7 18.5H5.5a4 4 0 0 1-.4-8A7 7 0 0 1 18.6 9a4.8 4.8 0 0 1-.1 9.5H17" />
        <path d="m8.5 13 3.5-3.5 3.5 3.5M12 9.8v9" />
    </svg>
);

const InfoIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
    </svg>
);

const StarIcon = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.45 1.08 6.28L12 17.17l-5.63 2.96 1.08-6.28L2.9 9.4l6.3-.91L12 2.8Z" />
    </svg>
);

const Home = () => {
    const {loading, generateReport} = useInterview()
    const [jobDsecription, setJobDescription] = useState("")
    const [selfDsecription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [generationError, setGenerationError] = useState("")

    const navigate = useNavigate()


    const handleGenerateReport = async () => {
        setGenerationError("")

        try {
            const data = await generateReport({ jobDescription: jobDsecription, selfDescription: selfDsecription, resumeFile })
            navigate(`/interview/${data._id}`)
        } catch (error) {
            setGenerationError(
                error.response?.data?.message
                || error.message
                || "Unable to generate your interview plan. Please try again."
            )
        }

    }

    if(loading){
        return(
            <main className="home home-loading">
                <BrandLogo />
                <h1>Loading your Interview plan.......</h1>
            </main>
        )
    }

    return (

        <main className="home">
            <section className="plan-page">
                <nav className="home-navigation" aria-label="Main navigation">
                    <BrandLogo />
                    <Logout />
                </nav>

                <header className="page-heading">
                    <h1>Create Your Custom <span>Interview Plan</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to<br className="desktop-break" /> build a winning strategy.</p>
                </header>

                <section className="plan-card" aria-label="Interview plan details">
                    <div className="plan-fields">
                        <section className="job-panel" aria-labelledby="job-description-title">
                            <div className="field-heading">
                                <span className="section-icon"><BriefcaseIcon /></span>
                                <label id="job-description-title" htmlFor="jobDescription">Target Job Description</label>
                                <span className="badge required-badge">Required</span>
                            </div>
                            <textarea
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className="job-description"
                                id="jobDescription"
                                name="jobDescription"
                                maxLength={5000}
                                placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."}
                            />
                            <div className="character-count" aria-hidden="true">0 / 5000 chars</div>
                        </section>

                        <section className="profile-panel" aria-labelledby="profile-title">
                            <div className="field-heading profile-heading">
                                <span className="section-icon"><UserIcon /></span>
                                <h2 id="profile-title">Your Profile</h2>
                            </div>

                            <div className="resume-section">
                                <div className="subheading">
                                    <label htmlFor="resume">Upload Resume</label>
                                    <span className="badge best-results-badge">Best results</span>
                                </div>
                                <input
                                    className="resume-input" id="resume" name="resume" type="file" accept=".pdf,.doc,.docx"
                                    onChange={(event) => setResumeFile(event.target.files?.[0] || null)} />
                                <label className={`upload-zone${resumeFile ? " has-file" : ""}`} htmlFor="resume">
                                    {resumeFile ? (
                                        <>
                                            <svg className="upload-check" aria-hidden="true" viewBox="0 0 24 24" fill="none">
                                                <path d="m5 12.5 4.5 4.5L19 7" />
                                            </svg>
                                            <span className="resume-file-name">{resumeFile.name}</span>
                                            <small role="status">Resume selected and ready to upload</small>
                                        </>
                                    ) : (
                                        <>
                                            <UploadIcon />
                                            <span>Click to upload or drag &amp; drop</span>
                                            <small>PDF or DOCX (Max 5MB)</small>
                                        </>
                                    )}
                                </label>
                            </div>

                            <div className="or-divider"><span>OR</span></div>

                            <div className="self-description">
                                <label htmlFor="selfDescription">Quick Self-Description</label>
                                <textarea
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id="selfDescription"
                                    name="selfDescription"
                                    maxLength={1000}
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            <div className="info-message">
                                <InfoIcon />
                                <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                            </div>
                        </section>
                    </div>

                    <footer className="card-footer">
                        <p>AI-Powered Strategy Generation <span aria-hidden="true">·</span> Approx 30s</p>
                        <div className="generate-actions">
                            {generationError && <p className="generation-error" role="alert">{generationError}</p>}
                            <button
                                onClick={handleGenerateReport}
                                className="generate-button" type="button" disabled={loading}>
                                <StarIcon />
                                <span>{loading ? "Generating…" : "Generate My Interview Strategy"}</span>
                            </button>
                        </div>
                    </footer>
                </section>

                <footer className="page-footer">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                    <a href="#help">Help Center</a>
                </footer>
            </section>
        </main>
    );
}
export default Home;
