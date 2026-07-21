# Veridex Phases 4-6: Professional Forensic Operating System

## 1. UPDATED ARCHITECTURE

### Unified Data Model

```
Veridex Workspace
│
├── Identity Layer (Existing - DO NOT MODIFY)
│   ├── User Authentication
│   ├── Organization/Department
│   ├── API Keys & Security
│   └── Preferences & Settings
│
├── Credit Economy (Existing - DO NOT MODIFY)
│   ├── CreditBalance
│   ├── CreditTransaction
│   └── CreditRateCard
│
└── Forensic Operating System (PHASES 4-6)
    │
    ├── Cases (Investigation Management)
    │   ├── Case (title, description, priority, category, status)
    │   ├── CaseMember (role-based access: OWNER, EDITOR, VIEWER, GUEST)
    │   ├── CaseActivity (audit trail)
    │   ├── CaseNote (rich text notes)
    │   ├── CaseComment (threaded discussions)
    │   └── Nested Evidence (belongs_to case)
    │
    ├── Evidence Vault (Digital Archive)
    │   ├── Evidence (file metadata, analysis status, confidence)
    │   ├── EvidenceTag (searchable tags)
    │   ├── EvidenceMetadata (extended properties)
    │   ├── EvidenceVersion (change tracking)
    │   └── Dual Mode:
    │       ├── Assigned Evidence (within cases)
    │       └── Personal Vault (unassigned, templates, archived)
    │
    ├── Reports (Forensic Findings)
    │   ├── Report (verity score, truth score, confidence, findings)
    │   ├── Linked to both Case and Evidence
    │   └── Multiple Export Formats (PDF, DOCX, JSON)
    │
    ├── Activity & Timeline
    │   ├── CaseActivity (case-level events)
    │   ├── ActivityLog (user-level events)
    │   └── Real-time Sync for Collaboration
    │
    ├── Pinning & Favorites
    │   ├── PinnedItem (quick access shortcuts)
    │   └── Favorite Evidence (one-click marking)
    │
    └── Storage Management
        ├── WorkspaceStorage (quota tracking)
        ├── Evidence counting & analytics
        └── Cleanup recommendations
```

### Integration Points with Milestone 1

1. **Authentication**: Uses existing User model with Session/Account
2. **Credits**: Extends CreditTransaction with caseId/reportId references
3. **Database**: All new models follow existing Prisma conventions
4. **Design System**: Reuses tailwind.config.js, globals.css, component library
5. **Routing**: Extends existing app directory structure
6. **API Routes**: Extends existing patterns in app/api
7. **Middleware**: Uses existing auth middleware (middleware.ts)

---

## 2. DATABASE SCHEMA

### New Tables (Extensions, No Modifications)

```sql
-- Already defined in schema:
-- Case, Evidence, CaseMember, CaseActivity
-- CaseNote, CaseComment, EvidenceTag
-- EvidenceMetadata, EvidenceVersion
-- PinnedItem, WorkspaceStorage, Report
-- ActivityLog, Subscription, APIKey

-- Potential future extensions (DO NOT IMPLEMENT YET):
-- TeamNotification (collaborative features)
-- ReportTemplate (pre-built report formats)
-- AuditPolicy (compliance & automation)
-- IntegrationConfig (Slack, Email, Webhooks)
-- AIAssistantState (future Phase 7)
```

### Relationships Diagram

```
User
├── 1:N → Case (userId)
├── 1:N → Evidence (userId)
├── 1:N → Report (userId)
├── 1:N → CaseMember (role-based for collaboration)
├── 1:N → CaseNote (notes authorship)
├── 1:N → CaseComment (comments authorship)
├── 1:N → CreditTransaction (action history)
└── 1:N → ActivityLog (user actions)

Case
├── 1:N → Evidence (caseId)
├── 1:N → Report (caseId)
├── 1:N → CaseMember (role-based access)
├── 1:N → CaseActivity (audit trail)
├── 1:N → CaseNote (attached notes)
├── 1:N → CaseComment (discussions)
└── 1:N → PinnedItem (pinned shortcuts)

Evidence
├── 1:1 → EvidenceMetadata
├── 1:N → EvidenceVersion (change history)
├── 1:N → EvidenceTag (multiple tags)
├── 1:N → Report (analysis results)
└── M:N → Case (via caseId, can be unassigned)

Organization (Future)
├── 1:N → User (members)
├── 1:N → Department
├── 1:N → Case (org-level cases)
└── 1:N → APIKey
```

