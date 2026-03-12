/**
 * printReceipt — opens a 58mm thermal-paper receipt in a print window.
 * Compatible with ESC/POS thermal printers set as the default printer.
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
  @page {
    size: 58mm auto;
    margin: 4mm 2mm;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 11px;
    color: #000;
    width: 54mm;
  }
  .logo {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }
  .sub {
    text-align: center;
    font-size: 9px;
    margin-bottom: 2px;
  }
  .divider {
    border: none;
    border-top: 1px dashed #000;
    margin: 5px 0;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    margin-bottom: 2px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 4px 0;
  }
  th {
    font-size: 9px;
    text-align: left;
    border-bottom: 1px solid #000;
    padding-bottom: 3px;
  }
  th.right, td.right { text-align: right; }
  th.center, td.center { text-align: center; }
  td {
    font-size: 10px;
    padding: 2px 0;
    vertical-align: top;
  }
  .item-name { width: 55%; }
  .item-add {
    font-size: 8px;
    color: #333;
  }
  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: bold;
    margin: 4px 0 2px;
  }
  .footer {
    text-align: center;
    font-size: 9px;
    margin-top: 6px;
    line-height: 1.5;
  }
  .order-num {
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    margin: 3px 0;
    letter-spacing: 1px;
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
  <div class="info-row"><span>Date:</span><span>${dateStr} ${timeStr}</span></div>
  <div class="info-row"><span>Customer:</span><span>${customerName}</span></div>
  <div class="info-row"><span>Phone:</span><span>${customerPhone}</span></div>
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

    const win = window.open('', '_blank', 'width=220,height=600');
    win.document.write(html);
    win.document.close();
    win.focus();
    // Slight delay so styles load before print dialog opens
    setTimeout(() => { win.print(); win.close(); }, 400);
}
