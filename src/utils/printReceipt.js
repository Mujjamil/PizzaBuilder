/**
 * printReceipt — opens a 58mm thermal-paper receipt in a print window.
 * Optimized for POS-58-SERIES thermal printer (58mm paper width).
 *
 * HOW TO SET UP YOUR PRINTER IN BROWSER:
 *  1. Open the print dialog
 *  2. Select your POS-58 printer
 *  3. Under "More settings" → Paper size → select "58mm" or custom 58×auto
 *  4. Set Margins to "None"
 *  5. Uncheck "Headers and footers"
 *  6. Scale = 100%
 */
export function printReceipt({ orderNumber, customerName, customerPhone, items, total }) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const itemsHtml = items.map((item) => `
        <tr>
            <td class="item-name">
                ${item.pizzaName}
                ${item.additions?.length ? `<br><span class="item-add">${item.additions.join(', ')}</span>` : ''}
            </td>
            <td class="center">x${item.quantity}</td>
            <td class="right">&#8377;${item.totalPrice * item.quantity}</td>
        </tr>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Receipt ${orderNumber}</title>
<style>
  /* ── Page setup for 58mm roll paper ── */
  @page {
    size: 58mm auto;
    margin: 3mm 0mm;
  }

  @media print {
    html, body {
      width: 58mm !important;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;         /* was 11px — thermal needs bigger text */
    color: #000;
    width: 58mm;
    padding: 0 1mm;
  }

  /* ── Header / Logo ── */
  .logo {
    text-align: center;
    font-size: 18px;          /* large bold store name */
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 3px;
  }
  .sub {
    text-align: center;
    font-size: 12px;          /* address lines — readable */
    margin-bottom: 2px;
    line-height: 1.4;
  }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 1px dashed #000;
    margin: 5px 0;
  }

  /* ── Order number ── */
  .order-num {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin: 4px 0;
    letter-spacing: 1px;
  }

  /* ── Info rows (Date / Customer / Phone) ── */
  .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 3px;
    line-height: 1.4;
  }
  .info-label { font-weight: bold; }

  /* ── Items table ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 4px 0;
  }
  th {
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    border-bottom: 1px solid #000;
    padding-bottom: 3px;
    padding-top: 2px;
  }
  th.right, td.right { text-align: right; }
  th.center, td.center { text-align: center; }
  td {
    font-size: 13px;
    padding: 3px 0;
    vertical-align: top;
    line-height: 1.4;
  }
  .item-name { width: 56%; word-break: break-word; }
  .item-add {
    font-size: 11px;
    color: #333;
  }

  /* ── Total row ── */
  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: 18px;           /* BIG & BOLD total — like reference receipt */
    font-weight: bold;
    margin: 5px 0 3px;
  }

  /* ── Footer ── */
  .footer {
    text-align: center;
    font-size: 12px;
    margin-top: 8px;
    line-height: 1.7;
  }
</style>
</head>
<body>
  <div class="logo">&#127829; FIRST CUP</div>
  <div class="sub">Taste the Real Coffee</div>
  <div class="sub">10th Lane, FC Street, Jaysingpur</div>
  <div class="sub">Ph: +91 7249377161</div>
  <hr class="divider">
  <div class="order-num">${orderNumber}</div>
  <div class="info-row"><span class="info-label">Date:</span><span>${dateStr} ${timeStr}</span></div>
  <div class="info-row"><span class="info-label">Customer:</span><span>${customerName}</span></div>
  <div class="info-row"><span class="info-label">Phone:</span><span>${customerPhone}</span></div>
  <hr class="divider">
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th class="center">Qty</th>
        <th class="right">Amt</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHtml}
    </tbody>
  </table>
  <hr class="divider">
  <div class="total-row"><span>TOTAL</span><span>&#8377;${total}</span></div>
  <hr class="divider">
  <div class="footer">
    Thank you for visiting!<br>
    Come back soon &#128522;<br>
    <strong>cafefirstcupindia</strong>
  </div>
</body>
</html>`;

    // Open a popup sized close to 58mm (~220px) so browser renders at correct scale
    const win = window.open('', '_blank', 'width=300,height=700,left=100,top=100');
    if (!win) {
        alert('Popup blocked! Please allow popups for this site and try again.');
        return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    // Give styles time to render, then open print dialog
    setTimeout(() => { win.print(); win.close(); }, 500);
}
