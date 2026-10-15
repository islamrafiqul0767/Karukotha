import { Order } from '../store';
import { formatPrice, storeSettings } from '../data';

// Invoice generation utilities
// NOTE: In production, invoice data should come from server-authenticated API
// This is a client-side implementation for development/staging only

export interface InvoiceData {
  invoiceNumber: string;
  orderNumber: string;
  orderDate: string;
  invoiceDate: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    district: string;
    division: string;
  };
  items: Array<{
    name: string;
    sku: string;
    variant?: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  businessInfo: {
    name: string;
    nameBn: string;
    contact: string;
    address: string;
  };
}

export const generateInvoiceData = (order: Order): InvoiceData => {
  const now = new Date();
  const invoiceNumber = `INV-${order.orderNumber.replace('KK-', '')}`;
  
  return {
    invoiceNumber,
    orderNumber: order.orderNumber,
    orderDate: new Date(order.createdAt).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    invoiceDate: now.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    customer: {
      name: order.customerName,
      phone: order.phone,
      email: order.email || undefined,
      address: order.address,
      district: order.district,
      division: order.division,
    },
    items: order.items.map(item => ({
      name: item.product.nameBn,
      sku: item.product.sku,
      variant: item.variant?.nameBn,
      quantity: item.quantity,
      unitPrice: item.product.price + (item.variant?.priceModifier || 0),
      total: (item.product.price + (item.variant?.priceModifier || 0)) * item.quantity,
    })),
    subtotal: order.subtotal,
    discount: order.discount,
    deliveryCharge: order.shippingFee,
    total: order.total,
    paymentMethod: order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod,
    paymentStatus: order.paymentStatus === 'pending' ? 'অপেক্ষমান' : 
                   order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ব্যর্থ',
    orderStatus: getOrderStatusBn(order.orderStatus),
    businessInfo: {
      name: storeSettings.brandName,
      nameBn: storeSettings.brandNameBn,
      contact: storeSettings.contactEmail,
      address: 'ঢাকা, বাংলাদেশ',
    },
  };
};

const getOrderStatusBn = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'অপেক্ষমান',
    confirmed: 'নিশ্চিত',
    preparing: 'প্রস্তুতি চলছে',
    shipped: 'পাঠানো হয়েছে',
    delivered: 'ডেলিভারি সম্পন্ন',
    cancelled: 'বাতিল',
  };
  return statusMap[status] || status;
};

