const fs = require('fs');
const path = require('path');

const replacements = {
  'bg-[#031427]': 'bg-brand-primary-dark',
  'text-[#d3e4fe]': 'text-brand-white',
  'bg-[#1b2b3f]': 'bg-brand-primary',
  'text-[#b3c5ff]': 'text-brand-secondary',
  'text-[#c2c6d8]': 'text-brand-light-bg',
  'border-[#424656]': 'border-brand-primary',
  'bg-blue-500': 'bg-brand-secondary',
  'text-blue-400': 'text-brand-secondary',
  'from-blue-600': 'from-brand-secondary',
  'to-purple-600': 'to-brand-primary',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
