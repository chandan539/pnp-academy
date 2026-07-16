const fs = require('fs');
const path = require('path');

const replacements = {
  // Undo previous script mappings to remap to light theme properly
  'bg-brand-primary-dark': 'bg-brand-light-bg', // main bg
  'text-brand-white': 'text-brand-text', // main text
  'bg-brand-primary': 'bg-brand-white', // panels
  'text-brand-secondary': 'text-brand-primary', 
  'text-brand-light-bg': 'text-brand-text/80',
  'border-brand-primary': 'border-brand-primary/20',
  'bg-brand-secondary': 'bg-brand-primary', 
  
  // Replace old dark hex colors
  'bg-[#0b1c30]': 'bg-brand-white',
  'bg-[#102034]': 'bg-brand-light-bg',
  'bg-[#0b1c35]': 'bg-brand-white',
  'bg-[#0f2442]': 'bg-brand-light-bg',
  'bg-[#031427]': 'bg-brand-light-bg',
  'bg-[#1e293b]': 'bg-brand-white',
  'bg-[#1b2b3f]': 'bg-brand-white',
  
  'text-[#8c90a1]': 'text-brand-text/70',
  'text-[#b3c5ff]': 'text-brand-primary',
  'text-[#c2c6d8]': 'text-brand-text/80',
  'text-[#d3e4fe]': 'text-brand-text',
  'text-[#ffb59d]': 'text-brand-accent',
  
  'border-[#424656]': 'border-brand-primary/20',
  'border-[#424656]/30': 'border-brand-primary/20',
  'border-[#424656]/50': 'border-brand-primary/20',
  'border-[#2a3441]': 'border-brand-primary/20',
  
  'bg-[#ffb4ab]': 'bg-brand-accent',
  
  // Tailwind default blues to brand colors
  'bg-blue-600': 'bg-brand-primary',
  'bg-blue-500': 'bg-brand-primary',
  'text-blue-400': 'text-brand-primary',
  'text-blue-500': 'text-brand-primary',
  'text-blue-600': 'text-brand-primary',
  'border-blue-500/20': 'border-brand-primary/20',
  'border-blue-600/20': 'border-brand-primary/20',
  
  'hover:bg-[#0f2442]': 'hover:bg-brand-light-bg',
  'hover:bg-[#102034]': 'hover:bg-brand-light-bg',
  'hover:bg-[#1b2b3f]': 'hover:bg-brand-light-bg',
  
  // gradients
  'from-blue-600': 'from-brand-primary',
  'to-indigo-500': 'to-brand-primary-dark',
  'to-purple-600': 'to-brand-primary-dark',

  // Fix button text contrast if needed
  'text-brand-text min-h-screen': 'text-brand-text min-h-screen', // Just a placeholder
  
  // Adjust glass-card and glass-panel CSS for light theme
  'background: rgba(15, 23, 42, 0.6)': 'background: rgba(255, 255, 255, 0.8)',
  'background: rgba(15, 23, 42, 0.8)': 'background: rgba(255, 255, 255, 0.9)',
  'border: 1px solid rgba(255, 255, 255, 0.08)': 'border: 1px solid rgba(0, 0, 0, 0.08)',
  'border: 1px solid rgba(30, 41, 59, 0.5)': 'border: 1px solid rgba(0, 0, 0, 0.08)',
  'box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3)': 'box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05)',
  
  'text-white': 'text-brand-white',
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
  
  // Additional fixes for the inverted button text inside primary buttons
  // Since we replaced text-white with text-brand-white, we might want to make sure the bg-brand-primary buttons have text-brand-white
  // Not strictly necessary since --color-brand-white is #FFFFFF.
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
