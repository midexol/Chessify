const fs = require('fs');

let code = fs.readFileSync('simulate-stacks.js', 'utf8');

// 1. Update executeCall to wrap broadcastTransaction in a retry loop
code = code.replace(
  'const result = await broadcastTransaction({ transaction, client });\n    if (result.error) {',
  `let result;
    for (let i = 0; i < 3; i++) {
      try {
        result = await broadcastTransaction({ transaction, client });
        break;
      } catch (err) {
        if (i === 2) throw err;
        await sleep(2000 * (i + 1));
      }
    }

    if (result && result.error) {`
);

// 2. Change all config.routerContract to config.gameContract
code = code.replace(/config\.routerContract/g, 'config.gameContract');

// 3. Remove the stringAsciiCV argument from submit-move
code = code.replace(
  /const moveStr = getRandomMove\(\);\n\s+log\(\`   └─ Move \$\{m\+1\}\/\$\{totalMoves\} by \$\{moveName\}: \$\{moveStr\}\`\);\n\s+const moveRes = await executeCall\(currentPlayer\.privateKey, config\.gameContract, 'submit-move', \[uintCV\(gameId\), stringAsciiCV\(moveStr\)\].*?\);/g,
  `log(\`   └─ Move \${m+1}/\${totalMoves} by \${moveName}\`);
    const moveRes = await executeCall(currentPlayer.privateKey, config.gameContract, 'submit-move', [uintCV(gameId)], \`submit-move(\${moveName})\`);`
);

fs.writeFileSync('simulate-stacks.js', code);
console.log('Successfully updated simulate-stacks.js!');