### Indexes for Performance

```sql
-- Case queries
CREATE INDEX idx_case_user_status ON Case(userId, status);
CREATE INDEX idx_case_user_updated ON Case(userId, updatedAt);
CREATE INDEX idx_case_organization ON Case(organizationId);

-- Evidence queries
CREATE INDEX idx_evidence_user_case ON Evidence(userId, caseId);
CREATE INDEX idx_evidence_user_created ON Evidence(userId, createdAt);
CREATE INDEX idx_evidence_user_status ON Evidence(userId, status);
CREATE INDEX idx_evidence_filehash ON Evidence(fileHash);
CREATE INDEX idx_evidence_case ON Evidence(caseId);

-- Activity queries
CREATE INDEX idx_case_activity_created ON CaseActivity(caseId, createdAt DESC);
CREATE INDEX idx_activity_log_user_created ON ActivityLog(userId, createdAt DESC);

-- Tagging queries
CREATE INDEX idx_evidence_tag ON EvidenceTag(tag);

-- Storage queries
CREATE INDEX idx_workspace_storage_user ON WorkspaceStorage(userId);
```

---

## 3. FOLDER STRUCTURE

```
frontend/
├── app/
│   ├── dashboard/              ← PHASE 4: Dashboard Headquarters
│   │   ├── page.tsx            (main dashboard with widgets)
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── DashboardGrid.tsx
│   │       ├── WelcomeWidget.tsx
│   │       ├── SubscriptionWidget.tsx
│   │       ├── CreditsWidget.tsx
│   │       ├── RecentActivityWidget.tsx
│   │       ├── RecentCasesWidget.tsx
│   │       ├── RecentEvidenceWidget.tsx
│   │       ├── RecentReportsWidget.tsx
│   │       ├── StorageWidget.tsx
│   │       ├── QuickActionsWidget.tsx
│   │       ├── NotificationsWidget.tsx
│   │       └── SkeletonLoaders.tsx
│   │
│   ├── cases/                  ← PHASE 6: Case Management
│   │   ├── page.tsx            (case list / dashboard)
│   │   ├── [caseId]/
│   │   │   ├── page.tsx        (case details)
│   │   │   ├── layout.tsx      (case-level layout)
│   │   │   ├── evidence/
│   │   │   │   └── page.tsx    (evidence within case)
│   │   │   ├── reports/
│   │   │   │   └── page.tsx    (case reports)
│   │   │   ├── activity/
│   │   │   │   └── page.tsx    (case timeline/activity)
│   │   │   └── notes/
│   │   │       └── page.tsx    (case notes)
│   │   └── layout.tsx
│   │
│   ├── evidence/               ← PHASE 5: Evidence Vault
│   │   ├── page.tsx            (vault with views)
│   │   ├── [evidenceId]/
│   │   │   ├── page.tsx        (evidence detail)
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   │
│   ├── reports/
│   │   ├── page.tsx            (all reports)
│   │   └── [reportId]/
│   │       └── page.tsx        (report viewer)
│   │
│   ├── api/
│   │   ├── cases/
│   │   │   ├── route.ts        (list, create cases)
│   │   │   ├── [caseId]/
│   │   │   │   ├── route.ts    (get, update, delete)
│   │   │   │   ├── evidence/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── reports/
│   │   │   │   │   └── route.ts
│   │   │   │   └── activity/
│   │   │   │       └── route.ts
│   │   │   └── batch/
│   │   │       └── route.ts    (bulk operations)
│   │   │
│   │   ├── evidence/
│   │   │   ├── route.ts        (list, upload)
│   │   │   ├── [evidenceId]/
│   │   │   │   ├── route.ts    (get, update, delete)
│   │   │   │   ├── tags/
│   │   │   │   │   └── route.ts
│   │   │   │   └── metadata/
│   │   │   │       └── route.ts
│   │   │   └── search/
│   │   │       └── route.ts    (search with filters)
│   │   │
│   │   ├── reports/
│   │   │   ├── route.ts        (list reports)
│   │   │   └── [reportId]/
│   │   │       ├── route.ts    (get, export)
│   │   │       └── export/
│   │   │           ├── pdf/
│   │   │           │   └── route.ts
│   │   │           ├── docx/
│   │   │           │   └── route.ts
│   │   │           └── json/
│   │   │               └── route.ts
│   │   │
│   │   └── dashboard/
│   │       ├── overview/
│   │       │   └── route.ts    (dashboard stats)
│   │       ├── activity/
│   │       │   └── route.ts    (recent activity)
│   │       └── storage/
│   │           └── route.ts    (storage stats)
│   │
│   └── layout.tsx
│
├── components/
│   ├── workspace/              ← Core workspace components
│   │   ├── WorkspaceShell.tsx   (navigation, sidebar)
│   │   ├── CaseDialog.tsx       (existing)
│   │   ├── DashboardLayout.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PageContainer.tsx
│   │   └── breadcrumbs/
│   │       └── Breadcrumb.tsx
│   │
│   ├── dashboard/              ← Dashboard-specific components
│   │   ├── widgets/
│   │   │   ├── Widget.tsx       (base widget)
│   │   │   ├── WidgetHeader.tsx
│   │   │   ├── WidgetSkeleton.tsx
│   │   │   └── EmptyState.tsx
│   │   ├── DashboardGrid.tsx
│   │   └── QuickActions.tsx
│   │
│   ├── cases/                  ← Case management components
│   │   ├── CaseCard.tsx
│   │   ├── CaseTable.tsx
│   │   ├── CaseDetail.tsx
│   │   ├── CaseForm.tsx
│   │   ├── CaseStatus.tsx
│   │   ├── CaseMembers.tsx
│   │   ├── CaseTabs.tsx
│   │   ├── CaseTimeline.tsx
│   │   ├── CaseNotes.tsx
│   │   ├── CaseComments.tsx
│   │   └── dialogs/
│   │       ├── CreateCaseDialog.tsx
│   │       ├── CaseSettingsDialog.tsx
│   │       └── BulkActionDialog.tsx
│   │
│   ├── evidence/               ← Evidence vault components
│   │   ├── EvidenceCard.tsx
│   │   ├── EvidenceGrid.tsx
│   │   ├── EvidenceList.tsx
│   │   ├── EvidenceDetail.tsx
│   │   ├── EvidenceUploader.tsx
│   │   ├── EvidenceFilters.tsx
│   │   ├── EvidenceSearch.tsx
│   │   ├── EvidenceTags.tsx
│   │   ├── EvidenceViewer.tsx   (image, video, pdf, etc)
│   │   ├── ViewToggle.tsx       (grid/list/timeline)
│   │   └── dialogs/
│   │       ├── UploadDialog.tsx
│   │       ├── MoveToCase.tsx
│   │       ├── TagManager.tsx
│   │       └── ArchiveConfirm.tsx
│   │
│   ├── reports/                ← Report components
│   │   ├── ReportCard.tsx
│   │   ├── ReportViewer.tsx
│   │   ├── ReportExport.tsx
│   │   ├── ReportGeneratorDialog.tsx
│   │   └── ReportTemplate.tsx
│   │
│   ├── shared/                 ← Reusable components
│   │   ├── Dialog.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tooltip.tsx
│   │   ├── ContextMenu.tsx
│   │   ├── Pagination.tsx
│   │   ├── Tabs.tsx
│   │   ├── Dropdown.tsx
│   │   └── Button.tsx
│   │
│   └── Navigation.tsx (existing)
│
├── lib/
│   ├── api/                    ← API client utilities
│   │   ├── cases.ts            (case API calls)
│   │   ├── evidence.ts         (evidence API calls)
│   │   ├── reports.ts          (report API calls)
│   │   ├── dashboard.ts        (dashboard API calls)
│   │   └── client.ts           (base HTTP client)
│   │
│   ├── hooks/                  ← React hooks
│   │   ├── useCases.ts         (case queries & mutations)
│   │   ├── useEvidence.ts      (evidence queries & mutations)
│   │   ├── useReports.ts       (report queries & mutations)
│   │   ├── useDashboard.ts     (dashboard data)
│   │   ├── useStorage.ts       (storage tracking)
│   │   ├── useActivity.ts      (activity stream)
│   │   ├── usePagination.ts    (pagination state)
│   │   ├── useSearch.ts        (search & filters)
│   │   ├── useBulkActions.ts   (multi-select)
│   │   └── useAuth.ts          (existing)
│   │
│   ├── services/               ← Business logic
│   │   ├── caseService.ts      (case operations)
│   │   ├── evidenceService.ts  (evidence operations)
│   │   ├── reportService.ts    (report generation)
│   │   ├── storageService.ts   (storage management)
│   │   ├── uploadService.ts    (file upload & viralscan)
│   │   └── exportService.ts    (PDF/DOCX exports)
│   │
│   ├── utils/                  ← Utility functions
│   │   ├── formatters.ts       (dates, sizes, etc)
│   │   ├── validators.ts       (form validation)
│   │   ├── filters.ts          (filter logic)
│   │   ├── sort.ts             (sorting logic)
│   │   ├── permissions.ts      (role-based access)
│   │   └── constants.ts        (enums, defaults)
│   │
│   ├── types/                  (existing)
│   │   ├── case.ts
│   │   ├── evidence.ts
│   │   ├── report.ts
│   │   ├── activity.ts
│   │   └── common.ts
│   │
│   └── (existing folders)
│       ├── auth.ts
│       ├── credit-engine.ts
│       ├── guest-session.ts
│       ├── session.ts
│       └── workspace/
│
└── public/                     (existing)
```

