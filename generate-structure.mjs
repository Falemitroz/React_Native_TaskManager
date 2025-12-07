#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const __dirname = process.cwd();
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(
    'Usage: node generate-structure.mjs <Name> [component|screen] [--with-test]',
  );
  process.exit(1);
}

const name = args[0];
const type = args[1] === 'screen' ? 'screen' : 'component';
const includeTest = args.includes('--with-test');

// Base directory (components o screens)
const baseDir = path.join(
  __dirname,
  'src',
  type === 'screen' ? 'screens' : 'components',
  name,
);

// File paths locali
const files = {
  index: path.join(baseDir, 'index.ts'),
  types: path.join(baseDir, `${name}.types.ts`),
  styles: path.join(baseDir, `${name}.styles.ts`),
};

// JSX Template
const jsxTemplate =
  type === 'screen'
    ? `import React from 'react';
import { Text } from 'react-native';
// import { styles } from './${name}.styles';
import { ScreenWrapper } from '../Layout';

const ${name} = () => {
  return (
    <ScreenWrapper>
      <Text>${name} screen</Text>
    </ScreenWrapper>
  );
};

export default ${name};
`
    : `import React from 'react';
import {  Text } from 'react-native';
// import { styles } from './${name}.styles';
// import type { ${name}Props } from './${name}.types';

export function ${name}() {
  return <Text>${name} component</Text>
};
`;

// Types template
const typesTemplate = `export interface ${name}Props {
  // definisci le props qui
}
`;

// Styles template
const stylesTemplate = `import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const styles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({});
};
`;

// Test template opzionale
const testTemplate = `import React from 'react';
import { render } from '@testing-library/react-native';
import ${name} from './index';

test('renders ${name} correctly', () => {
  render(<${name} />);
});
`;

// --- Creazione cartella e file ---
if (fs.existsSync(baseDir)) {
  console.error(`❌ Directory ${baseDir} already exists`);
  process.exit(1);
}

fs.mkdirSync(baseDir, { recursive: true });
fs.writeFileSync(path.join(baseDir, `${name}.tsx`), jsxTemplate);
fs.writeFileSync(files.index, `export * from './${name}';\n`);
fs.writeFileSync(files.types, typesTemplate);
fs.writeFileSync(files.styles, stylesTemplate);

if (includeTest) {
  fs.writeFileSync(path.join(baseDir, `${name}.test.tsx`), testTemplate);
}

// --- Aggiornamento index globale ---
function updateGlobalIndex(parentDir) {
  const folders = fs
    .readdirSync(parentDir)
    .filter(f => fs.statSync(path.join(parentDir, f)).isDirectory());

  const exports = folders.map(f => `export * from './${f}';`).join('\n');

  fs.writeFileSync(path.join(parentDir, 'index.ts'), exports + '\n');
}

updateGlobalIndex(
  path.join(__dirname, 'src', type === 'screen' ? 'screens' : 'components'),
);

console.log(`✅ Created ${type} "${name}" at ${baseDir}`);
if (includeTest) console.log('✅ Test file included');