// Generate PNG invoice using Canvas API
export const generateInvoicePNG = async (invoiceData: InvoiceData, scale: number = 3): Promise<Blob> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) throw new Error('Canvas context not available');
  
  // Wait for fonts to load for proper Bengali rendering
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  
  // A4 width at 3x scale (2480 pixels at 300 DPI)
  const width = 2480;
  
  // Calculate dynamic height based on number of items
  // Base height for header, customer info, totals, footer
  const baseHeight = 900;
  // Each item row takes approximately 60px
  const itemHeight = 65;
  const totalItemsHeight = invoiceData.items.length * itemHeight;
  const calculatedHeight = baseHeight + totalItemsHeight;
  
  // Use A4 height or calculated height, whichever is larger
  const height = Math.max(3508, calculatedHeight);
  
  canvas.width = width;
  canvas.height = height;
  
  // Scale context for high resolution
  ctx.scale(scale, scale);
  
  const actualWidth = width / scale;
  const actualHeight = height / scale;
  
  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, actualWidth, actualHeight);
  
  // Header
  ctx.fillStyle = '#173F35'; // Forest green
  ctx.fillRect(0, 0, actualWidth, 120);
  
  // Business name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px "Hind Siliguri", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(invoiceData.businessInfo.nameBn, 60, 60);
  
  ctx.font = '24px "Inter", sans-serif';
  ctx.fillText('INVOICE / ইনভয়েস', 60, 95);
  
  // Invoice details (right side)
  ctx.textAlign = 'right';
  ctx.font = 'bold 28px "Inter", sans-serif';
  ctx.fillText(`Invoice #: ${invoiceData.invoiceNumber}`, actualWidth - 60, 60);
  ctx.font = '20px "Inter", sans-serif';
  ctx.fillText(`Date: ${invoiceData.invoiceDate}`, actualWidth - 60, 95);
  
  // Customer and Order info
  let yPos = 180;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#2C2C2C';
  
  // Customer info box
  ctx.fillStyle = '#F7F4ED';
  ctx.fillRect(60, yPos, actualWidth - 120, 180);
  
  ctx.fillStyle = '#173F35';
  ctx.font = 'bold 24px "Hind Siliguri", sans-serif';
  ctx.fillText('গ্রাহকের তথ্য / Customer Information', 80, yPos + 35);
  
  ctx.fillStyle = '#2C2C2C';
  ctx.font = '20px "Hind Siliguri", sans-serif';
  yPos += 70;
  ctx.fillText(`নাম: ${invoiceData.customer.name}`, 80, yPos);
  yPos += 30;
  ctx.fillText(`ফোন: ${invoiceData.customer.phone}`, 80, yPos);
  if (invoiceData.customer.email) {
    yPos += 30;
    ctx.fillText(`ইমেইল: ${invoiceData.customer.email}`, 80, yPos);
  }
  yPos += 30;
  ctx.fillText(`ঠিকানা: ${invoiceData.customer.address}`, 80, yPos);
  yPos += 30;
  ctx.fillText(`${invoiceData.customer.district}, ${invoiceData.customer.division}`, 80, yPos);
  
  // Order info (right side)
  yPos = 180;
  ctx.textAlign = 'right';
  ctx.fillStyle = '#173F35';
  ctx.font = 'bold 24px "Hind Siliguri", sans-serif';
  ctx.fillText('অর্ডারের তথ্য / Order Information', actualWidth - 80, yPos + 35);
  
  ctx.fillStyle = '#2C2C2C';
  ctx.font = '20px "Hind Siliguri", sans-serif';
  yPos += 70;
  ctx.fillText(`অর্ডার নং: ${invoiceData.orderNumber}`, actualWidth - 80, yPos);
  yPos += 30;
  ctx.fillText(`তারিখ: ${invoiceData.orderDate}`, actualWidth - 80, yPos);
  yPos += 30;
  ctx.fillText(`পেমেন্ট: ${invoiceData.paymentMethod}`, actualWidth - 80, yPos);
  yPos += 30;
  ctx.fillText(`অবস্থা: ${invoiceData.orderStatus}`, actualWidth - 80, yPos);
  
  // Items table
  yPos = 420;
  ctx.textAlign = 'left';
  
  // Table header
  ctx.fillStyle = '#173F35';
  ctx.fillRect(60, yPos, actualWidth - 120, 50);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Hind Siliguri", sans-serif';
  ctx.fillText('পণ্য / Product', 80, yPos + 32);
  ctx.textAlign = 'center';
  ctx.fillText('পরিমাণ', 1400, yPos + 32);
  ctx.fillText('একক মূল্য', 1700, yPos + 32);
  ctx.textAlign = 'right';
  ctx.fillText('মোট', actualWidth - 80, yPos + 32);
  
  // Table rows
  yPos += 50;
  ctx.fillStyle = '#2C2C2C';
  ctx.font = '20px "Hind Siliguri", sans-serif';
  
  invoiceData.items.forEach((item, idx) => {
    // Alternate row background
    if (idx % 2 === 0) {
      ctx.fillStyle = '#F7F4ED';
      ctx.fillRect(60, yPos, actualWidth - 120, 60);
    }
    
    ctx.fillStyle = '#2C2C2C';
    ctx.textAlign = 'left';
    
    // Handle long product names with text wrapping
    const maxWidth = 1200; // Space for product name before quantity column
    const words = item.name.split(' ');
    let line = '';
    let lineY = yPos + 25;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, 80, lineY);
        line = words[i] + ' ';
        lineY += 22;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, lineY);
    
    // Draw variant if exists
    if (item.variant) {
      ctx.font = '16px "Hind Siliguri", sans-serif';
      ctx.fillStyle = '#566257';
      ctx.fillText(item.variant, 80, lineY + 20);
      ctx.font = '20px "Hind Siliguri", sans-serif';
      ctx.fillStyle = '#2C2C2C';
    }
    
    // Quantity
    ctx.textAlign = 'center';
    ctx.fillText(item.quantity.toString(), 1400, yPos + 35);
    
    // Unit price
    ctx.fillText(`৳${item.unitPrice.toLocaleString('bn-BD')}`, 1700, yPos + 35);
    
    // Line total
    ctx.textAlign = 'right';
    ctx.fillText(`৳${item.total.toLocaleString('bn-BD')}`, actualWidth - 80, yPos + 35);
    
    yPos += 65;
  });
  
  // Totals
  yPos += 40;
  ctx.textAlign = 'right';
  ctx.font = '22px "Hind Siliguri", sans-serif';
  
  const rightX = actualWidth - 80;
  const labelX = 1500;
  
  ctx.fillStyle = '#2C2C2C';
  ctx.fillText('সাবটোটাল:', labelX, yPos);
  ctx.fillText(`৳${invoiceData.subtotal.toLocaleString()}`, rightX, yPos);
  
  if (invoiceData.discount > 0) {
    yPos += 35;
    ctx.fillStyle = '#A9442E';
    ctx.fillText('ছাড়:', labelX, yPos);
    ctx.fillText(`-৳${invoiceData.discount.toLocaleString()}`, rightX, yPos);
  }
  
  yPos += 35;
  ctx.fillStyle = '#2C2C2C';
  ctx.fillText('ডেলিভারি চার্জ:', labelX, yPos);
  ctx.fillText(`৳${invoiceData.deliveryCharge.toLocaleString()}`, rightX, yPos);
  
  // Total with background
  yPos += 50;
  ctx.fillStyle = '#173F35';
  ctx.fillRect(labelX - 20, yPos - 30, rightX - labelX + 40, 50);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px "Hind Siliguri", sans-serif';
  ctx.fillText('সর্বমোট:', labelX, yPos);
  ctx.fillText(`৳${invoiceData.total.toLocaleString()}`, rightX, yPos);
  
  // Footer
  yPos = actualHeight - 150;
  ctx.fillStyle = '#566257';
  ctx.font = '18px "Hind Siliguri", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('এই ইনভয়েস কম্পিউটার দিয়ে তৈরি করা হয়েছে / This is a computer-generated invoice', actualWidth / 2, yPos);
  yPos += 30;
  ctx.fillText(`${invoiceData.businessInfo.nameBn} | ${invoiceData.businessInfo.contact}`, actualWidth / 2, yPos);
  yPos += 30;
  ctx.fillText(invoiceData.businessInfo.address, actualWidth / 2, yPos);
  
  // Convert to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to generate PNG'));
    }, 'image/png');
  });
};