---

## 4. USER FLOW

```
User Login (via existing auth)
    ↓
/dashboard (Landing Page - Professional Headquarters)
    ├── Welcome Message
    ├── Subscription Status
    ├── Credits Overview
    ├── Recent Cases (quick access)
    ├── Recent Evidence (recent uploads)
    ├── Recent Reports
    ├── Recent Activity (timeline)
    ├── Storage Status
    └── Quick Actions (buttons)
    ↓
/cases (Investigation Management)
    ├── Case List (grid/list view)
    ├── Filter by Status, Priority, Category, Tag
    ├── Search cases
    ├── Bulk Actions (archive, delete, move)
    ├── Create New Case
    │   ├── Title, Description
    │   ├── Priority, Category
    │   ├── Due Date (optional)
    │   └── Tags, Team Members (future)
    └── [caseId] (Case Details)
        ├── Case Overview
        ├── Case Evidence Tab
        │   ├── Evidence List within case
        │   ├── Add Evidence to case
        │   ├── Analyze Evidence
        │   └── Remove Evidence from case
        ├── Case Reports Tab
        │   ├── View Reports
        │   ├── Generate New Report
        │   └── Export Report
        ├── Case Activity Tab
        │   ├── Timeline of all actions
        │   ├── Who did what, when
        │   └── Undo capability (future)
        ├── Case Notes Tab
        │   ├── Rich text notes
        │   ├── Markdown support
        │   ├── Images, tables, code blocks
        │   └── Auto-save
        ├── Case Comments (Thread discussions)
        │   ├── Reply to comments
        │   ├── Resolve comments
        │   ├── Reactions
        │   └── Mentions (future)
        └── Case Settings
            ├── Update Case Info
            ├── Manage Members
            ├── Change Status
            └── Archive or Delete
    ↓
/evidence (Evidence Vault - Digital Archive)
    ├── View Mode Toggle
    │   ├── Grid View (card layout)
    │   ├── List View (table)
    │   ├── Compact View (minimal)
    │   └── Timeline View (chronological)
    ├── Search Bar
    │   ├── Search by filename
    │   ├── Search by case
    │   └── Advanced search
    ├── Filters
    │   ├── By Date
    │   ├── By Type
    │   ├── By Status
    │   ├── By Case
    │   ├── By Tags
    │   ├── Favorite (starred)
    │   └── Archived
    ├── Evidence Cards/Rows Display
    │   ├── Thumbnail (if image/video)
    │   ├── Filename
    │   ├── Upload Date
    │   ├── File Type & Size
    │   ├── Associated Case
    │   ├── Confidence Score (if analyzed)
    │   ├── Quick Actions (3-dot menu)
    │   │   ├── Open/View
    │   │   ├── Analyze Again
    │   │   ├── Move to Case
    │   │   ├── Download
    │   │   ├── Export
    │   │   ├── Archive
    │   │   ├── Delete
    │   │   ├── Rename
    │   │   ├── Tag
    │   │   ├── Share (future)
    │   │   └── Generate Report
    │   └── Inline Actions
    │       ├── Star/Favorite
    │       └── Tag quick-add
    ├── Quick Upload Button
    │   ├── Drag & drop area
    │   ├── File browser
    │   ├── URL input
    │   ├── Paste from clipboard
    │   └── Real-time upload progress
    ├── Storage Dashboard
    │   ├── Total Storage Used
    │   ├── Evidence Count
    │   ├── File Types Breakdown
    │   ├── Recent Uploads
    │   └── Largest Files
    └── [evidenceId] (Evidence Detail Page)
        ├── Evidence Viewer (image/video/pdf/text)
        ├── Metadata Panel
        │   ├── Upload Date
        │   ├── File Size & Type
        │   ├── Hash (SHA-256)
        │   ├── Associated Case
        │   ├── Confidence Score
        │   └── Tags
        ├── Analysis History
        │   ├── Previous Reports
        │   ├── Analysis Date & Results
        │   └── Credits Used
        ├── Comments Section
        ├── Quick Actions
        │   ├── Analyze Again
        │   ├── Move to Different Case
        │   ├── Download
        │   ├── Export
        │   ├── Archive
        │   └── Delete
        └── Version History
            ├── All Versions
            ├── Version Dates
            ├── Changes Noted
            └── Rollback (future)
    ↓
Reports & Export
    ├── /reports (All Reports)
    │   ├── Report List
    │   ├── Associated Case/Evidence
    │   ├── Generation Date
    │   ├── Confidence Score
    │   └── Quick Export
    └── [reportId]/export
        ├── PDF Format
        ├── DOCX Format
        ├── JSON Raw Data
        └── Court-Ready Format (future)
    ↓
/analytics (Future - Usage & Insights)
    ├── Evidence Uploaded (timeline)
    ├── Cases Created (timeline)
    ├── Reports Generated (timeline)
    ├── Credits Used (breakdown)
    ├── Most Used Features
    └── Storage Trends
```

