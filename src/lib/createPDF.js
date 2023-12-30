import jsPDF from "jspdf";

// documentation: https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
// fonts: Inter, Avenir, Helvetica, Arial, sans-serif;

/**
 * Create PDF file using jsPDF
 * (Deprecated function, for testing jsPDF functionality only)
 * 
 * @param {Object} data 
 */
export function newPDF(data) {
  const doc = new jsPDF(); // standard A4 size: 210 x 297

  // title
  doc.setFont("helvetica", 'bold').setFontSize(34);
  doc.text(data.title, 199.5, 20, { align:'right' });

  // sub-titles
  doc.setFontSize(22);
  doc.text("Pay To", 10.5, 44);
  doc.text("Bill To", 10.5, 74);

  // user data
  doc.setFont("helvetica", "normal").setFontSize(10);
  doc.text(data.payTo, 50, 44);
  doc.text(data.billTo, 50, 74);

  doc.save('test-pdf.pdf');
}

/**
 * Converts text position to mm coordinates
 * 
 * @param {HTMLElement} rootElem 
 * @param {HTMLElement} elem 
 * @param {string} [alignment]
 * @returns {{ x:number, y:number, width:number }|void}
 */
function textToPos(rootElem, elem, alignment='left') {
  const rootBounds = rootElem.getBoundingClientRect();
  const bounds = elem?.getBoundingClientRect();
  if (!rootBounds || !bounds) return console.log("ERR: could not find bounding box");

  const x_scale = 210 / (rootBounds.right - rootBounds.left);
  const y_scale = 297 / (rootBounds.bottom - rootBounds.top);
  let xr = bounds.left - rootBounds.left;
  if (alignment === 'right') {
    xr = bounds.right - rootBounds.left;
  }
  if (alignment === 'center') {
    xr = (bounds.right + bounds.left) / 2;
  }
  let yr = bounds.bottom - rootBounds.top;
  let widthLimit = bounds.right - bounds.left;

  const xmm = Number((xr * x_scale).toFixed(1));
  const wlmm = Number((widthLimit * x_scale).toFixed(1));
  const ymm = Number((yr * y_scale).toFixed(1));

  return { x:xmm, y:ymm, width:wlmm };
}

/**
 * Recursively go through all of an element's children
 * and collect all children of type h1/h2/h3/p/span
 * 
 * @param {Element} elem 
 * @param {Array<Element>} collection 
 */
function getAllTextElems(elem, collection=[]) {
  const textNodes = ["H1","H2","H3","P","SPAN"]
  const thisLayer = elem.children;
  for (let i=0; i<thisLayer.length; i++) {
    if (textNodes.includes(thisLayer[i].nodeName)) collection.push(thisLayer[i]);
    else getAllTextElems(thisLayer[i], collection);
  }
  return collection;
}

/**
 * Automatically generate PDF based on element passed in
 * 
 * @param {string} rootElemId
 * @param {object} options TODO
 */
export function autoPDF(rootElemId, options) {
  const rootElem = document.getElementById(rootElemId);
  if (!rootElem) return console.log("ERR: could not find root PDF element");

  const textCollection = [];
  const geometryCollection = [];
  getAllTextElems(rootElem, textCollection);
  const textDataCollection = textCollection.map(el => {
    // set font data
    let fontSize = 11, fontStyle = 'normal';
    switch (el.nodeName) {
      case "H1":
        fontSize = 34;
        fontStyle = 'bold';
        break;
      case "H2":
        fontSize = 18;
        fontStyle = 'bold';
        break;
      case "H3":
        fontSize = 16;
        break;
      case "P":
      case "SPAN":
      default:
        break;
    }
    if (el.classList.contains("14-pt")) {
      fontSize = 14;
    }
    let textAlign = window.getComputedStyle(el).textAlign;
    const text = el.textContent;
    const pos = textToPos(rootElem, el, textAlign) || { x:0, y:0, width:1000 };
    // draw line under header
    if (el.classList.contains("first") && el.classList.contains("heading")) {
      geometryCollection.push({ type: "line", x1: 8, x2: 202, y1: pos.y + 3, y2: pos.y + 3, width: 0.8 });
    }
    // draw line above footer
    if (el.classList.contains("footer")) {
      geometryCollection.push({ type: "line", x1: 8, x2: 202, y1: pos.y - 15, y2: pos.y - 15, width: 0.4 });
    }
    // draw box for alternating items
    if (el.classList.contains("first") && el.classList.contains("alt")) {
      geometryCollection.push({ type: "rect", x: 8, w: 194, y: pos.y - 5, h: 7.5 });
    }
    return {
      fontSize,
      fontStyle,
      textAlign,
      text,
      x: pos.x,
      y: pos.y,
      width: pos.width,
    }
  });

  // create jsPDF doc
  const doc = new jsPDF();

  // add geometry
  geometryCollection.forEach(geo => {
    if (geo.type === "line") {
      doc.setLineWidth(geo.width);
      doc.line(geo.x1, geo.y1, geo.x2, geo.y2);
    }
    if (geo.type === "rect") {
      doc.setFillColor("#ddd");
      doc.rect(geo.x, geo.y, geo.w, geo.h, "F");
    }
  })
  // add text
  textDataCollection.forEach(text => {
    doc.setFont("helvetica", text.fontStyle).setFontSize(text.fontSize);
    // @ts-ignore
    doc.text(text.text, text.x, text.y, { align:text.textAlign || 'left', maxWidth:text.width });
  })

  console.log("Successfully generated pdf");
  const date = new Date().toLocaleString('en-US', { 
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  doc.save("Invoice-" + date + ".pdf");
}