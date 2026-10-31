import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getAllInterviewReports, getInterviewReportById } from "../services/interview.api";
import "../style/interview.scss";
import BrandLogo from "../../../components/BrandLogo";



const sections = [
    { id: "technical", label: "Technical questions" },
    { id: "behavioral", label: "Behavioral questions" },
    { id: "roadmap", label: "Road Map" },
];

const Interview = () => {
    const { interviewId } = useParams();
    const [report, setReport] = useState(null);
    const [activeSection, setActiveSection] = useState("technical");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showPreviousReports, setShowPreviousReports] = useState(false);
    const [previousReports, setPreviousReports] = useState([]);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState("");


    useEffect(() => {
        let isCurrent = true;

        const loadReport = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await getInterviewReportById(interviewId);
                if (isCurrent) {
                    setReport(response.interviewReport);
                }
            } catch (requestError) {
                if (isCurrent) {
                    setError(
                        requestError.response?.data?.message
                        || requestError.message
                        || "Unable to load this interview report."
                    );
                }
            } finally {
                if (isCurrent) {
                    setLoading(false);
                }
            }
        };

        loadReport();

        return () => {
            isCurrent = false;
        };
    }, [interviewId]);

    useEffect(() => {
        if (!showPreviousReports || historyLoaded) {
            return undefined;
        }

        let isCurrent = true;

        getAllInterviewReports()
            .then((response) => {
                if (isCurrent) {
                    setPreviousReports(response.interviewReports);
                    setHistoryLoaded(true);
                }
            })
            .catch((requestError) => {
                if (isCurrent) {
                    setHistoryError(
                        requestError.response?.data?.message
                        || requestError.message
                        || "Unable to load previous reports."
                    );
                }
            })
            .finally(() => {
                if (isCurrent) {
                    setHistoryLoading(false);
                }
            });

        return () => {
            isCurrent = false;
        };
    }, [showPreviousReports, historyLoaded]);

    const renderQuestions = (questions = []) => (
        <div className="question-list">
            {questions.length > 0 ? questions.map((item, index) => (
                <article className="question-card" key={`${activeSection}-${index}`}>
                    <div className="question-number">Question {String(index + 1).padStart(2, "0")}</div>
                    <h3>{item.question}</h3>
                    <div className="question-detail">
                        <h4>What this evaluates</h4>
                        <p>{item.intention}</p>
                    </div>
                    <div className="question-detail answer-detail">
                        <h4>Suggested answer</h4>
                        <p>{item.answer}</p>
                    </div>
                </article>
            )) : <p className="empty-state">No questions are available in this section.</p>}
        </div>
    );

    const renderRoadmap = (plan = []) => (
        <div className="roadmap-list">
            {plan.length > 0 ? plan.map((item, index) => (
                <article className="roadmap-card" key={item._id || `day-${item.day}-${index}`}>
                    <div className="roadmap-day">Day {item.day}</div>
                    <div className="roadmap-content">
                        <h3>{item.focus}</h3>
                        <ul>
                            {(item.tasks || []).map((task, taskIndex) => (
                                <li key={`${item.day}-${taskIndex}`}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </article>
            )) : <p className="empty-state">No preparation plan is available.</p>}
        </div>
    );

    return (
        <main className="interview">
            <header className="interview-topbar">
                <BrandLogo />
                <Link className="plan-link" to="/">Generate interview plan</Link>
            </header>
            <section className="interview-layout" aria-label="Interview report">
                <nav className="interview-navigation" aria-label="Report sections">
                    <p className="navigation-label">YOUR REPORT</p>
                    <div className="section-links">
                        {sections.map((section) => (
                            <button
                                aria-current={activeSection === section.id ? "page" : undefined}
                                className={`section-link${activeSection === section.id ? " is-active" : ""}`}
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                type="button"
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                    <button
                        aria-expanded={showPreviousReports}
                        aria-controls="previous-reports"
                        className="previous-reports-button"
                        onClick={() => {
                            if (!showPreviousReports && !historyLoaded) {
                                setHistoryLoading(true);
                                setHistoryError("");
                            }
                            setShowPreviousReports((visible) => !visible);
                        }}
                        type="button"
                    >
                        {showPreviousReports ? "Hide previous reports" : "Previous reports"}
                    </button>
                    {showPreviousReports && (
                        <section className="previous-reports" id="previous-reports" aria-label="Previous reports">
                            {historyLoading ? (
                                <p className="aside-message" role="status">Loading previous reports…</p>
                            ) : historyError ? (
                                <p className="history-error" role="alert">{historyError}</p>
                            ) : previousReports.length ? (
                                <ul>
                                    {previousReports.map((previousReport) => (
                                        <li key={previousReport._id}>
                                            <Link to={`/interview/${previousReport._id}`}>
                                                <span>{previousReport.title || "Interview plan"}</span>
                                                {previousReport.createdAt && (
                                                    <small>{new Date(previousReport.createdAt).toLocaleDateString()}</small>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="aside-message">No previous reports yet.</p>
                            )}
                        </section>
                    )}
                </nav>

                <section className="interview-main" aria-live="polite">
                    {loading ? (
                        <div className="report-state" role="status">Loading your interview report…</div>
                    ) : error ? (
                        <div className="report-state report-error" role="alert">
                            <h1>We couldn’t load this report</h1>
                            <p>{error}</p>
                        </div>
                    ) : report ? (
                        <>
                            <header className="report-header">
                                <div>
                                    <p className="eyebrow">YOUR PERSONALIZED REPORT</p>
                                    <h1>
                                        {activeSection === "technical" && "Technical questions"}
                                        {activeSection === "behavioral" && "Behavioral questions"}
                                        {activeSection === "roadmap" && "Your preparation roadmap"}
                                    </h1>
                                </div>
                                {Number.isFinite(report.matchScore) && (
                                    <div className="match-score" aria-label={`${report.matchScore}% job match`}>
                                        <span>{report.matchScore}<small>%</small></span>
                                        <small>job match</small>
                                    </div>
                                )}
                            </header>
                            {activeSection === "technical" && renderQuestions(report.technicalQuestions)}
                            {activeSection === "behavioral" && renderQuestions(report.behavioralQuestions)}
                            {activeSection === "roadmap" && renderRoadmap(report.preparationPlan)}
                        </>
                    ) : (
                        <div className="report-state" role="alert">This report has no available data.</div>
                    )}
                </section>

                <aside className="skill-gaps" aria-labelledby="skill-gaps-heading">
                    <div className="aside-heading">
                        <span className="aside-indicator" aria-hidden="true" />
                        <h2 id="skill-gaps-heading">Skill gaps</h2>
                    </div>
                    {loading ? (
                        <p className="aside-message">Loading skills…</p>
                    ) : error ? (
                        <p className="aside-message">Skills are unavailable.</p>
                    ) : report?.skillGaps?.length ? (
                        <ul className="skill-list">
                            {report.skillGaps.map((gap, index) => (
                                <li className={`skill-chip severity-${gap.severity || "low"}`} key={`${gap.skill}-${index}`}>
                                    <span>{gap.skill}</span>
                                    <span className="severity-label">{gap.severity}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="aside-message">No skill gaps found. Great work!</p>
                    )}
                </aside>
            </section>
        </main>
    );
};

export default Interview;