---

## 5. COMPONENT LIST

### Dashboard Components

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| DashboardGrid | Layout dashboard with responsive grid | children | - |
| WelcomeWidget | Greeting, date, tips | userName | - |
| SubscriptionWidget | Show tier, renewal date | subscription | loading, error |
| CreditsWidget | Credits remaining, usage | balance | - |
| RecentActivityWidget | Last 10 actions | limit, filter | loading, activity[] |
| RecentCasesWidget | Last 5 open cases | limit | loading, cases[] |
| RecentEvidenceWidget | Last 10 uploads | limit | loading, evidence[] |
| RecentReportsWidget | Last 5 generated | limit | loading, reports[] |
| StorageWidget | Usage bar, breakdown | storage | - |
| QuickActionsWidget | Upload, New Case, etc | onAction | - |
| NotificationsWidget | Pending alerts | notifications | read |
| SkeletonLoaders | Placeholder components | variant | - |

### Cases Components

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| CaseCard | Single case in grid | case, onClick | hover, menu |
| CaseTable | Case list in table | cases, onSort, onFilter | sortBy, filters |
| CaseDetail | Full case view | caseId | loading, case |
| CaseForm | Create/Edit case | initialData, onSubmit | formData, errors |
| CaseStatus | Display/Edit status | status, caseId, onChange | isEditing |
| CaseMembers | Manage collaborators | caseId, members | showForm |
| CaseTabs | Navigation within case | activeTab, onTabChange | activeTab |
| CaseTimeline | Activity timeline | activities, caseId | filter |
| CaseNotes | Rich text notes editor | caseId, initialContent | content, isSaving |
| CaseComments | Threaded discussions | caseId, comments | newComment, replying |
| CreateCaseDialog | New case modal | onSuccess, onCancel | formData, loading |
| CaseSettingsDialog | Case admin | caseId, case, onSave | isDirty |
| BulkActionDialog | Multi-case actions | selected, onAction | action |

