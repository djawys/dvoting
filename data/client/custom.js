export const PROJECT_ACCESS = [
  'Read Only',
  'Read/Write',
  'Read/Write and can also share',
];

export const limitText = (text, length) => {
  if (text.length > length) {
    text = text.substring(0, length - 1) + '...';
  }
  return text;
};
export const getShareProjectsum = (projects) => {
  let sum = 0;
  projects.map((x) => {
    sum += x.share.length;
  });
  return sum;
};
export const getProductsUsedsum = (projects) => {
  let sum = 0;
  projects.map((x) => {
    sum += x.products.length;
  });
  return sum;
};
export const calculateReviewStars = (reviews) => {
  let sum = 0;
  reviews.map((x) => {
    sum += parseInt(x.ratings);
  });
  return sum / reviews.length;
};
export const formatBytes = (bytes, decimals) => {
  if (bytes == 0) return '0 Bytes';
  var k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const submitalFilesFormat = (products) => {

  let allProductFilesLet = [];
  let files = {};
  products.map((p) => {
    files = {
      Uncategorized: [],
      'Product-Data': [],
      'Brochure-Catalog': [],
      Warranty: [],
      'Safety-Data-Sheets': [],
      'Product-Guides': [],
      'BIM-CAD': [],
      Spec: [],
    };
    p.product.product_files.map((f) => {
      // console.log('p==>>>', p)
      let ext = f.filename.split('.').pop()
      if (ext.toLowerCase() !== 'pdf') return
      if (f.category_id === 1) {
        files['Uncategorized'].push({ ...f });
      } else if (f.category_id === 2) {
        files['Product-Data'].push({ ...f });
      } else if (f.category_id === 3) {
        files['Brochure-Catalog'].push({ ...f });
      } else if (f.category_id === 4) {
        files['Warranty'].push({ ...f });
      } else if (f.category_id === 5) {
        files['Safety-Data-Sheets'].push({ ...f });
      } else if (f.category_id === 6) {
        files['Product-Guides'].push({ ...f });
      } else if (f.category_id === 8) {
        files['BIM-CAD'].push({ ...f });
      } else if (f.category_id === 10) {
        files['Spec'].push({ ...f });
      }
    });
    allProductFilesLet.push({
      _id: p.product._id,
      name: p.product.name,
      manufacturer: p.product.manufacturer._id,
      company_name: p.product.manufacturer.company_name, 
      product_files: files,
      note: p.add_note,
    });
  });

  return allProductFilesLet;
};
