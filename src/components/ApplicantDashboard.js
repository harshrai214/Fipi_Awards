// ApplicantDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
/**
 * ApplicantDashboard - user-scoped draft/submitted handling
 * - Shows only entries actually present in localStorage / submittedApplications
 * - Distinguishes draft vs submitted using form_mode / status and userid ownership
 * - Refreshes on window focus and storage events
 */
const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "—",
    designation: "—",
    phone: "—",
    organisation: "—",
  });
  const [applications, setApplications] = useState([]);
  // ---------- formsConfig ----------
  const formsConfig = [
    { key: "exploration", awardTitle: "Exploration Company of the Year", route: "/RegistrationExploration", storageKey: "registrationExplorationDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["retailOutlets2024"], step4Fields: ["lubricantsSales2024"], signatureFields: ["declaration", "approvingAuthoritySignatureUrl", "approvingAuthoritySignature"] },
    { key: "productionLess", awardTitle: "Oil & Gas Production Company of the Year (< 1 MMTOE)", route: "/RegistrationProductionlessMMTOE", storageKey: "registrationProductionLessMMTOEDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["production2024"], step4Fields: ["sustainability2024"], signatureFields: ["declaration"] },
    { key: "productionMore", awardTitle: "Oil & Gas Production Company of the Year (>= 1 MMTOE)", route: "/RegistrationProductionmoreMMTOE", storageKey: "registrationProductionMoreMMTOEDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["production2024"], step4Fields: ["sustainability2024"], signatureFields: ["declaration"] },
    { key: "overseas", awardTitle: "Overseas Oil & Gas Company of the Year", route: "/RegistrationOverseas", storageKey: "registrationOverseasDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["overseasMetrics2024"], step4Fields: ["sustainability2024"], signatureFields: ["declaration"] },
    { key: "digital", awardTitle: "Digital Technology Provider of the Year", route: "/RegistrationDigital", storageKey: "registrationDigitalDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["solutionDeployed"], step4Fields: ["businessValue"], signatureFields: ["declaration"] },
    { key: "gnz", awardTitle: "Goal Net Zero Company of the Year", route: "/RegistrationGNZ", storageKey: "registrationGNZDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["emission2024"], step4Fields: ["netZeroPlan"], signatureFields: ["declaration"] },
    { key: "gh", awardTitle: "Green Hydrogen Company of the Year", route: "/RegistrationGH", storageKey: "registrationGHDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["hydrogenMetrics2024"], step4Fields: ["projectPipeline"], signatureFields: ["declaration"] },
    { key: "sp", awardTitle: "Service Provider of the Year", route: "/RegistrationSP", storageKey: "registrationSPDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["serviceMetrics2024"], step4Fields: ["clientSatisfaction"], signatureFields: ["declaration"] },
    { key: "pipeline", awardTitle: "Pipeline Transportation Company of the Year", route: "/RegistrationPipeline", storageKey: "registrationPipelineDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["throughput2024"], step4Fields: ["safetyMetrics"], signatureFields: ["declaration"] },
    { key: "om", awardTitle: "Oil Marketing Company of the Year", route: "/RegistrationOM", storageKey: "registrationOMDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["marketingMetrics2024"], step4Fields: ["retailNetwork"], signatureFields: ["declaration"] },
    { key: "hrm", awardTitle: "Human Resource Management Company of the Year", route: "/RegistrationHRM", storageKey: "registrationHRMDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["hrMetrics2024"], step4Fields: ["employeePrograms"], signatureFields: ["declaration"] },
    { key: "cbg", awardTitle: "CBG Company of the Year", route: "/RegistrationCBG", storageKey: "registrationCBGDraft",
      step1Fields: ["Organisationname", "mailingAddress", "organisationname"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["retailOutlets2024"], step4Fields: ["lubricantsSales2024"], signatureFields: ["declaration"] },
    { key: "bmp", awardTitle: "Best Managed Project of the Year", route: "/RegistrationBMP", storageKey: "registrationBMPDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "projectDetails"], step3Fields: ["projectMetrics2024"], step4Fields: ["projectImpact"], signatureFields: ["declaration"] },
    { key: "refinery", awardTitle: "Refinery of the Year", route: "/RegistrationRefinery", storageKey: "registrationRefineryDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["refineryMetrics2024"], step4Fields: ["sustainability2024"], signatureFields: ["declaration"] },
    { key: "innovator", awardTitle: "Innovator of the year (team)", route: "/RegistrationInnovator", storageKey: "registrationInnovatorDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["teamDetails", "companyProfile"], step3Fields: ["innovationMetrics"], step4Fields: ["outcomes"], signatureFields: ["declaration"] },
    { key: "we", awardTitle: "Woman Executive of the Year", route: "/RegistrationWE", storageKey: "registrationWEDraft",
      step1Fields: ["candidateName", "organisationname"], step2Fields: ["authorityName", "authorityEmail", "bio"], step3Fields: ["achievements"], step4Fields: ["recommendations"], signatureFields: ["declaration"] },
    { key: "yf", awardTitle: "Young Achiever of the Year (Female)", route: "/RegistrationYF", storageKey: "registrationYFDraft",
      step1Fields: ["candidateName", "organisationname"], step2Fields: ["authorityName", "authorityEmail", "bio"], step3Fields: ["achievements"], step4Fields: ["recommendations"], signatureFields: ["declaration"] },
    { key: "ym", awardTitle: "Young Achiever of the Year (Male)", route: "/RegistrationYM", storageKey: "registrationYMDraft",
      step1Fields: ["candidateName", "organisationname"], step2Fields: ["authorityName", "authorityEmail", "bio"], step3Fields: ["achievements"], step4Fields: ["recommendations"], signatureFields: ["declaration"] },
    { key: "cgd", awardTitle: "CGD Company of the Year", route: "/RegistrationCGD", storageKey: "registrationCGDDraft",
      step1Fields: ["organisationname", "mailingAddress"], step2Fields: ["authorityName", "authorityEmail", "companyProfile"], step3Fields: ["cgdMetrics2024"], step4Fields: ["networkExpansion"], signatureFields: ["declaration"] },
  ];
  // ---------- Helpers (unchanged) ----------
  const tryParseJSON = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === "object") return value;
    if (typeof value !== "string") return null;
    const s = value.trim();
    if (!s) return null;
    try { return JSON.parse(s); } catch { return null; }
  };
  const normalizeTitle = (t = "") => (t ? String(t).trim().toLowerCase() : "");
  const getFieldValue = (fd = {}, names = []) => {
    if (!fd || !names || names.length === 0) return undefined;
    for (const rawName of names) {
      if (!rawName) continue;
      const candidates = [
        rawName,
        rawName.charAt(0).toLowerCase() + rawName.slice(1),
        rawName.toLowerCase(),
        rawName.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
        rawName.replace(/\s+/g, "").toLowerCase(),
        rawName.replace(/[_\s-]+/g, "").toLowerCase(),
      ];
      for (const key of candidates) {
        if (Object.prototype.hasOwnProperty.call(fd, key)) return fd[key];
        if (key in fd) return fd[key];
      }
    }
    return undefined;
  };
  const isFilled = (val) => {
    if (val === null || val === undefined) return false;
    if (typeof val === "boolean") return val === true;
    if (Array.isArray(val)) return val.length > 0 && val.some((v) => v !== null && v !== undefined && String(v).trim() !== "");
    if (typeof val === "object") return Object.keys(val).length > 0;
    return String(val).trim() !== "";
  };
  const computeProgressByConfig = (fd, cfg) => {
    if (!cfg || !fd) return 0;
    const groups = [
      cfg.step1Fields || [], cfg.step2Fields || [], cfg.step3Fields || [], cfg.step4Fields || [], cfg.signatureFields || []
    ];
    const totalGroups = groups.length;
    let completed = 0;
    for (const group of groups) {
      const groupDone = group.some((field) => isFilled(getFieldValue(fd, [field])));
      if (groupDone) completed++;
    }
    return Math.round((completed / totalGroups) * 100);
  };
  const computeNextStepByConfig = (fd, cfg) => {
    if (!cfg || !fd) return 1;
    const groups = [cfg.step1Fields || [], cfg.step2Fields || [], cfg.step3Fields || [], cfg.step4Fields || []];
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const anyFilled = group.some((f) => isFilled(getFieldValue(fd, [f])));
      if (!anyFilled) return i + 1;
    }
    return 5;
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "Draft": return <FileText size={20} className="status-icon draft" />;
      case "Submitted": return <CheckCircle size={20} className="status-icon submitted" />;
      case "Rejected": return <XCircle size={20} className="status-icon rejected" />;
      default: return <Clock size={20} className="status-icon draft" />;
    }
  };
  const configByAwardTitle = (title) => formsConfig.find((c) => c.awardTitle === title) || null;
  const configByStorageKey = (sk) => formsConfig.find((c) => c.storageKey && sk && sk.toLowerCase().includes(c.storageKey.toLowerCase())) || formsConfig.find((c) => c.storageKey === sk) || null;
  const routeForAwardTitle = (awardTitle) => {
    const cfg = configByAwardTitle(awardTitle);
    if (!cfg) {
      const fallback = formsConfig.find((c) => c.key === "cbg") || formsConfig[0];
      return { route: fallback.route, navFn: () => navigate(fallback.route, { state: { awardTitle } }) };
    }
    return { route: cfg.route, navFn: () => navigate(cfg.route, { state: { awardTitle } }) };
  };
  const formatDateString = (d) => {
    if (!d) return "—";
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    return dt.toLocaleDateString();
  };
  // ---------- User-scoped helpers ----------
  const getCurrentUserIdentity = useCallback(() => {
    try {
      const raw = sessionStorage.getItem("user_info");
      const parsed = tryParseJSON(raw);
      if (!parsed) return null;
      // prefer id, then email
      const id = parsed.id || parsed.user_id || parsed.pk || null;
      const email = parsed.email || parsed.email_address || parsed.user_email || parsed.applicant_email || null;
      return { id, email, raw: parsed };
    } catch {
      return null;
    }
  }, []);
  const makeUserKeyCandidates = (userIdent, baseKey) => {
    if (!baseKey) return [baseKey];
    if (!userIdent) return [baseKey];
    const identifier = userIdent.id || userIdent.email || String(userIdent).trim();
    if (!identifier) return [baseKey];
    return [
      `${identifier}::${baseKey}`,
      `${baseKey}::${identifier}`,
      `${identifier}_${baseKey}`,
      `${baseKey}_${identifier}`,
      baseKey,
    ];
  };
  const draftAppearsOwnedByUser = (parsed, key, userIdent) => {
    if (!userIdent) return true; // fallback: include if we can't determine user
    const id = userIdent.id != null ? String(userIdent.id) : null;
    const email = userIdent.email ? String(userIdent.email).toLowerCase() : null;
    if (id && key && key.includes(id)) return true;
    if (email && key && key.toLowerCase().includes(email)) return true;
    if (parsed && typeof parsed === "object") {
      const lower = (k) => (k ? String(k).toLowerCase() : "");
      const fieldsToCheck = [
        parsed.owner,
        parsed.user,
        parsed.user_id,
        parsed.userId,
        parsed.userEmail,
        parsed.user_email,
        parsed.created_by,
        parsed.createdBy,
        parsed.savedBy,
        parsed.saved_by,
        parsed.formData?.userEmail,
        parsed.formData?.email,
        parsed.formData?.applicant_email,
        parsed.formData?.applicantEmail,
        parsed.formData?.userid,
        parsed.formData?.user_id,
      ];
      for (const f of fieldsToCheck) {
        if (!f) continue;
        const fv = lower(f);
        if (id && fv === String(id)) return true;
        if (email && fv === email) return true;
        if (email && fv.includes(email)) return true;
      }
    }
    return false;
  };
  // ---------- Load data (drafts + submitted) ----------
  const loadApplications = useCallback((userIdent = null) => {
    try {
      if (!userIdent) userIdent = getCurrentUserIdentity();
    } catch { userIdent = getCurrentUserIdentity(); }
    // update userInfo UI from session user_info (best-effort)
    if (userIdent && userIdent.raw) {
      const parsedUser = userIdent.raw;
      setUserInfo({
        name: parsedUser.applicant_name || parsedUser.name || "—",
        designation: parsedUser.designation || parsedUser.applicant_designation || "—",
        phone: parsedUser.applicant_phone || parsedUser.phone || "—",
        organisation: parsedUser.organisation || parsedUser.organisation_name || parsedUser.company || "—",
      });
    }
    const collected = [];
    // 1) Known config keys (explicit) - try per-user candidates
    for (const cfg of formsConfig) {
      try {
        if (!cfg.storageKey) continue;
        const candidates = makeUserKeyCandidates(userIdent, cfg.storageKey);
        let chosenParsed = null;
        let chosenKey = null;
        for (const candidateKey of candidates) {
          try {
            const raw = localStorage.getItem(candidateKey);
            const parsed = tryParseJSON(raw);
            if (!parsed) continue;
            // ensure ownership (strict): parsed must belong to user OR no user info available
            if (!draftAppearsOwnedByUser(parsed, candidateKey, userIdent)) continue;
            chosenParsed = parsed;
            chosenKey = candidateKey;
            break;
          } catch (e) { /* ignore */ }
        }
        if (chosenParsed && chosenParsed.formData) {
          const fd = chosenParsed.formData;
          // If this is a draft record, require it be draft (or unspecified) and owned by user
          const fm = (fd.form_mode || chosenParsed.form_mode || chosenParsed.form_mode) ?? (chosenParsed.form_mode ?? null);
          // treat as draft unless explicitly marked submitted
          const isSubmittedRecord = String(fm).toLowerCase() === "submited" || String(chosenParsed.status || "").toLowerCase() === "submitted";
          if (isSubmittedRecord) {
            // push as submitted (but ensure ownership)
            collected.push({
              id: chosenKey,
              title: fd.category || fd.awardTitle || cfg.awardTitle,
              normTitle: normalizeTitle(fd.category || cfg.awardTitle),
              status: "Submitted",
              progress: 100,
              formData: fd,
              lastModified: chosenParsed.lastModified || chosenParsed.savedAt || new Date().toISOString(),
              cfg,
              approvingAuthoritySignatureUrl: fd.approvingAuthoritySignatureUrl || fd.approving_authority_file || "",
            });
          } else {
            // draft
            collected.push({
              id: chosenKey,
              title: fd.category || fd.awardTitle || cfg.awardTitle,
              normTitle: normalizeTitle(fd.category || cfg.awardTitle),
              status: "Draft",
              progress: computeProgressByConfig(fd, cfg),
              formData: fd,
              lastModified: chosenParsed.lastModified || chosenParsed.savedAt || new Date().toISOString(),
              cfg,
            });
          }
        }
      } catch (err) {
        console.warn("Could not parse draft for", cfg.storageKey, err);
      }
    }
    // 2) wildcard registration*draft keys (catch other drafts) - only include those owned by user
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (!/registration.*draft/i.test(key)) continue;
        // Skip ones already processed (by matching id)
        if (collected.some((c) => c.id === key || (c.cfg && c.cfg.storageKey && key.toLowerCase() === c.cfg.storageKey.toLowerCase()))) continue;
        try {
          const raw = localStorage.getItem(key);
          const parsed = tryParseJSON(raw);
          if (!parsed) continue;
          // check ownership: only include if it appears owned by current user
          if (!draftAppearsOwnedByUser(parsed, key, userIdent)) continue;
          const fd = parsed.formData || parsed;
          if (!fd) continue;
          // if parsed appears to be submitted, skip here (we will pick up from submittedApplications below)
          const fmode = (parsed.form_mode || fd.form_mode || parsed.formMode || "").toString().toLowerCase();
          if (fmode === "submited" || fmode === "submitted") {
            // treat as submitted (but still require owned)
            const cfg = configByStorageKey(key) || null;
            const title = fd.category || fd.awardTitle || cfg?.awardTitle || key.replace(/registration|draft/ig, "").replace(/_/g, " ").trim() || "Submitted Application";
            collected.push({
              id: key,
              title,
              normTitle: normalizeTitle(title),
              status: "Submitted",
              progress: 100,
              formData: fd,
              lastModified: parsed.lastModified || parsed.savedAt || new Date().toISOString(),
              cfg,
              approvingAuthoritySignatureUrl: fd.approvingAuthoritySignatureUrl || fd.approving_authority_file || "",
            });
            continue;
          }
          const cfg = configByStorageKey(key) || null;
          const title = fd.category || fd.awardTitle || cfg?.awardTitle || key.replace(/registration|draft/ig, "").replace(/_/g, " ").trim() || "Application Draft";
          const progress = cfg ? computeProgressByConfig(fd, cfg) : (() => {
            let c = 0;
            if (isFilled(getFieldValue(fd, ["organisationname", "Organisationname", "organisation_name"]))) c++;
            if (isFilled(getFieldValue(fd, ["authorityName", "authority_email", "authorityEmail"]))) c++;
            if (isFilled(getFieldValue(fd, ["retailOutlets2024", "production2024", "marketingMetrics2024"]))) c++;
            if (isFilled(getFieldValue(fd, ["lubricantsSales2024", "sustainability2024", "projectMetrics2024"]))) c++;
            if (isFilled(getFieldValue(fd, ["declaration", "approvingAuthoritySignatureUrl", "approving_authority_file_url"]))) c++;
            return Math.round((c / 5) * 100);
          })();
          collected.push({
            id: key,
            title,
            normTitle: normalizeTitle(title),
            status: "Draft",
            progress,
            formData: fd,
            lastModified: parsed.lastModified || parsed.savedAt || new Date().toISOString(),
            cfg,
          });
        } catch (innerErr) {
          console.warn("Failed to parse extra draft key", key, innerErr);
        }
      }
    } catch (err) {
      console.warn("Could not enumerate localStorage keys", err);
    }
    // 3) submittedApplications array - prefer strict ownership + form_mode === 'submited'
    try {
      const attempts = ["submittedApplications", "applications", "submitted_apps"];
      for (const attemptKey of attempts) {
        const submittedRaw = localStorage.getItem(attemptKey);
        const submittedParsed = tryParseJSON(submittedRaw);
        if (!Array.isArray(submittedParsed) || submittedParsed.length === 0) continue;
        submittedParsed.forEach((a, idx) => {
          const fm = a.formData || a;
          const fmMode = (fm?.form_mode || fm?.formMode || a.form_mode || a.status || "").toString().toLowerCase();
          // treat only explicit submitted entries here
          if (!(fmMode === "submited" || fmMode === "submitted" || String(a.status).toLowerCase() === "submitted")) {
            // skip non-submitted entries in the submitted array
            return;
          }
          // ownership: require explicit match when we have a current user identity
          const belongs = (() => {
            if (!userIdent) return true;
            const uid = userIdent.id ? String(userIdent.id) : null;
            const email = userIdent.email ? String(userIdent.email).toLowerCase() : null;
            // check common id fields
            if (uid && (String(a.user_id) === uid || String(fm.userid) === uid || String(fm.user_id) === uid)) return true;
            // check emails in the submission
            const candidateEmails = [
              (a.email || a.user_email || a.submitter_email || fm?.email || fm?.userEmail || fm?.applicant_email || fm?.applicantEmail)
            ].filter(Boolean).map(String).map(s => s.toLowerCase());
            if (email && candidateEmails.some((e) => e && e.includes(email))) return true;
            // fallback: exclude if we have a userIdent but didn't match (stricter)
            return false;
          })();
          if (!belongs) return;
          const title = a.title || a.category || a.awardTitle || (fm && (fm.category || fm.awardTitle)) || "Submitted Application";
          const id = a.id || a.submissionId || `sub-${attemptKey}-${idx}`;
          collected.push({
            id,
            title,
            normTitle: normalizeTitle(title),
            status: "Submitted",
            progress: 100,
            approvingAuthoritySignatureUrl: a.approvingAuthoritySignatureUrl || a.approving_authority_file_url || a.approving_authority_file || "",
            lastModified: a.lastModified || a.submittedAt || new Date().toISOString(),
            meta: a,
            formData: fm,
          });
        });
        // once we've found entries in one of these arrays, prefer that and stop scanning other attemptKeys
        if (Array.isArray(submittedParsed) && submittedParsed.length > 0) break;
      }
    } catch (err) {
      console.warn("Failed to read submitted applications", err);
    }
    // ---------- Deduplicate by normalized title ----------
    const grouped = collected.reduce((acc, item) => {
      const key = item.normTitle || normalizeTitle(item.title || "") || "__unknown__";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    const chosen = [];
    for (const [norm, items] of Object.entries(grouped)) {
      // prefer Submitted (latest) if present
      const submittedItems = items.filter((it) => it.status === "Submitted");
      if (submittedItems.length > 0) {
        submittedItems.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        chosen.push(submittedItems[0]);
        continue;
      }
      // else pick latest Draft
      const draftItems = items.filter((it) => it.status === "Draft");
      if (draftItems.length > 0) {
        draftItems.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        chosen.push(draftItems[0]);
        continue;
      }
      // fallback: pick first
      chosen.push(items[0]);
    }
    // Sort: drafts first, then submitted; both groups by date desc
    chosen.sort((a, b) => {
      if (a.status === b.status) return new Date(b.lastModified) - new Date(a.lastModified);
      return a.status === "Draft" ? -1 : 1;
    });
    // Normalize for UI (title + formatted date)
    const normalized = chosen.map((c) => ({
      ...c,
      title: c.title || (c.cfg && c.cfg.awardTitle) || "Application",
      lastModified: formatDateString(c.lastModified),
    }));
    setApplications(normalized);
  }, [getCurrentUserIdentity]); // eslint-disable-line
  // call loadApplications on mount, and add listeners to refresh later
  useEffect(() => {
    const userIdent = getCurrentUserIdentity();
    loadApplications(userIdent);
    const onStorage = () => loadApplications(getCurrentUserIdentity());
    const onFocus = () => loadApplications(getCurrentUserIdentity());
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadApplications]);
  // ---------- Continue & View handlers ----------
  const handleContinue = (app) => {
    try {
      const fd = app.formData || {};
      const cfg = app.cfg || configByAwardTitle(app.title) || null;
      // prefer saved step if present, else computed next step
      const nextStep = cfg ? (fd?.step ? Number(fd.step) : computeNextStepByConfig(fd, cfg)) : (fd?.step ? Number(fd.step) : 1);
      const prefill = { formData: fd, step: nextStep };
      const title = fd.category || app.title || "";
      const routeObj = routeForAwardTitle(title);
      const route = routeObj.route || "/RegistrationCBG";
      try { sessionStorage.setItem("registration_prefill", JSON.stringify({ ...prefill, route })); } catch (err) { console.warn("Could not write registration_prefill", err); }
      try {
        const short = route.replace(/^\//, "");
        const specificKey = `${short.charAt(0).toLowerCase()}${short.slice(1)}_prefill`;
        sessionStorage.setItem(specificKey, JSON.stringify(prefill));
      } catch (err) { console.warn("Could not write route-specific prefill", err); }
      try { if (route === "/RegistrationCBG") sessionStorage.setItem("registrationCBG_prefill", JSON.stringify(prefill)); } catch (_) {}
      try { routeObj.navFn(); } catch (navErr) { console.warn("Primary navigation failed, falling back", navErr); navigate(route, { state: { awardTitle: title } }); }
    } catch (err) {
      console.error("Continue action failed", err);
      alert("Could not continue to form. Please try again.");
    }
  };
  const handleViewPDF = (url) => {
    if (!url) return alert("No PDF available for this submission.");
    const w = window.open("", "_blank");
    w.document.write(`
      <html><head><title>Signature PDF</title></head>
      <body style="margin:0;padding:0">
        <object data="${url}" type="application/pdf" width="100%" height="100%">
          <p style="padding:16px">PDF not available. <a href="${url}" target="_blank">Open PDF</a></p>
        </object>
      </body></html>
    `);
    w.document.close();
  };
  // ---------- Render ----------
  return (
    <div className="dashboard-root">
      <div className="dashboard-container">
        <section className="welcome-card">
          <div className="welcome-left">
            <h1>Welcome, <span className="username">{userInfo.name}</span></h1>
            <p className="sub">Track and manage your award applications</p>
          </div>
          <div className="welcome-right">
            <div className="meta">
              <div className="meta-label">Organisation</div>
              <div className="meta-value">{userInfo.organisation}</div>
            </div>
            <div className="meta">
              <div className="meta-label">Designation</div>
              <div className="meta-value">{userInfo.designation}</div>
            </div>
            <div className="meta">
              <div className="meta-label">Phone</div>
              <div className="meta-value">{userInfo.phone}</div>
            </div>
          </div>
        </section>
        <div className="main-grid">
          <section className="applications-panel">
            <div className="panel-header">
              <h2>My Applications</h2>
            </div>
            <div className="applications-list">
              {applications.length === 0 && (
                <div className="empty">No Application Started / Submitted</div>
              )}
              {applications.map((app) => (
                <article key={app.id} className="app-card">
                  <header className="app-card-header">
                    <div className="left">
                      {getStatusIcon(app.status)}
                      <div className="title-block">
                        <div className="title">{app.title}</div>
                        <div className="modified">Last modified: {app.lastModified || "—"}</div>
                      </div>
                    </div>
                    <div className="right">
                      <span className={`badge ${app.status === "Submitted" ? "badge-sub" : "badge-draft"}`}>{app.status}</span>
                    </div>
                  </header>
                  {app.status === "Draft" && (
                    <div className="progress-block">
                      <div className="progress-meta">
                        <div>Progress</div>
                        <div className="progress-value">{app.progress ?? (app.cfg ? computeProgressByConfig(app.formData, app.cfg) : 0)}%</div>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${app.progress ?? (app.cfg ? computeProgressByConfig(app.formData, app.cfg) : 0)}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {app.status === "Submitted" && (
                    <div className="submitted-note">
                      <div>This application was submitted successfully.</div>
                      {app.approvingAuthoritySignatureUrl ? <div className="muted">Signature PDF available</div> : <div className="muted">No signature uploaded</div>}
                    </div>
                  )}
                  <div className="card-actions">
                    {app.status === "Draft" && <button className="btn primary" onClick={() => handleContinue(app)}>Continue</button>}
                    {app.status === "Submitted" && app.approvingAuthoritySignatureUrl && <button className="btn outline" onClick={() => handleViewPDF(app.approvingAuthoritySignatureUrl)}>Download</button>}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <aside className="activity-panel">
            <div className="activity-card">
              <h3>Activity</h3>
              <p className="muted">Saved drafts and submitted applications will appear here automatically.</p>
              <div className="activity-row">
                <div className="label">Drafts</div>
                <div className="big">{applications.filter((a) => a.status === "Draft").length}</div>
              </div>
              <div className="activity-row">
                <div className="label">Submitted</div>
                <div className="big">{applications.filter((a) => a.status === "Submitted").length}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
export default ApplicantDashboard;