// Download invoice as PNG
export const downloadInvoicePNG = async (invoiceData: InvoiceData): Promise<void> => {
  try {
    const blob = await generateInvoicePNG(invoiceData, 3);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karukotha-Invoice-${invoiceData.invoiceNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download invoice:', error);
    throw error;
  }
};

// Generate PDF (simplified - in production use jsPDF or server-side generation)
export const generateInvoicePDF = async (invoiceData: InvoiceData): Promise<Blob> => {
  // For now, generate a text-based PDF representation
  // In production, use jsPDF or server-side PDF generation
  
  const content = `
INVOICE / ইনভয়েস
================

Invoice #: ${invoiceData.invoiceNumber}
Order #: ${invoiceData.orderNumber}
Date: ${invoiceData.invoiceDate}

CUSTOMER INFORMATION / গ্রাহকের তথ্য
-------------------------------------
Name: ${invoiceData.customer.name}
Phone: ${invoiceData.customer.phone}
${invoiceData.customer.email ? `Email: ${invoiceData.customer.email}` : ''}
Address: ${invoiceData.customer.address}
${invoiceData.customer.district}, ${invoiceData.customer.division}

ORDER INFORMATION / অর্ডারের তথ্য
---------------------------------
Order Date: ${invoiceData.orderDate}
Payment Method: ${invoiceData.paymentMethod}
Status: ${invoiceData.orderStatus}

ITEMS / পণ্য
------------
${invoiceData.items.map(item => `
${item.name} ${item.variant ? `(${item.variant})` : ''}
  SKU: ${item.sku}
  Quantity: ${item.quantity} × ৳${item.unitPrice.toLocaleString()} = ৳${item.total.toLocaleString()}
`).join('')}

SUMMARY / সারাংশ
----------------
Subtotal: ৳${invoiceData.subtotal.toLocaleString()}
${invoiceData.discount > 0 ? `Discount: -৳${invoiceData.discount.toLocaleString()}` : ''}
Delivery: ৳${invoiceData.deliveryCharge.toLocaleString()}
TOTAL: ৳${invoiceData.total.toLocaleString()}

---
${invoiceData.businessInfo.nameBn}
${invoiceData.businessInfo.contact}
${invoiceData.businessInfo.address}
  `.trim();
  
  return new Blob([content], { type: 'text/plain' });
};

// Download invoice as PDF (text-based for now)
export const downloadInvoicePDF = async (invoiceData: InvoiceData): Promise<void> => {
  try {
    const blob = await generateInvoicePDF(invoiceData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karukotha-Invoice-${invoiceData.invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download invoice:', error);
    throw error;
  }
};
