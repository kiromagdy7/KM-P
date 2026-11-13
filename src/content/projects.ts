// Project data. Screenshots live in public/images/work/<slug>/<file>.webp.
// After adding or replacing a screenshot, run `npm run images`.

export type ProjectKind = "client" | "product" | "personal";

export interface Shot {
  /** File name without extension, inside public/images/work/<slug>/ */
  file: string;
  title: string;
  /** Id of one of the project's `groups` */
  group: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  kind: ProjectKind;
  status: string;
  platform: string;
  duration: string | null;
  year: number;
  /** One or two lines for cards and search results */
  summary: string;
  /** Plain-language description of what the project does */
  intro: string;
  /** Optional denser description for technical readers */
  technical: string | null;
  note: string | null;
  facts: { value: string; label: string }[];
  /** Short list shown on cards */
  stack: string[];
  /** Full list shown on the project page */
  tech: string[];
  liveUrl: string | null;
  highlightsHeading: string;
  highlights: { title: string; body: string }[];
  specs: { title: string; items: string[] }[];
  groups: { id: string; label: string }[];
  shots: Shot[];
  /** `file` of the shot used as the cover; keep in sync with covers.json */
  cover: string;
  /** Which edge to keep when a screenshot is cropped to fit a card: "left" suits apps with a sidebar, "center" suits websites */
  coverPosition: "left" | "center";
  seoDescription: string;
  keywords: string[];
  created: string;
  schemaType: "SoftwareApplication" | "CreativeWork";
  appCategory: string | null;
  os: string | null;
}