### Evidence Components

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| EvidenceCard | Single evidence in grid | evidence, onClick | hover, menu |
| EvidenceGrid | Grid view of evidence | evidence, onSort, onFilter | sortBy, filters |
| EvidenceList | List view of evidence | evidence, onSort | sortBy, sortOrder |
| EvidenceDetail | Full evidence view | evidenceId | loading, evidence |
| EvidenceUploader | File upload area | onUpload, onProgress | files, progress |
| EvidenceFilters | Filter bar | onFilter, activeFilters | filters |
| EvidenceSearch | Search box | onSearch, placeholder | query |
| EvidenceTags | Tag editor | evidenceId, tags, onUpdate | isEditing |
| EvidenceViewer | Media viewer | evidence, type | zoom, fullscreen |
| ViewToggle | Switch between views | activeView, onViewChange | activeView |
| UploadDialog | Upload modal | onComplete, onCancel | files, uploading |
| MoveToCase | Move evidence dialog | evidenceId, onMove | selectedCase |
| TagManager | Tag management | evidenceId, onSave | tags |
| ArchiveConfirm | Confirm archive | evidenceId, onConfirm | isProcessing |

### Report Components

| Component | Purpose | Props | State |
|-----------|---------|-------|-------|
| ReportCard | Single report preview | report, onClick | hover |
| ReportViewer | Full report display | reportId | loading, report |
| ReportExport | Export options | reportId, onExport | format, isExporting |
| ReportGeneratorDialog | Generate report | evidenceId/caseId, onGenerate | type, options |
| ReportTemplate | Report format layout | report, template | - |

