const fs = require('fs');
const path = require('path');

const replacements = {
  // Fix text-brand-white on light backgrounds
  // We'll replace text-brand-white with text-brand-text globally, 
  // THEN fix buttons to have text-brand-white again
  'text-brand-white': 'text-brand-text',
  
  // Fix unreadable blues
  'text-blue-200/80': 'text-brand-text/80',
  'text-blue-200/60': 'text-brand-text/60',
  'text-blue-200/50': 'text-brand-text/50',
  'text-blue-200/40': 'text-brand-text/40',
  'text-blue-200/30': 'text-brand-text/30',
  'text-blue-200': 'text-brand-text/70',
  
  'border-blue-500/10': 'border-brand-primary/10',
  'border-blue-500/20': 'border-brand-primary/20',
  'border-blue-500/30': 'border-brand-primary/30',
  'border-blue-400': 'border-brand-primary/40',
  
  'text-blue-300': 'text-brand-text/80',
  'text-blue-100': 'text-brand-text',
  
  'bg-blue-600/10': 'bg-brand-primary/10',
  'bg-blue-600/20': 'bg-brand-primary/20',
  
  'text-white': 'text-brand-text', // Catch any stragglers
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

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }
  
  // Restore text-brand-white inside primary buttons
  // Typically they look like: bg-brand-primary text-brand-text
  // We want to make them text-brand-white
  content = content.replace(/bg-brand-primary([^"']*)text-brand-text/g, 'bg-brand-primary$1text-brand-white');
  content = content.replace(/bg-blue-600([^"']*)text-brand-text/g, 'bg-brand-primary$1text-brand-white');
  content = content.replace(/bg-brand-primary-dark([^"']*)text-brand-text/g, 'bg-brand-primary-dark$1text-brand-white');
  
  // Also check for standard button combos
  content = content.replace(/text-brand-text([^"']*)bg-brand-primary/g, 'text-brand-white$1bg-brand-primary');
  
  // Use yellow (accent) as much as requested
  // Replace hover states of primary buttons to use accent
  content = content.replace(/hover:bg-brand-primary-dark/g, 'hover:bg-brand-accent hover:text-brand-text');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
