/**
 * printReceipt — POS-58-SERIES 58mm thermal receipt printer.
 *
 * PRINTER SETUP (do this once in Windows):
 *  1. Go to Windows Settings → Printers → POS-58 → Printer Properties
 *  2. Set paper size to 58mm (width) in the driver preferences
 *
 * BROWSER PRINT DIALOG (each time):
 *  - Printer: POS-58
 *  - Margins: None
 *  - Scale: Fit to page  ← use this, NOT 100%
 *  - Headers & footers: OFF
 */
export function printReceipt({ orderNumber, customerName, customerPhone, items, total }) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const itemsHtml = items.map((item) => `
        <tr>
            <td class="item-name">
                ${item.pizzaName}
                ${item.additions?.length ? `<br><span class="item-add">+ ${item.additions.join(', ')}</span>` : ''}
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
  /* ── Page: zero margins, auto-length roll paper ── */
  @page {
    size: 58mm auto;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /*
   * KEY FIX: width: 100% so the content fills the entire paper width.
   * The browser scales it to fit 58mm — no more tiny text in the corner.
   * Padding gives small side margins on the physical print.
   */
  body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 26px;
    color: #000;
    width: 100%;
    padding: 4px 6px;
    line-height: 1.4;
  }

  /* ── Store header ── */
  .store-name {
    text-align: center;
    font-size: 34px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .store-sub {
    text-align: center;
    font-size: 22px;
    margin-bottom: 2px;
    line-height: 1.4;
  }

  /* ── Dashed divider ── */
  .divider {
    border: none;
    border-top: 2px dashed #000;
    margin: 6px 0;
  }

  /* ── Order number ── */
  .order-num {
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin: 5px 0;
    letter-spacing: 1px;
  }

  /* ── Info rows: Date / Customer / Phone ── */
  .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin-bottom: 4px;
    line-height: 1.4;
  }
  .info-label {
    font-weight: bold;
    white-space: nowrap;
    margin-right: 6px;
  }

  /* ── Items table ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 5px 0;
  }
  thead tr {
    border-bottom: 2px solid #000;
  }
  th {
    font-size: 24px;
    font-weight: bold;
    text-align: left;
    padding: 3px 2px 4px;
  }
  th.right, td.right { text-align: right; }
  th.center, td.center { text-align: center; }
  td {
    font-size: 24px;
    padding: 4px 2px;
    vertical-align: top;
    line-height: 1.4;
  }
  .item-name {
    width: 54%;
    word-break: break-word;
  }
  .item-add {
    font-size: 20px;
    color: #333;
  }

  /* ── Total ── */
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 34px;
    font-weight: bold;
    margin: 6px 0 4px;
  }

  /* ── Footer ── */
  .footer {
    text-align: center;
    font-size: 22px;
    margin-top: 10px;
    line-height: 1.7;
  }
</style>
</head>
<body>
  <div class="store-name">&#127829; FIRST CUP</div>
  <div class="store-sub">Taste the Real Coffee</div>
  <div class="store-sub">10th Lane, FC Street, Jaysingpur</div>
  <div class="store-sub">Ph: +91 7249377161</div>
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

    const win = window.open('', '_blank', 'width=400,height=800,left=50,top=50');
    if (!win) {
        alert('Popup blocked! Please allow popups for this site and try again.');
        return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    // Delay lets the browser fully render before opening the print dialog
    setTimeout(() => { win.print(); win.close(); }, 600);
}