### Shared Components (Reusable)

| Component | Purpose |
|-----------|---------|
| Dialog | Modal dialog wrapper |
| Modal | Full-screen overlay |
| LoadingState | Loading spinner |
| EmptyState | No data view |
| ErrorState | Error display |
| SkeletonLoader | Content placeholder |
| Badge | Status/tag badge |
| Avatar | User profile pic |
| Tooltip | Info tooltip |
| ContextMenu | Right-click menu |
| Pagination | Page numbers |
| Tabs | Tab navigation |
| Dropdown | Select menu |
| Button | Various button types |

---

## 6. FUTURE COMPATIBILITY

### Enterprise Features (Ready to Extend)

```typescript
// Organization-level features already in schema
Organization
├── Multiple teams
├── Department structure
├── SSO enabled
├── Centralized billing
├── API keys per org
└── Organization-level cases

// Collaboration (schema ready)
CaseMember roles:
├── OWNER (full access, manage members)
├── EDITOR (modify case, add evidence)
├── VIEWER (read-only)
└── GUEST (limited access, expiring)

// Audit & Compliance (ActivityLog ready)
ActivityLog captures:
├── All user actions
├── IP address & device info
├── Timestamps
└── Action details (JSON)
```

### Universities & Academia

```typescript
// Department support
Department
├── Name
├── Organization
└── Members

// Academic use cases
Case.category includes:
├── ACADEMIC
├── RESEARCH
└── Future: COURSE, PROJECT

// Batch operations
└── Bulk analyze, bulk export
```

