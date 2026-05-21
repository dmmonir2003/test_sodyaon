import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def generate_pdf():
    pdf_path = r"e:\sodayon\test_sodyaon\Sodayon_API_and_Postman_Guide.pdf"
    
    # Page setup
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=45,
        bottomMargin=45
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Modern Palette (Sodayon Premium Colors)
    primary_color = colors.HexColor("#0f172a") # Deep Slate Navy
    secondary_color = colors.HexColor("#2563eb") # Royal Blue
    accent_color = colors.HexColor("#3b82f6") # Sky Blue
    bg_code_color = colors.HexColor("#f8fafc") # Cool White-Grey
    text_color = colors.HexColor("#334155") # Soft Dark Slate
    border_color = colors.HexColor("#e2e8f0") # Light Border
    
    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=15,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    h1_style = ParagraphStyle(
        'Heading1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=primary_color,
        spaceBefore=15,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=text_color,
        spaceAfter=8
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0f172a"),
        backColor=bg_code_color,
        borderPadding=6,
        spaceBefore=5,
        spaceAfter=10
    )
    
    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    )
    
    tb_style = ParagraphStyle(
        'TableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color
    )

    story = []
    
    # ---------------------------------------------------------
    # COVER / HEADER
    # ---------------------------------------------------------
    story.append(Spacer(1, 20))
    story.append(Paragraph("SODAYON E-COMMERCE", title_style))
    story.append(Paragraph("Master API Directory & Postman Testing Reference Guide", subtitle_style))
    story.append(Spacer(1, 10))
    
    # Intro
    intro_text = (
        "Welcome to the official Sodayon developer technical manual. This document houses "
        "comprehensive endpoint routing schema details, JSON payloads, and testing parameters "
        "to facilitate fast, flawless CRUD verification using Postman or other standard API clients."
    )
    story.append(Paragraph(intro_text, body_style))
    story.append(Spacer(1, 15))
    
    # ---------------------------------------------------------
    # AUTHENTICATION
    # ---------------------------------------------------------
    story.append(Paragraph("🔑 1. Setup & Authentication Flow", h1_style))
    story.append(Paragraph("<b>Base Local URL:</b> <font color='#2563eb'>http://localhost:5000/api</font>", body_style))
    story.append(Paragraph(
        "All modifications, promotions settings, and dashboard management routes require administrative credentials. "
        "Sodayon includes an auto-seeding system for developers. Simply log in using one of the email credentials "
        "below to instantly generate a Super Admin session token.",
        body_style
    ))
    
    login_payload = (
        "POST http://localhost:5000/api/auth/login\n"
        "Content-Type: application/json\n\n"
        "{\n"
        "  \"email\": \"admin@sodayon.com\",\n"
        "  \"password\": \"admin123\"\n"
        "}"
    )
    story.append(Paragraph(login_payload.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    
    auth_steps = (
        "<b>Postman Authorization Setup:</b><br/>"
        "1. Copy the <code>token</code> key returned in the login response.<br/>"
        "2. In Postman, navigate to your folder or request settings.<br/>"
        "3. Open the <b>Authorization</b> tab and set the Type to <b>Bearer Token</b>.<br/>"
        "4. Paste your token. It will be sent automatically with every secure request."
    )
    story.append(Paragraph(auth_steps, body_style))
    story.append(Spacer(1, 15))
    
    # Helper to generate table
    def make_api_table(data_rows):
        table_data = [[Paragraph("Method", th_style), Paragraph("Endpoint", th_style), Paragraph("Access", th_style), Paragraph("Description", th_style)]]
        for row in data_rows:
            table_data.append([
                Paragraph(f"<b><font color='{row[0]}'>{row[1]}</font></b>", tb_style),
                Paragraph(f"<code>{row[2]}</code>", tb_style),
                Paragraph(row[3], tb_style),
                Paragraph(row[4], tb_style)
            ])
            
        t = Table(table_data, colWidths=[45, 120, 90, 275])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), primary_color),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
            ('TOPPADDING', (0, 0), (-1, 0), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, border_color),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, bg_code_color]),
            ('TOPPADDING', (0, 1), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ]))
        return t

    # ---------------------------------------------------------
    # PRODUCTS
    # ---------------------------------------------------------
    story.append(Paragraph("🛍️ 2. Product Catalog CRUD Operations", h1_style))
    prod_rows = [
        ("#16a34a", "GET", "/products", "Public", "Query list with filters, searches, and age-ranges"),
        ("#16a34a", "GET", "/products/:id", "Public", "Get single product by Object ID or numeric ID"),
        ("#2563eb", "POST", "/products", "Admin Only", "Add a new product with embedded variants matrix"),
        ("#d97706", "PATCH", "/products/:id", "Admin Only", "Update variant pricing, inventories, or metadata"),
        ("#dc2626", "DELETE", "/products/:id", "Admin Only", "Permanently remove a product model")
    ]
    story.append(make_api_table(prod_rows))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("<b>Product Creation Payload Example (POST /products):</b>", h2_style))
    prod_payload = (
        "{\n"
        "  \"sku\": \"SDY-PLY-TENT\",\n"
        "  \"slug\": \"premium-playhouse-tent\",\n"
        "  \"nameEn\": \"Sodayon Premium Playhouse Tent\",\n"
        "  \"nameBn\": \"সদায়ণ প্রিমিয়াম প্লেহাউস তাঁবু\",\n"
        "  \"price\": 1499,\n"
        "  \"originalPrice\": 1999,\n"
        "  \"ageMonthsMin\": 12,\n"
        "  \"ageMonthsMax\": 48,\n"
        "  \"brandEn\": \"Sodayon\",\n"
        "  \"brandBn\": \"সদায়ণ\",\n"
        "  \"images\": [\"https://sodayon.com/tent-blue.jpg\"],\n"
        "  \"image\": \"https://sodayon.com/tent-blue.jpg\",\n"
        "  \"descriptionEn\": \"Playhouse canvas tent.\",\n"
        "  \"descriptionBn\": \"প্লেহাউস ক্যানভাস তাঁবু।\",\n"
        "  \"variants\": [\n"
        "    {\n"
        "      \"sku\": \"SDY-PLY-TENT-BLU\",\n"
        "      \"nameEn\": \"Tent - Ocean Blue\",\n"
        "      \"nameBn\": \"তাঁবু - সমুদ্র নীল\",\n"
        "      \"price\": 1499,\n"
        "      \"stock\": 30,\n"
        "      \"options\": { \"color\": \"Blue\" }\n"
        "    }\n"
        "  ]\n"
        "}"
    )
    story.append(Paragraph(prod_payload.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # CATEGORIES
    # ---------------------------------------------------------
    story.append(Paragraph("🗂️ 3. Category & Taxonomy Subsystem", h1_style))
    cat_rows = [
        ("#16a34a", "GET", "/categories", "Public", "List flat representation of all active categories"),
        ("#16a34a", "GET", "/categories?tree=true", "Public", "Retrieve recursive parent-child nested tree mapping"),
        ("#16a34a", "GET", "/categories/:idOrSlug", "Public", "Fetch category details by custom slug or Object ID"),
        ("#2563eb", "POST", "/categories", "Admin Only", "Create category node (Supports parentId linking)"),
        ("#d97706", "PATCH", "/categories/:id", "Admin Only", "Edit category positioning, icons, and menus flags"),
        ("#dc2626", "DELETE", "/categories/:id", "Admin Only", "Permanently remove a category node")
    ]
    story.append(make_api_table(cat_rows))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("<b>Category Creation Payload (POST /categories):</b>", h2_style))
    cat_payload = (
        "{\n"
        "  \"slug\": \"stem-kits\",\n"
        "  \"nameEn\": \"STEM experiment Kits\",\n"
        "  \"nameBn\": \"স্টেম এক্সপেরিমেন্ট কিট\",\n"
        "  \"parentId\": \"65b21cf5ae4b1a43a0e12345\", // link parent category ID\n"
        "  \"showInMegaMenu\": true,\n"
        "  \"showInDropdown\": true,\n"
        "  \"sortOrder\": 2\n"
        "}"
    )
    story.append(Paragraph(cat_payload.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    story.append(Spacer(1, 15))

    # ---------------------------------------------------------
    # UI SECTIONS
    # ---------------------------------------------------------
    story.append(Paragraph("🎛️ 4. Storefront UI Dynamic Sections", h1_style))
    ui_rows = [
        ("#16a34a", "GET", "/content/ui-sections", "Public", "List active visible layout blocks"),
        ("#16a34a", "GET", "/content/ui-sections/:id", "Public", "Get dynamic UI block metadata"),
        ("#2563eb", "POST", "/content/ui-sections", "Admin Only", "Create homepage visuals grids/sliders"),
        ("#d97706", "PATCH", "/content/ui-sections/:id", "Admin Only", "Modify layouts, columns, banners, and context"),
        ("#dc2626", "DELETE", "/content/ui-sections/:id", "Admin Only", "Delete layout block configuration")
    ]
    story.append(make_api_table(ui_rows))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("<b>Create Layout Section Payload (POST /content/ui-sections):</b>", h2_style))
    ui_payload = (
        "{\n"
        "  \"type\": \"QUICK_DEAL\",\n"
        "  \"titleEn\": \"Eid Special Quick Deals\",\n"
        "  \"titleBn\": \"ঈদ স্পেশাল কুইক ডিল\",\n"
        "  \"layoutStyle\": \"GRID\",\n"
        "  \"gridColsResponsive\": { \"xs\": 2, \"md\": 3, \"lg\": 4 },\n"
        "  \"maxItems\": 8,\n"
        "  \"bannerImageEn\": \"https://sodayon.com/banner-en.jpg\",\n"
        "  \"bannerLink\": \"/shop/deals\"\n"
        "}"
    )
    story.append(Paragraph(ui_payload.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # CAMPAIGNS & COMBOS
    # ---------------------------------------------------------
    story.append(Paragraph("📣 5. Promotion Campaigns & Combo Offers", h1_style))
    camp_rows = [
        ("#16a34a", "GET", "/campaigns/flash-sales/active", "Public", "List active scheduled flash sale campaigns"),
        ("#2563eb", "POST", "/campaigns/flash-sales", "Admin Only", "Create flash sales with stocks limits & user caps"),
        ("#16a34a", "GET", "/campaigns/combos/active", "Public", "List active combo builder offers"),
        ("#2563eb", "POST", "/campaigns/combos", "Admin Only", "Create Curated Fixed sets or Interactive custom pools")
    ]
    story.append(make_api_table(camp_rows))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("<b>Create Interactive Pool Combo Payload (POST /campaigns/combos):</b>", h2_style))
    combo_payload = (
        "{\n"
        "  \"type\": \"INTERACTIVE_CUSTOM\",\n"
        "  \"nameEn\": \"STEM Kit & Book Custom Combo\",\n"
        "  \"nameBn\": \"স্টেম কিট এবং বই কাস্টম কম্বো\",\n"
        "  \"discountType\": \"PERCENTAGE\",\n"
        "  \"discountValue\": 20,\n"
        "  \"isActive\": true,\n"
        "  \"customPools\": [\n"
        "    {\n"
        "      \"nameEn\": \"STEM Pool (Pick 1)\",\n"
        "      \"nameBn\": \"স্টেম পুল (১টি)\",\n"
        "      \"minSelect\": 1, \"maxSelect\": 1,\n"
        "      \"products\": [\"65b21db0ae4b1a43a0e99999\"]\n"
        "    },\n"
        "    {\n"
        "      \"nameEn\": \"Book Pool (Pick 1)\",\n"
        "      \"nameBn\": \"বই পুল (১টি)\",\n"
        "      \"minSelect\": 1, \"maxSelect\": 1,\n"
        "      \"products\": [\"65b21db0ae4b1a43a0e77777\"]\n"
        "    }\n"
        "  ]\n"
        "}"
    )
    story.append(Paragraph(combo_payload.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style))
    story.append(Spacer(1, 15))

    # ---------------------------------------------------------
    # CUSTOMER CARTS & ORDERS
    # ---------------------------------------------------------
    story.append(Paragraph("🛒 6. Shopping Cart & Orders Checkout", h1_style))
    cart_rows = [
        ("#16a34a", "GET", "/cart/:userId", "Customer", "Retrieve current customer shopping cart items"),
        ("#2563eb", "POST", "/cart/:userId", "Customer", "Sync full client cart arrays list to DB"),
        ("#2563eb", "POST", "/orders/checkout", "Customer", "Initiate purchase (Supports COD and Stripe intent)"),
        ("#16a34a", "GET", "/orders/my-orders", "Customer", "List all past purchases of logged-in customer"),
        ("#16a34a", "GET", "/orders/admin/orders", "Admin Only", "Retrieve all historic checkout invoices")
    ]
    story.append(make_api_table(cart_rows))
    story.append(Spacer(1, 15))
    
    # ---------------------------------------------------------
    # AI & MEDIA UPLOAD
    # ---------------------------------------------------------
    story.append(Paragraph("🤖 7. Sodayon AI & Media Upload Modules", h1_style))
    ai_rows = [
        ("#2563eb", "POST", "/ai/parenting-assistant", "Public", "Contextual assistant chat based on child age"),
        ("#2563eb", "POST", "/ai/gift-finder", "Public", "Milestone-driven recommendations"),
        ("#2563eb", "POST", "/upload", "Admin Only", "Multipart form data media uploading directly to Cloudinary")
    ]
    story.append(make_api_table(ai_rows))
    story.append(Spacer(1, 20))
    
    story.append(Paragraph("Manual compiled successfully on May 2026. Sodayon Core Engineering Team.", subtitle_style))
    
    # Compile
    doc.build(story)
    print("PDF Successfully Generated at:", pdf_path)

if __name__ == "__main__":
    generate_pdf()
