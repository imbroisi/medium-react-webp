const fs = require('fs');
const { execSync } = require('child_process');

const lossyMinSizeReduction = 0.3; // 30% deduction minimum

const createLossyIfNotExists = (file) => {

  const baseName = file.substring(0, file.lastIndexOf('.'));

  const webpLossyFile = `${baseName}.webp`;
  const webpLossyFileS70 = `${baseName}_s70.webp`;
  const webpLossyFileQ95 = `${baseName}_q95.webp`;

  const sizeOri = fs.statSync(file).size;

  const sizeWebp = parseInt(sizeOri * (1 - lossyMinSizeReduction), 10);

  if (fs.existsSync(webpLossyFile)) return;

  execSync(`cwebp ${file} -f 50 -size ${sizeWebp} -o ${webpLossyFileS70}`);
  execSync(`cwebp ${file} -q 95 -o ${webpLossyFileQ95}`);

  if (fs.statSync(webpLossyFileQ95).size < fs.statSync(webpLossyFileS70).size) {

    fs.renameSync(webpLossyFileQ95, webpLossyFile);
    fs.unlinkSync(webpLossyFileS70);

  } else {

    fs.renameSync(webpLossyFileS70, webpLossyFile);
    fs.unlinkSync(webpLossyFileQ95);

  }

};

const createLossyAlphaIfNotExists = (file) => {

  const baseName = file.substring(0, file.lastIndexOf('.'));

  const webpLossyAlphaFile = `${baseName}_lossyalpha.webp`;

  if (fs.existsSync(webpLossyAlphaFile)) return;

  execSync(`cwebp ${file} -q 95 -alpha_q 100 -m 6 -o ${webpLossyAlphaFile}`);

};

const createLosslessIfNotExists = (file) => {

  const baseName = file.substring(0, file.lastIndexOf('.'));

  const webpLosslessFile = `${baseName}_lossless.webp`;

  if (fs.existsSync(webpLosslessFile)) return;

  execSync(`cwebp ${file} -lossless -m 6 -q 100 -o ${webpLosslessFile}`);

};


const walk = (dir) => {

  let results = [];

  const list = fs.readdirSync(dir);

  const next = () => {

    let file = list.shift();
    if (!file) return results;

    file = `${dir}/${file}`;

    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      
      const res = walk(file);
      
      results = results.concat(res);
      
      return next();
      
    }
    
    results.push(file);
    return next();
    
  };

  return next();

};

const allFiles = walk('./src');

allFiles.forEach((file) => {

  if (file.toLowerCase().lastIndexOf('.png') === file.length - 4) {
  
    createLossyAlphaIfNotExists(file);
    createLosslessIfNotExists(file);

  } else if (file.toLowerCase().lastIndexOf('.jpg') === file.length - 4 || file.toLowerCase().lastIndexOf('.jpeg') === file.length - 5) {

 
    createLossyIfNotExists(file);

  }

});