### Marketplace & Integrations (Future)

```typescript
// API Keys (schema ready)
APIKey
├── Rate limiting
├── Prefix-based identification
├── Usage tracking
└── Access control

// Ready for webhooks
└── Event-driven architecture
└── Real-time updates
└── Third-party integrations
```

### AI Assistant (Future Phase 7)

```typescript
// Evidence analysis automation
├── Auto-classify evidence type
├── Suggest tags
├── Recommend related cases
├── Generate initial report

// Natural language queries
├── Search across cases
├── Query evidence metadata
├── Generate reports from prompts
└── Assistant conversation history (new table)
```

### Mobile & Offline (Future)

```typescript
// Schema supports:
├── Evidence versioning (offline drafts)
├── Metadata JSON (flexible schema)
├── Hash-based conflict resolution
└── Sync-on-demand architecture
```

---

## 7. TESTING CHECKLIST

### Unit Tests

```typescript
// Cases Service
├── createCase (valid input)
├── createCase (missing fields)
├── updateCase (permissions check)
├── deleteCase (cascade check)
├── getCaseWithMembers
└── calculateCaseStats

// Evidence Service
├── uploadEvidence (valid file)
├── uploadEvidence (size limit)
├── uploadEvidence (virus scan)
├── updateEvidenceMetadata
├── calculateFileHash
├── deleteBulkEvidence
└── searchEvidence (filters)

// Reports Service
├── generateReport (valid data)
├── exportReportPDF
├── exportReportDOCX
├── calculateVerityScore
└── validateFindings

// Utilities
├── formatFileSize
├── formatDate
├── validateEmail
├── checkPermission (RBAC)
├── filterByQuery
└── sortByField
```

### Integration Tests

```typescript
// Case Workflows
├── Create case → Add evidence → Generate report
├── Update case status → Trigger activity log
├── Add member → Check permissions → Update evidence
├── Create case → Archive → Verify soft delete
└── Bulk operations (select multiple → perform action)

// Evidence Workflows
├── Upload file → Virus scan → Store → Calculate hash
├── Tag evidence → Search by tag → Filter results
├── Move evidence to case → Update caseId → Reflect in UI
├── Create version → Update metadata → Show history
└── Analyze evidence → Generate report → Link both

// Permission Workflows
├── Owner actions allowed
├── Editor can modify
├── Viewer can only read
├── Guest with expiration
└── Cross-organization isolation

// Real-time Workflows
├── Update case status → Other users see update
├── Add comment → Notify collaborators
├── Upload evidence → Activity feed updates
└── Generate report → Widget refreshes
```

### Performance Tests

```typescript
// Virtualization
├── Load 10,000 evidence items
├── Scroll 1000+ comments
├── Filter 5000+ cases
└── Search 10,000 reports

// API Response Times
├── Case list < 200ms
├── Evidence search < 300ms
├── Dashboard stats < 500ms
├── Report export < 2s
└── Batch operations < 5s

// Memory Usage
├── Dashboard widgets < 50MB
├── Evidence grid < 100MB
├── Case detail page < 30MB
└── No memory leaks after 1000 actions

// Bundle Size
├── Main bundle < 500KB
├── Cases module < 200KB
├── Evidence module < 250KB
├── Reports module < 150KB
```

### Accessibility Tests

```
// Keyboard Navigation
├── Tab through all buttons
├── Enter/Space to activate
├── Arrow keys for lists
├── Escape to close dialogs
├── Shortcuts (Cmd+K search, etc)

// Screen Readers
├── All images have alt text
├── Form labels associated
├── ARIA attributes correct
├── Semantic HTML used
├── Focus management

// Visual
├── 4.5:1 contrast ratio text
├── 3:1 contrast ratio graphics
├── No color-only indicators
├── Large touch targets (48px)
└── High contrast mode support
```

