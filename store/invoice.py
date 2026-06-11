"""Order invoice PDF generation (ReportLab — pure Python, no system deps)."""
import io
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer,
)

NAVY   = colors.HexColor('#0d2b6b')
YELLOW = colors.HexColor('#FECF0A')
GREY   = colors.HexColor('#666666')
LIGHT  = colors.HexColor('#f1f4fb')

# Seller details — edit these to your registered business info
SELLER = {
    'name':    'Malola Foods',
    'address': '1st Floor, Above Siva Coffee Bar, Saradha College Road, Salem, Tamil Nadu - 636004',
    'email':   'malolafoods@gmail.com',
    'phone':   '+91 95009 90045',
    'gstin':   '',   # add your GSTIN here when available
}


def build_invoice_pdf(order):
    """Return the invoice for `order` as PDF bytes."""
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=16 * mm, bottomMargin=16 * mm,
        title=f'Invoice ORD{order.id:04d}',
    )
    styles = getSampleStyleSheet()
    h1 = ParagraphStyle('h1', parent=styles['Title'], textColor=NAVY, fontSize=22, spaceAfter=2)
    small = ParagraphStyle('small', parent=styles['Normal'], fontSize=8.5, textColor=GREY, leading=12)
    label = ParagraphStyle('label', parent=styles['Normal'], fontSize=8, textColor=GREY)
    body = ParagraphStyle('body', parent=styles['Normal'], fontSize=9.5, leading=13)
    cellL = ParagraphStyle('cellL', parent=styles['Normal'], fontSize=9, leading=12)

    el = []

    # ── Header: seller + INVOICE title ──
    seller_block = [
        Paragraph(f"<b>{SELLER['name']}</b>", ParagraphStyle('s', parent=body, textColor=NAVY, fontSize=13)),
        Paragraph(SELLER['address'], small),
        Paragraph(f"{SELLER['email']} &nbsp;·&nbsp; {SELLER['phone']}", small),
    ]
    if SELLER['gstin']:
        seller_block.append(Paragraph(f"GSTIN: {SELLER['gstin']}", small))
    head = Table(
        [[seller_block, Paragraph('TAX INVOICE', ParagraphStyle('inv', parent=h1, alignment=2))]],
        colWidths=[110 * mm, 64 * mm],
    )
    head.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    el += [head, Spacer(1, 8 * mm)]

    # ── Meta + Bill-to ──
    created = order.created_at.strftime('%d %b %Y, %I:%M %p') if order.created_at else ''
    meta = Table([
        [Paragraph('INVOICE NO.', label), Paragraph(f"<b>ORD{order.id:04d}</b>", body),
         Paragraph('DATE', label), Paragraph(f"<b>{created}</b>", body)],
        [Paragraph('PAYMENT', label), Paragraph(order.get_payment_status_display(), body),
         Paragraph('STATUS', label), Paragraph(order.get_status_display(), body)],
    ], colWidths=[24 * mm, 63 * mm, 18 * mm, 69 * mm])
    meta.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#dde3f0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ]))
    el += [meta, Spacer(1, 5 * mm)]

    el.append(Paragraph('<b>Bill To</b>', ParagraphStyle('bt', parent=body, textColor=NAVY)))
    addr = (order.address or '').replace('\n', '<br/>')
    el.append(Paragraph(f"{order.name}<br/>{order.phone}<br/>{addr}", small))
    el.append(Spacer(1, 6 * mm))

    # ── Items table ──
    rows = [['#', 'Item', 'GST %', 'Qty', 'Unit Price', 'Amount']]
    for i, it in enumerate(order.items or [], start=1):
        price = float(it.get('price', 0))
        qty   = int(it.get('qty', 1) or 1)
        rate  = it.get('gst_rate', '')
        rows.append([
            str(i),
            Paragraph(str(it.get('name', '')), cellL),
            f"{rate}%" if rate != '' else '—',
            str(qty),
            f"₹{price:,.2f}",
            f"₹{price * qty:,.2f}",
        ])
    items = Table(rows, colWidths=[8 * mm, 78 * mm, 16 * mm, 12 * mm, 28 * mm, 32 * mm], repeatRows=1)
    items.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('ALIGN', (2, 0), (-1, -1), 'RIGHT'),
        ('ALIGN', (0, 0), (0, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 1), (-1, -1), 0.4, colors.HexColor('#e6e9f2')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9faff')]),
    ]))
    el += [items, Spacer(1, 4 * mm)]

    # ── Totals ──
    def money(v):
        return f"₹{float(v):,.2f}"
    trows = [['Taxable Value', money(order.subtotal)],
             ['GST', money(order.gst_amount)]]
    if float(order.discount_amount or 0) > 0:
        label_txt = f"Discount ({order.coupon_code})" if order.coupon_code else 'Discount'
        trows.append([label_txt, f"−{money(order.discount_amount)}"])
    trows.append(['Total', money(order.total)])
    totals = Table(trows, colWidths=[44 * mm, 36 * mm], hAlign='RIGHT')
    totals.setStyle(TableStyle([
        ('FONTSIZE', (0, 0), (-1, -1), 9.5),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LINEABOVE', (0, -1), (-1, -1), 1, NAVY),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0, -1), (-1, -1), NAVY),
        ('FONTSIZE', (0, -1), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ]))
    el += [totals, Spacer(1, 12 * mm)]

    el.append(Paragraph(
        'This is a computer-generated invoice. Prices are inclusive of GST. '
        'Thank you for shopping with Malola! 🌿',
        ParagraphStyle('foot', parent=small, alignment=1)))

    doc.build(el)
    pdf = buf.getvalue()
    buf.close()
    return pdf