export const projects: Project[] = [
  {
    "slug": "jewelry-system",
    "title": "Jewelry System",
    "tagline": "ERP for jewelry shops and gold workshops",
    "category": "ERP and Financial",
    "kind": "client",
    "status": "In production",
    "platform": "Web application",
    "duration": "Over a year",
    "year": 2025,
    "summary": "ERP for jewelry shops: weight-based pricing, stock in grams across branches, supplier accounts in money and metal, Arabic invoices.",
    "intro": "A management system for jewelry shops and gold workshops that run more than one branch. It prices every piece from its weight and the current metal rate, tracks stock in grams across branches and safes, keeps each supplier account in both money and metal, and prints Arabic invoices and barcode labels. I designed, built and deployed it for a client, and it runs daily operations across their four branches.",
    "technical": "An enterprise-grade ERP built with .NET 10 and ASP.NET Core MVC, purpose-built for jewelry manufacturers and precious metal retail chains. Features a DynamicExpresso runtime pricing formula engine, dual-currency supplier accounting (EGP + grams), multi-branch weight-based stock control, QuestPDF Arabic RTL invoice generation, custom RFC 6238 TOTP 2FA, and 130+ granular permissions.",
    "note": "Built for a client under NDA, so the source code and the live system are private. The screenshots use demo data.",
    "facts": [
      { "value": "4", "label": "branches using it daily" },
      { "value": "59", "label": "screens" },
      { "value": "130+", "label": "separate permissions" },
      { "value": "66", "label": "database tables" }
    ],
    "stack": [
      "ASP.NET Core",
      "C#",
      "SQL Server",
      "QuestPDF"
    ],
    "tech": [
      "ASP.NET Core (.NET 10)",
      "C#",
      "Entity Framework Core 10",
      "SQL Server (66 DbSets)",
      "DynamicExpresso Formula Engine",
      "QuestPDF (Arabic RTL)",
      "Custom TOTP 2FA"
    ],
    "liveUrl": null,
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Dynamic Formula Pricing Engine",
        "body": "Runtime mathematical evaluation engine powered by DynamicExpresso.Core to calculate fluctuating karat spot rates. Resolves dynamic variables (WEIGHT, ItemPriceEx, OldFees, MAT[id].Price, TAX.Formula) with custom regex pattern matching."
      },
      {
        "title": "Dual-Currency Supplier Accounting",
        "body": "Specialized double-entry ledger system (SupplierAccountLedger) simultaneously tracking financial obligations in Egyptian Pounds alongside raw metal weight in grams, featuring SupplierTransfer cross-material conversions."
      },
      {
        "title": "Multi-Location Stock & 13 Tx Types",
        "body": "Granular stock tracking across branches and safe vaults, managing quantities and decimal gram weights. Enforces 13 distinct transaction types (SALE, PURCHASE, KASR_MERGE, TRANSFER) with fast tray barcode auditing."
      },
      {
        "title": "QuestPDF Arabic RTL Invoices & Labels",
        "body": "Vector PDF pipeline via QuestPDF 2026 with native Arabic RTL text layout, A4/A5 formats, dynamic social QR codes, ClosedXML Excel analytics, and 2-up dual-column CSV exports for BarTender jewelry string tags."
      },
      {
        "title": "Custom RFC 6238 TOTP 2FA & RBAC",
        "body": "Bespoke Two-Factor Authentication built from scratch following RFC 6238 (HMAC-SHA1, Base32 decoding, ±1 window) for Google Authenticator, coupled with 130+ seeded granular permissions enforced via [RequirePermission] and tag helpers."
      },
      {
        "title": "EF Core Interceptor Auditing & SignalR",
        "body": "AuditSaveChangesInterceptor capturing field-level changes with a 15-second merge window to coalesce rapid edits and mask sensitive credentials, alongside real-time user notifications powered by SignalR NotificationHub."
      }
    ],
    "specs": [
      {
        "title": "Backend and Architecture",
        "items": [
          ".NET 10.0 & ASP.NET Core MVC",
          "60 Controllers & 26+ Service Layers",
          "350 C# Files (~1.85 MB)",
          "DynamicExpresso Mathematical Engine"
        ]
      },
      {
        "title": "Data and Persistence",
        "items": [
          "SQL Server & EF Core 10.0.6",
          "68 Entity Models & 66 DbSets",
          "Fluent API (AppDbContext)",
          "AuditSaveChangesInterceptor"
        ]
      },
      {
        "title": "Documents and Hardware",
        "items": [
          "QuestPDF 2026.5",
          "ClosedXML 0.105",
          "ZXing.Net & QRCoder",
          "CSV Industrial Label Exporter"
        ]
      },
      {
        "title": "Security and Real-Time",
        "items": [
          "Custom RFC 6238 TOTP (Google Auth)",
          "130+ Granular Permissions RBAC",
          "Cookie Auth & Session",
          "SignalR NotificationHub"
        ]
      }
    ],
    "groups": [
      {
        "id": "pos",
        "label": "POS and Invoices"
      },
      {
        "id": "accounting",
        "label": "Accounting and Safes"
      },
      {
        "id": "inventory",
        "label": "Inventory and Stock"
      },
      {
        "id": "users",
        "label": "Users and Roles"
      },
      {
        "id": "admin",
        "label": "Admin and Logs"
      }
    ],
    "shots": [
      {
        "file": "activity-logs",
        "title": "Activity Logs",
        "group": "admin",
        "alt": "Jewelry System: Activity Logs screen"
      },
      {
        "file": "barcode-generator",
        "title": "Barcode Generator",
        "group": "inventory",
        "alt": "Jewelry System: Barcode Generator screen"
      },
      {
        "file": "business-location",
        "title": "Business Location",
        "group": "admin",
        "alt": "Jewelry System: Business Location screen"
      },
      {
        "file": "calendar",
        "title": "Calendar",
        "group": "admin",
        "alt": "Jewelry System: Calendar screen"
      },
      {
        "file": "checker-review",
        "title": "Checker Review",
        "group": "inventory",
        "alt": "Jewelry System: Checker Review screen"
      },
      {
        "file": "coupons-create",
        "title": "Coupons Create",
        "group": "accounting",
        "alt": "Jewelry System: Coupons Create screen"
      },
      {
        "file": "create-customer",
        "title": "Create Customer",
        "group": "users",
        "alt": "Jewelry System: Create Customer screen"
      },
      {
        "file": "create-new-user",
        "title": "Create New User",
        "group": "users",
        "alt": "Jewelry System: Create New User screen"
      },
      {
        "file": "create-safes",
        "title": "Create Safes",
        "group": "accounting",
        "alt": "Jewelry System: Create Safes screen"
      },
      {
        "file": "customer-classifications",
        "title": "Customer Classifications",
        "group": "users",
        "alt": "Jewelry System: Customer Classifications screen"
      },
      {
        "file": "customers-pos",
        "title": "Customers POS",
        "group": "pos",
        "alt": "Jewelry System: Customers POS screen"
      },
      {
        "file": "customers",
        "title": "Customers",
        "group": "users",
        "alt": "Jewelry System: Customers screen"
      },
      {
        "file": "edit-system-config",
        "title": "Edit System Config",
        "group": "admin",
        "alt": "Jewelry System: Edit System Config screen"
      },
      {
        "file": "expenses-payments",
        "title": "Expenses Payments",
        "group": "pos",
        "alt": "Jewelry System: Expenses Payments screen"
      },
      {
        "file": "export-labels-data",
        "title": "Export Labels Data",
        "group": "inventory",
        "alt": "Jewelry System: Export Labels Data screen"
      },
      {
        "file": "fast-stock-checker",
        "title": "Fast Stock Checker",
        "group": "inventory",
        "alt": "Jewelry System: Fast Stock Checker screen"
      },
      {
        "file": "home-page",
        "title": "Home Page",
        "group": "admin",
        "alt": "Jewelry System: Home Page screen"
      },
      {
        "file": "invoice-details",
        "title": "Invoice Details",
        "group": "pos",
        "alt": "Jewelry System: Invoice Details screen"
      },
      {
        "file": "invoice-pdf",
        "title": "Invoice PDF",
        "group": "pos",
        "alt": "Jewelry System: Invoice PDF screen"
      },
      {
        "file": "invoices-list",
        "title": "Invoices List",
        "group": "pos",
        "alt": "Jewelry System: Invoices List screen"
      },
      {
        "file": "login-log",
        "title": "Login Log",
        "group": "admin",
        "alt": "Jewelry System: Login Log screen"
      },
      {
        "file": "manual-add-to-stock",
        "title": "Manual Add to Stock",
        "group": "inventory",
        "alt": "Jewelry System: Manual Add to Stock screen"
      },
      {
        "file": "material-balance-analysis",
        "title": "Material Balance Analysis",
        "group": "admin",
        "alt": "Jewelry System: Material Balance Analysis screen"
      },
      {
        "file": "notifications",
        "title": "Notifications",
        "group": "admin",
        "alt": "Jewelry System: Notifications screen"
      },
      {
        "file": "payments-details",
        "title": "Payments Details",
        "group": "accounting",
        "alt": "Jewelry System: Payments Details screen"
      },
      {
        "file": "payments-list",
        "title": "Payments List",
        "group": "accounting",
        "alt": "Jewelry System: Payments List screen"
      },
      {
        "file": "print-invoices-modal",
        "title": "Print invoices Modal",
        "group": "pos",
        "alt": "Jewelry System: Print invoices Modal screen"
      },
      {
        "file": "products-price-functions",
        "title": "Products Price Functions",
        "group": "inventory",
        "alt": "Jewelry System: Products Price Functions screen"
      },
      {
        "file": "products",
        "title": "Products",
        "group": "inventory",
        "alt": "Jewelry System: Products screen"
      },
      {
        "file": "profit-sales-reports",
        "title": "Profit Sales Reports",
        "group": "admin",
        "alt": "Jewelry System: Profit Sales Reports screen"
      },
      {
        "file": "quick-calculator",
        "title": "Quick Calculator",
        "group": "admin",
        "alt": "Jewelry System: Quick Calculator screen"
      },
      {
        "file": "quick-prices-edit",
        "title": "Quick Prices Edit",
        "group": "inventory",
        "alt": "Jewelry System: Quick Prices Edit screen"
      },
      {
        "file": "raw-material-price-reports",
        "title": "RawMaterial Price Reports",
        "group": "inventory",
        "alt": "Jewelry System: RawMaterial Price Reports screen"
      },
      {
        "file": "raw-materials",
        "title": "RawMaterials",
        "group": "inventory",
        "alt": "Jewelry System: RawMaterials screen"
      },
      {
        "file": "recycle-bin",
        "title": "RecycleBin",
        "group": "admin",
        "alt": "Jewelry System: RecycleBin screen"
      },
      {
        "file": "refund-invoice",
        "title": "Refund Invoice",
        "group": "pos",
        "alt": "Jewelry System: Refund Invoice screen"
      },
      {
        "file": "roles-list",
        "title": "Roles List",
        "group": "users",
        "alt": "Jewelry System: Roles List screen"
      },
      {
        "file": "roles-management",
        "title": "Roles Management",
        "group": "users",
        "alt": "Jewelry System: Roles Management screen"
      },
      {
        "file": "safe-balance-analysis",
        "title": "Safe Balance Analysis",
        "group": "accounting",
        "alt": "Jewelry System: Safe Balance Analysis screen"
      },
      {
        "file": "safes-transactions",
        "title": "Safes Transactions",
        "group": "accounting",
        "alt": "Jewelry System: Safes Transactions screen"
      },
      {
        "file": "split-pending-weight",
        "title": "Split Pending Weight",
        "group": "inventory",
        "alt": "Jewelry System: Split Pending Weight screen"
      },
      {
        "file": "stock-check-history",
        "title": "Stock Check History",
        "group": "inventory",
        "alt": "Jewelry System: Stock Check History screen"
      },
      {
        "file": "stock-history-detail",
        "title": "Stock History Detail",
        "group": "inventory",
        "alt": "Jewelry System: Stock History Detail screen"
      },
      {
        "file": "stock-history",
        "title": "Stock History",
        "group": "inventory",
        "alt": "Jewelry System: Stock History screen"
      },
      {
        "file": "stock-list",
        "title": "Stock List",
        "group": "inventory",
        "alt": "Jewelry System: Stock List screen"
      },
      {
        "file": "stock-transfer",
        "title": "Stock Transfer",
        "group": "inventory",
        "alt": "Jewelry System: Stock Transfer screen"
      },
      {
        "file": "supplier-balances",
        "title": "Supplier Balances",
        "group": "accounting",
        "alt": "Jewelry System: Supplier Balances screen"
      },
      {
        "file": "supplier-details",
        "title": "Supplier Details",
        "group": "users",
        "alt": "Jewelry System: Supplier Details screen"
      },
      {
        "file": "supplier-reports",
        "title": "Supplier Reports",
        "group": "users",
        "alt": "Jewelry System: Supplier Reports screen"
      },
      {
        "file": "supplier-payment",
        "title": "SupplierPayment",
        "group": "users",
        "alt": "Jewelry System: SupplierPayment screen"
      },
      {
        "file": "suppliers-pos",
        "title": "Suppliers POS",
        "group": "pos",
        "alt": "Jewelry System: Suppliers POS screen"
      },
      {
        "file": "suppliers",
        "title": "Suppliers",
        "group": "users",
        "alt": "Jewelry System: Suppliers screen"
      },
      {
        "file": "suppliers-accounting",
        "title": "SuppliersAccounting",
        "group": "accounting",
        "alt": "Jewelry System: SuppliersAccounting screen"
      },
      {
        "file": "system-config",
        "title": "System Config",
        "group": "admin",
        "alt": "Jewelry System: System Config screen"
      },
      {
        "file": "system-setting",
        "title": "System Setting",
        "group": "admin",
        "alt": "Jewelry System: System Setting screen"
      },
      {
        "file": "today-balances",
        "title": "Today Balances",
        "group": "accounting",
        "alt": "Jewelry System: Today Balances screen"
      },
      {
        "file": "transfer-balances-between-suppliers",
        "title": "Transfer Balances Between Suppliers",
        "group": "accounting",
        "alt": "Jewelry System: Transfer Balances Between Suppliers screen"
      },
      {
        "file": "user-details",
        "title": "User Details",
        "group": "users",
        "alt": "Jewelry System: User Details screen"
      },
      {
        "file": "user-reports",
        "title": "User Reports",
        "group": "users",
        "alt": "Jewelry System: User Reports screen"
      }
    ],
    "cover": "home-page",
    "coverPosition": "left",
    "seoDescription": "Jewelry System is an enterprise .NET 10 ERP for jewelers with dynamic formula pricing, dual-currency accounting and QuestPDF invoices.",
    "keywords": [
      "Jewelry System",
      "ERP",
      "Precious Metals",
      "Jewelry ERP",
      "ASP.NET Core MVC",
      ".NET 10",
      "Entity Framework Core",
      "Dual-Currency Ledger",
      "DynamicExpresso",
      "QuestPDF",
      "Custom TOTP 2FA",
      "SQL Server"
    ],
    "created": "2025-05-15",
    "schemaType": "SoftwareApplication",
    "appCategory": "BusinessApplication",
    "os": "Web Browser"
  },
  {
    "slug": "kmz-hub",
    "title": "KMZ Hub",
    "tagline": "Management software for PlayStation centers",
    "category": "Gaming Center and POS",
    "kind": "product",
    "status": "In production",
    "platform": "Windows desktop",
    "duration": "2 months",
    "year": 2025,
    "summary": "Desktop software that runs a PlayStation center: room timers, cafeteria sales, thermal receipts and shift cash counts, fully offline.",
    "intro": "A Windows desktop program that runs a PlayStation center from one screen. Staff start and stop room timers at different hourly rates, add drinks and snacks to the same bill, print thermal receipts, and close each shift with a cash count. Everything is stored on the machine itself, so the center keeps working when the internet goes down.",
    "technical": "An offline-first Windows desktop platform (.NET 10 MAUI Blazor Hybrid) purpose-built for PlayStation gaming centers and cafes. Operates with local SQLite storage across 16 DbSets, concurrent multi-rate session stopwatches with quarter-hour rounding algorithms, cafeteria POS with live inventory tracking, shift drawer audit controls, direct receipt printing via dedicated STA threads, and PBKDF2 password security.",
    "note": "KMZ Hub is my own product, in daily use at two PlayStation centers. The source code is private.",
    "facts": [
      { "value": "2", "label": "centers using it" },
      { "value": "31", "label": "screens" },
      { "value": "16", "label": "database tables" },
      { "value": "100%", "label": "offline" }
    ],
    "stack": [
      ".NET MAUI",
      "Blazor Hybrid",
      "C#",
      "SQLite"
    ],
    "tech": [
      ".NET 10.0",
      ".NET MAUI Blazor Hybrid",
      "C#",
      "SQLite",
      "EF Core 10.0.3",
      "POS & Shift Control"
    ],
    "liveUrl": null,
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Multi-Rate Session Timers & Quarter-Hour Calculator",
        "body": "Independent precision stopwatches per PlayStation device, supporting dynamic Single and Multiplayer rate transitions in real-time. Employs a specialized mathematical rounding algorithm: first 15 minutes free, followed by 15-minute segments (<10 mins rounds down, ≥10 mins rounds up to next quarter-hour)."
      },
      {
        "title": "Direct 80mm ESC/POS Thermal Printing (STA Thread)",
        "body": "Low-level receipt rendering pipeline utilizing System.Drawing.Printing.PrintDocument. Generates itemized receipt layouts (shop header, logo, session duration breakdown, cafeteria orders, and cashier signature) directed to default 80mm printers on an isolated STA thread to prevent UI freezing."
      },
      {
        "title": "Offline-First Local SQLite Architecture (16 DbSets)",
        "body": "Self-contained local desktop data layer stored at %LocalAppData%\\KMZ_Hub_app.db. Managed by Entity Framework Core 10.0.3 across 16 relational DbSets, coupled with an automated DatabaseInitializerService that auto-creates the schema, applies migrations, and seeds default administrators on first launch."
      },
      {
        "title": "Integrated Cafeteria POS & Stock Control",
        "body": "Dual-mode point-of-sale terminal supporting direct walk-in sales (DirectSales) and open session billing (SessionProducts). Features real-time stock deduction, product cost analysis, margin tracking, and low-stock replenishment threshold warnings."
      },
      {
        "title": "Shift Control & Mandatory Cash Reconciliation",
        "body": "Strict financial shift auditing with opening balance logging, live transaction tracking (income and expenses), and mandatory end-of-shift cash drawer reconciliation comparing actual cash against software totals before cashier sign-off."
      },
      {
        "title": "PBKDF2 Cryptography & Soft-Delete Recycle Bin",
        "body": "Enterprise-grade user authentication leveraging Microsoft KeyDerivation PBKDF2 with HMAC-SHA256 (10,000 iterations, 16-byte random salt). Features non-destructive soft-delete data protection (IsDeleted = true) paired with a RecycleBin.razor recovery console."
      }
    ],
    "specs": [
      {
        "title": "Desktop and UI Engine",
        "items": [
          ".NET 10.0 Windows (WinExe)",
          ".NET MAUI Blazor Hybrid",
          "Razor Components",
          "Custom Dialog & Toast Services"
        ]
      },
      {
        "title": "Database and Storage",
        "items": [
          "SQLite Offline-First",
          "Entity Framework Core 10.0.3",
          "16 Relational Entity Tables (DbSets)",
          "DatabaseInitializerService Auto-Seed"
        ]
      },
      {
        "title": "Hardware and POS Printing",
        "items": [
          "80mm ESC/POS Thermal Receipt Printing",
          "System.Drawing.Printing.PrintDocument",
          "Dedicated STA Thread Execution",
          "Direct Sales & Session Billing"
        ]
      },
      {
        "title": "Security and Governance",
        "items": [
          "PBKDF2 HMAC-SHA256 (10k Iterations)",
          "16-Byte Cryptographic Salt",
          "Cash Drawer Shift Audits & Handovers",
          "Soft-Delete & RecycleBin.razor"
        ]
      }
    ],
    "groups": [
      {
        "id": "sessions",
        "label": "Rooms and sessions"
      },
      {
        "id": "pos",
        "label": "Cafeteria sales"
      },
      {
        "id": "inventory",
        "label": "Products"
      },
      {
        "id": "shifts",
        "label": "Shifts and reports"
      },
      {
        "id": "admin",
        "label": "Users and settings"
      }
    ],
    "shots": [
      {
        "file": "login",
        "title": "Login Page",
        "group": "admin",
        "alt": "KMZ Hub: Login Page screen"
      },
      {
        "file": "home",
        "title": "Home Dashboard",
        "group": "admin",
        "alt": "KMZ Hub: Home Dashboard screen"
      },
      {
        "file": "users-list",
        "title": "Users List",
        "group": "admin",
        "alt": "KMZ Hub: Users List screen"
      },
      {
        "file": "user-details",
        "title": "User Details",
        "group": "admin",
        "alt": "KMZ Hub: User Details screen"
      },
      {
        "file": "customers-list",
        "title": "Customers List",
        "group": "admin",
        "alt": "KMZ Hub: Customers List screen"
      },
      {
        "file": "customer-details",
        "title": "Customer Details",
        "group": "admin",
        "alt": "KMZ Hub: Customer Details screen"
      },
      {
        "file": "products-list",
        "title": "Products List",
        "group": "inventory",
        "alt": "KMZ Hub: Products List screen"
      },
      {
        "file": "create-product",
        "title": "Create Product",
        "group": "inventory",
        "alt": "KMZ Hub: Create Product screen"
      },
      {
        "file": "rooms-list",
        "title": "Rooms List",
        "group": "sessions",
        "alt": "KMZ Hub: Rooms List screen"
      },
      {
        "file": "room-details",
        "title": "Room Details",
        "group": "sessions",
        "alt": "KMZ Hub: Room Details screen"
      },
      {
        "file": "create-room",
        "title": "Create Room",
        "group": "sessions",
        "alt": "KMZ Hub: Create Room screen"
      },
      {
        "file": "sessions-list",
        "title": "Sessions List",
        "group": "sessions",
        "alt": "KMZ Hub: Sessions List screen"
      },
      {
        "file": "start-session",
        "title": "Start Session",
        "group": "sessions",
        "alt": "KMZ Hub: Start Session screen"
      },
      {
        "file": "session-details-1",
        "title": "Session Details 1",
        "group": "sessions",
        "alt": "KMZ Hub: Session Details 1 screen"
      },
      {
        "file": "session-details-2",
        "title": "Session Details 2",
        "group": "sessions",
        "alt": "KMZ Hub: Session Details 2 screen"
      },
      {
        "file": "session-receipt",
        "title": "Session Receipt",
        "group": "sessions",
        "alt": "KMZ Hub: Session Receipt screen"
      },
      {
        "file": "closed-session",
        "title": "Closed Session",
        "group": "sessions",
        "alt": "KMZ Hub: Closed Session screen"
      },
      {
        "file": "pos-1",
        "title": "POS 1",
        "group": "pos",
        "alt": "KMZ Hub: POS 1 screen"
      },
      {
        "file": "pos-2",
        "title": "POS 2",
        "group": "pos",
        "alt": "KMZ Hub: POS 2 screen"
      },
      {
        "file": "pos-details",
        "title": "POS Details",
        "group": "pos",
        "alt": "KMZ Hub: POS Details screen"
      },
      {
        "file": "pos-receipt",
        "title": "POS Receipt",
        "group": "pos",
        "alt": "KMZ Hub: POS Receipt screen"
      },
      {
        "file": "shift-control",
        "title": "Shift Control",
        "group": "shifts",
        "alt": "KMZ Hub: Shift Control screen"
      },
      {
        "file": "open-shift",
        "title": "Open Shift",
        "group": "shifts",
        "alt": "KMZ Hub: Open Shift screen"
      },
      {
        "file": "close-shift-review",
        "title": "Close Shift Review",
        "group": "shifts",
        "alt": "KMZ Hub: Close Shift Review screen"
      },
      {
        "file": "shift-report",
        "title": "Shift Report",
        "group": "shifts",
        "alt": "KMZ Hub: Shift Report screen"
      },
      {
        "file": "general-reports",
        "title": "General Reports",
        "group": "shifts",
        "alt": "KMZ Hub: General Reports screen"
      },
      {
        "file": "general-reports-pdf",
        "title": "General Reports PDF",
        "group": "shifts",
        "alt": "KMZ Hub: General Reports PDF screen"
      },
      {
        "file": "shifts-report",
        "title": "Shifts Report",
        "group": "shifts",
        "alt": "KMZ Hub: Shifts Report screen"
      },
      {
        "file": "devices",
        "title": "Devices",
        "group": "sessions",
        "alt": "KMZ Hub: Devices screen"
      },
      {
        "file": "printing-settings",
        "title": "Printing Settings",
        "group": "admin",
        "alt": "KMZ Hub: Printing Settings screen"
      },
      {
        "file": "recycle-bin",
        "title": "Recycle Bin",
        "group": "admin",
        "alt": "KMZ Hub: Recycle Bin screen"
      }
    ],
    "cover": "sessions-list",
    "coverPosition": "left",
    "seoDescription": "KMZ Hub is an offline-first Windows desktop app (.NET 10 MAUI Blazor Hybrid) for PlayStation centers with multi-rate timers, POS and thermal printing.",
    "keywords": [
      ".NET 10",
      ".NET MAUI",
      "Blazor Hybrid",
      "Windows Desktop",
      "SQLite",
      "EF Core 10",
      "POS",
      "Thermal Printing",
      "Gaming Hub",
      "PBKDF2"
    ],
    "created": "2025-06-01",
    "schemaType": "SoftwareApplication",
    "appCategory": "BusinessApplication",
    "os": "Windows 10, Windows 11"
  },
  {
    "slug": "physiotherapy",
    "title": "Dr. Michael Nabil Clinic",
    "tagline": "Physiotherapy clinic website",
    "category": "Healthcare and Wellness",
    "kind": "client",
    "status": "Live",
    "platform": "Website",
    "duration": null,
    "year": 2026,
    "summary": "Live clinic website for Dr. Michael Nabil, a physiotherapy and clinical nutrition specialist in Dokki.",
    "intro": "A live website for Dr. Michael Nabil, a physiotherapy and clinical nutrition specialist in Dokki. It brings his two specialties, physical rehabilitation and therapeutic nutrition, into one clear place, so a visitor can understand his approach, see how a treatment plan comes together, and request a consultation in a few taps.",
    "technical": null,
    "note": null,
    "facts": [],
    "stack": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "tech": [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "liveUrl": "https://dr-michaelpt.com/",
    "highlightsHeading": "Built around the patient",
    "highlights": [
      {
        "title": "Two specialties, one clear plan",
        "body": "Physical rehabilitation and clinical nutrition are presented as one connected approach rather than two separate services, so a visitor understands how a real treatment plan for orthopedic, neurological, scoliosis, or sports injury cases comes together with nutrition support."
      },
      {
        "title": "A consultation request that's easy to finish",
        "body": "The intake form only asks for what's actually needed — name and phone, with email optional — and sits alongside direct WhatsApp and phone links, so a patient can reach the clinic in whichever way is easiest for them."
      },
      {
        "title": "Motion that supports the content",
        "body": "Framer Motion adds gentle transitions between sections and small state changes throughout the page, built on top of Next.js for fast loading and Tailwind CSS for a layout that holds up cleanly on every screen size."
      }
    ],
    "specs": [
      {
        "title": "Application",
        "items": [
          "Next.js project architecture",
          "React component-based UI",
          "Production client website"
        ]
      },
      {
        "title": "Interface",
        "items": [
          "Tailwind CSS utility styling",
          "Responsive layouts for every screen size",
          "Clear, readable Arabic typography"
        ]
      },
      {
        "title": "Interaction",
        "items": [
          "Framer Motion transitions",
          "Purposeful scroll and reveal motion",
          "Smooth CTA buttons & touch states"
        ]
      },
      {
        "title": "Patient Journey",
        "items": [
          "Consultation request form",
          "Direct WhatsApp & phone contact",
          "Clinic location & hours",
          "Online follow-up for remote patients"
        ]
      }
    ],
    "groups": [
      {
        "id": "landing",
        "label": "Landing and Profile"
      },
      {
        "id": "services",
        "label": "Specialties and Care"
      },
      {
        "id": "care-flow",
        "label": "Roadmap and Booking"
      }
    ],
    "shots": [
      {
        "file": "hero",
        "title": "Hero Section",
        "group": "landing",
        "alt": "Physiotherapy hero section"
      },
      {
        "file": "about-dr-michael",
        "title": "About Dr. Michael",
        "group": "landing",
        "alt": "About Dr. Michael Nabil profile section"
      },
      {
        "file": "specializations",
        "title": "Dual Specializations",
        "group": "services",
        "alt": "Physiotherapy and clinical nutrition specializations"
      },
      {
        "file": "services",
        "title": "Care Philosophy",
        "group": "services",
        "alt": "Evidence-based care philosophy section"
      },
      {
        "file": "diet",
        "title": "Sustainable Nutrition",
        "group": "services",
        "alt": "Therapeutic nutrition and balanced diet philosophy"
      },
      {
        "file": "online-services",
        "title": "Online Follow-Up & Telehealth",
        "group": "services",
        "alt": "Online consultation and remote care options"
      },
      {
        "file": "care-journey",
        "title": "Care Journey & Roadmap",
        "group": "care-flow",
        "alt": "Step-by-step patient care journey"
      },
      {
        "file": "form",
        "title": "Consultation Request Form",
        "group": "care-flow",
        "alt": "Appointment booking and inquiry form"
      },
      {
        "file": "location",
        "title": "Location & Clinic Hours",
        "group": "care-flow",
        "alt": "Clinic location map and operating hours"
      },
      {
        "file": "footer",
        "title": "Footer & Channels",
        "group": "landing",
        "alt": "Clinic footer and social media links"
      }
    ],
    "cover": "hero",
    "coverPosition": "center",
    "seoDescription": "Live clinic website for Dr. Michael Nabil's physiotherapy and clinical nutrition practice in Dokki, built with Next.js, React and Tailwind CSS.",
    "keywords": [
      "Physiotherapy",
      "Physical Therapy",
      "Clinical Nutrition",
      "Dr. Michael Nabil",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Dokki Clinic",
      "Kirollos Magdy"
    ],
    "created": "2026-09-23",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "tahwega-cafe",
    "title": "Tahwega Cafe",
    "tagline": "Café website",
    "category": "Hospitality and Food Service",
    "kind": "client",
    "status": "Live",
    "platform": "Website",
    "duration": null,
    "year": 2026,
    "summary": "Live website for a café: the menu, the atmosphere, and how to get there.",
    "intro": "A live website for Tahwega, a local café. It is built to feel like walking in: warm, straightforward and easy to enjoy. Visitors move from the opening story to the menu, get a sense of the place through customer quotes, and find the location and contact details without hunting for them.",
    "technical": null,
    "note": null,
    "facts": [],
    "stack": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "tech": [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "liveUrl": "https://cafe-landing.kiromagdy123.workers.dev",
    "highlightsHeading": "Built around the visit",
    "highlights": [
      {
        "title": "A menu that feels easy to order from",
        "body": "Coffee and juice choices are presented in a clear, scannable layout so visitors can decide what they want before they arrive—without turning the site into a cluttered catalogue."
      },
      {
        "title": "Motion with a purpose",
        "body": "Framer Motion adds gentle movement between sections and content states, helping the page feel polished and alive while keeping the focus on the café and its offerings."
      },
      {
        "title": "The essentials are never buried",
        "body": "The location and contact section is part of the main journey, not an afterthought—making it simple for a first-time customer to turn interest into a visit."
      }
    ],
    "specs": [
      {
        "title": "Application",
        "items": [
          "Next.js project architecture",
          "React component-based UI",
          "Production client website"
        ]
      },
      {
        "title": "Interface",
        "items": [
          "Tailwind CSS utility styling",
          "Responsive layouts for every screen size",
          "Coffee and juice menu experience"
        ]
      },
      {
        "title": "Interaction",
        "items": [
          "Framer Motion transitions",
          "Purposeful scroll and reveal motion",
          "Customer-first content flow"
        ]
      },
      {
        "title": "Customer Journey",
        "items": [
          "Clear location and contact details",
          "Mobile-friendly browsing",
          "A direct path from menu to visit"
        ]
      }
    ],
    "groups": [
      {
        "id": "landing",
        "label": "Landing"
      },
      {
        "id": "menu",
        "label": "Menu and Quotes"
      },
      {
        "id": "visit",
        "label": "Location and Contact"
      }
    ],
    "shots": [
      {
        "file": "hero",
        "title": "Hero",
        "group": "landing",
        "alt": "Tahwega Cafe hero section"
      },
      {
        "file": "menu",
        "title": "Menu",
        "group": "menu",
        "alt": "Tahwega Cafe coffee and juice menu"
      },
      {
        "file": "quotes",
        "title": "Customer Quotes",
        "group": "menu",
        "alt": "Tahwega Cafe customer quotes section"
      },
      {
        "file": "location-contact",
        "title": "Location & Contact",
        "group": "visit",
        "alt": "Tahwega Cafe location and contact section"
      },
      {
        "file": "footer",
        "title": "Footer",
        "group": "visit",
        "alt": "Tahwega Cafe footer"
      }
    ],
    "cover": "hero",
    "coverPosition": "center",
    "seoDescription": "Tahwega Cafe is a live cafe website for a real client, presenting its coffee, juices, menu, location, and character in a clear, welcoming experience.",
    "keywords": [
      "Tahwega Cafe",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "cafe website",
      "Kirollos Magdy"
    ],
    "created": "2026-09-14",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "wistore",
    "title": "Wistore",
    "tagline": "Online store builder for local brands",
    "category": "E-Commerce SaaS",
    "kind": "personal",
    "status": "Demo",
    "platform": "Web application",
    "duration": "About 4 months",
    "year": 2026,
    "summary": "A platform where a shop owner signs up, adds products and designs their own online store in a visual builder. Designed and built solo.",
    "intro": "A platform for shop owners who want their own online store without hiring a developer. They sign up, name the store, add products with sizes, colors and offers, then design the store page in a visual builder: pick ready sections, click any text or button to restyle it, check how it looks on a phone, and publish. Each store gets its own address. I designed and built the platform, the builder and the admin side myself.",
    "technical": "A multi-tenant e-commerce SaaS: a .NET 10 Web API in Clean Architecture (API, Application, Domain, Infrastructure) with EF Core 10 on SQL Server, and a Next.js 16 / React 19 front end in TypeScript. The store builder is written from scratch on a single reducer: 7 section types, free-positioned text, buttons, images, shapes and dividers, separate desktop, tablet and mobile versions of every section, 50-step undo, debounced auto-save and a draft/published split with signed preview tokens. The API covers JWT with rotating refresh tokens and reuse detection, Google sign-in, e-mail OTP, 90 rate-limit rules, SignalR notifications, Hangfire-scheduled e-mail campaigns and WebP image conversion to Cloudflare R2.",
    "note": "This build covers accounts, the product catalog, the store builder, the public storefront, notifications and e-mail campaigns, all working end to end. Cart, checkout and online payments are outside its scope. The screenshots use demo products.",
    "facts": [
      { "value": "33", "label": "pages" },
      { "value": "138", "label": "API endpoints" },
      { "value": "36", "label": "database tables" },
      { "value": "7", "label": "ready-made store sections" }
    ],
    "stack": [
      "ASP.NET Core",
      "Next.js",
      "SQL Server",
      "SignalR"
    ],
    "tech": [
      "ASP.NET Core Web API (.NET 10)",
      "C#",
      "Entity Framework Core 10",
      "SQL Server (36 DbSets)",
      "Next.js 16 (App Router)",
      "React 19 & TypeScript",
      "Tailwind CSS 4 & shadcn/ui",
      "Zustand, React Hook Form & Zod",
      "SignalR",
      "Hangfire",
      "Cloudflare R2 & SkiaSharp",
      "Brevo e-mail API",
      "Google OAuth 2.0 & JWT"
    ],
    "liveUrl": null,
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "A visual store builder, written from scratch",
        "body": "The owner builds the store page from 7 ready sections (hero banner, featured products, categories, collection banner, product grid, brands, blank section) and adds text, buttons, images, shapes and dividers on top. Clicking an element opens a formatting toolbar and a properties panel; elements can be dragged and resized with snapping guides. A layers panel lists every section and element. No builder library is used: the whole editor runs on one reducer."
      },
      {
        "title": "Separate phone and tablet layouts, undo and auto-save",
        "body": "Every section keeps its own desktop, tablet and mobile version, so a change made for phones does not break the desktop page. The builder remembers the last 50 steps for undo and redo, saves the draft 1.5 seconds after the last change, and shows the save state in the toolbar."
      },
      {
        "title": "Draft, preview and publish",
        "body": "Edits go to a draft that customers never see. Preview asks the server for a signed token that expires after 15 minutes, so only the owner can open the draft. Publish copies the draft to the live store, and Reset draft goes back to the last published version."
      },
      {
        "title": "A storefront for every store",
        "body": "Each store has its own address, checked against a list of reserved names. The public page is rendered on the server from the published layout and filled with the store's real products, categories and brands. A store with nothing published shows an under-construction page."
      },
      {
        "title": "Products with sizes, colors and stock",
        "body": "A product takes option groups such as Size and Color, and the system generates every combination (4 sizes and 2 colors give 8 variants). Each variant has its own SKU, price, cost, stock, weight and on/off switch, editable in bulk. Products also carry a compare-at price, tags, a rich-text description and a digital-product mode."
      },
      {
        "title": "Offers, custom fields and categories",
        "body": "Two offer types: quantity discounts in tiers (buy 2 for 10% off, buy 4 for 15% off) and bundles (buy 2, get 1 free). Owners define their own product fields in 9 types, from text and numbers to color and yes/no. Categories nest to any depth and can be generated from ready presets matched to the store type."
      },
      {
        "title": "Search preview for every product",
        "body": "Each product has its own link, meta title and meta description, with a preview of how it would appear in Google and a checklist score for title length, description length, link readability and keywords."
      },
      {
        "title": "Sign-up and account security",
        "body": "Sign-up is by a 6-digit e-mail code or a Google account. Sessions use 15-minute access tokens with refresh tokens that rotate on every use and are stored hashed; if an old one is replayed, every session of that account is closed. Five wrong passwords lock the account for 15 minutes. 90 rate-limit rules cover the API, from 2 contact messages per 15 minutes to 120 reads per minute."
      },
      {
        "title": "Live notifications and e-mail campaigns",
        "body": "The platform admin writes a notification or an e-mail campaign, picks the audience (everyone, specific users, a role, a country, a gender or a sign-up date range), sees how many people it reaches, and sends it now or schedules it. Notifications arrive instantly over SignalR. Campaigns go out in batches of 300 with up to 3 retries per recipient, and every e-mail has an unsubscribe link."
      },
      {
        "title": "Images converted and stored in the cloud",
        "body": "Uploaded product photos, logos and builder images are converted to WebP on the server and stored on Cloudflare R2. A product image can also be added from a link."
      }
    ],
    "specs": [
      {
        "title": "Backend and Architecture",
        "items": [
          ".NET 10 Web API, Clean Architecture (4 projects)",
          "19 Controllers & 138 Endpoints",
          "51 FluentValidation Validators",
          "389 C# Files (~17,500 Lines)"
        ]
      },
      {
        "title": "Data and Background Work",
        "items": [
          "SQL Server & EF Core 10 (36 DbSets)",
          "Fluent API Configurations & Soft Delete",
          "Hangfire Recurring Jobs (Every Minute)",
          "SignalR Hub with Auto-Reconnect"
        ]
      },
      {
        "title": "Security",
        "items": [
          "JWT + Rotating Refresh Tokens (SHA-256)",
          "BCrypt Passwords & E-mail OTP Codes",
          "90 Sliding-Window Rate-Limit Rules",
          "AES-Encrypted Provider Keys, CSP Headers"
        ]
      },
      {
        "title": "Frontend and Builder",
        "items": [
          "Next.js 16, React 19 & TypeScript",
          "292 Files (~47,000 Lines), 162 Components",
          "Reducer-Based Builder, 7 Section Types",
          "Light & Dark Themes, Tiptap & Monaco Editors"
        ]
      }
    ],
    "groups": [
      {
        "id": "builder",
        "label": "Store builder"
      },
      {
        "id": "storefront",
        "label": "Storefront"
      },
      {
        "id": "catalog",
        "label": "Products and catalog"
      },
      {
        "id": "dashboard",
        "label": "Dashboard and account"
      },
      {
        "id": "admin",
        "label": "Platform admin"
      },
      {
        "id": "site",
        "label": "Marketing site and sign-in"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Page",
        "group": "site",
        "alt": "Wistore: Home Page screen"
      },
      {
        "file": "builder-text-editing",
        "title": "Builder: Editing Text",
        "group": "builder",
        "alt": "Wistore: store builder with a heading selected, formatting toolbar and properties panel"
      },
      {
        "file": "builder-section-properties",
        "title": "Builder: Section Properties",
        "group": "builder",
        "alt": "Wistore: store builder with a section selected and its size, spacing and background settings"
      },
      {
        "file": "builder-add-sections",
        "title": "Builder: Add a Section",
        "group": "builder",
        "alt": "Wistore: panel of ready-made store sections in the builder"
      },
      {
        "file": "builder-add-elements",
        "title": "Builder: Add an Element",
        "group": "builder",
        "alt": "Wistore: panel of text, button, shape and divider presets in the builder"
      },
      {
        "file": "builder-layers",
        "title": "Builder: Layers",
        "group": "builder",
        "alt": "Wistore: layers panel listing the sections of the store page"
      },
      {
        "file": "builder-mobile-preview",
        "title": "Builder: Mobile Layout",
        "group": "builder",
        "alt": "Wistore: store builder showing the phone layout of the page"
      },
      {
        "file": "storefront",
        "title": "Storefront",
        "group": "storefront",
        "alt": "Wistore: public storefront with hero banner and featured products"
      },
      {
        "file": "storefront-catalog",
        "title": "Storefront: Categories and Products",
        "group": "storefront",
        "alt": "Wistore: storefront categories, collection banner, product grid and brands"
      },
      {
        "file": "products",
        "title": "Products",
        "group": "catalog",
        "alt": "Wistore: Products screen"
      },
      {
        "file": "products-dark",
        "title": "Products (Dark Theme)",
        "group": "catalog",
        "alt": "Wistore: Products screen in the dark theme"
      },
      {
        "file": "product-variants",
        "title": "Product Variants",
        "group": "catalog",
        "alt": "Wistore: product option groups and generated variants"
      },
      {
        "file": "product-offers",
        "title": "Product Offers",
        "group": "catalog",
        "alt": "Wistore: quantity discount tiers on a product"
      },
      {
        "file": "product-seo",
        "title": "Product SEO",
        "group": "catalog",
        "alt": "Wistore: product meta title, description, Google preview and SEO score"
      },
      {
        "file": "product-images",
        "title": "Product Images",
        "group": "catalog",
        "alt": "Wistore: Product Images screen"
      },
      {
        "file": "product-custom-fields",
        "title": "Product Custom Fields",
        "group": "catalog",
        "alt": "Wistore: custom field values on a product"
      },
      {
        "file": "categories",
        "title": "Categories",
        "group": "catalog",
        "alt": "Wistore: nested product categories"
      },
      {
        "file": "brands",
        "title": "Brands",
        "group": "catalog",
        "alt": "Wistore: Brands screen"
      },
      {
        "file": "custom-fields",
        "title": "Custom Fields",
        "group": "catalog",
        "alt": "Wistore: Custom Fields screen"
      },
      {
        "file": "dashboard",
        "title": "Dashboard",
        "group": "dashboard",
        "alt": "Wistore: Dashboard screen"
      },
      {
        "file": "dashboard-dark",
        "title": "Dashboard (Dark Theme)",
        "group": "dashboard",
        "alt": "Wistore: Dashboard screen in the dark theme"
      },
      {
        "file": "website-settings",
        "title": "Website Information",
        "group": "dashboard",
        "alt": "Wistore: website name, link and logo settings"
      },
      {
        "file": "domains",
        "title": "Domains",
        "group": "dashboard",
        "alt": "Wistore: store address settings"
      },
      {
        "file": "profile",
        "title": "Profile",
        "group": "dashboard",
        "alt": "Wistore: Profile screen"
      },
      {
        "file": "security",
        "title": "Security",
        "group": "dashboard",
        "alt": "Wistore: sign-in e-mails and password settings"
      },
      {
        "file": "security-dark",
        "title": "Security (Dark Theme)",
        "group": "dashboard",
        "alt": "Wistore: Security screen in the dark theme"
      },
      {
        "file": "users-management",
        "title": "Users Management",
        "group": "admin",
        "alt": "Wistore: Users Management screen"
      },
      {
        "file": "notification-create",
        "title": "Create a Notification",
        "group": "admin",
        "alt": "Wistore: notification form with audience, schedule and live preview"
      },
      {
        "file": "email-campaign",
        "title": "Create an E-mail Campaign",
        "group": "admin",
        "alt": "Wistore: e-mail campaign form with live preview"
      },
      {
        "file": "platform-settings",
        "title": "Platform Settings",
        "group": "admin",
        "alt": "Wistore: e-mail provider settings"
      },
      {
        "file": "home-how-it-works",
        "title": "Home: How It Works",
        "group": "site",
        "alt": "Wistore: three-step section on the home page"
      },
      {
        "file": "home-features",
        "title": "Home: Features",
        "group": "site",
        "alt": "Wistore: features section on the home page"
      },
      {
        "file": "home-comparison",
        "title": "Home: Comparison",
        "group": "site",
        "alt": "Wistore: comparison section on the home page"
      },
      {
        "file": "about",
        "title": "About",
        "group": "site",
        "alt": "Wistore: About screen"
      },
      {
        "file": "contact",
        "title": "Contact and FAQ",
        "group": "site",
        "alt": "Wistore: Contact and FAQ screen"
      },
      {
        "file": "sign-in",
        "title": "Sign In",
        "group": "site",
        "alt": "Wistore: Sign In screen"
      },
      {
        "file": "register",
        "title": "Register",
        "group": "site",
        "alt": "Wistore: Register screen"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Wistore is an online store builder SaaS built with .NET 10 and Next.js 16: visual page builder, product variants, offers, storefronts and e-mail campaigns.",
    "keywords": [
      "Wistore",
      "Online Store Builder",
      "E-Commerce SaaS",
      "Website Builder",
      "Multi-Tenant",
      ".NET 10",
      "ASP.NET Core Web API",
      "Clean Architecture",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "SQL Server",
      "SignalR",
      "Hangfire",
      "Cloudflare R2"
    ],
    "created": "2026-06-10",
    "schemaType": "SoftwareApplication",
    "appCategory": "BusinessApplication",
    "os": "Web Browser"
  },
  {
    "slug": "athl-furniture",
    "title": "ATHL Furniture",
    "tagline": "Furniture brand website",
    "category": "Furniture and Interior Design",
    "kind": "personal",
    "status": "Live",
    "platform": "Website",
    "duration": "2 weeks",
    "year": 2026,
    "summary": "A one-page website for a furniture and interior brand: collections, craftsmanship, rooms, reviews and an inquiry form, with calm, slow motion.",
    "intro": "A website for a furniture brand that sells solid oak pieces and natural textiles. It is designed the way a showroom feels: quiet colors, large photos and plenty of space. Visitors see the three collections, read how the pieces are made, walk through furnished rooms, read what customers say, and send an inquiry from the same page. It is a good fit for a furniture shop, an interior design studio or any brand that sells through photos.",
    "technical": "A statically exported Next.js 16 / React 19 site in TypeScript, styled with Tailwind CSS 4 and animated with Framer Motion (scroll-triggered fade, rise and blur reveals with staggered children). Images are WebP served through next/image with blur placeholders, the type pairs Cormorant Garamond with Plus Jakarta Sans via next/font, and the build is deployed to Cloudflare Workers static assets.",
    "note": "ATHL is a concept brand I made to show this kind of website. The studio address, e-mail and customer quotes on the page are sample content.",
    "facts": [],
    "stack": [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "tech": [
      "Next.js 16 (static export)",
      "React 19 & TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "next/image & next/font",
      "Cloudflare Workers"
    ],
    "liveUrl": "https://athl-furniture.kiromagdy123.workers.dev",
    "highlightsHeading": "Built like a showroom",
    "highlights": [
      {
        "title": "Photos do the selling",
        "body": "Each section is built around large photos: the collections as cards, the craftsmanship next to the workshop, and the rooms in a magazine-style grid. Photos zoom in slowly on hover and are cropped per card so the furniture always stays in frame."
      },
      {
        "title": "Calm, slow motion",
        "body": "Headings, text and photos fade in and rise into place as the visitor scrolls, one after the other. The movement is slow on purpose, to match a brand that sells calm rather than discounts."
      },
      {
        "title": "An inquiry in one step",
        "body": "The contact section sits on the same page with the e-mail, studio address and opening hours beside a short form: name, e-mail and a few words about the space. The header link and the hero button both lead straight to it."
      },
      {
        "title": "Comfortable on a phone",
        "body": "The layout rearranges itself for every screen. On a phone the menu folds into a button, the photo grids stack, and the buttons grow to full width so they are easy to tap."
      }
    ],
    "specs": [
      {
        "title": "Application",
        "items": [
          "Next.js 16 static export",
          "React 19 & TypeScript",
          "Deployed on Cloudflare Workers"
        ]
      },
      {
        "title": "Interface",
        "items": [
          "Tailwind CSS 4 styling",
          "Serif and sans font pairing",
          "Responsive layouts for every screen size"
        ]
      },
      {
        "title": "Interaction",
        "items": [
          "Framer Motion scroll reveals",
          "Header that turns solid on scroll",
          "Back-to-top button after the hero"
        ]
      },
      {
        "title": "Performance",
        "items": [
          "WebP images with blur placeholders",
          "Self-hosted fonts via next/font",
          "Pre-rendered HTML, no server needed"
        ]
      }
    ],
    "groups": [
      {
        "id": "landing",
        "label": "Landing"
      },
      {
        "id": "products",
        "label": "Collections and rooms"
      },
      {
        "id": "contact",
        "label": "Reviews and contact"
      },
      {
        "id": "mobile",
        "label": "On a phone"
      }
    ],
    "shots": [
      {
        "file": "hero",
        "title": "Hero",
        "group": "landing",
        "alt": "ATHL Furniture hero section with a living room photo"
      },
      {
        "file": "collections",
        "title": "Collections",
        "group": "products",
        "alt": "ATHL Furniture collections: living, study and rest"
      },
      {
        "file": "craftsmanship",
        "title": "Craftsmanship",
        "group": "products",
        "alt": "ATHL Furniture craftsmanship section with a woodworking photo"
      },
      {
        "file": "spaces",
        "title": "Spaces",
        "group": "products",
        "alt": "ATHL Furniture furnished rooms in a photo grid"
      },
      {
        "file": "reflections",
        "title": "Customer Reviews",
        "group": "contact",
        "alt": "ATHL Furniture customer quotes"
      },
      {
        "file": "contact",
        "title": "Contact & Inquiry Form",
        "group": "contact",
        "alt": "ATHL Furniture contact details and inquiry form"
      },
      {
        "file": "footer",
        "title": "Footer",
        "group": "contact",
        "alt": "ATHL Furniture footer"
      },
      {
        "file": "mobile-hero",
        "title": "Phone: Hero",
        "group": "mobile",
        "alt": "ATHL Furniture hero section on a phone"
      },
      {
        "file": "mobile-menu",
        "title": "Phone: Menu",
        "group": "mobile",
        "alt": "ATHL Furniture menu opened on a phone"
      }
    ],
    "cover": "hero",
    "coverPosition": "center",
    "seoDescription": "ATHL Furniture is a furniture brand website by Kirollos Magdy: collections, craftsmanship, furnished rooms, reviews and an inquiry form, built with Next.js, Tailwind CSS and Framer Motion.",
    "keywords": [
      "ATHL Furniture",
      "furniture website",
      "furniture store website",
      "interior design website",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Kirollos Magdy"
    ],
    "created": "2026-11-13",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "travely",
    "title": "Travely",
    "tagline": "Hotel booking platform",
    "category": "Travel and Hospitality",
    "kind": "personal",
    "status": "Demo",
    "platform": "Web application",
    "duration": "4 months",
    "year": 2025,
    "summary": "Hotel booking platform with room availability, automatic night pricing, Stripe checkout and an admin back office. Built solo.",
    "intro": "A hotel booking platform. Guests browse hotels and rooms, pick their dates, and pay online through Stripe; the price is calculated from the number of nights. Staff and admins manage hotels, rooms, bookings and users from a back office. I designed and built all of it myself.",
    "technical": "A full-stack travel agency and hotel reservation platform built with .NET 9.0 and ASP.NET Core MVC. Features dynamic hotel room availability, automated night stay calculations, secure Stripe payment gateway integration, claims-based cookie authentication with BCrypt hashing, customer wishlists, in-app notifications, and comprehensive back-office management across 12 controllers and 46 CSHTML views.",
    "note": null,
    "facts": [],
    "stack": [
      "ASP.NET Core MVC",
      "C#",
      "SQL Server",
      "Stripe"
    ],
    "tech": [
      "ASP.NET Core MVC (.NET 9)",
      "C#",
      "Entity Framework Core 9",
      "SQL Server (12 DbSets)",
      "Stripe.net (v50)",
      "BCrypt.Net-Next",
      "Cookie Auth (Claims)",
      "Bootstrap 5 & AOS"
    ],
    "liveUrl": null,
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Hotel & Room Booking Engine",
        "body": "Multi-hotel catalog with amenities filtering (Wi-Fi, Pool, Spa, Gym, Restaurant) and dynamic room availability management. Calculates stay duration, nightly rates, and total checkout prices via HotelService and BookingService."
      },
      {
        "title": "Stripe Payment Gateway Integration",
        "body": "Full credit card checkout pipeline using Stripe.net SessionService to create encrypted checkout sessions, track transaction lifecycle, update booking status upon verification, and issue printable payment receipts."
      },
      {
        "title": "Claims Cookie Auth & BCrypt Security",
        "body": "Secure claims-based cookie authentication scheme (Travely.Auth, 24h lifetime) paired with BCrypt.Net-Next salted hashing, role-based authorization (Customer, Staff, Admin), and custom [ProfileImage] validation."
      },
      {
        "title": "Admin & Staff Operations Portal",
        "body": "Centralized management back-office across 12 controllers allowing administrators and staff to manage hotel listings, room inventories, booking states (Pending, Confirmed, Cancelled), user roles, and financial records."
      },
      {
        "title": "User Accounts, Wishlist & Notifications",
        "body": "Dedicated customer portal with profile customization, photo upload via FileSystemImageStorage, booking history tracking (MyBookings), hotel wishlist bookmarking, and targeted in-app notifications."
      },
      {
        "title": "Modern Responsive UI & Client Stack",
        "body": "Server-rendered Razor Views paired with Bootstrap 5, Swiper carousels for room galleries, GLightbox modals, Isotope dynamic card filtering, and jQuery unobtrusive client-side validation."
      }
    ],
    "specs": [
      {
        "title": "Backend and Architecture",
        "items": [
          ".NET 9.0 & ASP.NET Core MVC",
          "12 Controllers & 46 CSHTML Views",
          "Service Layer (Hotel & Booking)",
          "Strongly-Typed ViewModels"
        ]
      },
      {
        "title": "Database and Storage",
        "items": [
          "Microsoft SQL Server",
          "Entity Framework Core 9.0.10",
          "12 Entity Models & DbSets",
          "FileSystemImageStorage Service"
        ]
      },
      {
        "title": "Payments and Security",
        "items": [
          "Stripe.net 50.0.0 Checkout API",
          "Claims Cookie Auth (Travely.Auth)",
          "BCrypt.Net-Next Password Hashing",
          "Role-Based Access (Admin/Staff/Customer)"
        ]
      },
      {
        "title": "Frontend and Client",
        "items": [
          "Bootstrap 5 & Bootstrap Icons",
          "jQuery Validation & Unobtrusive",
          "Swiper & GLightbox Popups",
          "AOS Animations & Isotope Layout"
        ]
      }
    ],
    "groups": [
      {
        "id": "site",
        "label": "Public pages"
      },
      {
        "id": "hotels",
        "label": "Hotels and rooms"
      },
      {
        "id": "booking",
        "label": "Booking and account"
      },
      {
        "id": "admin",
        "label": "Admin"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Page",
        "group": "site",
        "alt": "Travely: Home Page screen"
      },
      {
        "file": "about",
        "title": "About",
        "group": "site",
        "alt": "Travely: About screen"
      },
      {
        "file": "hotels",
        "title": "Hotels",
        "group": "hotels",
        "alt": "Travely: Hotels screen"
      },
      {
        "file": "hotel-details",
        "title": "Hotel Details",
        "group": "hotels",
        "alt": "Travely: Hotel Details screen"
      },
      {
        "file": "rooms",
        "title": "Rooms",
        "group": "hotels",
        "alt": "Travely: Rooms screen"
      },
      {
        "file": "room-details",
        "title": "Room Details",
        "group": "hotels",
        "alt": "Travely: Room Details screen"
      },
      {
        "file": "booking",
        "title": "Booking",
        "group": "booking",
        "alt": "Travely: Booking screen"
      },
      {
        "file": "sign-in",
        "title": "Sign In",
        "group": "booking",
        "alt": "Travely: Sign In screen"
      },
      {
        "file": "register",
        "title": "Register",
        "group": "booking",
        "alt": "Travely: Register screen"
      },
      {
        "file": "user-profile",
        "title": "User Profile",
        "group": "booking",
        "alt": "Travely: User Profile screen"
      },
      {
        "file": "users",
        "title": "Users",
        "group": "admin",
        "alt": "Travely: Users screen"
      },
      {
        "file": "notifications",
        "title": "Notifications",
        "group": "admin",
        "alt": "Travely: Notifications screen"
      },
      {
        "file": "contact-us",
        "title": "Contact Us",
        "group": "site",
        "alt": "Contact Us Alt"
      },
      {
        "file": "terms-of-service",
        "title": "Terms of Service",
        "group": "site",
        "alt": "Travely: Terms of Service screen"
      },
      {
        "file": "privacy-policy",
        "title": "Privacy Policy",
        "group": "site",
        "alt": "Travely: Privacy Policy screen"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Travely is a .NET 9 ASP.NET Core MVC hotel booking platform with automated night pricing, Stripe checkout, BCrypt auth and an admin dashboard.",
    "keywords": [
      "Travely",
      "Hotel Booking",
      "Travel Agency",
      ".NET 9.0",
      "ASP.NET Core MVC",
      "C#",
      "Entity Framework Core 9",
      "SQL Server",
      "Stripe",
      "BCrypt",
      "Web Application"
    ],
    "created": "2025-03-01",
    "schemaType": "SoftwareApplication",
    "appCategory": "TravelApplication",
    "os": "Web Browser"
  },
  {
    "slug": "ip-inspector",
    "title": "IP Inspector",
    "tagline": "Network lookup tool",
    "category": "Network Intelligence",
    "kind": "personal",
    "status": "Live",
    "platform": "Web tool",
    "duration": "1 week",
    "year": 2025,
    "summary": "Shows your public IP address, connection details and location on an interactive map.",
    "intro": "A small web tool that shows your public IP address, your connection speed and latency, and where the address is located on an interactive map. The results can be copied or exported as JSON or text.",
    "technical": "A real-time network intelligence tool engineered to instantly detect public IPv4 addresses, analyze connection latency, downlink speed, and render pinpoint geolocation data on an interactive Leaflet map with instant JSON and TXT clipboard exports.",
    "note": null,
    "facts": [],
    "stack": [
      "JavaScript",
      "Leaflet",
      "HTML",
      "CSS"
    ],
    "tech": [
      "Vanilla JavaScript (ES6+)",
      "HTML5 / CSS3",
      "Leaflet.js 1.9.4",
      "CartoDB Dark/Light Tiles",
      "api.ipify.org IPv4 API",
      "ipapi.co Geolocation API",
      "Network Information API"
    ],
    "liveUrl": "https://kiromagdy7.github.io/IP-Inspector/",
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Dual-API IP Resolution & Geolocation Pipeline",
        "body": "Asynchronously queries api.ipify.org for instant IPv4 detection followed by ipapi.co for in-depth geolocation metadata (country, city, region, ISP, AS number, timezone, coordinates) wrapped in an AbortController with an 8-second network timeout."
      },
      {
        "title": "Interactive Leaflet.js Mapping & Theme-Aware CartoDB Tiles",
        "body": "Renders dynamic geographic positioning at Zoom 12 using Leaflet.js 1.9.4. Seamlessly swaps vector tile layers on the fly between CartoDB Dark (dark_all) and Light (light_all) when switching color schemes."
      },
      {
        "title": "Live Hardware & Network Telemetry Metrics",
        "body": "Interrogates the browser navigator.connection API to display real-time connection status pills: network type (4G, WiFi, Ethernet), downlink speed in Mbps, and round-trip time (RTT/latency in ms) alongside VPN/proxy warning detection."
      }
    ],
    "specs": [
      {
        "title": "Core JavaScript Engine",
        "items": [
          "Vanilla JavaScript (ES6+ Modules)",
          "AbortController (8000ms Timeout)",
          "navigator.connection Telemetry",
          "navigator.clipboard & Blob API"
        ]
      },
      {
        "title": "Geocoding and Maps",
        "items": [
          "Leaflet.js 1.9.4 Interactive Map",
          "CartoDB Dark & Light Tile Provider",
          "api.ipify.org IPv4 Lookup",
          "ipapi.co Geolocation & ASN Lookup"
        ]
      },
      {
        "title": "UI Architecture and Themes",
        "items": [
          "Semantic HTML5 (ARIA Accessible)",
          "Pure CSS3 Variables & Flex/Grid",
          "Theme Engine (data-theme attribute)",
          "JetBrains Mono & Inter Google Fonts"
        ]
      },
      {
        "title": "Performance and Reliability",
        "items": [
          "Zero-Backend Architecture",
          "100% Client-Side Computation",
          "2.5s Auto-Dismissing Toast Engine",
          "Instant Sub-100ms Cold Start"
        ]
      }
    ],
    "groups": [
      {
        "id": "telemetry",
        "label": "Telemetry and HUD"
      },
      {
        "id": "map",
        "label": "Map and Geolocation"
      }
    ],
    "shots": [
      {
        "file": "ip-inspector-header",
        "title": "IP Inspector Header",
        "group": "telemetry",
        "alt": "IP Inspector: IP Inspector Header screen"
      },
      {
        "file": "ip-details-map",
        "title": "IP Details & Map",
        "group": "map",
        "alt": "IP Inspector: IP Details & Map screen"
      },
      {
        "file": "ip-full-view",
        "title": "IP Full View",
        "group": "telemetry",
        "alt": "IP Inspector: IP Full View screen"
      }
    ],
    "cover": "ip-full-view",
    "coverPosition": "center",
    "seoDescription": "Explore IP Inspector, a real-time IP intelligence tool that reveals public IPv4 details, connection metrics, and geolocation through interactive maps.",
    "keywords": [
      "IP Inspector",
      "IP Address Lookup",
      "Geolocation",
      "Network Metrics",
      "IPv4",
      "Leaflet Map",
      "JSON Export",
      "Dark Mode",
      "Tools",
      "Web Application",
      "Egypt"
    ],
    "created": "2025-07-01",
    "schemaType": "SoftwareApplication",
    "appCategory": "DeveloperTool",
    "os": "Web Browser"
  },
  {
    "slug": "teta-kitchen",
    "title": "Teta's Kitchen",
    "tagline": "Recipe website",
    "category": "Culinary Heritage and Front-End",
    "kind": "personal",
    "status": "Front-end project",
    "platform": "Website",
    "duration": "2 months",
    "year": 2025,
    "summary": "Recipe and family cooking website with live search and in-place profile editing, built without any framework.",
    "intro": "A recipe website built around family cooking traditions, written in plain HTML, CSS and JavaScript with no framework. It has live recipe search, step-by-step cooking guides, profile editing directly on the page, and strict form validation.",
    "technical": "A warm culinary heritage and recipe platform crafted with semantic HTML5, ~60KB handcrafted CSS, and ~22.5KB pure Vanilla JavaScript. Brings generational family cooking traditions to life with a bespoke design system (#800e13 Burgundy & #fffdf3 Cream), in-place profile editing via contenteditable, live search filtering, and strict client-side regex input masks.",
    "note": null,
    "facts": [],
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "tech": [
      "Semantic HTML5",
      "CSS3 (~60KB)",
      "Pure JavaScript (~22.5KB)",
      "Live Real-Time Search"
    ],
    "liveUrl": null,
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Handcrafted Design System & Warm Aesthetics",
        "body": "Bespoke visual identity built from scratch in a ~60KB style.css stylesheet with 120+ Flexbox layouts. Features a warm culinary color palette (--primary-color: #800e13 burgundy, --Bg-color: #fffdf3 cream, and --color1: #1f0802 roasted chocolate) paired with Google Fonts Poppins (100–900)."
      },
      {
        "title": "Inline In-Place Profile Editing Engine",
        "body": "Frictionless profile customization powered by Vanilla JS (toggleEdit()). Dynamically transforms static <h2> headings into editable text fields via native contenteditable=\"true\", swaps action icons between edit and save, and handles custom calendar and dropdown pickers."
      },
      {
        "title": "Real-Time Live Search with Smart Outside Dismissal",
        "body": "Instant client-side recipe search listening to input events with toLowerCase() text matching. Populates a floating results dropdown in real time and implements smart outside-click dismissal via event.target.closest(\".search-container\")."
      },
      {
        "title": "Strict Regex Validation & Input Masking",
        "body": "Multi-layered client-side input validation with instant character filtering. Features regex masks for alphabetic-only names (/[^a-zA-Z ]/g), digits-only phone numbers with +, auto-slashed birthdates (DD/MM/YYYY), and clipboard paste length interceptors."
      },
      {
        "title": "Dynamic Toast Notifications & CSS Error Shake",
        "body": "Interactive feedback system injecting dynamic .error-message elements into the DOM on invalid submissions. Triggers instant CSS .error-shake input vibrations and auto-cleans up with a 3-second .fade-out timer to prevent memory leaks."
      },
      {
        "title": "Step-by-Step Cooking Guides & Family Storytelling",
        "body": "Dedicated meal showcase pages featuring checklist-ready ingredient measurements, numbered preparation timelines formatted for kitchen reading, and editorial magazine layouts chronicling family traditions and holiday recipes."
      }
    ],
    "specs": [
      {
        "title": "Styling and Design System",
        "items": [
          "~60KB CSS3",
          "120+ Semantic Flexbox Layouts",
          "Custom Palette (#800e13, #fffdf3, #1f0802)",
          "Google Fonts Poppins (Weights 100–900)"
        ]
      },
      {
        "title": "JavaScript DOM Engine",
        "items": [
          "~22.5KB Pure Vanilla JavaScript",
          "Zero External Runtime Dependencies",
          "In-Place Editing (contenteditable)",
          "Smart Dropdown Outside-Click Handler"
        ]
      },
      {
        "title": "Validation and Input Security",
        "items": [
          "Strict Client-Side RegEx Masks",
          "Auto-Formatting Date Mask (DD/MM/YYYY)",
          "Real-Time Email Border Validation",
          "MaxLength & Paste Event Interception"
        ]
      },
      {
        "title": "UI Architecture and UX",
        "items": [
          "Semantic HTML5 Clean Structure",
          "Dynamic Toast System & Error Shake",
          "Material Symbols & Font Awesome 6",
          "Responsive Mobile-First Interfaces"
        ]
      }
    ],
    "groups": [
      {
        "id": "recipes",
        "label": "Recipes and Guides"
      },
      {
        "id": "portal",
        "label": "Portal and Auth"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Page",
        "group": "recipes",
        "alt": "Teta's Kitchen: Home Page screen"
      },
      {
        "file": "recipes",
        "title": "Recipes",
        "group": "recipes",
        "alt": "Teta's Kitchen: Recipes screen"
      },
      {
        "file": "about-us",
        "title": "About Us",
        "group": "recipes",
        "alt": "Teta's Kitchen: About Us screen"
      },
      {
        "file": "family-stories",
        "title": "Family Stories",
        "group": "recipes",
        "alt": "Teta's Kitchen: Family Stories screen"
      },
      {
        "file": "sign-in",
        "title": "Sign In",
        "group": "portal",
        "alt": "Teta's Kitchen: Sign In screen"
      },
      {
        "file": "sign-up",
        "title": "Sign Up",
        "group": "portal",
        "alt": "Teta's Kitchen: Sign Up screen"
      },
      {
        "file": "contact-us",
        "title": "Contact Us",
        "group": "recipes",
        "alt": "Teta's Kitchen: Contact Us screen"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Teta's Kitchen is a warm recipe and culinary heritage website built with pure HTML, CSS and vanilla JavaScript, with live search and inline editing.",
    "keywords": [
      "Teta's Kitchen",
      "مطبخ الجدة",
      "Recipe Platform",
      "Culinary Heritage",
      "CSS",
      "Vanilla JavaScript",
      "In-Place Editing",
      "Regex Validation",
      "Poppins Typography",
      "Front-End"
    ],
    "created": "2025-02-01",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "word-of-the-lord",
    "title": "Word of the Lord",
    "tagline": "Coptic Orthodox prayer website",
    "category": "Spiritual Platform",
    "kind": "personal",
    "status": "Live",
    "platform": "Website",
    "duration": "1 month",
    "year": 2025,
    "summary": "Coptic Orthodox website with a Bible reader, the Agpeya hourly prayers, the seven sacraments and a sermon directory.",
    "intro": "A Coptic Orthodox website for daily reading and prayer. It includes a nine-book scripture reader, the Agpeya prayers hour by hour, an explanation of the seven sacraments, a daily verse, and a directory of sermons.",
    "technical": "A digital Coptic Orthodox platform built with Vanilla JavaScript and local JSON datasets. Features a dynamic random verse of the day, an interactive 9-book scripture reader, hour-by-hour Agpeya canonical prayers, detailed exposition of the 7 Church Sacraments, and a curated YouTube sermons directory.",
    "note": null,
    "facts": [],
    "stack": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "tech": [
      "HTML5 / CSS3",
      "Vanilla JavaScript",
      "Fetch API & Local JSON"
    ],
    "liveUrl": "https://kiromagdy7.github.io/word-of-the.lord/",
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "Dynamic 9-Book Scripture Reader",
        "body": "Three-tier cascading dropdown architecture (Book, Chapter, Verse) fetching structured local JSON across 5 Old Testament books and 4 New Testament Gospels with full chapter and verse rendering."
      },
      {
        "title": "Agpeya Canonical Hours Engine",
        "body": "Interactive prayer selector across 9 Coptic canonical hours, dynamically fetching JSON prayer datasets to populate navigable sub-sections (Psalms, Gospel passages, and liturgical absolutions)."
      },
      {
        "title": "Sacraments & Curated Sermons Directory",
        "body": "Comprehensive doctrinal expositions for all 7 Church Sacraments with dedicated artwork, paired with an 8-speaker directory linking directly to curated Coptic sermons on YouTube."
      }
    ],
    "specs": [
      {
        "title": "Core Architecture",
        "items": [
          "Semantic HTML5 (5 Pages)",
          "Vanilla JavaScript (ES6+)",
          "Asynchronous Fetch API"
        ]
      },
      {
        "title": "Data and Datasets",
        "items": [
          "Local JSON Datasets",
          "9 Bible Books (Pentateuch & Gospels)",
          "9 Agpeya Canonical Hours Datasets",
          "Randomized Daily Verse Loader"
        ]
      },
      {
        "title": "Styling and UX",
        "items": [
          "CSS3 Custom Properties (:root)",
          "Backdrop Filter Glassmorphism",
          "CSS Grid & Flexbox Layouts",
          "Google Fonts (Roboto, Merienda, Rubik)"
        ]
      },
      {
        "title": "Media and External",
        "items": [
          "Font Awesome 6 (Social Icons)",
          "Google Material Symbols",
          "Curated YouTube Video Links",
          "GitHub Pages Deployment"
        ]
      }
    ],
    "groups": [
      {
        "id": "reader",
        "label": "Scripture Reader"
      },
      {
        "id": "audio",
        "label": "Prayers and Audio"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Screen",
        "group": "reader",
        "alt": "Word of the Lord: Home Screen screen"
      },
      {
        "file": "bible",
        "title": "Bible Reader",
        "group": "reader",
        "alt": "Word of the Lord: Bible Reader screen"
      },
      {
        "file": "agpeya",
        "title": "Agpya",
        "group": "audio",
        "alt": "Word of the Lord: Agpya screen"
      },
      {
        "file": "sacraments",
        "title": "Al Asrar",
        "group": "reader",
        "alt": "Word of the Lord: Al Asrar screen"
      },
      {
        "file": "sermons",
        "title": "Ezaat (Hymns)",
        "group": "audio",
        "alt": "Ezaat"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Explore Word of the Lord, a digital platform for Coptic Christian teachings, sermons, Bible reading, liturgical texts, and spiritual resources for reflection.",
    "keywords": [
      "Word of the Lord",
      "Coptic Orthodox",
      "Bible Reader",
      "Agpeya",
      "Church Sacraments",
      "Christian Sermons",
      "Vanilla JavaScript",
      "Fetch API",
      "Egypt"
    ],
    "created": "2025-01-15",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "code-crate",
    "title": "Code Crate",
    "tagline": "E-learning website",
    "category": "E-Learning Platform",
    "kind": "personal",
    "status": "Live",
    "platform": "Website",
    "duration": "3 weeks",
    "year": 2025,
    "summary": "Six-page e-learning front end presenting 12 programming and design courses across four tracks.",
    "intro": "The front end of an e-learning site for developers and designers: six pages presenting 12 courses in four tracks, with a validated sign-up form.",
    "technical": "A 6-page e-learning frontend platform for developers and graphic designers. Features 12 comprehensive courses across 4 tracks (Programming, Web Development, Modern Frameworks, and Graphic Design), custom high-res vector branding, AOS (Animate On Scroll) animations, floating smooth scroll navigators, and strict pattern-based registration validation.",
    "note": null,
    "facts": [],
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "AOS"
    ],
    "tech": [
      "HTML5 / CSS3 (6 Pages)",
      "Vanilla JavaScript",
      "AOS (Animate On Scroll)",
      "Custom Vector SVGs"
    ],
    "liveUrl": "https://kiromagdy7.github.io/Code-Crate/",
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "12-Course Multi-Track Curriculum",
        "body": "Structured 12-course catalog across 4 distinct learning tracks: Core Programming (Python, C++, Java), Web Dev (HTML, CSS, JS, TS, Tailwind), Frameworks (React, Next.js), and Graphic Design (Photoshop, Illustrator) with custom SVG emblems."
      },
      {
        "title": "AOS Motion & Floating Scroll Controls",
        "body": "Viewport scroll orchestration powered by the AOS (Animate On Scroll) engine (1500ms fade-up), combined with scroll-position listeners dynamically toggling floating buttons for smooth bidirectional page navigation."
      },
      {
        "title": "Modular Stylesheets & Strict Form Regex",
        "body": "Modular multi-page architecture with 5 distinct CSS stylesheets, custom branding colors (#360c8a), and rigorous HTML5 registration validation enforcing exact phone digit counts and password complexity patterns."
      }
    ],
    "specs": [
      {
        "title": "Core Frontend",
        "items": [
          "Semantic HTML5 (6 Pages)",
          "5 Modular CSS Stylesheets",
          "Vanilla JavaScript (ES6)",
          "Zero Backend Dependencies"
        ]
      },
      {
        "title": "Motion and Controls",
        "items": [
          "AOS (Animate On Scroll 1500ms)",
          "Dynamic Scroll-to-Top Handlers",
          "Dynamic Scroll-to-Bottom Button",
          "Native Smooth Scroll Behavior"
        ]
      },
      {
        "title": "Curriculum and Design",
        "items": [
          "12 Tech & Design Courses",
          "Custom SVG Course Logos",
          "Kanit Google Font (400-900)",
          "Primary Brand Palette (#360c8a)"
        ]
      },
      {
        "title": "Assets and Validation",
        "items": [
          "Font Awesome 6.4.0 & Material Icons",
          "Strict HTML5 Pattern RegEx",
          "11-Digit Phone Validation",
          "GitHub Pages Deployment"
        ]
      }
    ],
    "groups": [
      {
        "id": "courses",
        "label": "Courses and Catalog"
      },
      {
        "id": "auth",
        "label": "Auth and Testimonials"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Page",
        "group": "courses",
        "alt": "Code Crate: Home Page screen"
      },
      {
        "file": "courses",
        "title": "Courses",
        "group": "courses",
        "alt": "Code Crate: Courses screen"
      },
      {
        "file": "about",
        "title": "About",
        "group": "courses",
        "alt": "Code Crate: About screen"
      },
      {
        "file": "sign-up",
        "title": "Sign Up",
        "group": "auth",
        "alt": "Code Crate: Sign Up screen"
      },
      {
        "file": "contact-us",
        "title": "Contact Us",
        "group": "courses",
        "alt": "Code Crate: Contact Us screen"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Code Crate is a 6-page e-learning frontend with 12 programming and design courses across 4 learning tracks, AOS animations and modular styles.",
    "keywords": [
      "Code Crate",
      "E-Learning Platform",
      "Web Development",
      "Programming Courses",
      "AOS Animation",
      "Kanit Font",
      "Multi-Page Web App",
      "Egypt"
    ],
    "created": "2025-04-01",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  },
  {
    "slug": "div-store",
    "title": "Div Store",
    "tagline": "Electronics store front end",
    "category": "E-Commerce Prototype",
    "kind": "personal",
    "status": "Live",
    "platform": "Website",
    "duration": "1 month",
    "year": 2025,
    "summary": "18-page electronics store front end with product variants and a cart that persists in the browser.",
    "intro": "The front end of an electronics store: 18 pages across five departments, with RAM and storage selectors on product pages and a cart that is kept in the browser between pages.",
    "technical": "An 18-page multi-category electronics e-commerce frontend prototype. Features 5 product departments (laptops, mobiles, smartwatches, covers, accessories), client-side state transfer via localStorage, dynamic RAM & storage spec selectors, animated promotional carousels, and dedicated policy pages.",
    "note": null,
    "facts": [],
    "stack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "tech": [
      "HTML5 / CSS3 (18 Pages)",
      "Vanilla JavaScript (11 Scripts)",
      "LocalStorage State Engine"
    ],
    "liveUrl": "https://kiromagdy7.github.io/Div-Store/",
    "highlightsHeading": "How it works",
    "highlights": [
      {
        "title": "LocalStorage Client State Transfer",
        "body": "Cross-page state persistence architecture where viewProduct() serializes complete product objects to localStorage, dynamically hydrating galleries, specs, and prices on product pages."
      },
      {
        "title": "Dynamic Hardware Variant Configurator",
        "body": "Client-side configuration engine generating interactive radio selectors for RAM and storage tiers on laptops and mobiles, automatically synchronizing spec tables and browser tab titles."
      },
      {
        "title": "Multi-Department 18-Page Architecture",
        "body": "Extensive 18-page layout spanning 5 product departments (Laptops, Mobiles, Smartwatches, Covers, Accessories), modulo-driven banner slideshows, and legal terms and privacy policies."
      }
    ],
    "specs": [
      {
        "title": "Frontend Core",
        "items": [
          "18 Semantic HTML5 Pages",
          "Vanilla JavaScript (11 Scripts)",
          "LocalStorage State Transfer"
        ]
      },
      {
        "title": "Catalog and Departments",
        "items": [
          "Dynamic RAM & Storage Tiers",
          "Modulo Slideshow Carousel (%)",
          "Suggested Items Grid (12 Items)"
        ]
      },
      {
        "title": "Styling and Motion",
        "items": [
          "3 Dedicated CSS Stylesheets",
          "CSS Custom Properties (:root)",
          "@keyframes Typing & Blink FX",
          "Cal Sans & Roboto Condensed"
        ]
      },
      {
        "title": "UI Modules and Assets",
        "items": [
          "Font Awesome 6.5.1 Icons",
          "Cart & Auth UI Prototype Views",
          "Comprehensive Legal Pages",
          "GitHub Pages Deployment"
        ]
      }
    ],
    "groups": [
      {
        "id": "catalog",
        "label": "Catalog and Products"
      }
    ],
    "shots": [
      {
        "file": "home",
        "title": "Home Page",
        "group": "catalog",
        "alt": "Div Store: Home Page screen"
      },
      {
        "file": "laptops-section",
        "title": "Laptops Section",
        "group": "catalog",
        "alt": "Div Store: Laptops Section screen"
      },
      {
        "file": "mobiles-section",
        "title": "Mobiles Section",
        "group": "catalog",
        "alt": "Div Store: Mobiles Section screen"
      },
      {
        "file": "accessories-section",
        "title": "Accessories Section",
        "group": "catalog",
        "alt": "Div Store: Accessories Section screen"
      },
      {
        "file": "product-details",
        "title": "Product Details",
        "group": "catalog",
        "alt": "Div Store: Product Details screen"
      },
      {
        "file": "product-details-2",
        "title": "Product Details 2",
        "group": "catalog",
        "alt": "Product Details Alt"
      }
    ],
    "cover": "home",
    "coverPosition": "center",
    "seoDescription": "Div Store is an 18-page electronics e-commerce frontend prototype with product variant selectors, responsive catalog grids and localStorage state.",
    "keywords": [
      "Div Store",
      "E-Commerce Prototype",
      "Frontend Store",
      "LocalStorage State",
      "Multi-Page Web App",
      "Laptops",
      "Mobiles",
      "Smartwatches",
      "Vanilla JavaScript"
    ],
    "created": "2025-05-01",
    "schemaType": "CreativeWork",
    "appCategory": null,
    "os": null
  }
];