### Security Tests

```
// Data Access
├── User can only see their data
├── Organization isolation
├── Case member permissions enforced
├── API keys validated
└── XSS prevention (sanitize input)

// File Upload
├── File type validation
├── File size limits
├── Virus scan integration
├── Malicious content check
└── Secure storage (encrypted)

// API Security
├── Rate limiting
├── CSRF token validation
├── SQL injection prevention
├── JWT token validation
├── HTTPS only
```

### Responsive Design

```
// Breakpoints
├── Mobile (375px)
├── Tablet (768px)
├── Laptop (1024px)
├── Desktop (1440px)
└── Ultra-wide (1920px+)

// Components
├── Dashboard grid responsive
├── Case cards reflow
├── Evidence grid adapts
├── Sidebar collapsible
├── Modals mobile-friendly
├── Tables scrollable mobile
└── Navigation responsive

// Interactions
├── Touch-friendly buttons
├── Swipe navigation (future)
├── Mobile-optimized dialogs
└── Readable text on all sizes
```

### Empty States

```
// Dashboard
├── No cases: Show create button
├── No evidence: Show upload guide
├── No reports: Show generate guide
└── First login: Show onboarding

// Cases
├── No cases: "Create your first case"
├── No members: "You're the only member"
├── No evidence: "Add evidence to this case"
└── No comments: "Start a discussion"

// Evidence
├── No evidence: "Upload files to get started"
├── No tags: "Add tags for organization"
├── No results: "No evidence matches filters"
└── Loading: Show skeleton

// Edge Cases
├── 404 errors (page not found)
├── 403 errors (unauthorized)
├── Network offline
├── Slow connection (show progress)
└── Large file uploads (chunked)
```

---

## 8. IMPLEMENTATION PRIORITIES

### Phase 4 (Weeks 1-2)
1. Create dashboard layout & widgets
2. Dashboard data APIs
3. Recent activity stream
4. Welcome onboarding

### Phase 5 (Weeks 2-3)
1. Evidence vault layout
2. Upload functionality
3. Search & filters
4. Evidence detail view

### Phase 6 (Weeks 3-4)
1. Case management UI
2. Case detail layout
3. Case activity tracking
4. Notes & comments

### Weeks 4-5
1. Reports integration
2. Export functionality
3. Storage dashboard
4. Permissions/RBAC

### Weeks 5-6
1. Real-time updates (WebSocket)
2. Optimistic UI
3. Performance optimization
4. Testing

### Weeks 6-8
1. Accessibility audit
2. Mobile responsiveness
3. Documentation
4. Launch preparation

---

## 9. ABSOLUTE RULES (NON-NEGOTIABLE)

✅ **DO:**
- Extend Milestone 1 architecture
- Use existing Prisma models
- Reuse design system (Tailwind, colors, typography)
- Build modular, reusable components
- Follow existing code patterns
- Implement proper error handling
- Add loading states
- Support all screen sizes
- Use TypeScript
- Document with JSDoc

❌ **DON'T:**
- Modify User, Account, Session, Credit models
- Redesign authentication flows
- Change database structure (only add)
- Remove existing features
- Break existing routing
- Create monolithic components
- Ignore accessibility
- Build for single screen size
- Use any non-approved libraries
- Hardcode values

---

## 10. SUCCESS CRITERIA

At completion, Veridex should:

✅ Feel like **Linear** (minimalist, professional) + **Notion** (flexible, modular) + **GitHub** (powerful, organized) + **Cursor** (intuitive, fast)

✅ Support **10,000+** users simultaneously

✅ Handle **millions** of evidence records

✅ Provide **sub-200ms** response times

✅ Work on **any** device (desktop, tablet, mobile)

✅ Be **fully accessible** (WCAG 2.1 AA)

✅ Require **zero training** (intuitive UX)

✅ Integrate **seamlessly** with future features

✅ Generate **audit trails** for compliance

✅ Enable **team collaboration** (future)

✅ Support **enterprise** deployment
